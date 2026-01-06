import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  );
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
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
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Edit Profile
          </h1>
        </div>
      </nav>

      <main className="p-6 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-[2.5rem] p-1 shadow-xl">
              <img
                src={avatar}
                className="bg-white rounded-[2.3rem] w-full h-full object-cover"
                alt="Avatar"
              />
            </div>
            <label
              htmlFor="avatarInput"
              className="absolute bottom-0 right-0 bg-slate-900 text-white p-3 rounded-2xl shadow-lg cursor-pointer hover:bg-emerald-600 transition-colors"
            >
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                id="avatarInput"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
            Tap camera to change photo
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Alex Harrison"
              className="w-full bg-white border border-slate-100 p-5 rounded-[2rem] text-sm font-bold text-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="alex.harrison@example.com"
              className="w-full bg-white border border-slate-100 p-5 rounded-[2rem] text-sm font-bold text-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 0123-4567"
              className="w-full bg-white border border-slate-100 p-5 rounded-[2rem] text-sm font-bold text-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={handleSave}
            className="w-full py-5 bg-emerald-600 text-white font-extrabold rounded-[2rem] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all text-lg"
          >
            SAVE CHANGES
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-5 bg-white text-slate-400 font-extrabold rounded-[2rem] border border-slate-100 hover:bg-slate-50 active:scale-[0.98] transition-all text-sm uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </main>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-10 bg-slate-900 text-white px-8 py-4 rounded-[2rem] font-bold text-sm shadow-2xl transition-transform duration-500 z-[100] ${
          showToast ? "translate-y-0" : "translate-y-32"
        }`}
      >
        Profile updated successfully! ✨
      </div>
    </div>
  );
}
