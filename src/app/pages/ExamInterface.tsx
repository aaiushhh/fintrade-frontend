import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TrendingUp, Camera, Clock, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function ExamInterface() {
  const navigate = useNavigate();
  const { examId: examIdParam } = useParams<{ examId: string }>();
  const { logout } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initExam = async () => {
      try {
        const entranceExams = await api.get('/exams/entrance');
        // Use the exam ID from the URL param if available, otherwise fall back to first exam
        const targetExamId = examIdParam ? parseInt(examIdParam, 10) : null;
        const exam = targetExamId
          ? entranceExams.find((e: any) => e.id === targetExamId) || entranceExams[0]
          : entranceExams[0];
        
        if (!exam) {
          throw new Error("No entrance exam available");
        }
        
        if (exam.duration_minutes) {
          setTimeRemaining(exam.duration_minutes * 60);
        }
        
        // Start attempt
        const startResponse = await api.post(`/exams/start?exam_id=${exam.id}`).catch(err => {
          // It might fail if already started within 30 days, we could handle it by getting the recent attempt
          // Or just continue if backend supports it. For now, try our best
          if (err.message && err.message.includes("Wait 30 days")) {
            alert(err.message);
            navigate('/student/dashboard');
          }
          throw err;
        });
        
        setAttemptId(startResponse.attempt_id);
        
        // Fetch questions
        const fetchedQuestions = await api.get(`/exams/questions?exam_id=${exam.id}`);
        setQuestions(fetchedQuestions);
        setSelectedAnswers(new Array(fetchedQuestions.length).fill(null));
        
      } catch (err: any) {
        console.error("Failed to load exam:", err);
        // Fallback for UI if API fails
        if (questions.length === 0) {
          const fallback = [
            { 
              id: 1, 
              question_text: "What is the purpose of a stop loss?", 
              options: [
                { id: 101, option_text: "Limit losses" }, 
                { id: 102, option_text: "Increase profits" },
                { id: 103, option_text: "Increase leverage" },
                { id: 104, option_text: "Avoid margin" }
              ] 
            },
            { 
              id: 2, 
              question_text: "What does RSI stand for?", 
              options: [
                { id: 201, option_text: "Rate of Stock" }, 
                { id: 202, option_text: "Relative Strength Index" },
                { id: 203, option_text: "Real Stock" },
                { id: 204, option_text: "Risk Stock" }
              ] 
            }
          ];
          setQuestions(fallback);
          setSelectedAnswers(new Array(fallback.length).fill(null));
        }
      } finally {
        setLoading(false);
      }
    };
    initExam();
  }, [navigate, examIdParam]);

  useEffect(() => {
    if (loading || timeRemaining <= 0) return;
    const timer = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [loading, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0 && attemptId && !isSubmitting && questions.length > 0) {
      handleSubmit();
    }
  }, [timeRemaining, attemptId, isSubmitting, questions.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = async (optionId: number) => {
    if (timeRemaining <= 0 || isSubmitting) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionId;
    setSelectedAnswers(newAnswers);
    
    if (attemptId) {
      try {
        await api.post(`/exams/answer?attempt_id=${attemptId}`, { 
          question_id: questions[currentQuestion].id, 
          selected_option_id: optionId 
        });
      } catch (e) {
        console.warn("Failed to save answer incrementally", e);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!attemptId) throw new Error("No active exam attempt");
      if (isSubmitting) return;
      setIsSubmitting(true);
      
      const formattedAnswers = questions.map((q, index) => ({
        question_id: q.id,
        selected_option_id: selectedAnswers[index] || 0 // Default or handle unselected
      })).filter(a => a.selected_option_id !== 0);

      await api.post('/exams/submit', { 
        attempt_id: attemptId,
        answers: formattedAnswers 
      });
      alert('Exam submitted successfully!');
      navigate('/student/dashboard');
    } catch (err: any) {
      alert(err.message || 'Error submitting exam');
      // Navigate anyway for demo purposes
      navigate('/student/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Loading exam...</div>;

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <nav className="border-b border-[#334155] bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
              <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
              <span className="text-sm text-[#9CA3AF] ml-4">Entrance Exam</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm text-[#9CA3AF]">Camera Active</span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#1F2937] px-4 py-2 rounded border border-[#334155]">
                <Clock className="h-4 w-4 text-[#00D1B2]" />
                <span className="text-sm font-mono text-[#E5E7EB]">{formatTime(timeRemaining)}</span>
              </div>

              <Button onClick={handleLogout} variant="outline" className="border-[#334155] bg-transparent text-[#EF4444] hover:bg-[#EF4444]/10">
                <LogOut className="h-4 w-4 mr-2" />
                Exit & Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="col-span-3">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-8">
              <div className="mb-6">
                <div className="text-sm text-[#9CA3AF] mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <h2 className="text-xl font-semibold text-[#E5E7EB]">
                  {questions[currentQuestion]?.question_text}
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {questions[currentQuestion]?.options?.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={isSubmitting || timeRemaining <= 0}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswers[currentQuestion] === option.id
                        ? 'border-[#00D1B2] bg-[#00D1B2]/10'
                        : 'border-[#334155] bg-[#1F2937] hover:border-[#00D1B2]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === option.id
                          ? 'border-[#00D1B2]'
                          : 'border-[#334155]'
                      }`}>
                        {selectedAnswers[currentQuestion] === option.id && (
                          <div className="w-3 h-3 rounded-full bg-[#00D1B2]" />
                        )}
                      </div>
                      <span className="text-[#E5E7EB]">{option.option_text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-[#334155]">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0 || isSubmitting || timeRemaining <= 0}
                  className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1 || isSubmitting || timeRemaining <= 0}
                  className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Question Navigation Panel */}
          <div className="col-span-1">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6 sticky top-6">
              <h3 className="text-sm font-semibold text-[#E5E7EB] mb-4">Questions</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square rounded flex items-center justify-center text-sm font-medium ${
                      selectedAnswers[index] !== null
                        ? 'bg-[#00D1B2] text-[#0F172A]'
                        : index === currentQuestion
                        ? 'bg-[#3B82F6] text-[#E5E7EB]'
                        : 'bg-[#1F2937] text-[#9CA3AF] border border-[#334155]'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-2 mb-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#00D1B2] rounded" />
                  <span className="text-[#9CA3AF]">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#3B82F6] rounded" />
                  <span className="text-[#9CA3AF]">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#1F2937] border border-[#334155] rounded" />
                  <span className="text-[#9CA3AF]">Not Answered</span>
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || timeRemaining <= 0}
                className="w-full bg-[#3B82F6] text-[#E5E7EB] hover:bg-[#3B82F6]/90 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
