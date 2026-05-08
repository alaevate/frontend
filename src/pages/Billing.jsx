import React, { useState, useEffect } from "react";
import api from "../services/api";

const statusColor = {
  Paid: "bg-green-100 text-green-600",
  Unpaid: "bg-red-100 text-red-600",
};

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newBill, setNewBill] = useState({
    patient: "",
    doctor: "",
    date: "",
    amount: "",
    status: "Unpaid",
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await api.get("/bills");
      setBills(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setBills([]);
    }
  };
  const filtered = bills.filter((b) => b.patient.toLowerCase().includes(search.toLowerCase()));

  const totalPaid = bills
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + Number(b.amount), 0);
  const totalUnpaid = bills
    .filter((b) => b.status === "Unpaid")
    .reduce((sum, b) => sum + Number(b.amount), 0);

  const handleAdd = async () => {
    if (!newBill.patient || !newBill.doctor || !newBill.date || !newBill.amount) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await api.post("/bills", newBill);
      fetchBills();
      setNewBill({
        patient: "",
        doctor: "",
        date: "",
        amount: "",
        status: "Unpaid",
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bills/${id}`);
      fetchBills();
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Error deleting bill: " + error.message);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
      await api.put(`/bills/${id}`, { status: newStatus });
      fetchBills();
    } catch (error) {
      console.error("Error updating bill status:", error);
      alert("Error updating bill status: " + error.message);
    }
  };

  return (
    <div className="p-8 w-full bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800"> Billing</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Bill
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">Total Paid</p>
          <h2 className="text-3xl font-bold text-green-600">{totalPaid} DH</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">Total Unpaid</p>
          <h2 className="text-3xl font-bold text-red-600">{totalUnpaid} DH</h2>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="text-lg font-bold mb-4">New Bill</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Patient Name"
              value={newBill.patient}
              onChange={(e) => setNewBill({ ...newBill, patient: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              placeholder="Doctor Name"
              value={newBill.doctor}
              onChange={(e) => setNewBill({ ...newBill, doctor: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="date"
              value={newBill.date}
              onChange={(e) => setNewBill({ ...newBill, date: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <input
              placeholder="Amount (DH)"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
            <select
              value={newBill.status}
              onChange={(e) => setNewBill({ ...newBill, status: e.target.value })}
              className="border rounded-lg px-4 py-2"
            >
              <option>Unpaid</option>
              <option>Paid</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Save Bill
          </button>
        </div>
      )}

      <input
        placeholder="Search by patient name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6 bg-white"
      />

      <div className="bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-4">#</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{b.id}</td>
                <td className="p-4 font-medium">{b.patient}</td>
                <td className="p-4">{b.doctor}</td>
                <td className="p-4">{b.date}</td>
                <td className="p-4">{b.amount} DH</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(b.id, b.status)}
                    className={`px-3 py-1 rounded-full text-sm ${statusColor[b.status]}`}
                  >
                    {b.status}
                  </button>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(b.id)}
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
