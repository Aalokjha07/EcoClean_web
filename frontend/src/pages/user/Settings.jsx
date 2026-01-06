import React from "react";
import Navbar from "../../components/Navbar";

export default function Settings() {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar title="Settings" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
            Preferences
          </p>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  🔔
                </div>
                <span className="text-sm font-bold text-slate-700">
                  Notifications
                </span>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="flex items-center justify-between p-6 border-t border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  🌐
                </div>
                <span className="text-sm font-bold text-slate-700">
                  Language
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                English
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
            Security
          </p>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            {/* Simplified for brevity */}
            <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                  🔒
                </div>
                <span className="text-sm font-bold text-slate-700">
                  Two-Factor Auth
                </span>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest ml-4">
            Danger Zone
          </p>
          <div className="bg-red-50/50 rounded-[2.5rem] border border-red-100 overflow-hidden">
            <button className="w-full flex items-center gap-4 p-6 text-red-600 hover:bg-red-100/50 transition-all font-bold text-sm">
              <div className="w-10 h-10 bg-white text-red-500 rounded-xl flex items-center justify-center shadow-sm">
                ⚠️
              </div>
              Delete Account
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest pb-8">
          EcoClean Version 2.4.0
        </p>
      </main>
    </div>
  );
}
