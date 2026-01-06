import React, { useState } from "react";
import { Link } from "react-router-dom";

const StaffSettings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-['Plus_Jakarta_Sans'] text-[#0f172a] overflow-hidden">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
                
                .no-scrollbar::-webkit-scrollbar { display: none; }
                
                .input-focus:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
                }

                .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .drawer-backdrop { transition: opacity 0.3s ease; }
            `}</style>

      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-50 shrink-0">
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
          className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <svg
            className={`h-6 w-6 text-slate-600 transition-transform ${
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
      </nav>

      {/* Side Menu Drawer */}
      <div
        className={`fixed inset-0 z-[60] ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={toggleMenu}
          className={`drawer-backdrop absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`drawer-content absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col transition-transform duration-300 transform ${
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
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  to="/staff/active-tasks"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm"
                >
                  Active Tasks
                </Link>
                <Link
                  to="/staff/my-fixes"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm"
                >
                  My Fixes
                </Link>
                <Link
                  to="/staff/fleet-map"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm"
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
                <Link
                  to="/staff/settings"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
                >
                  Staff Settings
                </Link>
                <Link
                  to="/staff/support"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
          <button className="mt-auto border-t border-slate-100 pt-6 flex items-center gap-3 p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors">
            Logout System
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col p-6 md:p-8 overflow-hidden max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Settings
            </h1>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] mt-1">
              Profile & Preferences
            </p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 active:scale-95">
            Update Profile
          </button>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto no-scrollbar pb-10">
          {/* Profile Section */}
          <div className="lg:col-span-2 bg-slate-50 rounded-[3rem] p-8 border border-slate-100 flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img
                  src="https://ui-avatars.com/api/?name=Alex+Rivera&background=0284c7&color=fff"
                  alt="Profile"
                  className="w-24 h-24 rounded-[2.5rem] shadow-xl ring-4 ring-white"
                />
                <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Alex Rivera
                </h3>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  Active Staff
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="alex.rivera@ecoclean.com"
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-700 input-focus transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+1 (555) 029-3942"
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-700 input-focus transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Assigned Region
                </label>
                <input
                  type="text"
                  defaultValue="Sector 9 & Old Town"
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Supervisor
                </label>
                <input
                  type="text"
                  defaultValue="John Thompson (Chief)"
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Right Column Preference Section */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex-grow">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6">
                Notifications
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50/50 transition-colors">
                  <span className="text-xs font-bold text-slate-600">
                    Task Alerts
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 accent-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50/50 transition-colors">
                  <span className="text-xs font-bold text-slate-600">
                    Fleet Route SMS
                  </span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                </label>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] shadow-xl text-white">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Security
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-6">
                Last changed: 12 days ago
              </p>
              <button className="w-full bg-slate-800 border border-slate-700 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffSettings;
