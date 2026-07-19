import { Route, Routes } from "react-router-dom";
import Properties from "../pages/admin/Properties";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminDashboard from "../pages/admin/Dashboard";
import EmployeeDashboard from "../pages/employee/Dashboard";
import NotFound from "../pages/NotFound";
import EmployeeRequests from "../pages/admin/EmployeeRequests";
import CreateProperty from "../pages/admin/CreateProperty";
import ProtectedRoute from "./ProtectedRoute";
import SubmitProperty from "../pages/employee/SubmitProperty";
import Employees from "../pages/admin/Employees";
import Profile from "../pages/employee/Profile";
import EmployeeProperties from "../pages/employee/Properties";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

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
            <Properties />
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
        path="/employee/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
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
        path="/employee/properties"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeProperties />
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
