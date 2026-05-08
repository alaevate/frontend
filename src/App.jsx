import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Billing from "./pages/Billing";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Login route (no sidebar) */}
        <Route path="/login" element={<Login />} />

        {/* Routes with Sidebar layout */}
        <Route
          path="/*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="ml-64 w-full min-h-screen bg-gray-100">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/billing" element={<Billing />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
