import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface AdminEditExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  exam: any;
}

export function AdminEditExamModal({ isOpen, onClose, onSuccess, exam }: AdminEditExamModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    duration_minutes: 30,
    passing_score: 60,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && exam) {
      setFormData({
        title: exam.title || '',
        duration_minutes: exam.duration_minutes || 30,
        passing_score: exam.passing_score || 60,
        is_active: exam.is_active,
      });
      setError('');
    }
  }, [isOpen, exam]);

  if (!isOpen || !exam) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = exam.type === 'entrance' 
          ? `/admin/exams/${exam.id}` 
          : `/admin/course-exams/${exam.id}`;
      
      await api.put(endpoint, formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[var(--ft-border)]">
          <h2 className="text-xl font-medium text-[var(--ft-charcoal)]">Edit Exam Metadata</h2>
          <button onClick={onClose} className="text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)]/20 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Exam Title</label>
            <input
              required type="text" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Duration (min)</label>
              <input
                required type="number" min={1} value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Pass Score (%)</label>
              <input
                required type="number" min={0} max={100} value={formData.passing_score}
                onChange={(e) => setFormData({ ...formData, passing_score: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-sm text-[var(--ft-charcoal)] cursor-pointer">
              <input type="checkbox" checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded border-[var(--ft-border)] text-[var(--ft-red)]"
              />
              Active Status
            </label>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[var(--ft-border)] mt-6">
            <Button type="button" onClick={onClose} variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 min-w-[100px]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
