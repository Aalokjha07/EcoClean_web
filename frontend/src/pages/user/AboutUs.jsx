import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function AboutUs() {
  useEffect(() => {
    // Basic dark mode simulation based on local storage logic from original file
    if (localStorage.getItem("ecoTheme") === "dark") {
      document.body.classList.add("dark-mode");
    }
    return () => document.body.classList.remove("dark-mode");
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar title="About Us" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-10">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[3rem] p-8 text-white shadow-2xl shadow-emerald-200">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
            Our Vision
          </span>
          <h2 className="text-3xl font-extrabold mt-2 leading-tight">
            Cleaning the world, one report at a time.
          </h2>
          <p className="mt-4 text-emerald-50 text-sm leading-relaxed opacity-90">
            EcoClean is a community-driven platform designed to bridge the gap
            between citizens and sanitation services. We believe that a cleaner
            environment starts with a single observation.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-slate-800 ml-2">
            What we are doing
          </h3>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-5">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl">
              📸
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Spot & Snap</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Users find waste or overflow issues in their neighborhood and
                report them instantly with a photo.
              </p>
            </div>
          </div>
          {/* ... Other cards can be added similarly ... */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-5">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Earn Rewards</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Every successful cleanup earns you Impact Points which can be
                redeemed for local rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-center">
            <h5 className="text-2xl font-black text-emerald-400">100%</h5>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">
              Transparency
            </p>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] text-center">
            <h5 className="text-2xl font-black text-slate-800">24/7</h5>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">
              Monitoring
            </p>
          </div>
        </div>

        <div className="text-center pb-10">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            A Community Initiative
          </p>
          <p className="text-xs text-slate-400 mt-2 px-10 leading-relaxed">
            Made with ❤️ for a greener tomorrow. Join thousands of citizens
            making a difference.
          </p>
        </div>
      </main>
    </div>
  );
}
