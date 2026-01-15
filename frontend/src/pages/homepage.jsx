import React from "react";
import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, HardHat, Navigation } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const portals = [
    {
      title: "Citizen Portal",
      desc: "Report issues and track cleaning progress in your area.",
      icon: <User size={32} />,
      path: "/user",
      color: "bg-blue-600",
      hover: "hover:bg-blue-700",
    },
    {
      title: "Staff Portal",
      desc: "Access fleet maps, active tasks, and field operations.",
      icon: <HardHat size={32} />,
      path: "/staff",
      color: "bg-emerald-600",
      hover: "hover:bg-emerald-700",
    },
    {
      title: "Admin Panel",
      desc: "Manage users, analyze reports, and system configuration.",
      icon: <ShieldCheck size={32} />,
      path: "/admin",
      color: "bg-slate-800",
      hover: "hover:bg-slate-900",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans'] p-6 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />

      {/* Header Section */}
      <div className="text-center mb-16 z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Navigation className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-3xl font-black text-white tracking-tighter">
            EcoClean <span className="text-blue-500 text-lg"> routes</span>
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          The solution to Urban Maintenance <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Simplified for Everyone
          </span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto font-medium">
          Choose your portal to begin. Integrated real-time tracking, reporting,
          and fleet management in one ecosystem.
        </p>
      </div>

      {/* Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full z-10">
        {portals.map((portal, index) => (
          <div
            key={index}
            onClick={() => navigate(portal.path)}
            className="group cursor-pointer bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[32px] hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-2"
          >
            <div
              className={`w-16 h-16 ${portal.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {portal.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {portal.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {portal.desc}
            </p>
            <button
              className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white ${portal.color} ${portal.hover} transition-colors flex items-center justify-center gap-2 shadow-inner`}
            >
              Enter Portal <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="mt-20 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] z-10">
        &copy; 2026 EcoClean Global Systems • Made by Junior Dev
      </div>
    </div>
  );
};

// Internal Lucide icon missing from basic imports
const ChevronRight = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default HomePage;
