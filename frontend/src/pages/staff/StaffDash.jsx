import React, { useState } from "react";

const StaffDash = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mock data for assigned tasks
  const assignedTasks = [
    {
      id: 1,
      title: "Waste Overflow",
      location: "Market Square",
      priority: "High",
      time: "10 mins ago",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: 2,
      title: "Pipe Leakage",
      location: "Sector 4 Block B",
      priority: "Medium",
      time: "25 mins ago",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans'] flex flex-col items-center pb-10">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        .bento-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .drawer-backdrop { transition: opacity 0.3s ease; }

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

        .blue-shadow { box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.15); }
        
        @keyframes pulse-blue {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.3); }
        }
        .pulse-blue { animation: pulse-blue 2s infinite; }
      `,
        }}
      />

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

      {/* Drawer (Unchanged) */}
      <div className={`fixed inset-0 z-[60] ${isMenuOpen ? "" : "invisible"}`}>
        <div
          onClick={toggleMenu}
          className={`drawer-backdrop absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`drawer-content absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${
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
                <a
                  href="/staff"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
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
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
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

      {/* Main Content */}
      <main className="p-6 w-full max-w-md space-y-6">
        <div className="px-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Daily Operations 🛠️
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Field Unit #042 • <span className="text-blue-600">Officer Jha</span>
          </p>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card-hover bento-card bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              New Reports
            </p>
            <h4 className="text-4xl font-extrabold text-slate-900 mt-1">12</h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full pulse-blue"></span>
              <span className="text-[9px] font-bold text-blue-600 uppercase">
                Live
              </span>
            </div>
          </div>
          <div className="stat-card-hover bento-card bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Resolved
            </p>
            <h4 className="text-4xl font-extrabold text-slate-900 mt-1">86</h4>
            <div className="mt-3">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">
                This Shift
              </span>
            </div>
          </div>
        </div>

        {/* RECENT ASSIGNED TASKS (Replaced Report Fix Button) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-slate-900 text-sm italic">
              Recently Assigned Tasks
            </h3>
            <a
              href="/staff/active-tasks"
              className="text-[10px] font-black text-blue-600 uppercase hover:underline"
            >
              View All
            </a>
          </div>

          <div className="space-y-3">
            {assignedTasks.map((task) => (
              <div
                key={task.id}
                className="bento-card bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 ${task.bgColor} rounded-2xl flex items-center justify-center border border-transparent group-hover:border-blue-100`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${task.iconColor}`}
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
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-extrabold text-slate-800">
                      {task.title}
                    </h4>
                    <span className="text-[8px] font-black text-slate-400 uppercase">
                      {task.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold mb-1">
                    {task.location}
                  </p>
                  <span
                    className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter ${
                      task.priority === "High"
                        ? "bg-red-50 text-red-500"
                        : "bg-blue-50 text-blue-500"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>
                <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Today List */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Completed Today
            </h3>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              65% Progress
            </span>
          </div>

          <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 opacity-70">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-400"
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
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-slate-700 line-through">
                Waste Audit
              </h4>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                08:30 AM • HQ Depot
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDash;
