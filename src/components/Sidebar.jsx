import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdAirlineSeatFlat, MdLocalHospital, MdAttachMoney } from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      location.pathname === path ? "bg-white text-blue-700 font-bold" : "hover:bg-blue-600"
    }`;

  return (
    <div className="h-screen w-64 bg-blue-700 text-white flex flex-col p-6 fixed">
      
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Medicare</h1>
        <p className="text-blue-200 text-sm">Hospital Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <MdDashboard size={22} /> Dashboard
        </Link>
        <Link to="/patients" className={linkClass("/patients")}>
          <MdAirlineSeatFlat size={22} /> Patients
        </Link>
        <Link to="/doctors" className={linkClass("/doctors")}>
          <MdLocalHospital size={22} /> Doctors
        </Link>
        <Link to="/billing" className={linkClass("/billing")}>
          <MdAttachMoney size={22} /> Billing
        </Link>
      </nav>

    </div>
  );
}