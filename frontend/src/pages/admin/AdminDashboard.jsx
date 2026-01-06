import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- SPACE FOR API DATA ---
  // To satisfy the "managing state" requirement, we put the data in state.
  // You can replace these initial values with data from a fetch() call.
  const [stats, setStats] = useState({
    totalCollection: "124.5",
    activeStaff: "48 / 52",
    fuelCost: "$2,140",
    revenue: "$12,480",
  });

  const [activeReports, setActiveReports] = useState([
    {
      id: 1,
      title: "Overflow: Sector 9",
      priority: "High Priority",
      time: "5m ago",
    },
  ]);

  const [processedReports, setProcessedReports] = useState([
    {
      id: 1,
      unit: "Unit #14 - Downtown",
      status: "Collection in progress",
      progress: "65%",
    },
  ]);

  const [fixedReports, setFixedReports] = useState([
    {
      id: 1,
      title: "Truck #02 - Brake Fix",
      status: "Resolved 1h ago",
      log: "#8824",
    },
  ]);
  // ---------------------------

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-portal-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background-color: #f5f3ff; 
            overflow: hidden; 
            height: 100vh; 
            display: flex; 
            flex-direction: column; 
            margin: 0;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: #ffffff; }
        .drawer-backdrop { transition: opacity 0.3s ease; }

        .report-item { transition: all 0.2s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .report-item:hover { 
            border-color: #7c3aed; 
            transform: translateY(-2px); 
            box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.1); 
        }
      `}</style>

      {/* NAVBAR: Exact same as your HTML */}
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
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>{" "}
              Active
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

      {/* SIDE MENU: Using React state for the transitions */}
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
                  className="flex items-center gap-3 p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold text-sm"
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
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
                >
                  Fixed Reports
                </a>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Management
              </p>
              <div className="space-y-1">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
                >
                  Staff Directory
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
                >
                  Fleet Tracking
                </a>
              </div>
            </div>
          </div>
          <button className="mt-auto border-t border-purple-50 pt-6 flex items-center gap-3 p-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl hover:bg-red-100">
            Logout System
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-grow p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Admin Overview
            </h1>
            <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mt-1">
              Real-time Analytics & Fleet Management
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-purple-100 text-purple-700 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-purple-50 transition-colors">
              Generate Report
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-purple-100 hover:bg-purple-700 transition-colors">
              Add New Unit
            </button>
          </div>
        </div>

        {/* Stats Grid using State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
          <div className="bg-white p-6 rounded-[2.5rem] border border-purple-50 shadow-sm">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Total Collection
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.totalCollection}{" "}
              <span className="text-sm text-slate-400">Tons</span>
            </h3>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-purple-50 shadow-sm">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Active Staff
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.activeStaff}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-purple-50 shadow-sm">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Fleet Fuel Cost
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.fuelCost}
            </h3>
          </div>
          <div className="bg-purple-600 p-6 rounded-[2.5rem] shadow-xl shadow-purple-200/50">
            <p className="text-[11px] font-black text-purple-100 uppercase tracking-widest">
              Revenue Today
            </p>
            <h3 className="text-3xl font-black text-white mt-2">
              {stats.revenue}
            </h3>
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden pb-4">
          {/* Active Reports List */}
          <div className="bg-white rounded-[3rem] border border-purple-100 p-8 flex flex-col overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">
                Active Reports
              </h3>
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></span>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {activeReports.map((report) => (
                <div key={report.id} className="report-item p-5 rounded-3xl">
                  <h4 className="text-sm font-extrabold text-slate-800">
                    {report.title}
                  </h4>
                  <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
                    {report.priority}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      Reported {report.time}
                    </span>
                    <button className="text-[10px] bg-purple-600 text-white px-3 py-1.5 rounded-lg font-black uppercase hover:bg-purple-700 transition-colors">
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processed Reports List */}
          <div className="bg-white rounded-[3rem] border border-purple-100 p-8 flex flex-col overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">
                Processed
              </h3>
              <span className="bg-purple-100 text-purple-600 text-[9px] font-black px-2 py-1 rounded-md uppercase">
                In Motion
              </span>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {processedReports.map((report) => (
                <div key={report.id} className="report-item p-5 rounded-3xl">
                  <h4 className="text-sm font-extrabold text-slate-800">
                    {report.unit}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                    {report.status}
                  </p>
                  <div className="mt-4 w-full bg-purple-50 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full shadow-[0_0_8px_rgba(147,51,234,0.3)] transition-all duration-500"
                      style={{ width: report.progress }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Reports List */}
          <div className="bg-purple-700 rounded-[3rem] p-8 flex flex-col overflow-hidden shadow-2xl shadow-purple-200">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h3 className="font-extrabold text-white text-xl tracking-tight">
                Fixed Reports
              </h3>
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {fixedReports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 bg-white/10 border border-white/10 rounded-3xl"
                >
                  <h4 className="text-sm font-extrabold text-white">
                    {report.title}
                  </h4>
                  <p className="text-[10px] text-purple-200 font-bold uppercase mt-1 tracking-widest">
                    {report.status}
                  </p>
                  <p className="text-[10px] text-purple-300 mt-2 font-medium">
                    Maintenance log {report.log} updated.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
