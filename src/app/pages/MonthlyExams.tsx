import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  CheckCircle2, XCircle, Clock, FileText, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';

interface Exam {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  passing_score: number;
  created_at: string;
}

interface ExamResult {
  exam_id: number;
  score: number; // mapped from percentage
  passed: boolean;
  total_questions: number;
  obtained_marks: number;
  completed_at: string; // mapped from evaluated_at
}

export function MonthlyExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<Record<number, ExamResult>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamsData = async () => {
      try {
        const examsData: Exam[] = await api.get('/exams/entrance');
        setExams(examsData);
        
        // Fetch results for each
        const resultsMap: Record<number, ExamResult> = {};
        for (const exam of examsData) {
          try {
            const res = await api.get(`/exams/result?exam_id=${exam.id}`);
            resultsMap[exam.id] = {
              exam_id: res.exam_id,
              score: res.percentage,
              passed: res.passed,
              total_questions: res.total_questions,
              obtained_marks: res.obtained_marks,
              completed_at: res.evaluated_at
            };
          } catch (e) {
            // No result found (404) -> unattempted or failed previous attempts without current result record.
          }
        }
        setResults(resultsMap);
      } catch (err: any) {
        setError(err.message || 'Failed to load exams');
      } finally {
        setLoading(false);
      }
    };
    fetchExamsData();
  }, []);

  const getStatus = (examId: number) => {
    if (results[examId]) {
      return results[examId].passed ? 'passed' : 'failed';
    }
    return 'unattempted';
  };

  const handleStartExam = async (examId: number) => {
    try {
      await api.post(`/exams/start?exam_id=${examId}`);
      navigate(`/student/exam/${examId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to start exam (you might need to wait 30 days before retaking).');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  const passedExams = Object.values(results).filter(r => r.passed).length;
  const attempts = Object.keys(results).length;
  const avgScore = attempts > 0 
    ? Math.round(Object.values(results).reduce((acc, r) => acc + r.score, 0) / attempts)
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Exams</h1>
        <p className="text-sm text-[#9CA3AF]">Take active exams and view your results</p>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20 relative">
          {error}
          <button onClick={() => setError('')} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#E5E7EB]">dismiss</button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Exams Passed</div>
          <div className="text-3xl font-bold text-[#10B981] mb-1 font-mono">{passedExams} / {exams.length}</div>
          <div className="text-xs text-[#9CA3AF]">Current Pass Volume</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Average Score</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{avgScore}%</div>
          <div className="text-xs text-[#9CA3AF]">Across recorded attempts</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Exam Actions</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{attempts}</div>
          <div className="text-xs text-[#9CA3AF]">Including passed / failed</div>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="space-y-6">
        {exams.length === 0 ? (
           <div className="text-center text-sm text-[#9CA3AF] py-8">No active exams are available at the moment.</div>
        ) : (
          exams.map((exam) => {
            const status = getStatus(exam.id);
            const result = results[exam.id];
            
            return (
              <div key={exam.id} className="bg-[#111827] border border-[#334155] rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[#9CA3AF]">Exam #{exam.id}</span>
                        {status === 'passed' ? (
                          <div className="flex items-center gap-1 bg-[#10B981]/10 border border-[#10B981] text-[#10B981] text-xs px-2 py-1 rounded">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Passed</span>
                          </div>
                        ) : status === 'failed' ? (
                          <div className="flex items-center gap-1 bg-[#EF4444]/10 border border-[#EF4444] text-[#EF4444] text-xs px-2 py-1 rounded">
                            <XCircle className="h-3 w-3" />
                            <span>Failed</span>
                          </div>
                        ) : (
                           <div className="flex items-center gap-1 bg-[#3B82F6]/10 border border-[#3B82F6] text-[#3B82F6] text-xs px-2 py-1 rounded">
                             <Clock className="h-3 w-3" />
                             <span>New</span>
                           </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">{exam.title}</h3>
                      <p className="text-sm text-[#9CA3AF] mb-3">{exam.description || 'No description provided.'}</p>
                      <div className="flex gap-6 text-sm text-[#9CA3AF]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{exam.duration_minutes} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Passing score: {exam.passing_score}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {status !== 'unattempted' && result && (
                        <>
                          <div className={`text-4xl font-bold font-mono mb-1 ${result.passed ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                            {result.score}%
                          </div>
                          <div className="text-xs text-[#9CA3AF] mb-1">
                            {new Date(result.completed_at).toLocaleDateString()}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {(status === 'failed' || status === 'unattempted') && (
                    <div className="border-t border-[#334155] pt-4 mt-4 text-right">
                      <Button onClick={() => handleStartExam(exam.id)} className="bg-[#3B82F6] text-[#E5E7EB] hover:bg-[#3B82F6]/90">
                        {status === 'failed' ? 'Retake Exam' : 'Take Exam'}
                      </Button>
                    </div>
                  )}

                  {status === 'passed' && (
                    <div className="border-t border-[#334155] pt-4 mt-4">
                      <Button onClick={() => handleStartExam(exam.id)} variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                        Retake for Higher Score
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
