import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface AdminCreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface QuestionInput {
  question_text: string;
  options: { option_text: string; is_correct: boolean }[];
}

export function AdminCreateExamModal({ isOpen, onClose, onSuccess }: AdminCreateExamModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_id: 0,
    duration_minutes: 30,
    passing_score: 60,
    is_active: true,
  });
  const [courses, setCourses] = useState<{id: number, title: string}[]>([]);

  useEffect(() => {
    if (isOpen) {
      api.get('/courses').then(data => {
        const fetchedCourses = Array.isArray(data) ? data : [];
        setCourses(fetchedCourses);
        if (fetchedCourses.length > 0) {
          setFormData(prev => ({ ...prev, course_id: fetchedCourses[0].id }));
        }
      }).catch(() => {});
    }
  }, [isOpen]);

  const [questions, setQuestions] = useState<QuestionInput[]>([
    { question_text: '', options: [
      { option_text: '', is_correct: true },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
    ]},
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const addQuestion = () => {
    setQuestions([...questions, {
      question_text: '',
      options: [
        { option_text: '', is_correct: true },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
      ],
    }]);
  };

  const updateQuestion = (qi: number, text: string) => {
    const updated = [...questions];
    updated[qi].question_text = text;
    setQuestions(updated);
  };

  const updateOption = (qi: number, oi: number, text: string) => {
    const updated = [...questions];
    updated[qi].options[oi].option_text = text;
    setQuestions(updated);
  };

  const setCorrectOption = (qi: number, oi: number) => {
    const updated = [...questions];
    updated[qi].options = updated[qi].options.map((o, idx) => ({ ...o, is_correct: idx === oi }));
    setQuestions(updated);
  };

  const removeQuestion = (qi: number) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== qi));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/admin/exams/create', {
        ...formData,
        questions: questions.map(q => ({
          question_text: q.question_text,
          options: q.options,
        })),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#111827] border border-[#334155] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#334155]">
          <h2 className="text-xl font-bold text-[#E5E7EB]">Create Entrance Exam</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Exam Title</label>
            <input
              required type="text" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              placeholder="e.g. Trading Entrance Exam"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E5E7EB]">Associated Course</label>
            <select
              required value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: Number(e.target.value) })}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
            >
              {courses.length === 0 && <option value={0}>No courses available</option>}
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Duration (min)</label>
              <input
                required type="number" min={1} value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Pass Score (%)</label>
              <input
                required type="number" min={0} max={100} value={formData.passing_score}
                onChange={(e) => setFormData({ ...formData, passing_score: Number(e.target.value) })}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
              />
            </div>
            <div className="space-y-2 flex items-end">
              <label className="flex items-center gap-2 text-sm text-[#E5E7EB] pb-2">
                <input type="checkbox" checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-[#334155] bg-[#0F172A] text-[#00D1B2]"
                />
                Active
              </label>
            </div>
          </div>

          <div className="border-t border-[#334155] pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#E5E7EB]">Questions ({questions.length})</h3>
              <Button type="button" onClick={addQuestion} className="bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 h-8 text-xs">
                + Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((q, qi) => (
                <div key={qi} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#9CA3AF]">Q{qi + 1}</span>
                    {questions.length > 1 && (
                      <button type="button" onClick={() => removeQuestion(qi)} className="text-[#EF4444] text-xs hover:underline">Remove</button>
                    )}
                  </div>
                  <input
                    required type="text" value={q.question_text}
                    onChange={(e) => updateQuestion(qi, e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2 text-sm text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2] mb-3"
                    placeholder="Question text..."
                  />
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <button type="button" onClick={() => setCorrectOption(qi, oi)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${opt.is_correct ? 'border-[#10B981] bg-[#10B981]/10' : 'border-[#334155]'}`}
                        >
                          {opt.is_correct && <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />}
                        </button>
                        <input
                          required type="text" value={opt.option_text}
                          onChange={(e) => updateOption(qi, oi, e.target.value)}
                          className="flex-1 bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-1.5 text-sm text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
                          placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[#334155] mt-6">
            <Button type="button" onClick={onClose} variant="outline" className="border-[#334155] bg-transparent text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 min-w-[100px]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Exam'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
