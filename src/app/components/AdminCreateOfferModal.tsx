import { useState } from 'react';
import { Button } from './ui/button';
import { X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface AdminCreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminCreateOfferModal({ isOpen, onClose, onSuccess }: AdminCreateOfferModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 10,
    code: '',
    course_id: '',
    max_redemptions: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/admin/offers', {
        ...formData,
        course_id: formData.course_id ? parseInt(formData.course_id) : null,
      });
      onSuccess();
      onClose();
      setFormData({ title: '', description: '', discount_type: 'percentage', discount_value: 10, code: '', course_id: '', max_redemptions: 0, is_active: true });
    } catch (err: any) {
      setError(err.message || 'Failed to create offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[var(--ft-border)]">
          <h2 className="text-xl font-medium text-[var(--ft-charcoal)]">Create Offer</h2>
          <button onClick={onClose} className="text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)]/20 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Offer Title</label>
            <input required type="text" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="e.g. New Year Special"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Offer Code</label>
              <input required type="text" minLength={3} value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)] font-mono"
                placeholder="NEWYEAR20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Discount Type</label>
              <select value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">
                Discount Value {formData.discount_type === 'percentage' ? '(%)' : '(₹)'}
              </label>
              <input required type="number" min={1} value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Max Redemptions (0=unlimited)</label>
              <input type="number" min={0} value={formData.max_redemptions}
                onChange={(e) => setFormData({ ...formData, max_redemptions: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Course ID (optional — leave blank for all courses)</label>
            <input type="number" value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="Leave blank for global offers"
            />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="offer_active" checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 rounded border-[var(--ft-border)] bg-[var(--ft-bg)] text-[var(--ft-red)]"
            />
            <label htmlFor="offer_active" className="text-sm font-medium text-[var(--ft-charcoal)]">Active immediately</label>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[var(--ft-border)] mt-6">
            <Button type="button" onClick={onClose} variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 min-w-[100px]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Offer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
