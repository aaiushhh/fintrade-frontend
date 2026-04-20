import { useState, useEffect } from 'react';
import { Loader2, Plus, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { AdminCreateExamModal } from '../components/AdminCreateExamModal';
import { AdminEditExamModal } from '../components/AdminEditExamModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

interface Exam {
  id: number;
  title: string;
  duration_minutes: number;
  passing_score: number;
  is_active: boolean;
  questions_count: number;
  type: string;
  course_id?: number;
  module_id?: number;
}

export function AdminExams() {
  const [entranceExams, setEntranceExams] = useState<Exam[]>([]);
  const [courseExams, setCourseExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const [examToEdit, setExamToEdit] = useState<Exam | null>(null);

  const fetchExams = async () => {
    try {
      const data: any = await api.get('/admin/exams/all');
      setEntranceExams(data.entrance_exams || []);
      setCourseExams(data.course_exams || []);
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
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  const renderTable = (exams: Exam[]) => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-[var(--ft-border)]">
          <th className="text-left text-xs text-[var(--ft-muted)] pb-3">ID</th>
          <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Title</th>
          <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Type</th>
          <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Duration</th>
          <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Pass Score</th>
          <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Questions</th>
          <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Status</th>
          <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.length === 0 ? (
          <tr><td colSpan={8} className="py-8 text-center text-sm text-[var(--ft-muted)]">No exams created yet</td></tr>
        ) : (
          exams.map((exam) => (
            <tr key={`${exam.type}-${exam.id}`} className="border-b border-[var(--ft-border)]">
              <td className="py-4 text-sm font-mono text-[var(--ft-muted)]">#{exam.id}</td>
              <td className="py-4 text-sm text-[var(--ft-charcoal)]">{exam.title}</td>
              <td className="py-4 text-center text-sm text-[var(--ft-charcoal)] capitalize">{exam.type.replace('_', ' ')}</td>
              <td className="py-4 text-center text-sm font-mono text-[var(--ft-charcoal)]">{exam.duration_minutes} min</td>
              <td className="py-4 text-center text-sm font-mono text-[var(--ft-charcoal)]">{exam.passing_score}%</td>
              <td className="py-4 text-center text-sm font-mono text-[var(--ft-charcoal)]">{exam.questions_count ?? 0}</td>
              <td className="py-4 text-center">
                <span className={`text-xs px-2 py-1 rounded-full ${exam.is_active ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]' : 'bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]'}`}>
                  {exam.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-4 text-center">
                <Button onClick={() => setExamToEdit(exam)} variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const totalExams = entranceExams.length + courseExams.length;
  const activeExams = entranceExams.filter(e => e.is_active).length + courseExams.filter(e => e.is_active).length;

  return (
    <div className="p-8">
      <AdminCreateExamModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchExams} />
      <AdminEditExamModal isOpen={!!examToEdit} exam={examToEdit} onClose={() => setExamToEdit(null)} onSuccess={fetchExams} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Exam Management</h1>
          <p className="text-sm text-[var(--ft-muted)]">Create and manage entrance and course exams</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-9">
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Total Exams</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">{totalExams}</div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Active</div>
          <div className="text-3xl font-medium text-[var(--ft-success)] font-mono">{activeExams}</div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Inactive</div>
          <div className="text-3xl font-medium text-[var(--ft-danger)] font-mono">{totalExams - activeExams}</div>
        </div>
      </div>

      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
        <Tabs defaultValue="entrance" className="w-full">
            <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-[var(--ft-bg)] border border-[var(--ft-border)]">
                    <TabsTrigger value="entrance" className="data-[state=active]:bg-[var(--ft-red)] data-[state=active]:text-white">
                        Entrance Exams
                    </TabsTrigger>
                    <TabsTrigger value="course" className="data-[state=active]:bg-[var(--ft-red)] data-[state=active]:text-white">
                        Course & Module Exams
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="entrance" className="mt-0">
                <div className="overflow-x-auto">
                    {renderTable(entranceExams)}
                </div>
            </TabsContent>

            <TabsContent value="course" className="mt-0">
                <div className="overflow-x-auto">
                    {renderTable(courseExams)}
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
