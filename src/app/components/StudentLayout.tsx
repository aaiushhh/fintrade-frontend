import { Outlet } from 'react-router';
import { StudentSidebar } from './StudentSidebar';

export function StudentLayout() {
  return (
    <div className="min-h-screen bg-[var(--ft-bg)] flex">
      <StudentSidebar />
      <div className="flex-1 overflow-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
