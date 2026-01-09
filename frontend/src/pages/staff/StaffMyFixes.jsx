import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const StaffMyFixes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fixes, setFixes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- FETCH VALIDATED REPORTS ---
  useEffect(() => {
    const fetchMyFixes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/Reports");
        const data = await response.json();

        // Filter for "validated" status
        const validatedReports = data.filter(
          (report) => report.status?.toLowerCase() === "validated"
        );

        setFixes(validatedReports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fixes:", error);
        setLoading(false);
      }
    };

    fetchMyFixes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pb-10 bg-white text-slate-900 font-['Plus_Jakarta_Sans']">
      <style>{`
        .stat-card-hover:hover {
            background-color: #0f172a !important;
            transform: translateY(-5px);
            border-color: #2563eb;
        }
        .stat-card-hover:hover h4, 
        .stat-card-hover:hover p,
        .stat-card-hover:hover span {
            color: #3b82f6 !important;
        }
        @keyframes pulse-blue {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.3); }
        }
        .pulse-blue { animation: pulse-blue 2s infinite; }
      `}</style>

      {/* TOP NAVBAR */}
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

      {/* SIDE MENU DRAWER */}
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
                <a
                  href="/staff"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Dashboard
                </a>
                <a
                  href="/staff/active-tasks"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Active Tasks
                </a>
                <a
                  href="/staff/my-fixes"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
                >
                  My Fixes
                </a>
                <a
                  href="/staff/fleet-map"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Fleet Map
                </a>
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

      {/* MAIN CONTENT */}
      <main className="p-6 w-full max-w-md space-y-6">
        <div className="px-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Performance History 🏆
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Reviewing fixes for{" "}
            <span className="text-blue-600">Officer Jha</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card-hover bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all duration-400">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors">
              Verified Fixes
            </p>
            <h4 className="text-4xl font-extrabold text-slate-900 mt-1 transition-colors">
              {fixes.length}
            </h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full pulse-blue"></span>
              <span className="text-[9px] font-bold text-blue-600 uppercase transition-colors">
                Archive
              </span>
            </div>
          </div>

          <div className="stat-card-hover bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all duration-400">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors">
              Avg Rating
            </p>
            <h4 className="text-4xl font-extrabold text-slate-900 mt-1 transition-colors">
              4.9
            </h4>
            <div className="mt-3">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter transition-colors">
                Excellent
              </span>
            </div>
          </div>
        </div>

        {/* Validated List */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Recent Validations
            </h3>
            <button className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px] animate-pulse">
                Fetching records...
              </div>
            ) : fixes.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-2 border-dashed border-slate-50 rounded-[2.5rem]">
                No validated tasks found
              </div>
            ) : (
              fixes.map((fix) => (
                <div
                  key={fix._id}
                  className="bg-white p-5 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    ✅
                  </div>
                  <div className="flex-grow truncate">
                    <h4 className="text-sm font-bold text-slate-800 truncate">
                      {fix.subject}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                      {fix.address?.split(",")[0]} •{" "}
                      {new Date(fix.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-900">
                      +$15.50
                    </span>
                    <p className="text-[8px] font-bold uppercase text-green-600">
                      Verified
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffMyFixes;
