import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', { email, full_name: name, password, phone });
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
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-[#00D1B2]" />
            <span className="text-2xl font-bold text-[#E5E7EB]">FinTrade</span>
          </div>
          <h1 className="text-2xl font-bold text-[#E5E7EB] mb-2">Create Account</h1>
          <p className="text-sm text-[#9CA3AF]">Start your trading education journey</p>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-8">
          <form className="space-y-5" onSubmit={handleSignup}>
            {error && <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded border border-red-500/20">{error}</div>}
            <div>
              <Label htmlFor="name" className="text-[#E5E7EB]">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="mt-2 bg-[#1F2937] border-[#334155] text-[#E5E7EB] placeholder:text-[#9CA3AF]"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[#E5E7EB]">Email Address</Label>
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
              <Label htmlFor="phone" className="text-[#E5E7EB]">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
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
                placeholder="Create a strong password"
                className="mt-2 bg-[#1F2937] border-[#334155] text-[#E5E7EB] placeholder:text-[#9CA3AF]"
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-11 mt-6">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00D1B2] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
