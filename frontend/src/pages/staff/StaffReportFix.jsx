import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  History,
  Upload,
  AlertCircle,
  MapPin,
  Navigation,
  Loader2,
  LocateFixed,
} from "lucide-react";

const StaffReportFix = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get task from navigation state or use placeholder
  const task = location.state?.task || {
    _id: "677c081d09e53093952f1e60",
    subject: "General Maintenance",
    address: "Pending Location...",
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [formData, setFormData] = useState({
    location: task.address || "",
    preImage: null,
    postImage: null,
    notes: "",
  });

  // --- LOGIC: Fetch Staff Location ---
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
        console.error("Location error:", error);
        alert("Unable to retrieve your location. Please type it manually.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Auto-fetch location on Step 1 mount
  useEffect(() => {
    if (
      step === 1 &&
      (!formData.location || formData.location === "Pending Location...")
    ) {
      fetchCurrentLocation();
    }
  }, [step]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- LOGIC: Convert Image to Base64 (The Fix for Payload Error) ---
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [type]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LOGIC: Final Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.notes) {
      alert("Please add maintenance logs before submitting.");
      return;
    }

    setIsSubmitting(true);

    const fixData = {
      report_id: task._id,
      subject: task.subject,
      staffId: "staff_001",
      location: formData.location,
      imageBefore: formData.preImage,
      imageAfter: formData.postImage,
      notes: formData.notes,
      completedAt: new Date().toISOString(),
      status: "Resolved",
    };

    try {
      const response = await fetch("http://localhost:3000/api/Fixes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fixData),
      });

      if (response.ok) {
        alert("Success! Fix record created and status updated.");
        navigate("/staff/my-fixes");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Connection failed. Check if backend limit is set to 50mb.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans'] flex flex-col items-center pb-20">
      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <span className="text-xl font-extrabold tracking-tighter text-slate-900">
            EcoClean
          </span>
          <span className="bg-blue-600 text-[10px] font-black text-white px-2 py-0.5 rounded-md uppercase">
            Staff
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2.5 bg-slate-900 text-white rounded-2xl shadow-lg"
        >
          <Menu
            className={`h-5 w-5 transition-transform ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </nav>

      <main className="p-6 w-full max-w-md">
        <header className="mb-8">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Report Fix
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">
            Task ID: <span className="text-blue-600 underline">{task._id}</span>
          </p>
        </header>

        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-10 px-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs transition-all ${
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
          {/* STEP 1: VERIFY LOCATION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white mb-6 relative overflow-hidden">
                <Navigation className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    Location Assignment
                  </h3>
                  <button
                    type="button"
                    onClick={fetchCurrentLocation}
                    className="text-blue-400 hover:text-blue-300"
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
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="bg-transparent border-b border-white/20 font-bold text-lg outline-none w-full"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl"
              >
                Confirm & Continue
              </button>
            </div>
          )}

          {/* STEP 2: BEFORE IMAGE */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={16} className="text-amber-500" />
                <h3 className="font-extrabold text-slate-800">
                  1. Initial Condition
                </h3>
              </div>
              <label className="relative group cursor-pointer block">
                <div
                  className={`aspect-square rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
                    formData.preImage
                      ? "border-blue-600 bg-blue-50/30"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {formData.preImage ? (
                    <img
                      src={formData.preImage}
                      alt="Pre"
                      className="w-full h-full object-cover rounded-[2.8rem]"
                    />
                  ) : (
                    <>
                      <div className="p-5 bg-white rounded-3xl shadow-sm text-slate-400">
                        <Camera size={40} />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Capture Pre-Fix
                      </span>
                    </>
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
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AFTER IMAGE */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} className="text-green-500" />
                <h3 className="font-extrabold text-slate-800">
                  2. Evidence of Fix
                </h3>
              </div>
              <label className="relative group cursor-pointer block">
                <div
                  className={`aspect-square rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
                    formData.postImage
                      ? "border-green-600 bg-green-50/30"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {formData.postImage ? (
                    <img
                      src={formData.postImage}
                      alt="Post"
                      className="w-full h-full object-cover rounded-[2.8rem]"
                    />
                  ) : (
                    <>
                      <div className="p-5 bg-white rounded-3xl shadow-sm text-slate-400">
                        <Upload size={40} />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Capture Post-Fix
                      </span>
                    </>
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
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30"
                >
                  Verify Fix
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FINAL LOGS & SUBMIT */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest ml-2">
                  Maintenance Logs
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-medium focus:ring-2 focus:ring-blue-600/20 outline-none min-h-[140px]"
                  placeholder="Describe the cleaning/fix process..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
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
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
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
