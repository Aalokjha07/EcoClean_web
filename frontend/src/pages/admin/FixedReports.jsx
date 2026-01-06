import React, { useState } from "react";

const FixedReports = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fixedReportsData = [
    {
      id: "REP-8842",
      district: "Pine District",
      issue: "Illegal Dumping",
      resolution:
        "Site cleared by Team Beta. 400kg of debris removed. Area sanitized.",
      resolvedBy: "Sarah Chen",
      date: "Oct 24, 2025",
    },
    {
      id: "REP-8790",
      district: "Sector 2",
      issue: "Graffiti Removal",
      resolution:
        "Power washed exterior wall of substation. Anti-graffiti coating applied.",
      resolvedBy: "David Low",
      date: "Oct 22, 2025",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#f5f3ff] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: #ffffff; }
        .drawer-backdrop { transition: opacity 0.3s ease; }

        .fixed-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .fixed-card:hover { 
            border-color: #10b981; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1); 
        }

        .img-placeholder {
            background: linear-gradient(45deg, #f8fafc 25%, #f1f5f9 25%, #f1f5f9 50%, #f8fafc 50%, #f8fafc 75%, #f1f5f9 75%, #f1f5f9 100%);
            background-size: 20px 20px;
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

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right border-r border-purple-50 pr-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              System Health
            </p>
            <p className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
              Optimized
            </p>
          </div>
          <button
            onClick={toggleMenu}
            className="p-3 hover:bg-purple-50 rounded-2xl border border-purple-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Side Menu Drawer */}
      <div
        className={`fixed inset-0 z-[60] ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={toggleMenu}
          className={`drawer-backdrop absolute inset-0 bg-purple-950/20 backdrop-blur-sm ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`drawer-content absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl p-8 flex flex-col transform ${
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Fixed Reports
            </h1>
            <p className="text-emerald-500 text-sm font-bold uppercase tracking-widest mt-1">
              Archived Success & Resolutions
            </p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixedReportsData.map((report, index) => (
              <div
                key={index}
                className="fixed-card p-8 rounded-[2.5rem] flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
                    Resolved
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">
                    #{report.id} - {report.district}
                  </h3>
                  <p className="text-emerald-600 text-[10px] font-black uppercase mt-1">
                    Issue: {report.issue}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="aspect-video rounded-xl img-placeholder border border-slate-100 flex items-center justify-center relative overflow-hidden">
                    <span className="absolute top-1 left-2 text-[8px] font-black text-slate-400 uppercase">
                      Before
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="aspect-video rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center relative overflow-hidden">
                    <span className="absolute top-1 left-2 text-[8px] font-black text-emerald-400 uppercase">
                      After
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">
                      Resolution Summary
                    </p>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                      "{report.resolution}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Resolved By
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {report.resolvedBy}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Date
                      </p>
                      <p className="text-xs font-bold text-slate-500">
                        {report.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex gap-3">
                  <button className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                    Full History
                  </button>
                  <button className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FixedReports;
