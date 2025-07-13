import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import { useAuthContext } from "../../../context/AuthContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthContext();

  const quickLinks = [
    { label: "My Profile", path: "/student/profile" },
    { label: "My Courses", path: "/student/courses" },
    { label: "My Payments", path: "/student/payment-slip" },
    { label: "Support", path: "/support" },
  ];

  // ✅ Mock Data (replace with API later)
  const feeData = [
    { label: "Fees", PrePlacement: 3000, AtPlacement: 5000, PostPlacement: 2000 },
  ];

  const attendanceData = [
    { date: "Jul 01", attendance: 1 },
    { date: "Jul 02", attendance: 1 },
    { date: "Jul 03", attendance: 0 },
    { date: "Jul 04", attendance: 1 },
    { date: "Jul 05", attendance: 1 },
    { date: "Jul 06", attendance: 0 },
  ];

  const testPerformanceData = [
    { test: "Test 1", total: 100, obtained: 85, attended: true },
    { test: "Test 2", total: 100, obtained: 0, attended: false },
    { test: "Test 3", total: 100, obtained: 74, attended: true },
    { test: "Test 4", total: 100, obtained: 66, attended: true },
  ];

  const projectData = [
    { name: "Completed", value: 4 },
    { name: "Ongoing", value: 2 },
    { name: "Pending", value: 1 },
  ];

  const pieColors = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="user-dashboard">
      <div className="welcome-box">
        <h2>Welcome, {user?.name || "Student"} 👋</h2>
        <p>Your role: <strong>{isAdmin ? "Admin" : "Student"}</strong></p>
      </div>

      <div className="dashboard-grid">
        {quickLinks.map((link, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            onClick={() => navigate(link.path)}
          >
            <h3>{link.label}</h3>
            <p>Go to {link.label}</p>
          </div>
        ))}
      </div>

      {/* All Graphs */}
      <div className="graph-grid">
        <div className="graph-section">
          <h3>Fee Submission Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="PrePlacement" fill="#82ca9d" />
              <Bar dataKey="AtPlacement" fill="#8884d8" />
              <Bar dataKey="PostPlacement" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="graph-section">
          <h3>Batch Attendance Tracking</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(v) => (v === 1 ? "Present" : "Absent")} />
              <Tooltip formatter={(v) => (v === 1 ? "Present" : "Absent")} />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#00b894" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="graph-section">
          <h3>Test Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#dfe6e9" name="Total Marks" />
              <Bar dataKey="obtained" fill="#6c5ce7" name="Obtained Marks" />
            </BarChart>
          </ResponsiveContainer>
          <div className="note">
            <p><strong>Note:</strong> 0 marks = likely absent.</p>
          </div>
        </div>

        <div className="graph-section">
          <h3>Project Progress Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {projectData.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
