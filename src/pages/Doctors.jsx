import React, { useState, useEffect } from "react";
import api from "../services/api";

const statusColor = {
  Available: "bg-green-100 text-green-600",
  Busy: "bg-red-100 text-red-600",
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    phone: "",
    patients: 0,
    status: "Available",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      setDoctors(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = async () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.phone) return;
    try {
      await api.post("/doctors", newDoctor);
      fetchDoctors();
      setNewDoctor({
        name: "",
        specialty: "",
        phone: "",
        patients: 0,
        status: "Available",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Error deleting doctor: " + error.message);
    }
  };

  return (
    <div className="p-8 w-full bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800"> Doctors</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="text-lg font-bold mb-4">New Doctor</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Full Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              placeholder="Specialty"
              value={newDoctor.specialty}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              placeholder="Phone Number"
              value={newDoctor.phone}
              onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <select
              value={newDoctor.status}
              onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value })}
              className="border rounded-lg px-4 py-2"
            >
              <option>Available</option>
              <option>Busy</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Save Doctor
          </button>
        </div>
      )}

      <input
        placeholder=" Search doctors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6 bg-white"
      />

      <div className="bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Specialty</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Patients</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{d.id}</td>
                <td className="p-4 font-medium">{d.name}</td>
                <td className="p-4">{d.specialty}</td>
                <td className="p-4">{d.phone}</td>
                <td className="p-4">{d.patients}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColor[d.status]}`}>
                    {d.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
