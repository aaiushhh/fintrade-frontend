import { useState } from 'react';
import { Button } from './ui/button';
import { X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateCourseModal({ isOpen, onClose, onSuccess }: CreateCourseModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    price: 0,
    difficulty_level: 'beginner',
    is_published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/admin/courses', formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        short_description: '',
        price: 0,
        difficulty_level: 'beginner',
        is_published: false,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[var(--ft-border)]">
          <h2 className="text-xl font-medium text-[var(--ft-charcoal)]">Create New Course</h2>
          <button 
            onClick={onClose}
            className="text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)]/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Course Title</label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="e.g. Advanced Options Trading"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Short Description</label>
            <textarea 
              rows={2}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="Brief overview of the course"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Full Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="Detailed syllabus and what students will learn"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Price (₹)</label>
              <input 
                required
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Difficulty Level</label>
              <select 
                value={formData.difficulty_level}
                onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2.5 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input 
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-[var(--ft-border)] bg-[var(--ft-bg)] text-[var(--ft-red)] focus:ring-[var(--ft-red)]/50"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-[var(--ft-charcoal)]">
              Publish immediately
            </label>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[var(--ft-border)] mt-6">
            <Button 
              type="button" 
              onClick={onClose}
              variant="outline" 
              className="border-[var(--ft-border)] bg-transparent text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 min-w-[100px]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Course'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
