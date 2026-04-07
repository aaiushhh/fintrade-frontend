import { Outlet } from 'react-router';
import { TeacherSidebar } from './TeacherSidebar';

export function TeacherLayout() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <TeacherSidebar />
      <div className="flex-1 overflow-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
