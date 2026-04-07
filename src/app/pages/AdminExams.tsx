import { useState, useEffect } from 'react';
import { Loader2, Plus, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { AdminCreateExamModal } from '../components/AdminCreateExamModal';

interface Exam {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  passing_score: number;
  is_active: boolean;
  questions: any[];
}

export function AdminExams() {
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
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <AdminCreateExamModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchExams} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Exam Management</h1>
          <p className="text-sm text-[#9CA3AF]">Create and manage entrance exams</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-9">
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Exams</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{exams.length}</div>
        </div>
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Active</div>
          <div className="text-3xl font-bold text-[#10B981] font-mono">{exams.filter(e => e.is_active).length}</div>
        </div>
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Inactive</div>
          <div className="text-3xl font-bold text-[#EF4444] font-mono">{exams.filter(e => !e.is_active).length}</div>
        </div>
      </div>

      <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">All Exams</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="text-left text-xs text-[#9CA3AF] pb-3">ID</th>
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Title</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Duration</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Pass Score</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Questions</th>
                <th className="text-center text-xs text-[#9CA3AF] pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-sm text-[#9CA3AF]">No exams created yet</td></tr>
              ) : (
                exams.map((exam) => (
                  <tr key={exam.id} className="border-b border-[#334155]">
                    <td className="py-4 text-sm font-mono text-[#9CA3AF]">#{exam.id}</td>
                    <td className="py-4 text-sm text-[#E5E7EB]">{exam.title}</td>
                    <td className="py-4 text-center text-sm font-mono text-[#E5E7EB]">{exam.duration_minutes} min</td>
                    <td className="py-4 text-center text-sm font-mono text-[#E5E7EB]">{exam.passing_score}%</td>
                    <td className="py-4 text-center text-sm font-mono text-[#E5E7EB]">{exam.questions?.length ?? '—'}</td>
                    <td className="py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${exam.is_active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                        {exam.is_active ? 'Active' : 'Inactive'}
                      </span>
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
