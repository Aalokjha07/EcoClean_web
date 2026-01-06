import React, { useState } from "react";

const ProcessedReports = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const reports = [
    {
      id: "REP-9921",
      location: "Oak Street",
      type: "Bin Overflow",
      priority: "High Priority",
      priorityClass: "bg-red-100 text-red-600",
      details:
        "Waste bins overflowing near the downtown district. Poses a pedestrian obstruction.",
      assignee: "Unassigned",
      status: "Pending",
      statusClass: "text-orange-500",
      icon: (
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      id: "REP-9918",
      location: "Industrial Pk.",
      type: "Hazardous",
      priority: "Medium Priority",
      priorityClass: "bg-orange-100 text-orange-600",
      details:
        "Spilled chemicals reported in Plot 22. Hazardous material team notified.",
      assignee: "Marcus Riley",
      status: "In Review",
      statusClass: "text-blue-600",
      icon: (
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
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
        .report-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .report-card:hover { 
            border-color: #7c3aed; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1); 
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
            <p className="text-xs font-bold text-purple-600 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
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
                  className="flex items-center gap-3 p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold text-sm"
                >
                  Processed Reports
                </a>
                <a
                  href="/admin/fixed-reports"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Processed Reports
            </h1>
            <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mt-1">
              Incoming Reports Requiring Dispatch
            </p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="report-card p-8 rounded-[2.5rem] flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                    {report.icon}
                  </div>
                  <span
                    className={`px-3 py-1 ${report.priorityClass} text-[10px] font-black rounded-lg uppercase tracking-wider`}
                  >
                    {report.priority}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">
                    {report.id} - {report.location}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-black text-purple-600 uppercase bg-purple-50 px-2 py-0.5 rounded-md">
                      Type: {report.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Details
                    </p>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      {report.details}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Assignee
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {report.assignee}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Status
                      </p>
                      <p className={`text-xs font-bold ${report.statusClass}`}>
                        {report.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-purple-50 flex gap-3">
                  <button className="flex-grow flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-xl font-black text-[10px] uppercase hover:bg-purple-700 transition-all shadow-lg shadow-purple-100">
                    View Progress
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

export default ProcessedReports;
