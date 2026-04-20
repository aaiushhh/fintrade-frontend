import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const rawUser = response.user;
      const role = rawUser.role || (Array.isArray(rawUser.roles) && rawUser.roles.length > 0 ? rawUser.roles[0].name : 'student');
      const normalizedUser = { ...rawUser, role };
      login(response.access_token, normalizedUser);
      
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'faculty') navigate('/teacher/dashboard');
      else if (role === 'distributor') navigate('/distributor/dashboard');
      else navigate('/student/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ft-bg)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-[var(--ft-red)]" />
            <span className="text-2xl font-medium text-[var(--ft-charcoal)]">FinTrade</span>
          </div>
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-2">Welcome Back</h1>
          <p className="text-sm text-[var(--ft-muted)]">Login to access your dashboard</p>
        </div>

        <div className="ft-card p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && <div className="text-[var(--ft-danger)] text-sm p-3 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">{error}</div>}
            <div>
              <Label htmlFor="email" className="text-[var(--ft-slate)]">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul.sharma@email.com"
                className="mt-2 bg-[var(--ft-surface)] border-[var(--ft-border)] text-[var(--ft-charcoal)] placeholder:text-[var(--ft-muted)]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[var(--ft-slate)]">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 bg-[var(--ft-surface)] border-[var(--ft-border)] text-[var(--ft-charcoal)] placeholder:text-[var(--ft-muted)]"
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full ft-btn-primary h-11 text-white">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--ft-muted)]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[var(--ft-red)] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
