import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Trash2, History, CheckCircle, Menu, X } from "lucide-react";

const FixedReports = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchValidatedData = async () => {
      try {
        const reportRes = await fetch("http://localhost:3000/api/Reports");
        const allReports = await reportRes.json();

        // STRICT FILTER: Only show reports validated by the admin
        // Note: Using lowercase 'validated' to match the handleUpdateStatus logic
        const validatedOnly = allReports.filter(
          (r) => r.status === "validated" || r.status === "Validated"
        );

        setReports(validatedOnly);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchValidatedData();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x300?text=No+Image";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:"))
      return imagePath;

    const BACKEND_URL = "http://localhost:3000";
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `${BACKEND_URL}/${cleanPath}`;
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f3ff]">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-[#f5f3ff] overflow-hidden font-['Plus_Jakarta_Sans']">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: #ffffff; }
        .drawer-backdrop { transition: opacity 0.3s ease; }
        .fixed-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .fixed-card:hover { 
            border-color: #10b981; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1); 
        }
      `}</style>

      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-purple-100 px-8 py-4 flex justify-between items-center z-50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-200">
            E
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tighter block leading-none">
              EcoClean
            </span>
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
              Admin Control
            </span>
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="p-3 hover:bg-purple-50 rounded-2xl border border-purple-100 transition-all"
        >
          <Menu className="h-6 w-6 text-purple-600" />
        </button>
      </nav>

      {/* SIDE MENU DRAWER */}
      <div
        id="sideMenu"
        className={`fixed inset-0 z-[60] ${isMenuOpen ? "" : "invisible"}`}
      >
        <div
          onClick={toggleMenu}
          className={`drawer-backdrop absolute inset-0 bg-purple-950/20 backdrop-blur-sm ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`drawer-content absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl p-8 flex flex-col ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-extrabold text-xl text-slate-800">
              Admin Menu
            </h2>
            <button
              onClick={toggleMenu}
              className="text-purple-400 hover:text-purple-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-8 flex-grow">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-4 ml-2">
                Dashboard
              </p>
              <div className="space-y-1">
                <a
                  href="/admin"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
                >
                  Main Overview
                </a>
                <a
                  href="/admin/active-reports"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
                >
                  Active Reports
                </a>
                <a
                  href="/admin/processed-reports"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
                >
                  Processed Reports
                </a>
                <a
                  href="/admin/fixed-reports"
                  className="flex items-center gap-3 p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold text-sm"
                >
                  Fixed Reports
                </a>
              </div>
            </div>
          </div>
          <button className="mt-auto border-t border-purple-50 pt-6 flex items-center gap-3 p-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl hover:bg-red-100">
            Logout System
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
        <div className="shrink-0">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Fixed Reports
          </h1>
          <p className="text-emerald-500 text-sm font-bold uppercase tracking-widest mt-1">
            Archived Success & Resolutions ({reports.length})
          </p>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
          {reports.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">
              <History size={48} className="mb-4 opacity-20" />
              <p className="font-bold uppercase tracking-widest text-xs">
                No validated reports found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="fixed-card p-8 rounded-[2.5rem] flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <CheckCircle size={24} />
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg uppercase tracking-wider border border-emerald-100">
                      Validated
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight uppercase truncate">
                      {report.subject}
                    </h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mt-1 flex items-center gap-1">
                      ID: {report._id.slice(-8)} •{" "}
                      {report.address?.split(",")[0]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                      <img
                        src={getImageUrl(report.image || report.imageBefore)}
                        className="w-full h-full object-cover opacity-60 grayscale"
                        alt="Initial"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/50 text-[8px] text-white px-2 py-0.5 rounded font-black uppercase">
                        Initial
                      </span>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50">
                      <img
                        src={getImageUrl(report.imageAfter)}
                        className="w-full h-full object-cover"
                        alt="Fixed"
                      />
                      <span className="absolute bottom-2 left-2 bg-emerald-600 text-[8px] text-white px-2 py-0.5 rounded font-black uppercase">
                        Fixed
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50 mb-6">
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">
                      Staff Resolution Notes
                    </p>
                    <p className="text-xs text-slate-600 font-semibold italic line-clamp-2">
                      "
                      {report.staffNotes ||
                        "Cleanup verified and archived by administration."}
                      "
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/review/${report._id}`)}
                      className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                      <History size={14} /> View Audit
                    </button>
                    <button className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FixedReports;
