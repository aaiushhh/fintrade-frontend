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
      // Backend returns roles: [{id, name}] — extract flat role string
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
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-[#00D1B2]" />
            <span className="text-2xl font-bold text-[#E5E7EB]">FinTrade</span>
          </div>
          <h1 className="text-2xl font-bold text-[#E5E7EB] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#9CA3AF]">Login to access your dashboard</p>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded border border-red-500/20">{error}</div>}
            <div>
              <Label htmlFor="email" className="text-[#E5E7EB]">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul.sharma@email.com"
                className="mt-2 bg-[#1F2937] border-[#334155] text-[#E5E7EB] placeholder:text-[#9CA3AF]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#E5E7EB]">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 bg-[#1F2937] border-[#334155] text-[#E5E7EB] placeholder:text-[#9CA3AF]"
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-11">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#00D1B2] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}
