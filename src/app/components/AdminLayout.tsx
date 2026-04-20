import { Outlet } from 'react-router';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[var(--ft-bg)] flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
