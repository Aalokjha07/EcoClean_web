import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  MapPin,
  CheckCircle,
  XCircle,
  ArrowLeft,
  User,
  HardHat,
  Eye,
} from "lucide-react";

const ReviewWorkEvidence = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ report: null, fix: null });
  const [loading, setLoading] = useState(true);

  const SERVER_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const repRes = await fetch(`${SERVER_URL}/api/Reports/${id}`);
        const report = await repRes.json();

        const fixRes = await fetch(`${SERVER_URL}/api/Fixes/report/${id}`);
        const fix = fixRes.ok ? await fixRes.json() : null;

        setData({ report, fix });
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchCombinedData();
  }, [id]);

  const getFullUrl = (path) => {
    if (!path || path === "undefined" || path === null) {
      return "https://via.placeholder.com/600x400?text=No+Image+Path";
    }

    // Handle temporary blob URLs or full external links
    if (path.startsWith("blob:") || path.startsWith("http")) {
      return path;
    }

    // Handle stored filenames from your server
    const cleanPath = path.replace(/^\/+/, "");
    // If your backend serves from an /uploads folder, keep it here.
    // If not, use `${SERVER_URL}/${cleanPath}`
    return `${SERVER_URL}/uploads/${cleanPath}`;
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/Reports/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert(`Verification Complete: ${newStatus.toUpperCase()}`);
        navigate("/admin/processed-reports");
      }
    } catch (error) {
      alert("Database update failed.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold transition-all"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Audit Evidence
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Reviewing Database Records
          </p>
        </div>
        <div className="w-24"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* --- LEFT SIDE: CITIZEN DATA --- */}
        <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
              <User size={24} />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tighter">
              Citizen Entry
            </h2>
          </div>

          <div className="space-y-6 flex-grow">
            <DetailItem label="Report Title" value={data.report?.subject} />
            <DetailItem
              label="Location"
              value={
                data.report?.address ||
                `Lat: ${data.report?.location?.lat}, Lng: ${data.report?.location?.lng}`
              }
              isLocation
            />

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Original Description
              </label>
              <div className="bg-slate-50 p-6 rounded-[2rem] text-slate-600 leading-relaxed italic border border-slate-100">
                "{data.report?.description || "No description provided."}"
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Initial Evidence
              </label>
              <img
                src={getFullUrl(data.report?.imageBefore || data.report?.image)}
                className="w-full h-80 object-cover rounded-[2.5rem] shadow-lg border-4 border-white bg-slate-100"
                alt="Citizen Evidence"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/600x400?text=Initial+Evidence+Missing")
                }
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: STAFF DATA --- */}
        <div className="bg-slate-900 rounded-[3rem] p-8 shadow-xl text-white flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center">
              <HardHat size={24} />
            </div>
            <h2 className="text-xl font-extrabold uppercase tracking-tighter">
              Staff Submission
            </h2>
          </div>

          <div className="space-y-6 flex-grow">
            <DetailItem
              label="Completion Status"
              value={data.fix ? "RESOLVED" : "PENDING"}
              isDark
            />
            <DetailItem
              label="Verified Location"
              value={data.fix?.location || data.report?.address}
              isLocation
              isDark
            />

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                Staff Remarks
              </label>
              <div className="bg-white/5 p-6 rounded-[2rem] text-slate-300 leading-relaxed border border-white/5">
                {data.fix?.notes || "No closing remarks provided."}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Eye size={12} /> Work Reference
                </label>
                <img
                  src={getFullUrl(
                    data.fix?.imageBefore || data.report?.imageBefore
                  )}
                  className="w-full h-56 object-cover rounded-[1.5rem] opacity-40 border border-white/10 bg-slate-800"
                  alt="Staff Reference"
                />
              </div>
              {/* FIXED: Added Final Resolution Image here */}
              <div>
                <label className="text-[10px] font-black text-green-500 uppercase tracking-widest block mb-2 flex items-center gap-1">
                  Final Resolution
                </label>
                <img
                  src={getFullUrl(data.fix?.imageAfter || data.fix?.image)}
                  className="w-full h-56 object-cover rounded-[1.5rem] border-2 border-green-500 shadow-xl shadow-green-500/20 bg-slate-800"
                  alt="Final Resolution"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/600x400?text=Staff+Evidence+Missing")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <button
          onClick={() => handleUpdateStatus("validated")}
          className="group flex items-center justify-center gap-3 py-6 bg-green-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all"
        >
          <CheckCircle size={24} /> Approve Work
        </button>
        <button
          onClick={() => handleUpdateStatus("pending")}
          className="group flex items-center justify-center gap-3 py-6 bg-white border-2 border-red-100 text-red-500 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-red-50 transition-all"
        >
          <XCircle size={24} /> Reject & Reopen
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, isLocation, isDark }) => (
  <div>
    <label
      className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${
        isDark ? "text-slate-500" : "text-slate-400"
      }`}
    >
      {label}
    </label>
    <div
      className={`flex items-center gap-2 ${
        isDark ? "text-white" : "text-slate-800"
      }`}
    >
      {isLocation && (
        <MapPin
          size={16}
          className={isDark ? "text-green-400" : "text-purple-600"}
        />
      )}
      <p
        className={`text-lg font-bold ${
          value === "RESOLVED" ? "text-green-400" : ""
        }`}
      >
        {value || "Not Recorded"}
      </p>
    </div>
  </div>
);

export default ReviewWorkEvidence;
