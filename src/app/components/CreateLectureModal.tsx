import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface CreateLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateLectureModal({ isOpen, onClose, onSuccess }: CreateLectureModalProps) {
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_id: '',
    scheduled_at: '',
    duration_minutes: 60,
    meeting_link: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchCourses = async () => {
        setLoadingCourses(true);
        try {
          const data = await api.get('/faculty/courses');
          setCourses(data);
          if (data.length > 0) {
            setFormData(prev => ({ ...prev, course_id: data[0].id.toString() }));
          }
        } catch (err: any) {
          setError('Failed to load courses');
        } finally {
          setLoadingCourses(false);
        }
      };
      fetchCourses();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course_id) {
      setError("Please select a course to schedule this lecture under.");
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Ensure scheduled_at is formatted properly, e.g. as ISO string if needed
      const payload = {
        ...formData,
        course_id: parseInt(formData.course_id, 10),
        scheduled_at: new Date(formData.scheduled_at).toISOString()
      };
      
      await api.post('/faculty/lectures/create', payload);
      onSuccess();
      onClose();
      // Reset
      setFormData({
        title: '',
        description: '',
        course_id: courses[0]?.id?.toString() || '',
        scheduled_at: '',
        duration_minutes: 60,
        meeting_link: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to schedule lecture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#111827] border border-[#334155] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#334155]">
          <h2 className="text-xl font-bold text-[#E5E7EB]">Schedule Lecture</h2>
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
            <label className="text-sm font-medium text-[#E5E7EB]">Lecture Title</label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              placeholder="e.g. Introduction to Options Pricing"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Course</label>
            {loadingCourses ? (
              <div className="text-[#9CA3AF] text-sm">Loading courses...</div>
            ) : (
              <select 
                required
                value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              >
                {courses.length === 0 && <option value="">No courses available</option>}
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Date & Time</label>
              <input 
                required
                type="datetime-local"
                value={formData.scheduled_at}
                onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Duration (minutes)</label>
              <input 
                required
                type="number"
                min="1"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Meeting Link (Optional)</label>
            <input 
              type="url"
              value={formData.meeting_link}
              onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              placeholder="https://zoom.us/j/..."
            />
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
              disabled={loading || loadingCourses || courses.length === 0}
              className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 min-w-[100px]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Schedule Lecture'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
