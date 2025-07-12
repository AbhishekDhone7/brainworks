import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Common Components
import HeaderDiv from "./components/Header";

import SidebarLayout from "./layouts/SidebarLayout";

// Auth Guards
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PrivateRoute from "./components/auth/PrivateRoute";

// Auth Pages
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/Register/Register";
import AdminLoginPage from "./pages/LoginPage/AdminLogin";
import AdminRegister from "./pages/Register/AdminRegister";

// Student Pages
import UserDashboard from "./pages/UserPages/Dashbord/Dashboard";
import StudentCource from "./pages/UserPages/StudentCource";
import AddPayment from "./pages/UserPages/UploadPayment";
import PaymentSlips from "./pages/UserPages/PaymentSlips";
import ProfilePage from "./pages/UserPages/Profile";

// Admin Pages
import AdminPanel from "./pages/AdminPages/AdminPanel";
import ManageBatches from "./pages/AdminPages/ManageBatches";
import ManageStudents from "./pages/AdminPages/ManageStudents";
import VerifyPayments from "./pages/AdminPages/VerifyPayments";

// Other Pages
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/OtherPages/HomePage/Home";
import AboutPage from "./pages/OtherPages/About/About";
import SupportPage from "./pages/OtherPages/Support/Support";
import AdminReport from "./pages/AdminPages/AdminReport";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <HeaderDiv />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin_login" element={<AdminLoginPage />} />
          <Route path="/admin_register" element={<AdminRegister />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* Protected User Routes with Sidebar */}
          <Route
            element={
              <ProtectedRoute>
                <SidebarLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/student/dashboard" element={<UserDashboard />} />
            <Route path="/student/courses" element={<StudentCource />} />
            <Route path="/student/upload-payment" element={<AddPayment />} />
            <Route path="/student/payment-slip" element={<PaymentSlips />} />
            <Route path="/student/profile" element={<ProfilePage />} />
          </Route>

          {/* Private Admin Routes with Sidebar */}
          <Route
            element={
              <PrivateRoute>
                <SidebarLayout />
              </PrivateRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="/admin/manage-batches" element={<ManageBatches />} />
            <Route path="/admin/manage-students" element={<ManageStudents />} />
            <Route path="/admin/payments" element={<VerifyPayments />} />
            <Route path="/admin/reports" element={<AdminReport />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
