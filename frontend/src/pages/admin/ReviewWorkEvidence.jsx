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
  ShieldCheck,
  Activity,
  Clock,
} from "lucide-react";

const ReviewWorkEvidence = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const SERVER_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // We now pull everything from the Reports collection
        const res = await fetch(`${SERVER_URL}/api/Reports/${id}`);
        const data = await res.json();
        setReport(data);
        setLoading(false);
      } catch (error) {
        console.error("Audit Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchReportData();
  }, [id]);

  const getFullUrl = (path) => {
    if (!path) return "https://via.placeholder.com/600x400?text=No+Data+Found";
    if (path.startsWith("data:") || path.startsWith("http")) return path;
    return `${SERVER_URL}/${path.replace(/^\/+/, "")}`;
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/Reports/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert(`System Log: Report marked as ${newStatus.toUpperCase()}`);
        navigate("/admin/processed-reports");
      }
    } catch (error) {
      alert("Critical Update Error: Terminal connection failed.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-blue-400">
        <Loader2 className="animate-spin mb-4" size={50} />
        <p className="font-mono tracking-tighter animate-pulse">
          INITIALIZING AUDIT DECRYPTOR...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-slate-300 font-['Plus_Jakarta_Sans']">
      {/* TECH HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-all font-mono text-xs"
        >
          <ArrowLeft size={16} /> RETURN_TO_BASE
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <ShieldCheck className="text-blue-500" size={24} />
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
              Incident Audit Terminal
            </h1>
          </div>
          <p className="text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.3em]">
            ID: {id?.slice(-12)} // SECURE_ACCESS_GRANTED
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-500 uppercase italic">
              Current_Status
            </p>
            <p
              className={`text-sm font-black ${
                report?.status === "Resolved"
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
            >
              {report?.status?.toUpperCase()}
            </p>
          </div>
          <Activity size={20} className="text-blue-500" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: INCIDENT LOG (Citizen) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800/40 rounded-[2rem] p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={14} /> Incident_Origins
            </h3>
            <DetailItem label="Subject" value={report?.subject} />
            <DetailItem
              label="Coordinates"
              value={report?.address}
              isLocation
            />

            <div className="mt-6">
              <label className="text-[9px] font-black text-slate-500 uppercase mb-2 block">
                Initial_Brief
              </label>
              <p className="text-sm text-slate-400 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800 italic">
                "{report?.description}"
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-[2rem] p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
              Initial_Evidence_Frame
            </h3>
            <img
              src={(() => {
                const imgPath = report.imageBefore || report.image;
                if (!imgPath)
                  return "https://via.placeholder.com/400x200?text=No+Preview";
                if (imgPath.startsWith("http") || imgPath.startsWith("blob:"))
                  return imgPath;
                return `${SERVER_URL}/uploads/${imgPath.replace(/^\//, "")}`;
              })()}
              alt="Trash"
              className="card-img"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x200?text=Image+Not+Found";
              }}
            />
          </div>
        </div>

        {/* RIGHT: RESOLUTION ANALYTICS (Staff) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-600/5 rounded-[2rem] p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <HardHat size={120} />
            </div>

            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <CheckCircle size={14} /> Resolution_Data_Stream
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-6">
                <DetailItem
                  label="Assigned_Officer"
                  value={report?.assignedStaff || "SYSTEM_AUTO"}
                />
                <DetailItem
                  label="Verification_GPS"
                  value={report?.staffLocation || "PENDING"}
                  isLocation
                />
                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase mb-2 block">
                    Staff_Closing_Remarks
                  </label>
                  <div className="bg-emerald-500/5 text-emerald-100 p-5 rounded-2xl border border-emerald-500/20 text-sm">
                    {report?.staffNotes || "Awaiting final logs..."}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[8px] font-black text-slate-500 uppercase text-center">
                      Reference_Frame
                    </p>
                    <img
                      src={getFullUrl(report?.imageBefore2)}
                      className="w-full h-32 object-cover rounded-xl border border-slate-700 opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[8px] font-black text-emerald-500 uppercase text-center">
                      Resolution_Frame
                    </p>
                    <img
                      src={getFullUrl(report?.imageAfter)}
                      className="w-full h-32 object-cover rounded-xl border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    TIMESTAMP:
                  </span>
                  <span className="text-[10px] font-mono text-blue-400">
                    {report?.resolvedAt
                      ? new Date(report.resolvedAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION OVERRIDE BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleUpdateStatus("validated")}
              className="flex items-center justify-center gap-3 py-6 bg-emerald-500 hover:bg-emerald-600 text-[#0f172a] rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle size={18} /> Deploy_Validation
            </button>
            <button
              onClick={() => handleUpdateStatus("pending")}
              className="flex items-center justify-center gap-3 py-6 bg-transparent border-2 border-red-500/50 hover:border-red-500 text-red-500 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all"
            >
              <XCircle size={18} /> Flag_As_Insufficient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// COMPONENT: TECH DETAIL ITEM
const DetailItem = ({ label, value, isLocation }) => (
  <div className="border-l-2 border-slate-700 pl-4 py-1">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter block mb-1">
      {label}
    </label>
    <div className="flex items-center gap-2">
      {isLocation && <MapPin size={12} className="text-blue-500" />}
      <p className="text-sm font-bold text-white tracking-tight">
        {value || "NULL_DATA"}
      </p>
    </div>
  </div>
);

export default ReviewWorkEvidence;
