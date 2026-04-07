import { Outlet } from 'react-router';
import { StudentSidebar } from './StudentSidebar';

export function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <StudentSidebar />
      <div className="flex-1 overflow-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
