import { Link, useLocation, useNavigate } from 'react-router';
import {
  TrendingUp, LayoutDashboard, BookOpen, Bot, FileText,
  BarChart3, LineChart, User, LogOut, ShoppingCart, Sun, Moon
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

export function StudentSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/courses', label: 'Browse Courses', icon: ShoppingCart },
    { path: '/student/modules', label: 'Modules', icon: BookOpen },
    { path: '/student/ai-tutor', label: 'AI Tutor', icon: Bot },
    { path: '/student/exams', label: 'Exams', icon: FileText },
    { path: '/student/performance', label: 'Performance', icon: BarChart3 },
    { path: '/student/simulator', label: 'Trading Simulator', icon: LineChart },
  ];

  const displayName = user?.full_name || user?.name || user?.email || 'Student';
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student';

  return (
    <div className="w-64 ft-sidebar flex flex-col shrink-0 border-r border-[var(--sidebar-border)]">
      <div className="p-6 border-b border-[var(--sidebar-border)]">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-[var(--ft-red)]" />
          <span className="text-xl font-medium text-[var(--sidebar-foreground)]">FinTrade</span>
        </Link>

        <div className="bg-[var(--sidebar-accent)] border border-[var(--sidebar-border)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-[var(--sidebar-foreground)] opacity-60" />
            <span className="text-xs text-[var(--sidebar-foreground)] opacity-60">Role: {displayRole}</span>
          </div>
          <div className="text-sm font-medium text-[var(--sidebar-foreground)] truncate">{displayName}</div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[var(--ft-red)] text-white'
                    : 'text-[var(--sidebar-foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--sidebar-accent)]'
                }`}>
                  <Icon className="h-4 w-4" />
                  <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[var(--sidebar-border)] space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--sidebar-foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--sidebar-accent)] transition-colors text-sm"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-[var(--sidebar-border)] bg-transparent text-red-400 hover:bg-[var(--ft-danger)]/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
