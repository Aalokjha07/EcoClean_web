import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ReportDetail = () => {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/Report/${id}`);
        const data = await response.json();
        setReport(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching detail:", error);
        setLoading(false);
      }
    };
    fetchReportDetail();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center font-bold">Loading Details...</div>;
  if (!report) return <div className="p-10 text-center">Report not found.</div>;

  return (
    <div className="min-h-screen bg-[#f5f3ff] flex flex-col items-center">
      <Navbar title="Report Details" showBack={true} />

      <main className="w-full max-w-2xl p-6 space-y-6">
        {/* Image Section */}
        <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
          <img
            src={
              report.imageBefore ||
              "https://via.placeholder.com/800x450?text=No+Image+Uploaded"
            }
            alt="Issue Evidence"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {report.status}
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {report.subject}
              </h1>
            </div>
            <p className="text-slate-400 font-mono text-sm">
              #{report._id.slice(-6)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Location
              </p>
              <p className="font-bold text-slate-700">{report.address}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Reported On
              </p>
              <p className="font-bold text-slate-700">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">
              Detailed Description
            </p>
            <p className="text-slate-600 leading-relaxed font-medium">
              {report.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
              User Identification
            </p>
            <p className="text-sm font-bold text-slate-900 bg-white border border-slate-100 p-3 rounded-xl text-center">
              UID: {report.userId || "Not Available"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
        >
          Go Back
        </button>
      </main>
    </div>
  );
};

export default ReportDetail;
