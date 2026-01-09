import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- DYNAMIC STATE ---
  const [stats, setStats] = useState({
    totalReports: "0",
    activeStaff: "48 / 52",
    pendingCount: "0",
    revenue: "$0",
  });

  const [activeReports, setActiveReports] = useState([]);
  const [processedReports, setProcessedReports] = useState([]); // Filtered for "Resolved"
  const [fixedReports, setFixedReports] = useState([]);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/Reports");
        const data = await response.json();

        // Status Logic - Case Insensitive to handle "Pending" vs "pending"
        const pending = data.filter(
          (r) => r.status?.toLowerCase() === "pending" || !r.status
        );
        const resolved = data.filter(
          (r) => r.status?.toLowerCase() === "resolved"
        );
        const validated = data.filter(
          (r) => r.status?.toLowerCase() === "validated"
        );

        setActiveReports(pending);
        setProcessedReports(resolved);
        setFixedReports(validated);

        setStats({
          totalReports: data.length.toString(),
          activeStaff: "48 / 52",
          pendingCount: pending.length.toString(),
          // Business logic: $150 per validated report + $50 for pending ones
          revenue: `$${validated.length * 150 + pending.length * 50}`,
        });

        setLoading(false);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="admin-portal-container min-h-screen bg-[#f5f3ff] font-['Plus_Jakarta_Sans'] relative overflow-x-hidden">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
          .dashboard-grid-container { height: calc(100vh - 250px); min-height: 500px; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .drawer-content { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          .drawer-backdrop { transition: opacity 0.4s ease; }
          .report-item { transition: all 0.2s ease; border: 1px solid #ede9fe; background: #ffffff; cursor: pointer; }
          .report-item:hover { border-color: #7c3aed; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.1); }
        `}</style>

      {/* NAVBAR */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 px-8 py-4 flex justify-between items-center z-50">
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
          className="p-3 hover:bg-purple-50 rounded-2xl border border-purple-100 transition-colors"
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
      </nav>

      {/* SIDE MENU OVERLAY - UNCHANGED */}
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
          <div className="space-y-8 flex-grow overflow-y-auto no-scrollbar">
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
          <button className="mt-auto border-t border-purple-50 pt-6 flex items-center gap-3 p-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
            Logout System
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="p-6 md:p-10 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Admin Overview
            </h1>
            <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mt-1">
              Status: Live Tracking
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Last Update
            </p>
            <p className="text-sm font-bold text-slate-900">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Reports" value={stats.totalReports} />
          <StatCard label="Active Staff" value={stats.activeStaff} />
          <StatCard
            label="Pending"
            value={stats.pendingCount}
            textColor="text-red-600"
          />
          <StatCard label="Revenue" value={stats.revenue} dark />
        </div>

        {/* 3 Column Dashboard Grid */}
        <div className="dashboard-grid-container grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active (Pending) */}
          <section className="bg-white rounded-[3rem] border border-purple-100 p-8 flex flex-col overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
                Active{" "}
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </h3>
              <span className="bg-red-50 text-red-600 text-xs font-black px-3 py-1 rounded-xl">
                {activeReports.length} Reports
              </span>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {activeReports.map((report) => (
                <div
                  key={report._id}
                  className="report-item p-5 rounded-3xl flex justify-between items-center group"
                >
                  <div className="truncate pr-4">
                    <h4 className="text-sm font-extrabold text-slate-800 uppercase truncate">
                      {report.subject}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      {report.address?.split(",")[0] || "Unknown Location"}
                    </p>
                  </div>
                  <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg uppercase whitespace-nowrap">
                    New
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Processed (Resolved) */}
          <section className="bg-white rounded-[3rem] border border-purple-100 p-8 flex flex-col overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 text-xl">
                Processed
              </h3>
              <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-xl">
                {processedReports.length} Ready
              </span>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {processedReports.map((report) => (
                <div
                  key={report._id}
                  className="report-item p-5 rounded-3xl border-l-4 border-l-green-400"
                >
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase truncate">
                    {report.subject}
                  </h4>
                  <div className="mt-4 w-full bg-green-50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[100%]"></div>
                  </div>
                  <p className="text-[9px] text-green-600 font-bold mt-2 uppercase tracking-tighter">
                    Ready for Validation
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Fixed (Validated) */}
          <section className="bg-purple-700 rounded-[3rem] p-8 flex flex-col overflow-hidden shadow-2xl text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-xl">Fixed Reports</h3>
              <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-xl backdrop-blur-md">
                {fixedReports.length} Done
              </span>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {fixedReports.map((report) => (
                <div
                  key={report._id}
                  className="p-5 bg-white/10 border border-white/5 rounded-3xl hover:bg-white/20 transition-colors cursor-default"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-extrabold uppercase truncate pr-2">
                      {report.subject}
                    </h4>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-400 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] text-purple-200 font-bold uppercase mt-1">
                    Verification Complete
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({
  label,
  value,
  textColor = "text-slate-900",
  dark = false,
}) => (
  <div
    className={`${
      dark ? "bg-purple-600" : "bg-white border border-purple-50"
    } p-6 rounded-[2.5rem] shadow-sm`}
  >
    <p
      className={`text-[11px] font-black uppercase tracking-widest ${
        dark ? "text-purple-100" : "text-slate-400"
      }`}
    >
      {label}
    </p>
    <h3
      className={`text-3xl font-black mt-2 ${dark ? "text-white" : textColor}`}
    >
      {value}
    </h3>
  </div>
);

export default AdminDashboard;
