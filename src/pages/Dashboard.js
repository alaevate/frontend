import React from "react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin </h1>
        <p className="text-gray-500 mb-8">Here's what's happening today</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Patients</p>
            <h2 className="text-4xl font-bold text-blue-600">128</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Doctors</p>
            <h2 className="text-4xl font-bold text-green-600">24</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Bills</p>
            <h2 className="text-4xl font-bold text-purple-600">MAD12,400</h2>
          </div>
        </div>

        {/* Recent Patients Table */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Patients</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-3">Name</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3"> Fatima AL-zahra</td>
                <td className="py-3">Dr.Nour elhouda</td>
                <td className="py-3"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Active</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Mariam Khalili</td>
                <td className="py-3">Dr.Aya Idrissi</td>
                <td className="py-3"><span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">Pending</span></td>
              </tr>
              <tr>
                <td className="py-3">Aisha Rahman</td>
                <td className="py-3">Dr.Nour elhouda</td>
                <td className="py-3"><span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Discharged</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}