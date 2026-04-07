import { useState, useEffect } from 'react';
import { Loader2, Plus, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { AdminCreateOfferModal } from '../components/AdminCreateOfferModal';

interface Offer {
  id: number;
  title: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  code: string;
  course_id: number | null;
  max_redemptions: number;
  current_redemptions: number;
  is_active: boolean;
  valid_from: string | null;
  valid_until: string | null;
  created_at: string;
}

export function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchOffers = async () => {
    try {
      const data = await api.get('/admin/offers');
      setOffers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <AdminCreateOfferModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchOffers} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Offer Management</h1>
          <p className="text-sm text-[#9CA3AF]">Create and manage discount offers</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-9">
          <Plus className="h-4 w-4 mr-2" />
          Create Offer
        </Button>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#9CA3AF] mb-2">Total Offers</div>
              <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{offers.length}</div>
            </div>
            <Tag className="h-8 w-8 text-[#3B82F6]" />
          </div>
        </div>
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Active</div>
          <div className="text-3xl font-bold text-[#10B981] font-mono">{offers.filter(o => o.is_active).length}</div>
        </div>
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Redemptions</div>
          <div className="text-3xl font-bold text-[#00D1B2] font-mono">{offers.reduce((sum, o) => sum + o.current_redemptions, 0)}</div>
        </div>
      </div>

      <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">All Offers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Title</th>
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Code</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Discount</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Redemptions</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Status</th>
                <th className="text-right text-xs text-[#9CA3AF] pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {offers.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-sm text-[#9CA3AF]">No offers created yet</td></tr>
              ) : (
                offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-[#334155]">
                    <td className="py-4 text-sm text-[#E5E7EB]">{offer.title}</td>
                    <td className="py-4 text-sm font-mono text-[#00D1B2]">{offer.code}</td>
                    <td className="py-4 text-center text-sm font-mono text-[#E5E7EB]">
                      {offer.discount_type === 'percentage' ? `${offer.discount_value}%` : `₹${offer.discount_value}`}
                    </td>
                    <td className="py-4 text-center text-sm font-mono text-[#E5E7EB]">
                      {offer.current_redemptions}{offer.max_redemptions > 0 ? `/${offer.max_redemptions}` : ''}
                    </td>
                    <td className="py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${offer.is_active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                        {offer.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 text-right text-sm text-[#9CA3AF]">
                      {new Date(offer.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
