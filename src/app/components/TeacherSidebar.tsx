import { Link, useLocation, useNavigate } from 'react-router';
import {
  TrendingUp, LayoutDashboard, Users, BookOpen, MessageCircle,
  FileText, BarChart3, User, LogOut
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

export function TeacherSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/teacher/students', label: 'Students', icon: Users },
    { path: '/teacher/lectures', label: 'Lectures', icon: BookOpen },
    { path: '/teacher/doubt-sessions', label: 'Doubt Sessions', icon: MessageCircle },
    { path: '/teacher/exams', label: 'Exams', icon: FileText },
    { path: '/teacher/reports', label: 'Reports', icon: BarChart3 },
  ];

  const displayName = user?.full_name || user?.name || user?.email || 'Faculty';
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Teacher';

  return (
    <div className="w-64 bg-[#111827] border-r border-[#334155] flex flex-col shrink-0">
      <div className="p-6 border-b border-[#334155]">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
          <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
        </Link>

        <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-[#9CA3AF]" />
            <span className="text-xs text-[#9CA3AF]">Role: {displayRole}</span>
          </div>
          <div className="text-sm font-medium text-[#E5E7EB] truncate">{displayName}</div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-[#00D1B2]/10 text-[#00D1B2]'
                    : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB]'
                }`}>
                  <Icon className="h-4 w-4" />
                  <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[#334155]">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-[#334155] bg-transparent text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
