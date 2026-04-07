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
      <div className="bg-[#111827] border border-[#334155] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#334155]">
          <h2 className="text-xl font-bold text-[#E5E7EB]">Create New Course</h2>
          <button 
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Course Title</label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              placeholder="e.g. Advanced Options Trading"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Short Description</label>
            <textarea 
              rows={2}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              placeholder="Brief overview of the course"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Full Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              placeholder="Detailed syllabus and what students will learn"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Price (₹)</label>
              <input 
                required
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Difficulty Level</label>
              <select 
                value={formData.difficulty_level}
                onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
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
              className="w-4 h-4 rounded border-[#334155] bg-[#0F172A] text-[#00D1B2] focus:ring-[#00D1B2]/50"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-[#E5E7EB]">
              Publish immediately
            </label>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[#334155] mt-6">
            <Button 
              type="button" 
              onClick={onClose}
              variant="outline" 
              className="border-[#334155] bg-transparent text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 min-w-[100px]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Course'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
