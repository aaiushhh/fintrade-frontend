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
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
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
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Exams Management</h1>
          <p className="text-sm text-[var(--ft-muted)]">View and manage exam content</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsCreateOpen(true)} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-9">
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">{error}</div>
      )}

      {/* Exams List */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {exams.length === 0 ? (
          <div className="col-span-3 text-center text-sm text-[var(--ft-muted)] py-12 bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg">
            No exams found.
          </div>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-[var(--ft-red)]" />
                <h3 className="text-base font-semibold text-[var(--ft-charcoal)]">{exam.title}</h3>
              </div>
              {exam.description && <div className="text-sm text-[var(--ft-muted)] mb-4">{exam.description}</div>}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--ft-muted)]">Questions</span>
                  <span className="text-[var(--ft-charcoal)] font-mono">{exam.questions?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--ft-muted)]">Duration</span>
                  <span className="text-[var(--ft-charcoal)] font-mono">{exam.duration_minutes} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--ft-muted)]">Pass Score</span>
                  <span className="text-[var(--ft-charcoal)] font-mono">{exam.passing_score}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--ft-muted)]">Status</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${exam.is_active ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]' : 'bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]'}`}>
                    {exam.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-[var(--ft-border)] bg-transparent text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
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
