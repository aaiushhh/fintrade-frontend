import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Loader2, FileText
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { AdminCreateExamModal } from '../components/AdminCreateExamModal';
import { useAuth } from '../context/AuthContext';

interface Exam {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  passing_score: number;
  is_active: boolean;
  questions: any[];
}

export function TeacherExams() {
  const { user } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchExams = async () => {
    try {
      const data = await api.get('/exams/entrance');
      setExams(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExams(); }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {user?.role === 'admin' && (
        <AdminCreateExamModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchExams} />
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Exams Management</h1>
          <p className="text-sm text-[#9CA3AF]">View and manage exam content</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsCreateOpen(true)} className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-9">
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>
      )}

      {/* Exams List */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {exams.length === 0 ? (
          <div className="col-span-3 text-center text-sm text-[#9CA3AF] py-12 bg-[#111827] border border-[#334155] rounded-lg">
            No exams found.
          </div>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-[#3B82F6]" />
                <h3 className="text-base font-semibold text-[#E5E7EB]">{exam.title}</h3>
              </div>
              {exam.description && <div className="text-sm text-[#9CA3AF] mb-4">{exam.description}</div>}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">Questions</span>
                  <span className="text-[#E5E7EB] font-mono">{exam.questions?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">Duration</span>
                  <span className="text-[#E5E7EB] font-mono">{exam.duration_minutes} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">Pass Score</span>
                  <span className="text-[#E5E7EB] font-mono">{exam.passing_score}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">Status</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${exam.is_active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                    {exam.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                <Edit2 className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
