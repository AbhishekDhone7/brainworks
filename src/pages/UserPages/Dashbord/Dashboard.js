import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import { useAuthContext } from "../../../context/AuthContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthContext();

  const quickLinks = [
    { label: "My Profile", path: "/student/profile" },
    { label: "My Courses", path: "/student/courses" },
    { label: "My Payments", path: "/student/payment-slip" },
    { label: "Support", path: "/support" },
  ];

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
    </div>
  );
};

export default UserDashboard;
