import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function UserDash() {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar title="EcoClean" />

      <main className="p-6 w-full max-w-md space-y-6">
        <div className="px-2">
          <h2 className="text-2xl font-extrabold text-slate-800">
            Hello, Alex! 👋
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Rank:{" "}
            <span className="text-emerald-600 font-bold">Eco-Warrior</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bento-card hover-card-emerald bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 transition-colors">
              Impact
            </p>
            <h4 className="text-3xl font-extrabold text-slate-800 transition-colors">
              12
            </h4>
            <p className="text-[10px] mt-2 bg-emerald-100 text-emerald-700 py-1 px-2 rounded-lg inline-block font-bold">
              Points Earned
            </p>
          </div>
          <div className="bento-card hover-card-slate bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 transition-colors">
              Reports
            </p>
            <h4 className="text-3xl font-extrabold text-slate-800 transition-colors">
              08
            </h4>
            <p className="text-[10px] text-emerald-500 font-bold mt-2">
              ↑ 2 Active
            </p>
          </div>
        </div>

        <div className="bento-card bg-slate-900 rounded-[3rem] p-8 overflow-hidden relative shadow-2xl shadow-emerald-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 blur-[40px] rounded-full"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="pulse-effect absolute inset-0 border-2 border-emerald-500/30 rounded-full"></div>
              <div className="spinning-border absolute inset-1 border-b-2 border-t-2 border-emerald-400 rounded-full opacity-60"></div>
              <div className="eco-sphere w-24 h-24 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <span className="text-2xl">🌱</span>
                <span className="text-white font-extrabold text-lg mt-1">
                  65%
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-white text-xl font-extrabold tracking-tight">
                Environmental Impact
              </h3>
              <p className="text-slate-400 text-sm font-medium px-4">
                You have diverted{" "}
                <span className="text-emerald-400 font-bold">40kg</span> of
                waste from landfills this month.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Next Goal: 50kg
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/user/report-issue"
          className="block w-full text-center py-5 bg-emerald-600 text-white font-extrabold rounded-[2.5rem] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.97] transition-all text-lg tracking-tight"
        >
          Report
        </Link>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-extrabold text-slate-800">Recent Activity</h3>
            <button className="text-xs font-bold text-emerald-600 hover:underline">
              See All
            </button>
          </div>

          <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
              🗑️
            </div>
            <div className="flex-grow">
              <h4 class="text-sm font-bold text-slate-800">Overflowing Bin</h4>
              <p className="text-[10px] text-slate-400 font-medium">
                Reported 2h ago • Sector 4
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
              Pending
            </span>
          </div>

          <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
              🌱
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-slate-800">
                Illegal Dumping Site
              </h4>
              <p className="text-[10px] text-slate-400 font-medium">
                Reported yesterday • Park Av.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
              Cleared
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
