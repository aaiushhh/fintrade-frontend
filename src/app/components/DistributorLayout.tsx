import { Outlet } from 'react-router';
import { DistributorSidebar } from './DistributorSidebar';

export function DistributorLayout() {
  return (
    <div className="min-h-screen bg-[var(--ft-bg)] flex">
      <DistributorSidebar />
      <div className="flex-1 overflow-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
