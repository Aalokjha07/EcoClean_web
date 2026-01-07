import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActiveReports = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const SERVER_URL = "http://localhost:3000"; // Define base URL for images

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fetch Reports
  useEffect(() => {
    const fetchActiveReports = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/Reports`);
        const data = await response.json();

        // --- UPDATED LOGIC: Fetch ONLY those whose status is 'pending' ---
        // Note: I used lowercase 'pending' to match your controller's addReport logic
        const pendingOnly = data.filter(
          (r) => r.status?.toLowerCase() === "pending"
        );

        setReports(pendingOnly);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchActiveReports();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this report permanently?")) {
      try {
        await fetch(`${SERVER_URL}/api/Report/${id}`, {
          method: "DELETE",
        });
        setReports(reports.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const filteredReports = reports.filter(
    (report) =>
      report.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-[#f5f3ff] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .drawer-content { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .drawer-backdrop { transition: opacity 0.3s ease; }
        .report-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .report-card:hover { 
            border-color: #7c3aed; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1); 
        }
        .card-img-container { width: 100%; height: 160px; border-radius: 1.5rem; overflow: hidden; margin-bottom: 1.5rem; background: #f3f4f6; }
        .card-img { width: 100%; height: 100%; object-fit: cover; }
      `}</style>

      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-purple-100 px-8 py-4 flex justify-between items-center z-50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-200">
            E
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tighter block leading-none">
              EcoClean
            </span>
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
              Admin Control
            </span>
          </div>
        </div>
        <button
          onClick={toggleMenu}
          className="p-3 hover:bg-purple-50 rounded-2xl border border-purple-100 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Side Menu Drawer (Kept Same) */}
      <div className={`fixed inset-0 z-[60] ${isMenuOpen ? "" : "invisible"}`}>
        <div
          onClick={toggleMenu}
          className={`drawer-backdrop absolute inset-0 bg-purple-950/20 backdrop-blur-sm ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`drawer-content absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl p-8 flex flex-col transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-extrabold text-xl text-slate-800">
              Admin Menu
            </h2>
            <button
              onClick={toggleMenu}
              className="text-purple-400 hover:text-purple-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => navigate("/admin")}
              className="w-full text-left flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
            >
              Main Overview
            </button>
            <button
              onClick={() => navigate("/admin/active-reports")}
              className="w-full text-left flex items-center gap-3 p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold text-sm"
            >
              Active Reports
            </button>
            <button
              onClick={() => navigate("/admin/processed-reports")}
              className="w-full text-left flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
            >
              Processed Reports
            </button>
            <button
              onClick={() => navigate("/admin/fixed-reports")}
              className="w-full text-left flex items-center gap-3 p-4 text-slate-600 hover:bg-purple-50 rounded-2xl font-bold text-sm"
            >
              Fixed Reports
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Active Reports
            </h1>
            <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mt-1">
              {loading
                ? "Syncing..."
                : `${filteredReports.length} New Requests`}
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-purple-100 pl-10 pr-4 py-3 rounded-2xl font-bold text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 w-64 shadow-sm"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <div
                  key={report._id}
                  className="report-card p-6 rounded-[2.5rem] flex flex-col"
                >
                  {/* IMAGE ADDED HERE */}
                  <div className="card-img-container">
                    <img
                      src={
                        report.imageBefore
                          ? `${SERVER_URL}${report.imageBefore}`
                          : "https://via.placeholder.com/400x200?text=No+Preview"
                      }
                      alt="Trash"
                      className="card-img"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-lg uppercase">
                      {report.status}
                    </span>
                    <p className="text-[10px] font-black text-slate-400">
                      ID: {report._id.slice(-6)}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-extrabold text-slate-800 leading-tight truncate">
                      {report.subject}
                    </h3>
                    <p className="text-purple-600 text-[10px] font-bold mt-1 uppercase tracking-widest truncate">
                      {report.address}
                    </p>
                  </div>

                  <div className="bg-purple-50/50 p-4 rounded-2xl mb-6 flex-grow">
                    <p className="text-xs text-slate-600 font-medium italic line-clamp-2">
                      "{report.description}"
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-purple-50 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/report/${report._id}`)}
                      className="flex-grow flex items-center justify-center py-3 bg-purple-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all"
                    >
                      Assign Staff
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ActiveReports;
