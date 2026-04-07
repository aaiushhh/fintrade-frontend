import { Outlet } from 'react-router';
import { DistributorSidebar } from './DistributorSidebar';

export function DistributorLayout() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <DistributorSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
