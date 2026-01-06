import React, { useState, useEffect } from "react"; // Added useEffect
import Navbar from "../../components/Navbar";

export default function MyReports() {
  const [filter, setFilter] = useState("All");
  // State for real database reports
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from your backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // This hits the GET /api/Reports route in your backend
        const response = await fetch("http://localhost:3000/api/Reports");
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 2. Delete function to connect to your backend delete route
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await fetch(`http://localhost:3000/api/Report/${id}`, {
          method: "DELETE",
        });
        setReports(reports.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  // 3. Filter the live data
  const filteredReports = reports.filter(
    (report) => filter === "All" || report.status === filter
  );

  const getTabClass = (name) => {
    return filter === name
      ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50";
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#f5f3ff]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .report-card { transition: all 0.3s ease; border: 1px solid #ede9fe; background: #ffffff; }
        .report-card:hover { 
            border-color: #7c3aed; 
            transform: translateY(-4px); 
            box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1); 
        }
      `}</style>

      <Navbar title="My Reports" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "pending", "Resolved"].map(
            (
              tab // Note: lowercase 'pending' to match your model
            ) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`${getTabClass(
                  tab
                )} px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-slate-500 font-bold">
              Loading Reports...
            </p>
          ) : filteredReports.length === 0 ? (
            <p className="text-center text-slate-500">No reports found.</p>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report._id} // MongoDB uses _id
                className="report-card p-6 rounded-[2.5rem] flex flex-col"
              >
                {/* Image Preview */}
                <div className="aspect-video rounded-3xl overflow-hidden mb-6 border border-slate-100 bg-slate-100">
                  <img
                    src={
                      report.imageBefore ||
                      "https://via.placeholder.com/400x225?text=No+Image"
                    }
                    className="w-full h-full object-cover"
                    alt="report preview"
                  />
                </div>

                {/* Title and ID Section */}
                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">
                    {report.subject}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-purple-600 text-[10px] font-black uppercase tracking-widest">
                      Location: {report.address}
                    </p>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        report.status === "Resolved"
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>

                {/* Description Box */}
                <div className="space-y-4 mb-8">
                  <div
                    className={`p-4 rounded-2xl border ${
                      report.status === "Resolved"
                        ? "bg-emerald-50/30 border-emerald-100/50"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-slate-400">
                      Report Description
                    </p>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                      "{report.description}"
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex justify-between items-center px-1">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Reported At
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex gap-3">
                  <button className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
                    View Full Detail
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100 active:scale-95"
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}
