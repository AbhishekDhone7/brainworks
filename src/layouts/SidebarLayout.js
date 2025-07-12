import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // ✅ import auth context
import "./SidebarLayout.css";

const SidebarLayout = () => {
  const { isAuthenticated } = useAuthContext(); // ✅ check login

  if (!isAuthenticated) {
    // optional: redirect fallback if needed
    return null;
  }

  return (
    <div className="admin-dashboard">
      {isAuthenticated && <Sidebar />}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
