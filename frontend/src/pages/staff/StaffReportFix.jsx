import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Upload,
  AlertCircle,
  MapPin,
  Navigation,
  Loader2,
  LocateFixed,
} from "lucide-react";

const StaffReportFix = () => {
  const navigate = useNavigate();

  // 1. DATA RETRIEVAL FROM LOCALSTORAGE
  const reportId = localStorage.getItem("activeReportId");
  const subject = localStorage.getItem("activeReportSubject");
  const initialAddress = localStorage.getItem("activeReportAddress");

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [formData, setFormData] = useState({
    location: initialAddress || "",
    preImage: null, // Staff's 'Before' photo
    postImage: null, // Staff's 'After' photo
    notes: "",
  });

  // --- HELPER: CONVERT BLOB URL TO BASE64 ---
  const getBase64FromBlob = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Conversion error:", err);
      return null;
    }
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          location: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`,
        }));
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        alert("Location access denied. Please enable GPS.");
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (step === 1 && !formData.location) {
      fetchCurrentLocation();
    }
  }, [step]);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [type]: blobUrl,
      }));
    }
  };

  // --- LOGIC: FINAL SUBMISSION (ALIGNED WITH model.js) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.notes || !formData.postImage) {
      alert("Please complete all steps including the final notes.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step A: Convert Blobs to Base64 Strings for MongoDB
      const base64Pre = formData.preImage
        ? await getBase64FromBlob(formData.preImage)
        : null;
      const base64Post = await getBase64FromBlob(formData.postImage);

      // Step B: Send to backend (PUT request to update the specific Report)
      const response = await fetch(
        `http://localhost:3000/api/Reports/${reportId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // These keys match your Mongoose Schema exactly
            status: "Resolved",
            staffId: "staff_001", // Hardcoded for now, or get from Auth context
            staffNotes: formData.notes,
            staffLocation: formData.location,
            imageBefore2: base64Pre, // Updating the report with the 'Before' evidence
            imageAfter: base64Post, // Adding the 'After' evidence
            resolvedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update report.");
      }

      // SUCCESS FLOW: Cleanup local storage and navigate
      localStorage.removeItem("activeReportId");
      localStorage.removeItem("activeReportSubject");
      localStorage.removeItem("activeReportAddress");

      alert("Task Resolved and Report Updated Successfully!");
      navigate("/staff/active-reports");
    } catch (error) {
      console.error("Workflow Error:", error);
      alert(`Critical Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!reportId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-black">No Active Task</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans'] flex flex-col items-center pb-20">
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-50 rounded-xl"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-xl font-extrabold tracking-tighter">
            EcoClean
          </span>
        </div>
      </nav>

      <main className="p-6 w-full max-w-md">
        <header className="mb-8">
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">
            Report Fix
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">
            Updating Original Report:{" "}
            <span className="text-blue-600">{reportId}</span>
          </p>
        </header>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 px-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                  step >= num
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > num ? <CheckCircle2 size={16} /> : num}
              </div>
              {num !== 4 && (
                <div
                  className={`w-6 h-0.5 mx-1 rounded-full ${
                    step > num ? "bg-blue-600" : "bg-slate-100"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: Verification Location */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white mb-6 relative overflow-hidden">
                <Navigation className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    Verification Location
                  </h3>
                  <button
                    type="button"
                    onClick={fetchCurrentLocation}
                    className="text-blue-400"
                  >
                    {isLocating ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <LocateFixed size={18} />
                    )}
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-blue-600 rounded-2xl">
                    <MapPin size={20} />
                  </div>
                  <input
                    readOnly
                    value={formData.location}
                    className="bg-transparent border-b border-white/20 font-bold text-lg outline-none w-full"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"
              >
                Confirm & Continue
              </button>
            </div>
          )}

          {/* STEP 2: Before Image */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h3 className="font-extrabold mb-4 text-slate-800">
                1. Initial Condition (Staff Verification)
              </h3>
              <label className="cursor-pointer block">
                <div
                  className={`aspect-square rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center ${
                    formData.preImage
                      ? "border-blue-600 bg-blue-50/30"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {formData.preImage ? (
                    <img
                      src={formData.preImage}
                      className="w-full h-full object-cover rounded-[2.8rem]"
                      alt="Pre"
                    />
                  ) : (
                    <Camera size={40} className="text-slate-300" />
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleImageUpload(e, "preImage")}
                />
              </label>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.preImage}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: After Image */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h3 className="font-extrabold mb-4 text-slate-800">
                2. Evidence of Fix (Final Result)
              </h3>
              <label className="cursor-pointer block">
                <div
                  className={`aspect-square rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center ${
                    formData.postImage
                      ? "border-green-600 bg-green-50/30"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {formData.postImage ? (
                    <img
                      src={formData.postImage}
                      className="w-full h-full object-cover rounded-[2.8rem]"
                      alt="Post"
                    />
                  ) : (
                    <Upload size={40} className="text-slate-300" />
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleImageUpload(e, "postImage")}
                />
              </label>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  disabled={!formData.postImage}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                >
                  Verify Fix
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Notes & Submit */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
              <textarea
                className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm min-h-[140px] focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Describe the cleaning/fix process (e.g. 'Garbage removed and area disinfected')..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Finish & Submit"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default StaffReportFix;
