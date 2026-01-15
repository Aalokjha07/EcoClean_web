import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import { Link } from "react-router-dom";
import {
  MapPin,
  Navigation,
  Clock,
  ChevronRight,
  RefreshCw,
  X,
  Send,
  Menu,
  LayoutDashboard,
  ClipboardList,
  History,
  Truck,
  LogOut,
} from "lucide-react";

const FleetMap = () => {
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [map, setMap] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const SERVER_URL = "http://localhost:3000/api/Reports";
  const baseCoords = { lat: 30.3782, lng: 76.7767 };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const googleMap = new window.google.maps.Map(mapRef.current, {
          center: baseCoords,
          zoom: 13,
          disableDefaultUI: true,
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        });

        directionsRendererRef.current =
          new window.google.maps.DirectionsRenderer({
            map: googleMap,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#2563eb",
              strokeWeight: 5,
            },
          });

        setMap(googleMap);
        fetchActiveTasks(googleMap);
      }
    });
  }, []);

  const fetchActiveTasks = async (activeMap) => {
    setLoading(true);
    try {
      const res = await axios.get(SERVER_URL);
      const pending = res.data.filter(
        (t) => t.status?.toLowerCase() === "pending"
      );
      setTasks(pending);

      pending.forEach((task) => {
        const coords = task.address?.match(/-?\d+\.\d+/g);
        if (coords && coords.length >= 2) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: parseFloat(coords[0]),
              lng: parseFloat(coords[1]),
            },
            map: activeMap || map,
            title: task.subject,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#2563eb",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            },
          });
          marker.addListener("click", () => handleSelectTask(task));
        }
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Senior Developer Refactor: Centralized routing logic using live user location
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    const taskCoords = task.address?.match(/-?\d+\.\d+/g);

    if (taskCoords && map) {
      const destination = {
        lat: parseFloat(taskCoords[0]),
        lng: parseFloat(taskCoords[1]),
      };

      // Ensure the map focuses on the target
      map.panTo(destination);
      map.setZoom(16);

      // Fetch user's actual location to draw the route from "them" to the "report"
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userOrigin = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const directionsService =
              new window.google.maps.DirectionsService();
            directionsService.route(
              {
                origin: userOrigin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === "OK") {
                  directionsRendererRef.current.setDirections(result);
                }
              }
            );
          },
          () => {
            // Fallback to baseCoords if user denies GPS, to avoid a broken UI
            const directionsService =
              new window.google.maps.DirectionsService();
            directionsService.route(
              {
                origin: baseCoords,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === "OK") {
                  directionsRendererRef.current.setDirections(result);
                }
              }
            );
          }
        );
      }
    }
  };

  const handleStartNavigation = () => {
    if (!selectedTask) return;
    const taskCoords = selectedTask.address?.match(/-?\d+\.\d+/g);
    if (!taskCoords) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${taskCoords[0]},${taskCoords[1]}&travelmode=driving`;
        window.open(url, "_blank");
      });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Side Menu Drawer */}
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
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  <Truck size={18} /> Active Tasks
                </Link>

                <Link
                  to="/staff/my-fixes"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  <History size={18} /> My Fixes
                </Link>
                <Link
                  to="/staff/fleet-map"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm transition-colors"
                >
                  <ClipboardList size={18} /> Fleet Map
                </Link>
              </div>
            </div>
          </div>
          <button className="mt-auto border-t border-slate-100 pt-6 flex items-center gap-3 p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors">
            <LogOut size={18} /> Logout System
          </button>
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Navigation className="text-white w-4 h-4 fill-white" />
          </div>
          <span className="font-black text-slate-900 tracking-tighter">
            Fleetmap
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchActiveTasks()}
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={toggleMenu}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PART: MAP */}
        <div className="flex-[7] relative h-full bg-slate-200">
          <div ref={mapRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-xl border border-white flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
              Live Satellite Feed
            </span>
          </div>

          {selectedTask && (
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl border border-slate-700 flex items-center justify-between animate-in slide-in-from-bottom-10 duration-300">
              <div className="flex items-center gap-4 border-r border-slate-700 pr-6 mr-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Navigation className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Active Route
                  </h4>
                  <p className="text-sm font-bold truncate max-w-[200px]">
                    {selectedTask.subject}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2 overflow-hidden">
                <MapPin size={16} className="text-slate-400 shrink-0" />
                <p className="text-xs text-slate-300 truncate font-medium italic">
                  {selectedTask.address}
                </p>
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-slate-700 ml-6">
                <button
                  onClick={handleStartNavigation}
                  className="bg-white text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all flex items-center gap-2"
                >
                  <Send size={12} /> Start Navigation
                </button>
                <button
                  onClick={() => {
                    setSelectedTask(null);
                    directionsRendererRef.current.setDirections({ routes: [] });
                  }}
                  className="p-2.5 hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PART: TASKS */}
        <div className="flex-[3] flex flex-col bg-slate-50 border-l border-slate-200 shadow-2xl z-10">
          <div className="p-6 border-b border-slate-200 bg-white">
            <h2 className="text-xl font-black text-slate-900">Pending Tasks</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                {tasks.length} Issues Found
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center opacity-50">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest">
                  Syncing...
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  onClick={() => handleSelectTask(task)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                    selectedTask?._id === task._id
                      ? "bg-blue-50 border-blue-400 shadow-md"
                      : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                      #{task._id.slice(-6)}
                    </span>
                    <div className="bg-amber-100 text-amber-600 p-1 rounded-md">
                      <Clock size={12} />
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 text-sm leading-tight mb-1">
                    {task.subject}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-3">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-slate-400 mb-4">
                    <MapPin size={12} className="shrink-0 text-blue-500" />
                    <span className="text-[10px] font-bold truncate uppercase">
                      {task.address}
                    </span>
                  </div>
                  <button className="w-full py-2.5 bg-slate-900 group-hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    Get Route <ChevronRight size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetMap;
