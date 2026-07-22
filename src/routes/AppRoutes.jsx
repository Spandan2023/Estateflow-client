import { Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import PublicProperties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProperties from "../pages/admin/Properties";
import EmployeeRequests from "../pages/admin/EmployeeRequests";
import CreateProperty from "../pages/admin/CreateProperty";
import Employees from "../pages/admin/Employees";
import Inquiries from "../pages/admin/Inquiries";

// Employee Pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeProperties from "../pages/employee/Properties";
import SubmitProperty from "../pages/employee/SubmitProperty";
import Profile from "../pages/employee/Profile";
import EmployeeInquiries from "../pages/employee/Inquiries";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public Property Listing */}
      <Route path="/properties" element={<PublicProperties />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employee-requests"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EmployeeRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employees"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/properties"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminProperties />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/properties/create"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreateProperty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inquiries"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Inquiries />
          </ProtectedRoute>
        }
      />

      {/* ================= EMPLOYEE ROUTES ================= */}

      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/properties"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeProperties />
          </ProtectedRoute>
        }
      />

      <Route
  path="/employee/inquiries"
  element={
    <ProtectedRoute allowedRoles={["employee"]}>
      <EmployeeInquiries />
    </ProtectedRoute>
  }
/>

      <Route
        path="/employee/properties/submit"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <SubmitProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/profile"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
