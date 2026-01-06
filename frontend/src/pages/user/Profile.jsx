import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Profile() {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar title="My Profile" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-6">
        <div className="bg-slate-900 rounded-[3rem] p-8 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-[2rem] mx-auto p-1 shadow-xl rotate-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                className="bg-white rounded-[1.8rem] w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <h2 className="text-white text-2xl font-extrabold mt-6 tracking-tight">
              Alex Harrison
            </h2>
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mt-1">
              Silver Eco-Guardian
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <Link
                to="/edit-profile"
                className="px-6 py-2 bg-white/10 text-white text-xs font-bold rounded-full border border-white/10 hover:bg-white/20 transition-all"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Email Address
              </p>
              <p className="text-sm font-bold text-slate-700">
                alex.harrison@example.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Phone Number
              </p>
              <p className="text-sm font-bold text-slate-700">
                +1 (555) 0123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Rank Progress */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4 px-1">
            <h4 className="font-extrabold text-slate-800">Rank Progress</h4>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              80%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              style={{ width: "80%" }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 font-medium text-center italic">
            Only 260 points away from{" "}
            <span className="text-slate-800 font-bold">Gold Guardian</span>
          </p>
        </div>

        {/* Badges */}
        <div className="space-y-4 pb-4 w-full">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-slate-800">Eco Badges</h3>
            <span className="text-[10px] font-bold text-slate-400">
              2/10 Earned
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-2">
            <div className="bento-card min-w-[110px] aspect-square bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mb-2">
                🌱
              </div>
              <span className="text-[9px] font-black text-slate-600 uppercase text-center leading-tight">
                First
                <br />
                Report
              </span>
            </div>
            <div className="bento-card min-w-[110px] aspect-square bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl mb-2">
                🏆
              </div>
              <span className="text-[9px] font-black text-slate-600 uppercase text-center leading-tight">
                Top 1%
                <br />
                Citizen
              </span>
            </div>
            <div className="bento-card min-w-[110px] aspect-square bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-4 grayscale opacity-60">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mb-2">
                ⚡
              </div>
              <span className="text-[9px] font-black text-slate-300 uppercase text-center leading-tight">
                10 Day
                <br />
                Streak
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
