import { useState, useEffect } from 'react';
import { Loader2, Users, Tag, TrendingUp, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';

interface DistributorProfile {
  id: number;
  user_id: number;
  region: string;
  referral_code: string;
  discount_percentage: number;
  created_at: string;
  user_name: string | null;
  user_email: string | null;
}

interface DistributorStats {
  distributor_id: number;
  region: string;
  referral_code: string;
  total_students_referred: number;
  total_courses_purchased: number;
  total_revenue_generated: number;
}

interface Referral {
  id: number;
  student_id: number;
  student_name: string | null;
  student_email: string | null;
  course_id: number;
  course_title: string | null;
  created_at: string;
}

export function DistributorDashboard() {
  const [profile, setProfile] = useState<DistributorProfile | null>(null);
  const [stats, setStats] = useState<DistributorStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileData, statsData, referralsData] = await Promise.all([
          api.get('/distributor/profile'),
          api.get('/distributor/stats'),
          api.get('/distributor/referrals'),
        ]);
        setProfile(profileData);
        setStats(statsData);
        setReferrals(referralsData);
      } catch (err: any) {
        setError(err.message || 'Failed to load distributor data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const copyReferralCode = () => {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Distributor Dashboard</h1>
        <p className="text-sm text-[#9CA3AF]">Welcome back, {profile?.user_name || 'Distributor'}</p>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-[#9CA3AF]">Students Referred</div>
            <Users className="h-5 w-5 text-[#3B82F6]" />
          </div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{stats?.total_students_referred ?? 0}</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-[#9CA3AF]">Courses Purchased</div>
            <Tag className="h-5 w-5 text-[#A855F7]" />
          </div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{stats?.total_courses_purchased ?? 0}</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-[#9CA3AF]">Revenue Generated</div>
            <TrendingUp className="h-5 w-5 text-[#00D1B2]" />
          </div>
          <div className="text-3xl font-bold text-[#00D1B2] font-mono">₹{(stats?.total_revenue_generated ?? 0).toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Discount Rate</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{profile?.discount_percentage ?? 0}%</div>
          <div className="text-xs text-[#9CA3AF]">for referred students</div>
        </div>
      </div>

      {/* Referral Code + Profile */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Your Referral Code</h2>
          <div className="bg-[#0F172A] border border-[#334155] rounded-lg p-4 mb-4 flex items-center justify-between">
            <span className="text-2xl font-bold font-mono text-[#00D1B2]">{profile?.referral_code}</span>
            <Button onClick={copyReferralCode} variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-8 text-xs">
              {copied ? <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">Region</div>
              <div className="text-sm text-[#E5E7EB]">{profile?.region}</div>
            </div>
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">Email</div>
              <div className="text-sm text-[#E5E7EB]">{profile?.user_email}</div>
            </div>
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">Member Since</div>
              <div className="text-sm text-[#E5E7EB]">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}</div>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="col-span-2 bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Referred Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left text-xs text-[#9CA3AF] pb-3">Student</th>
                  <th className="text-left text-xs text-[#9CA3AF] pb-3">Email</th>
                  <th className="text-left text-xs text-[#9CA3AF] pb-3">Course</th>
                  <th className="text-right text-xs text-[#9CA3AF] pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {referrals.length === 0 ? (
                  <tr><td colSpan={4} className="py-8 text-center text-sm text-[#9CA3AF]">No referrals yet. Share your code to get started!</td></tr>
                ) : (
                  referrals.map((ref) => (
                    <tr key={ref.id} className="border-b border-[#334155]">
                      <td className="py-4 text-sm text-[#E5E7EB]">{ref.student_name || '—'}</td>
                      <td className="py-4 text-sm text-[#9CA3AF]">{ref.student_email || '—'}</td>
                      <td className="py-4 text-sm text-[#9CA3AF]">{ref.course_title || `Course #${ref.course_id}`}</td>
                      <td className="py-4 text-right text-sm text-[#9CA3AF]">{new Date(ref.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
