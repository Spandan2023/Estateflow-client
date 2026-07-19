import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm font-medium text-slate-500">
          Loading EstateFlow CRM...
        </p>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardPath =
      user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard";

    return <Navigate to={dashboardPath} replace />;
  }

  return children;
}

export default ProtectedRoute;