import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import "./AdminDashboard.css";
import {
  faUsers,
  faClipboardCheck,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { loading, user, isAuthenticated, isAdmin } = useAuthContext();

  const [stats, setStats] = useState({
    users: 0,
    paymentsPending: 0,
    activeBatches: 0,
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate("/");
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, paymentsRes, batchesRes] = await Promise.all([
          axios.get(`${API_BASE}/users`),
          axios.get(`${API_BASE}/payments?status=pending`),
          axios.get(`${API_BASE}/batches`),
        ]);

        setStats({
          users: usersRes.data.length,
          paymentsPending: paymentsRes.data.length,
          activeBatches: batchesRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <h1>Welcome, {user?.name}</h1>
      <p className="admin-role">Role: Admin</p>
      <div className="admin-widgets">
        <div className="widget users">
          <FontAwesomeIcon icon={faUsers} className="widget-icon" />
          <div>
            <h3>{stats.users}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="widget payments">
          <FontAwesomeIcon icon={faClipboardCheck} className="widget-icon" />
          <div>
            <h3>{stats.paymentsPending}</h3>
            <p>Pending Payments</p>
          </div>
        </div>

        <div className="widget batches">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="widget-icon" />
          <div>
            <h3>{stats.activeBatches}</h3>
            <p>Active Batches</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
