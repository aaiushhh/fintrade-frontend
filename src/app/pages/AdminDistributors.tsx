import { useState, useEffect } from 'react';
import { Loader2, Users, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';

interface Distributor {
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
  user_name: string | null;
  total_students_referred: number;
  total_courses_purchased: number;
  total_revenue_generated: number;
}

export function AdminDistributors() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [selectedStats, setSelectedStats] = useState<DistributorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const data = await api.get('/admin/distributors');
        setDistributors(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load distributors');
      } finally {
        setLoading(false);
      }
    };
    fetchDistributors();
  }, []);

  const viewStats = async (distributorId: number) => {
    setStatsLoading(true);
    setSelectedStats(null);
    try {
      const data = await api.get(`/admin/distributors/${distributorId}/stats`);
      setSelectedStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load distributor stats');
    } finally {
      setStatsLoading(false);
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
        <div className="flex items-center gap-3 mb-1">
          <Users className="h-8 w-8 text-[#A855F7]" />
          <h1 className="text-2xl font-bold text-[#E5E7EB]">Distributor Management</h1>
        </div>
        <p className="text-sm text-[#9CA3AF]">View distributor profiles, referral codes, and performance stats</p>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Distributors</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{distributors.length}</div>
        </div>
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Regions Covered</div>
          <div className="text-3xl font-bold text-[#A855F7] font-mono">{new Set(distributors.map(d => d.region)).size}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Distributors List */}
        <div className="col-span-2 bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">All Distributors</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left text-xs text-[#9CA3AF] pb-3">Name</th>
                  <th className="text-left text-xs text-[#9CA3AF] pb-3">Region</th>
                  <th className="text-left text-xs text-[#9CA3AF] pb-3">Referral Code</th>
                  <th className="text-center text-xs text-[#9CA3AF] pb-3">Discount</th>
                  <th className="text-right text-xs text-[#9CA3AF] pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {distributors.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-sm text-[#9CA3AF]">No distributors found</td></tr>
                ) : (
                  distributors.map((d) => (
                    <tr key={d.id} className="border-b border-[#334155] hover:bg-[#1F2937] transition-colors">
                      <td className="py-4">
                        <div className="text-sm text-[#E5E7EB]">{d.user_name || '—'}</div>
                        <div className="text-xs text-[#9CA3AF]">{d.user_email}</div>
                      </td>
                      <td className="py-4 text-sm text-[#9CA3AF]">{d.region}</td>
                      <td className="py-4 text-sm font-mono text-[#00D1B2]">{d.referral_code}</td>
                      <td className="py-4 text-center text-sm font-mono text-[#E5E7EB]">{d.discount_percentage}%</td>
                      <td className="py-4 text-right">
                        <Button onClick={() => viewStats(d.id)} variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-8 text-xs">
                          View Stats <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-sm font-semibold text-[#E5E7EB] mb-4">Distributor Stats</h2>
          {statsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 text-[#00D1B2] animate-spin" />
            </div>
          ) : selectedStats ? (
            <div className="space-y-4">
              <div className="text-sm text-[#E5E7EB] font-medium mb-3">{selectedStats.user_name || 'Distributor'}</div>
              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">Region</div>
                <div className="text-sm text-[#E5E7EB]">{selectedStats.region}</div>
              </div>
              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">Referral Code</div>
                <div className="text-sm font-mono text-[#00D1B2]">{selectedStats.referral_code}</div>
              </div>
              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">Students Referred</div>
                <div className="text-2xl font-bold font-mono text-[#E5E7EB]">{selectedStats.total_students_referred}</div>
              </div>
              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">Courses Purchased</div>
                <div className="text-2xl font-bold font-mono text-[#E5E7EB]">{selectedStats.total_courses_purchased}</div>
              </div>
              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">Revenue Generated</div>
                <div className="text-2xl font-bold font-mono text-[#00D1B2]">₹{selectedStats.total_revenue_generated.toLocaleString('en-IN')}</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-sm text-[#9CA3AF] py-12">
              Select a distributor to view stats
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
