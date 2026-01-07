import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Menu,
  X,
  MapPin,
  Info,
  Layers,
  LayoutDashboard,
  ClipboardList,
  History,
  Truck,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";

const StaffActiveTasks = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [groupedTasks, setGroupedTasks] = useState({});
  const [loading, setLoading] = useState(true);

  // --- FETCH AND GROUP LOGIC ---
  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/Reports");
        const data = await response.json();

        // 1. Restriction: Only get those whose status is "Assigned"
        const assignedTasks = data.filter((item) => item.status === "Assigned");

        // 2. Department-wise Sorting/Grouping Logic
        const groups = assignedTasks.reduce((acc, task) => {
          const dept = task.department || "General";
          if (!acc[dept]) acc[dept] = [];
          acc[dept].push(task);
          return acc;
        }, {});

        setGroupedTasks(groups);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedTasks();
  }, []);

  // --- NEW LOGIC: PERSISTENT PROCESS START ---
  const handleStartProcess = (task) => {
    // We save the specific report details to localStorage
    // This acts as the "source of truth" for the next page
    localStorage.setItem("activeReportId", task._id);
    localStorage.setItem("activeReportSubject", task.subject);
    localStorage.setItem("activeReportAddress", task.address);

    // Navigate to the fix page without needing to pass state manually
    navigate("/staff/report-fix");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans'] flex flex-col items-center pb-12 overflow-x-hidden">
      {/* --- Side Menu Drawer --- */}
      <div
        className={`fixed inset-0 z-[100] ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={toggleMenu}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-extrabold text-lg text-slate-800">Menu</h2>
            <button
              onClick={toggleMenu}
              className="text-slate-400 hover:text-slate-600 p-2 bg-slate-50 rounded-xl"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-8 flex-grow">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Operations
              </p>
              <div className="space-y-1">
                <Link
                  to="/staff"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link
                  to="/staff/active-tasks"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm transition-colors"
                >
                  <ClipboardList size={18} /> Active Tasks
                </Link>
                <Link
                  to="/staff/my-fixes"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  <History size={18} /> My Fixes
                </Link>
                <Link
                  to="/staff/fleet-map"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  <Truck size={18} /> Fleet Map
                </Link>
              </div>
            </div>
          </div>
          <button className="mt-auto border-t border-slate-100 pt-6 flex items-center gap-3 p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors">
            <LogOut size={18} /> Logout System
          </button>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-50 rounded-xl"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <span className="text-xl font-extrabold text-slate-900 tracking-tighter">
            EcoClean
          </span>
          <span className="bg-blue-600 text-[10px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
            Staff
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2.5 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-105 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* --- Detail Modal --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <Info size={24} />
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-48 rounded-3xl overflow-hidden mb-6 bg-slate-100 border border-slate-100">
              <img
                src={selectedTask.imageBefore}
                alt="Evidence"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1 capitalize">
              {selectedTask.subject}
            </h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              {selectedTask.department}
            </p>
            <div className="space-y-4 mb-8 text-slate-600 text-sm">
              {selectedTask.description}
            </div>

            <button
              onClick={() => handleStartProcess(selectedTask)} // Updated to use storage logic
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all"
            >
              Start Process
            </button>
          </div>
        </div>
      )}

      {/* --- Main Content --- */}
      <main className="p-6 w-full max-w-md space-y-10">
        <header className="px-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Active Tasks
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            Departmental Worklist
          </p>
        </header>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : Object.keys(groupedTasks).length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold text-sm">
            No assigned tasks found.
          </div>
        ) : (
          Object.keys(groupedTasks).map((dept) => (
            <section key={dept} className="space-y-4">
              <div className="flex items-center gap-3 px-2 font-black uppercase tracking-widest text-[11px] text-slate-400">
                <Layers size={14} className="text-blue-500" />
                <span className="text-slate-800">{dept}</span>
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-slate-400">
                  {groupedTasks[dept].length}
                </span>
              </div>
              <div className="space-y-4">
                {groupedTasks[dept].map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-green-50 text-green-600 px-3 py-1 text-[9px] font-black rounded-lg uppercase">
                        {task.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 capitalize">
                      {task.subject}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="mt-6 flex flex-col gap-4 border-t border-slate-50 pt-5">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase">
                        <MapPin size={14} className="text-blue-600" />{" "}
                        {task.address}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="flex-1 bg-slate-50 text-slate-500 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-slate-200"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleStartProcess(task)} // Updated to use storage logic
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest"
                        >
                          Process
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
};

export default StaffActiveTasks;
