import { Link, useLocation, useNavigate } from 'react-router';
import { 
  TrendingUp, LayoutDashboard, Users, BarChart3, User, LogOut, Sun, Moon
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

export function DistributorSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/distributor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/distributor/referrals', label: 'Referrals', icon: Users },
    { path: '/distributor/stats', label: 'Statistics', icon: BarChart3 },
  ];

  const displayName = user?.full_name || user?.name || user?.email || 'Distributor';

  return (
    <div className="w-64 ft-sidebar flex flex-col h-full sticky top-0 border-r border-[var(--sidebar-border)]">
      <div className="p-6 border-b border-[var(--sidebar-border)]">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-[var(--ft-red)]" />
          <span className="text-xl font-medium text-[var(--sidebar-foreground)]">FinTrade</span>
        </div>
        
        <div className="bg-[var(--sidebar-accent)] border border-[var(--sidebar-border)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-[var(--sidebar-foreground)] opacity-60" />
            <span className="text-xs text-[var(--sidebar-foreground)] opacity-60">Role: Distributor</span>
          </div>
          <div className="text-sm font-medium text-[var(--sidebar-foreground)]">{displayName}</div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={index} to={item.path} className="block">
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
