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
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <AdminCreateOfferModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchOffers} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Offer Management</h1>
          <p className="text-sm text-[var(--ft-muted)]">Create and manage discount offers</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-9">
          <Plus className="h-4 w-4 mr-2" />
          Create Offer
        </Button>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[var(--ft-muted)] mb-2">Total Offers</div>
              <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">{offers.length}</div>
            </div>
            <Tag className="h-8 w-8 text-[var(--ft-red)]" />
          </div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Active</div>
          <div className="text-3xl font-medium text-[var(--ft-success)] font-mono">{offers.filter(o => o.is_active).length}</div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Total Redemptions</div>
          <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">{offers.reduce((sum, o) => sum + o.current_redemptions, 0)}</div>
        </div>
      </div>

      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">All Offers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ft-border)]">
                <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Title</th>
                <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Code</th>
                <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Discount</th>
                <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Redemptions</th>
                <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Status</th>
                <th className="text-right text-xs text-[var(--ft-muted)] pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {offers.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-sm text-[var(--ft-muted)]">No offers created yet</td></tr>
              ) : (
                offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-[var(--ft-border)]">
                    <td className="py-4 text-sm text-[var(--ft-charcoal)]">{offer.title}</td>
                    <td className="py-4 text-sm font-mono text-[var(--ft-red)]">{offer.code}</td>
                    <td className="py-4 text-center text-sm font-mono text-[var(--ft-charcoal)]">
                      {offer.discount_type === 'percentage' ? `${offer.discount_value}%` : `₹${offer.discount_value}`}
                    </td>
                    <td className="py-4 text-center text-sm font-mono text-[var(--ft-charcoal)]">
                      {offer.current_redemptions}{offer.max_redemptions > 0 ? `/${offer.max_redemptions}` : ''}
                    </td>
                    <td className="py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${offer.is_active ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]' : 'bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]'}`}>
                        {offer.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 text-right text-sm text-[var(--ft-muted)]">
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
