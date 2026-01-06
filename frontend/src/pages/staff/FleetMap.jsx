import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const FleetMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-white text-slate-900 font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Custom Styles for Map Animations */}
      <style>{`
        .map-viewport {
            background-color: #f1f5f9;
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 30px 30px;
            border-radius: 3rem;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 2px 20px rgba(0,0,0,0.05);
        }
        .route-path {
            stroke-dasharray: 10;
            animation: flow 30s linear infinite;
        }
        @keyframes flow { to { stroke-dashoffset: -1000; } }
        .pulse-red { animation: pulse-red 2s infinite; }
        @keyframes pulse-red {
            0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(220, 38, 38, 0); }
            100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-slate-900 tracking-tighter">
            EcoClean
          </span>
          <span className="bg-blue-600 text-[10px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
            Staff
          </span>
        </div>

        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Menu
            className={`h-6 w-6 text-slate-600 transition-transform ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </nav>

      {/* Side Menu Drawer */}
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
        />
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
              <X className="h-6 w-6" />
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
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
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
                <a
                  href="/staff/analytics"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Analytics
                </a>
                <a
                  href="/staff/settings"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Staff Settings
                </a>

                <a
                  href="/staff/support"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>

          <button className="mt-auto border-t border-slate-100 pt-6 flex items-center gap-3 p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors">
            Logout System
          </button>
        </div>
      </div>

      <main className="flex-grow p-4 md:p-8 flex flex-col gap-6 max-w-7xl w-full mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Active Fleet Map
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Live updates for{" "}
              <span className="text-blue-600">Sector 4 & 9</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                12 Units Live
              </span>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col lg:flex-row gap-6 overflow-hidden">
          {/* Interactive Map Viewport */}
          <div className="flex-[2] map-viewport border border-slate-200">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                className="route-path"
                d="M150,500 L400,300 L700,450 L900,200"
                fill="none"
                stroke="#3b82f6"
                stroke-width="6"
                stroke-linecap="round"
              />
            </svg>

            {/* Map Markers */}
            <div className="absolute top-[35%] left-[38%] group cursor-pointer">
              <div className="bg-red-600 text-white px-4 py-2 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl pulse-red">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                High: Biohazard
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-600 mx-auto -mt-0.5"></div>
            </div>

            <div className="absolute top-[55%] left-[65%] group cursor-pointer">
              <div className="bg-amber-500 text-white px-4 py-2 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl">
                Medium: Overflow
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-amber-500 mx-auto -mt-0.5"></div>
            </div>

            <div className="absolute top-[20%] left-[80%] group cursor-pointer">
              <div className="bg-slate-800 text-white px-4 py-2 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-lg">
                Low: Routine
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-800 mx-auto -mt-0.5"></div>
            </div>
          </div>

          {/* Sidebar Route Info */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 no-scrollbar">
            <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-6">
                Optimized Best Route
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                      01
                    </div>
                    <div className="w-px h-10 bg-blue-200 my-1"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800">
                      Sector 9 Center
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Pickup • 2.4km
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">
                      02
                    </div>
                    <div className="w-px h-10 bg-slate-200 my-1"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800">
                      Old Town Junction
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Disposal • 5.1km
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">
                      03
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800">
                      Main Depot
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Finish • 12km
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    Est. Completion
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    42 Mins
                  </span>
                </div>
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                  Confirm Route
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FleetMap;
