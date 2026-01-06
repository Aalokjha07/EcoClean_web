import React, { useState } from "react";
import { Link } from "react-router-dom";

const StaffAnalytics = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white font-['Plus_Jakarta_Sans'] text-[#0f172a] overflow-x-hidden min-h-screen">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                
                /* Chart Bar Animations */
                @keyframes growUp {
                    from { height: 0; }
                    to { height: var(--target-height); }
                }
                .bar-grow { animation: growUp 1s ease-out forwards; }

                .no-scrollbar::-webkit-scrollbar { display: none; }
                
                .analytic-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                .analytic-card:hover {
                    transform: translateY(-5px);
                    border-color: #3b82f6;
                    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.05);
                }
            `}</style>

      {/* Navigation - Kept Exactly Same with Notification Bell */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-extrabold text-slate-900 tracking-tighter">
              EcoClean
            </span>
          </div>
          <span className="bg-blue-600 text-[10px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
            Staff
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2.5 hover:bg-slate-50 rounded-xl relative group transition-colors">
            <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-2.5 right-2.5 border-2 border-white animate-pulse"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-400 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button
            onClick={toggleMenu}
            className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors group"
          >
            <svg
              className={`h-6 w-6 text-slate-400 group-hover:text-slate-900 transition-transform ${
                isMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Side Menu Drawer - Routes updated as requested */}
      <div
        className={`fixed inset-0 z-[60] ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={toggleMenu}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-extrabold text-lg text-slate-800">Menu</h2>
            <button
              onClick={toggleMenu}
              className="text-slate-400 hover:text-slate-600"
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Operations
              </p>
              <div className="space-y-1">
                <Link
                  to="/staff"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/staff/active-tasks"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Active Tasks
                </Link>
                <Link
                  to="/staff/my-fixes"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  My Fixes
                </Link>
                <Link
                  to="/staff/fleet-map"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Fleet Map
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Management
              </p>
              <div className="space-y-1">
                <Link
                  to="/staff/analytics"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
                >
                  Analytics
                </Link>
                <Link
                  to="/staff/settings"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Staff Settings
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>

          <button className="mt-auto border-t border-slate-100 pt-6 flex items-center gap-3 p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout System
          </button>
        </div>
      </div>

      <main className="p-6 w-full max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-start px-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Performance
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Weekly Insights • <span className="text-blue-600">Live</span>
            </p>
          </div>
          <div className="bg-slate-900 text-white p-3 rounded-2xl text-center min-w-[60px]">
            <p className="text-[8px] font-black uppercase tracking-tighter text-blue-400">
              Score
            </p>
            <p className="text-lg font-black leading-tight">94</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 analytic-card">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Task Completion
            </h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              +12% vs LW
            </span>
          </div>

          <div className="flex items-end justify-between h-32 px-2 gap-2">
            {/* Bar charts with CSS variables for animation */}
            {[
              { label: "Mon", h: "40%", color: "bg-slate-200" },
              { label: "Tue", h: "65%", color: "bg-slate-200" },
              {
                label: "Wed",
                h: "90%",
                color: "bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
              },
              { label: "Thu", h: "55%", color: "bg-slate-200" },
              { label: "Fri", h: "75%", color: "bg-slate-200" },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-slate-50 rounded-t-lg relative flex items-end h-full">
                  <div
                    className={`w-full rounded-t-lg bar-grow ${bar.color}`}
                    style={{ height: bar.h, "--target-height": bar.h }}
                  ></div>
                </div>
                <span
                  className={`text-[8px] font-black uppercase ${
                    bar.label === "Wed" ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 analytic-card">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Avg Resolution
            </p>
            <h4 className="text-xl font-black text-slate-900">
              18<span className="text-xs ml-0.5 font-bold">min</span>
            </h4>
            <div className="mt-3 flex items-center gap-1">
              <span className="text-[8px] font-bold text-green-500">
                ↓ 4m faster
              </span>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 analytic-card">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Waste Collected
            </p>
            <h4 className="text-xl font-black text-slate-900">
              1.2<span className="text-xs ml-0.5 font-bold">tons</span>
            </h4>
            <div className="mt-3 flex items-center gap-1">
              <span className="text-[8px] font-bold text-blue-500">
                Target reached
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
            Sector Ranking
          </h3>
          <div className="bg-white p-4 rounded-[2rem] border border-slate-100 flex items-center justify-between analytic-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-100">
                01
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Sector 9 (Active)
                </h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                  98% Coverage
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center">
              <span className="text-green-500 text-[10px]">▲</span>
            </div>
          </div>
        </div>

        <button className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-xl hover:bg-blue-600 active:scale-95 transition-all text-[10px] uppercase tracking-[0.2em]">
          Download Full Report (PDF)
        </button>
      </main>
    </div>
  );
};

export default StaffAnalytics;
