import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import "./header.css";

const HeaderDiv = () => {
  const { isAuthenticated, isAdmin, logout, fetchAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const endpoint = isAdmin
        ? `${process.env.REACT_APP_API_URL}/admin/logout`
        : `${process.env.REACT_APP_API_URL}/users/logout`;

      await axios.get(endpoint, { withCredentials: true });

      logout();
      await fetchAuth(); // Refresh context
      navigate(isAdmin ? "/admin_login" : "/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="header-main">
      <div className="header-logo" onClick={() => navigate("/")}>
        <img src="/BWlogo.png" alt="Logo" />
      </div>

      <nav className="header-nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
        <NavLink to="/support" className="nav-link">
          Support
        </NavLink>

        {isAuthenticated && (
          isAdmin ? (
            <NavLink to="/admin/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          ) : (
            <NavLink to="/student/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          )
        )}

        {!isAuthenticated ? (
          <NavLink to="/login" className="nav-link login-btn">
            Login
          </NavLink>
        ) : (
          <span onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </span>
        )}
      </nav>
    </header>
  );
};

export default HeaderDiv;
