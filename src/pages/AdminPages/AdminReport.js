import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, LineChart, Line,
  ResponsiveContainer, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import "./AdminReport.css";

const AdminReport = () => {
  const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#2196F3", "#9C27B0"];

  const paymentStatusData = [
    { name: "Completed", value: 65 },
    { name: "Pending", value: 25 },
    { name: "Failed", value: 10 },
  ];

  const usersPerBatch = [
    { batch: "Batch A", users: 40 },
    { batch: "Batch B", users: 25 },
    { batch: "Batch C", users: 35 },
  ];

  const paymentsOverTime = [
    { date: "Jul 1", payments: 5 },
    { date: "Jul 3", payments: 10 },
    { date: "Jul 5", payments: 15 },
    { date: "Jul 7", payments: 20 },
    { date: "Jul 10", payments: 8 },
  ];

  const batchDistribution = [
    { name: "Batch A", value: 45 },
    { name: "Batch B", value: 30 },
    { name: "Batch C", value: 25 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 8000 },
    { month: "Mar", revenue: 7500 },
    { month: "Apr", revenue: 6000 },
    { month: "May", revenue: 9000 },
    { month: "Jun", revenue: 10000 },
  ];

  const batchPaymentStatus = [
    { batch: "Batch A", Completed: 25, Pending: 10, Failed: 5 },
    { batch: "Batch B", Completed: 15, Pending: 5, Failed: 5 },
    { batch: "Batch C", Completed: 30, Pending: 3, Failed: 2 },
  ];

  const batchMetrics = [
    { metric: "Attendance", A: 80, B: 70, C: 85 },
    { metric: "Performance", A: 75, B: 65, C: 80 },
    { metric: "Completion", A: 90, B: 60, C: 85 },
  ];

  return (
    <div className="admin-report-page">
      <h2 className="report-title">Admin Reports Dashboard</h2>

      <div className="chart-grid">
        {/* 1. Pie Chart - Payment Status */}
        <div className="chart-card">
          <h3>Payment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={paymentStatusData} dataKey="value" outerRadius={80} label>
                {paymentStatusData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Doughnut Chart - Batch Distribution */}
        <div className="chart-card">
          <h3>Batch Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={batchDistribution} dataKey="value" innerRadius={50} outerRadius={80} label>
                {batchDistribution.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Line Chart - Payments Over Time */}
        <div className="chart-card">
          <h3>Payments Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={paymentsOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="payments" stroke="#2196F3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Bar Chart - Users Per Batch */}
        <div className="chart-card">
          <h3>Users Per Batch</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={usersPerBatch}>
              <XAxis dataKey="batch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#673AB7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 5. Area Chart - Revenue Trend */}
        <div className="chart-card">
          <h3>Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#4CAF50" fill="#C8E6C9" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 6. Stacked Bar - Batch-wise Payment Status */}
        <div className="chart-card">
          <h3>Batch-wise Payment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={batchPaymentStatus}>
              <XAxis dataKey="batch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Completed" stackId="a" fill="#4CAF50" />
              <Bar dataKey="Pending" stackId="a" fill="#FFC107" />
              <Bar dataKey="Failed" stackId="a" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 7. Radar Chart - Batch Comparison */}
        <div className="chart-card">
          <h3>Batch Comparison (Radar)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={90} data={batchMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis />
              <Radar name="Batch A" dataKey="A" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} />
              <Radar name="Batch B" dataKey="B" stroke="#2196F3" fill="#2196F3" fillOpacity={0.6} />
              <Radar name="Batch C" dataKey="C" stroke="#FF9800" fill="#FF9800" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
