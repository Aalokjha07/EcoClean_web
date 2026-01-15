import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// home
import HomePage from "./pages/homepage";
//user
import UserDash from "./pages/user/UserDash";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import IssueReport from "./pages/user/IssueReport";
import MyReports from "./pages/user/MyReports";
import AboutUs from "./pages/user/AboutUs";
import Settings from "./pages/user/Settings";
import ReportDetail from "./pages/user/ReportDetail";
// staff
import StaffDash from "./pages/staff/StaffDash";
import StaffActiveTasks from "./pages/staff/StaffActiveTasks";
import StaffMyFixes from "./pages/staff/StaffMyFixes";
import StaffReportFix from "./pages/staff/StaffReportFix";
import FleetMap from "./pages/staff/FleetMap";
import StaffAnalytics from "./pages/staff/StaffAnalytics";
import StaffSettings from "./pages/staff/StaffSettings";
// admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ActiveReports from "./pages/admin/ActiveReports";
import ProcessedReports from "./pages/admin/ProcessedReports";
import FixedReports from "./pages/admin/FixedReports";
import ReportDetailAdmin from "./pages/admin/ReportDetail";
import ReviewWorkEvidence from "./pages/admin/ReviewWorkEvidence";

export default function App() {
  return (
    <Router>
      <div className="bg-[#F8FAFC] min-h-screen text-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* user */}
          <Route path="/user" element={<UserDash />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/user/report-issue" element={<IssueReport />} />
          <Route path="/user/reports" element={<MyReports />} />
          <Route path="/user/about" element={<AboutUs />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/report/:id" element={<ReportDetail />} />
          {/* staff */}
          <Route path="/staff" element={<StaffDash />} />
          <Route path="/staff/active-tasks" element={<StaffActiveTasks />} />
          <Route path="/staff/my-fixes" element={<StaffMyFixes />} />
          <Route path="/staff/report-fix" element={<StaffReportFix />} />
          <Route path="/staff/fleet-map" element={<FleetMap />} />
          <Route path="/staff/analytics" element={<StaffAnalytics />} />
          <Route path="/staff/settings" element={<StaffSettings />} />
          {/* admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/active-reports" element={<ActiveReports />} />
          <Route
            path="/admin/processed-reports"
            element={<ProcessedReports />}
          />
          <Route path="/admin/fixed-reports" element={<FixedReports />} />
          <Route path="/admin/report/:id" element={<ReportDetailAdmin />} />
          <Route
            path="/staff/review-work/:id"
            element={<ReviewWorkEvidence />}
          />
        </Routes>
      </div>
    </Router>
  );
}
