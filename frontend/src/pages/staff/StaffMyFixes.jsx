import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const StaffMyFixes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fixes = [
    {
      id: 1,
      title: "Chemical Waste Cleanup",
      location: "Sector 9",
      time: "02:45 PM",
      amount: "+$12.00",
      status: "Verified",
      icon: "✅",
      isPending: false,
    },
    {
      id: 2,
      title: "Biohazard Disposal",
      location: "Sector 4",
      time: "11:20 AM",
      amount: "+$15.50",
      status: "Verified",
      icon: "✅",
      isPending: false,
    },
    {
      id: 3,
      title: "Industrial Spill",
      location: "Sector 2",
      time: "09:15 AM",
      amount: "Pending",
      status: "Auditing",
      icon: "⏳",
      isPending: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center pb-10 bg-white text-slate-900 font-['Plus_Jakarta_Sans']">
      {/* Inline Styles for custom animations/hovers */}
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

      {/* Navigation */}
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
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
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
            <LogOut className="h-5 w-5" />
            Logout System
          </button>
        </div>
      </div>

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

        <div className="grid grid-cols-2 gap-4">
          {/* Monthly Total Card */}
          <div className="stat-card-hover bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all duration-400 ease-in-out">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors">
              Monthly Total
            </p>
            <h4 className="text-4xl font-extrabold text-slate-900 mt-1 transition-colors">
              142
            </h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full pulse-blue"></span>
              <span className="text-[9px] font-bold text-blue-600 uppercase transition-colors">
                Top 5%
              </span>
            </div>
          </div>

          {/* Avg Rating Card */}
          <div className="stat-card-hover bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all duration-400 ease-in-out">
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

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Recent Fixes
            </h3>
            <button className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {fixes.map((fix) => (
              <div
                key={fix.id}
                className="bg-white p-5 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 ${
                    fix.isPending ? "bg-blue-50" : "bg-green-50"
                  } rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}
                >
                  {fix.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-slate-800">
                    {fix.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                    {fix.location} • {fix.time}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-black ${
                      fix.isPending ? "text-slate-400" : "text-slate-900"
                    }`}
                  >
                    {fix.amount}
                  </span>
                  <p
                    className={`text-[8px] font-bold uppercase ${
                      fix.isPending ? "text-blue-400" : "text-green-600"
                    }`}
                  >
                    {fix.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffMyFixes;
