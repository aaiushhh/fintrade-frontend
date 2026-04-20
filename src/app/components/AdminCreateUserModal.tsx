import { useState } from 'react';
import { Button } from './ui/button';
import { X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface AdminCreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminCreateUserModal({ isOpen, onClose, onSuccess }: AdminCreateUserModalProps) {
  const [role, setRole] = useState<'admin' | 'faculty' | 'distributor'>('faculty');
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone: '',
    password: '',
    // distributor-only fields
    region: '',
    referral_code: '',
    discount_percentage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const basePayload = {
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password,
        phone: formData.phone || undefined,
      };

      if (role === 'admin') {
        await api.post('/admin/users/create-admin', basePayload);
      } else if (role === 'faculty') {
        await api.post('/admin/users/create-faculty', basePayload);
      } else {
        await api.post('/admin/users/create-distributor', {
          ...basePayload,
          region: formData.region,
          referral_code: formData.referral_code,
          discount_percentage: formData.discount_percentage,
        });
      }
      onSuccess();
      onClose();
      setFormData({ email: '', full_name: '', phone: '', password: '', region: '', referral_code: '', discount_percentage: 10 });
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[var(--ft-border)]">
          <h2 className="text-xl font-medium text-[var(--ft-charcoal)]">Create User</h2>
          <button onClick={onClose} className="text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)]/20 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
            >
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
              <option value="distributor">Distributor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Full Name</label>
            <input
              required type="text" value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="Full name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Email</label>
            <input
              required type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="user@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Phone (optional)</label>
            <input
              type="tel" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Password</label>
            <input
              required type="password" minLength={8} value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="Min 8 characters"
            />
          </div>

          {role === 'distributor' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--ft-charcoal)]">Region</label>
                <input
                  required type="text" value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
                  placeholder="e.g. Mumbai, Maharashtra"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--ft-charcoal)]">Referral Code</label>
                  <input
                    required type="text" minLength={3} value={formData.referral_code}
                    onChange={(e) => setFormData({ ...formData, referral_code: e.target.value })}
                    className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
                    placeholder="DIST100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--ft-charcoal)]">Discount %</label>
                  <input
                    required type="number" min={0} max={100} value={formData.discount_percentage}
                    onChange={(e) => setFormData({ ...formData, discount_percentage: Number(e.target.value) })}
                    className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[var(--ft-border)] mt-6">
            <Button type="button" onClick={onClose} variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 min-w-[100px]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `Create ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
