import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for task allocation
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const departments = [
    "Sanitation",
    "Maintenance",
    "Waste Management",
    "Public Safety",
  ];
  const staffList = ["John Doe", "Alex Smith", "Maria Garcia", "David Chen"];

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        setLoading(true);
        // Clean ID logic similar to your ActiveReports fix
        const cleanId = id.startsWith(":") ? id.slice(1) : id;

        // Ensure this URL exactly matches your backend route
        const response = await fetch(
          `http://localhost:3000/api/Report/${cleanId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Report not found");
        }

        const data = await response.json();
        setReport(data);
        setSelectedDept(data.department || "");
        setSelectedStaff(data.assignedStaff || "");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchReportDetail();
  }, [id]);

  const handleAssignTask = async () => {
    if (!selectedDept || !selectedStaff) {
      alert("Please select both a Department and a Staff member.");
      return;
    }

    setIsUpdating(true);
    try {
      const cleanId = id.startsWith(":") ? id.slice(1) : id;
      const response = await fetch(
        `http://localhost:3000/api/Report/assign/${cleanId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignedStaff: selectedStaff,
            department: selectedDept,
          }),
        }
      );

      if (response.ok) {
        alert("Task assigned successfully!");
        navigate("/admin/active-reports");
      } else {
        throw new Error("Failed to update assignment");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );

  if (error || !report)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3ff] p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-slate-600 mb-6">{error || "Report not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f5f3ff] flex flex-col items-center pb-12 pt-8">
      {/* Custom Header instead of Navbar */}
      <header className="w-full max-w-2xl px-6 flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white rounded-2xl border border-purple-100 text-purple-600 hover:bg-purple-50 transition-all shadow-sm"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
          Report Details
        </h1>
        <div className="w-12"></div> {/* Spacer for symmetry */}
      </header>

      <main className="w-full max-w-2xl p-6 space-y-6">
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
        {/* Info Card */}
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {report.status}
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
                {report.subject}
              </h2>
              <p className="text-purple-500 font-bold text-xs uppercase tracking-widest mt-2">
                {report.address}
              </p>
            </div>
            <p className="text-slate-300 font-mono text-[10px]">
              ID: {report._id.slice(-8)}
            </p>
          </div>

          <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border border-slate-100 italic text-slate-500 leading-relaxed text-lg">
            "{report.description}"
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></span>
              Assign Department & Staff
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full p-5 bg-purple-50 border-2 border-transparent focus:border-purple-200 rounded-2xl font-bold text-slate-700 appearance-none outline-none transition-all"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Assign Staff Member
                </label>
                <select
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="w-full p-5 bg-purple-50 border-2 border-transparent focus:border-purple-200 rounded-2xl font-bold text-slate-700 appearance-none outline-none transition-all"
                >
                  <option value="">Select Staff</option>
                  {staffList.map((staff) => (
                    <option key={staff} value={staff}>
                      {staff}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAssignTask}
              disabled={isUpdating}
              className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${
                isUpdating
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 hover:scale-[1.02]"
              }`}
            >
              {isUpdating
                ? "Processing Assignment..."
                : "Confirm & Send to Staff"}
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-full text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-purple-600 transition-all"
        >
          Cancel and Return
        </button>
      </main>
    </div>
  );
};

export default ReportDetail;
