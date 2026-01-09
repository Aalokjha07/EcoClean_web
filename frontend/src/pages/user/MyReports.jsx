import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { X, MapPin, Clock, Info } from "lucide-react"; // Added icons for the popup

export default function MyReports() {
  const [filter, setFilter] = useState("All");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the Detail Popup
  const [selectedReport, setSelectedReport] = useState(null);

  const SERVER_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/Reports`);
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Helper to fix the image loading issue
  const getFullUrl = (path) => {
    if (!path) return "https://via.placeholder.com/600x400?text=No+Image";
    if (path.startsWith("blob:") || path.startsWith("http")) return path;
    const cleanPath = path.replace(/^\/+/, "");
    return `${SERVER_URL}/uploads/${cleanPath}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await fetch(`${SERVER_URL}/api/Report/${id}`, { method: "DELETE" });
        setReports(reports.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const filteredReports = reports.filter(
    (report) => filter === "All" || report.status === filter
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#f5f3ff] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .report-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .report-card:hover { 
            border-color: #7c3aed; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1); 
        }
      `}</style>

      <Navbar title="My Reports" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "pending", "Resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`${
                filter === tab
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-500"
              } px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-slate-500 font-bold">
              Loading Reports...
            </p>
          ) : filteredReports.length === 0 ? (
            <p className="text-center text-slate-500">No reports found.</p>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report._id}
                className="report-card p-6 rounded-[2.5rem] flex flex-col"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  {/* Subject - Takes up remaining space and truncates if too long */}
                  <h3 className="text-lg font-extrabold text-slate-800 tracking-tight truncate">
                    {report.subject}
                  </h3>

                  {/* Status Badge - Fixed width, high visibility */}
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border ${
                      report.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : report.status === "validated"
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Image Preview - FIXED FOR BASE64 AND PATHS */}

                <div className="aspect-video rounded-3xl overflow-hidden mb-6 border border-slate-100 bg-slate-100">
                  <img
                    src={
                      report.imageBefore?.startsWith("data:")
                        ? report.imageBefore
                        : getFullUrl(report.imageBefore || report.image)
                    }
                    className="w-full h-full object-cover"
                    alt="report preview"
                    onError={(e) => {
                      // Fallback if the primary image fails
                      if (report.imageAfter?.startsWith("data:")) {
                        e.target.src = report.imageAfter;
                      } else {
                        e.target.src =
                          "https://via.placeholder.com/600x400?text=Image+Not+Found";
                      }
                    }}
                  />
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex gap-3">
                  {/* </div>
                <div> */}
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase transition-all active:scale-95"
                  >
                    View Full Detail
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* --- DETAIL POPUP (MODAL) --- */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-300">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-all"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    selectedReport.status === "Resolved"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {selectedReport.status}
                </span>
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-6">
                {selectedReport.subject}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Address
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {selectedReport.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Reported On
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {new Date(selectedReport.createdAt).toLocaleDateString(
                        undefined,
                        { dateStyle: "long" }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-slate-100 text-slate-600 rounded-lg">
                    <Info size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Full Description
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "
                      {selectedReport.description || "No description provided."}
                      "
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-800 transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
