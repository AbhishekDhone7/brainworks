import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardCheck,
  faChalkboardTeacher,
  faChartBar,
  faUser,
  faUpload,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();

  const adminLinks = [
    { label: "Manage Users", icon: faUsers, path: "/admin/manage-students" },
    { label: "Verify Payments", icon: faClipboardCheck, path: "/admin/payments" },
    { label: "Manage Batches", icon: faChalkboardTeacher, path: "/admin/manage-batches" },
    { label: "Reports", icon: faChartBar, path: "/admin/reports" },
  ];

  const userLinks = [
    { label: "Dashboard", icon: faUser, path: "/student/dashboard" },
    { label: "Upload Payment", icon: faUpload, path: "/student/upload-payment" },
    { label: "Payment Slips", icon: faFileAlt, path: "/student/payment-slip" },
    { label: "Profile", icon: faUser, path: "/student/profile" },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <h2>{isAdmin ? "Admin Panel" : "User Panel"}</h2>
      <ul>
        {links.map(({ label, icon, path }) => (
          <li key={path} onClick={() => navigate(path)}>
            <FontAwesomeIcon icon={icon} /> {label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
