import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  User,
  AlertTriangle,
  Loader2,
  X,
  Maximize2,
} from "lucide-react";

const ReviewWorkEvidence = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [fixDetails, setFixDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const IMAGE_BASE_URL = "http://localhost:3000/uploads/";

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        const reportRes = await fetch(
          `http://localhost:3000/api/Reports/${id}`
        );
        const reportData = await reportRes.json();
        setReport(reportData);

        const fixRes = await fetch(
          `http://localhost:3000/api/Report/fixes/submit`
        );
        const allFixes = await fixRes.json();
        const specificFix = allFixes.find((f) => f.report_id === id);
        setFixDetails(specificFix);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFullData();
  }, [id]);

  /**
   * CORRECTED IMAGE FETCHER
   */
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://via.placeholder.com/600x400?text=No+Path+Found";

    // 1. If it's a blob URL, it's broken data from the past.
    // We try to see if there is a filename at the end of it or just show a warning.
    if (imagePath.startsWith("blob:")) {
      console.error(
        "DATA ERROR: Database contains a temporary Blob URL instead of a filename:",
        imagePath
      );
      return "https://via.placeholder.com/600x400?text=Broken+Blob+Data";
    }

    // 2. If it's already a full HTTP path, use it
    if (imagePath.startsWith("http")) return imagePath;

    // 3. Standard local fetch: Clean "uploads/" prefix and append to base URL
    const cleanPath = imagePath.replace(/^uploads\//, "");
    const finalUrl = `${IMAGE_BASE_URL}${cleanPath}`;

    return finalUrl;
  };

  const handleAction = async (type) => {
    setIsProcessing(true);
    const newStatus = type === "validate" ? "Validated" : "Assigned";
    const staffStatus = type === "validate" ? "Validated" : "Pending";

    try {
      await fetch(`http://localhost:3000/api/Reports/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (fixDetails?._id) {
        await fetch(
          `http://localhost:3000/api/Report/fixes/${fixDetails._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: staffStatus }),
          }
        );
      }

      alert(
        `Report ${type === "validate" ? "Validated" : "Rejected"} successfully!`
      );
      navigate("/admin/processed-reports");
    } catch (error) {
      alert("Error updating status");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f3ff]">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f5f3ff] pb-20 font-['Plus_Jakarta_Sans']">
      {/* IMAGE MODAL */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-10 right-10 text-white hover:rotate-90 transition-all"
          >
            <X size={40} />
          </button>
          <img
            src={selectedImg}
            className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
            alt="Enlarged"
          />
        </div>
      )}

      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 font-bold hover:text-purple-600 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Reports
        </button>
        <div className="text-right">
          <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
            Reviewing Case
          </span>
          <p className="text-sm font-black text-slate-900">
            #{id?.slice(-8).toUpperCase()}
          </p>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* SECTION 1: USER EVIDENCE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-orange-600" size={18} />
            <h2 className="text-xl font-black text-slate-900">User Evidence</h2>
          </div>
          <div className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl border border-purple-50">
            <div
              onClick={() => setSelectedImg(getImageUrl(report?.imageBefore))}
              className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 mb-6 border border-slate-100 cursor-zoom-in"
            >
              <img
                src={getImageUrl(report?.imageBefore)}
                alt="User Report"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=File+Not+Found+On+Server";
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Maximize2 className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {report?.subject}
            </h3>
            <p className="flex items-center gap-1 text-slate-400 text-sm font-bold mt-2">
              <MapPin size={14} /> {report?.address}
            </p>
          </div>
        </section>

        {/* SECTION 2: STAFF RESOLUTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={18} />
            <h2 className="text-xl font-black text-slate-900">
              Staff Resolution
            </h2>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-purple-50">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                onClick={() =>
                  setSelectedImg(getImageUrl(fixDetails?.imageBefore))
                }
                className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 cursor-zoom-in"
              >
                <img
                  src={getImageUrl(fixDetails?.imageBefore)}
                  className="w-full h-full object-cover"
                  alt="Before"
                />
                <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded-lg font-black uppercase">
                  Before
                </span>
              </div>
              <div
                onClick={() =>
                  setSelectedImg(getImageUrl(fixDetails?.imageAfter))
                }
                className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 cursor-zoom-in"
              >
                <img
                  src={getImageUrl(fixDetails?.imageAfter)}
                  className="w-full h-full object-cover"
                  alt="After"
                />
                <span className="absolute bottom-3 left-3 bg-green-600 text-white text-[9px] px-2 py-1 rounded-lg font-black uppercase">
                  After
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">
                      Field Agent
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {report?.assignedStaff || "Staff Member"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <p className="text-[10px] font-black text-purple-400 uppercase mb-1">
                  Notes
                </p>
                <p className="text-sm text-slate-700 font-medium italic">
                  "{fixDetails?.notes || "No notes."}"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-purple-100 p-6 z-50">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => handleAction("reject")}
            className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase text-xs hover:bg-red-100"
          >
            {isProcessing ? "..." : "REJECT"}
          </button>
          <button
            onClick={() => handleAction("validate")}
            className="flex-[2] py-4 bg-purple-600 text-white rounded-2xl font-black uppercase text-xs hover:bg-purple-700 shadow-lg"
          >
            {isProcessing ? "..." : "VALIDATE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWorkEvidence;
