import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const statusColor = {
  Active: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Discharged: "bg-red-100 text-red-600",
};

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    doctor: "",
    date: "",
    status: "Active",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients([]);
    }
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async () => {
    if (
      !newPatient.name ||
      !newPatient.age ||
      !newPatient.doctor ||
      !newPatient.date
    )
      return;
    try {
      await api.post("/patients", newPatient);
      fetchPatients();
      setNewPatient({
        name: "",
        age: "",
        doctor: "",
        date: "",
        status: "Active",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Error adding patient: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Error deleting patient: " + error.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800"> Patients</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Patient
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h2 className="text-lg font-bold mb-4">New Patient</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                className="border rounded-lg px-4 py-2"
              />
              <input
                placeholder="Age"
                value={newPatient.age}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, age: e.target.value })
                }
                className="border rounded-lg px-4 py-2"
              />
              <input
                placeholder="Doctor Name"
                value={newPatient.doctor}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, doctor: e.target.value })
                }
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="date"
                value={newPatient.date}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, date: e.target.value })
                }
                className="border rounded-lg px-4 py-2"
              />
              <select
                value={newPatient.status}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, status: e.target.value })
                }
                className="border rounded-lg px-4 py-2"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Discharged</option>
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Save Patient
            </button>
          </div>
        )}

        <input
          placeholder=" Search patients..."
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
                <th className="p-4">Age</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Appointment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{p.id}</td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.age}</td>
                  <td className="p-4">{p.doctor}</td>
                  <td className="p-4">{p.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(p.id)}
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
    </div>
  );
}
