import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'faculty') return <Navigate to="/teacher/dashboard" replace />;
    if (user.role === 'distributor') return <Navigate to="/distributor/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
