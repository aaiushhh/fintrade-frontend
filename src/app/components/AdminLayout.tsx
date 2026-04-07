import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { Loader2 } from 'lucide-react';

export function AdminLayout() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  // Double check role, though ProtectedRoute should handle this
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto bg-[#0F172A]">
        <Outlet />
      </div>
    </div>
  );
}
