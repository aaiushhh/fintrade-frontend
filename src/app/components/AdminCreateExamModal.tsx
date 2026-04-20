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
  question_type: string;
  options: { option_text: string; is_correct: boolean }[];
}

export function AdminCreateExamModal({ isOpen, onClose, onSuccess }: AdminCreateExamModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_id: 0,
    module_id: 0,
    exam_type: 'entrance', // 'entrance', 'course_final', 'module_final'
    duration_minutes: 30,
    passing_score: 60,
    is_active: true,
  });
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);

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

  useEffect(() => {
    if (formData.course_id && formData.exam_type !== 'entrance') {
      api.get(`/courses/${formData.course_id}`).then(data => {
        setModules(data.modules || []);
      }).catch(() => setModules([]));
    }
  }, [formData.course_id, formData.exam_type]);

  const [questions, setQuestions] = useState<QuestionInput[]>([
    { question_text: '', question_type: 'mcq', options: [
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
      question_type: 'mcq',
      options: [
        { option_text: '', is_correct: true },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
      ],
    }]);
  };

  const updateQuestion = (qi: number, field: string, value: string) => {
    const updated = [...questions];
    (updated[qi] as any)[field] = value;
    
    // If switching to true/false, reset options
    if (field === 'question_type' && value === 'true_false') {
      updated[qi].options = [
        { option_text: 'True', is_correct: true },
        { option_text: 'False', is_correct: false },
      ];
    } else if (field === 'question_type' && value === 'mcq' && updated[qi].options.length === 2) {
      updated[qi].options = [
        { option_text: '', is_correct: true },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
      ];
    }
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
      const isEntrance = formData.exam_type === 'entrance';
      const endpoint = isEntrance ? '/admin/exams/create' : '/admin/exams/course-create';
      
      const payload: any = {
        title: formData.title,
        description: formData.description,
        course_id: formData.course_id,
        duration_minutes: formData.duration_minutes,
        passing_score: formData.passing_score,
        is_active: formData.is_active,
        questions: questions.map(q => ({
          question_text: q.question_text,
          question_type: q.question_type,
          options: q.options,
        })),
      };

      if (!isEntrance) {
        payload.exam_type = formData.exam_type;
        if (formData.exam_type === 'module_final' && formData.module_id) {
            payload.module_id = formData.module_id;
        }
      }

      await api.post(endpoint, payload);
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
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[var(--ft-border)]">
          <h2 className="text-xl font-medium text-[var(--ft-charcoal)]">Create Exam</h2>
          <button onClick={onClose} className="text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)]/20 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Exam Type</label>
              <select
                value={formData.exam_type}
                onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              >
                <option value="entrance">Entrance Exam</option>
                <option value="course_final">Course Final Exam</option>
                <option value="module_final">Module Final Exam</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Associated Course</label>
              <select
                required value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              >
                {courses.length === 0 && <option value={0}>No courses available</option>}
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--ft-charcoal)]">Exam Title</label>
            <input
              required type="text" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              placeholder="e.g. Trading Entrance Exam"
            />
          </div>

          {formData.exam_type === 'module_final' && (
            <div className="space-y-2">
               <label className="text-sm font-medium text-[var(--ft-charcoal)]">Select Module</label>
               <select
                 required value={formData.module_id}
                 onChange={(e) => setFormData({ ...formData, module_id: Number(e.target.value) })}
                 className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
               >
                 <option value={0}>-- Select a Module --</option>
                 {modules.map(m => (
                   <option key={m.id} value={m.id}>{m.title}</option>
                 ))}
               </select>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Duration (min)</label>
              <input
                required type="number" min={1} value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ft-charcoal)]">Pass Score (%)</label>
              <input
                required type="number" min={0} max={100} value={formData.passing_score}
                onChange={(e) => setFormData({ ...formData, passing_score: Number(e.target.value) })}
                className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)]"
              />
            </div>
            <div className="space-y-2 flex items-end">
              <label className="flex items-center gap-2 text-sm text-[var(--ft-charcoal)] pb-2 cursor-pointer">
                <input type="checkbox" checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-[var(--ft-border)] text-[var(--ft-red)]"
                />
                Status Active
              </label>
            </div>
          </div>

          <div className="border-t border-[var(--ft-border)] mt-4 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--ft-charcoal)]">Questions ({questions.length})</h3>
              <Button type="button" onClick={addQuestion} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-8 text-xs">
                + Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((q, qi) => (
                <div key={qi} className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--ft-muted)] font-bold">Q{qi + 1}</span>
                        <select 
                            value={q.question_type} 
                            onChange={e => updateQuestion(qi, 'question_type', e.target.value)}
                            className="bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded text-xs px-2 py-1 text-[var(--ft-charcoal)]"
                        >
                            <option value="mcq">Multiple Choice</option>
                            <option value="true_false">True / False</option>
                        </select>
                    </div>
                    {questions.length > 1 && (
                      <button type="button" onClick={() => removeQuestion(qi)} className="text-[var(--ft-danger)] text-xs hover:underline">Remove</button>
                    )}
                  </div>
                  <input
                    required type="text" value={q.question_text}
                    onChange={(e) => updateQuestion(qi, 'question_text', e.target.value)}
                    className="w-full bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-4 py-2 text-sm text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)] mb-3"
                    placeholder="Question text..."
                  />
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <button type="button" onClick={() => setCorrectOption(qi, oi)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${opt.is_correct ? 'border-[var(--ft-success)] bg-[var(--ft-success)]/10' : 'border-[var(--ft-border)] hover:border-[var(--ft-muted)]'}`}
                          title="Set as correct answer"
                        >
                          {opt.is_correct && <div className="w-2.5 h-2.5 rounded-full bg-[var(--ft-success)]" />}
                        </button>
                        <input
                          required type="text" value={opt.option_text}
                          onChange={(e) => updateOption(qi, oi, e.target.value)}
                          disabled={q.question_type === 'true_false'}
                          className="flex-1 bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg px-3 py-1.5 text-sm text-[var(--ft-charcoal)] focus:outline-none focus:border-[var(--ft-red)] disabled:opacity-50"
                          placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-[var(--ft-border)] mt-6">
            <Button type="button" onClick={onClose} variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 min-w-[100px]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Exam'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
