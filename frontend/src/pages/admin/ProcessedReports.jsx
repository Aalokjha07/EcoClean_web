import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ProcessedReports = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchProcessedReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/Reports");
        const data = await response.json();
        const processedOnly = data.filter(
          (report) => report.status === "Resolved"
        );
        setReports(processedOnly);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProcessedReports();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#f5f3ff] overflow-hidden font-['Plus_Jakarta_Sans']">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .drawer-backdrop { transition: opacity 0.3s ease; }
        .report-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .report-card:hover { 
            border-color: #7c3aed; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1); 
        }
      `}</style>

      {/* TOP NAVIGATION BAR */}
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

        {/* Updated Hamburger Trigger */}
        <button
          onClick={toggleMenu}
          className="p-3 hover:bg-purple-50 rounded-2xl border border-purple-100 transition-all text-purple-600"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* SIDE MENU DRAWER */}
      <div className={`fixed inset-0 z-[60] ${isMenuOpen ? "" : "invisible"}`}>
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
                <Link
                  to="/admin"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Main Overview
                </Link>
                <Link
                  to="/admin/active-reports"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Active Reports
                </Link>
                <Link
                  to="/admin/processed-reports"
                  className="flex items-center gap-3 p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold text-sm"
                >
                  Processed Reports
                </Link>
                <Link
                  to="/admin/fixed-reports"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Fixed Reports
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Management
              </p>
              <div className="space-y-1">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Staff Directory
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Fleet Tracking
                </a>
              </div>
            </div>
          </div>

          <button className="mt-auto border-t border-purple-50 pt-6 flex items-center gap-3 p-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl hover:bg-red-100 transition-all">
            Logout System
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Processed Reports
          </h1>
          <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mt-1">
            Reports Completed by Staff & Ready for Final Review
          </p>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-purple-100">
              <p className="text-slate-400 font-bold">
                No resolved reports found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="report-card p-8 rounded-[2.5rem] flex flex-col"
                >
                  {/* Card content matches your previous design */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
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
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-lg uppercase">
                      Resolved
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                    {report.subject}
                  </h3>
                  <p className="text-slate-400 text-xs font-bold mt-1 mb-6">
                    {report.address}
                  </p>
                  <p className="text-slate-400 text-xs font-bold mt-1 mb-6">
                    {report.assignedStaff}
                  </p>

                  <div className="mt-auto pt-6 border-t border-purple-50 flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/staff/review-work/${report._id}`)
                      }
                      className="flex-grow py-3 bg-purple-600 text-white rounded-xl font-black text-[10px] uppercase hover:bg-purple-700 transition-all shadow-lg"
                    >
                      Review Work Evidence
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

export default ProcessedReports;
