import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ title, showBack = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : (
            // EcoClean Logo Icon if no back button
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                />
              </svg>
            </div>
          )}
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
            {title}
          </h1>
        </div>

        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors relative z-[60]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-slate-600 transition-transform ${
              isOpen ? "rotate-90" : ""
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
        className={`fixed inset-0 z-[55] ${isOpen ? "visible" : "invisible"}`}
      >
        <div
          onClick={toggleMenu}
          className={`drawer-backdrop absolute inset-0 bg-slate-900/40 backdrop-blur-sm ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`drawer-content absolute top-4 right-4 bottom-4 w-64 bg-white rounded-[2.5rem] shadow-2xl p-6 flex flex-col ${
            isOpen ? "translate-x-0" : "translate-x-[110%]"
          }`}
        >
          <div className="mt-12 space-y-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-4">
                Main
              </p>
              <div className="space-y-1">
                <Link
                  to="/user"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/user/reports"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  My Reports
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-4">
                Account
              </p>
              <div className="space-y-1">
                <Link
                  to="/user/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to="/user/about"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/user/settings"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
          <button className="mt-auto mb-4 p-4 text-red-500 font-bold text-sm flex items-center gap-3 hover:bg-red-50 rounded-2xl">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
