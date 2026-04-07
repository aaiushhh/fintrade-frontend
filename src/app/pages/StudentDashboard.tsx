import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ChevronRight, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';
import { api, API_URL } from '../services/api';

const getFullUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrolled_at: string;
  is_active: boolean;
  progress_percent: number;
  completed_at: string | null;
  price_paid: number | null;
  course: {
    id: number;
    title: string;
    price: number;
    difficulty_level: string;
    duration_hours: number | null;
  };
}

interface Lecture {
  id: number;
  title: string;
  description: string | null;
  course_id: number;
  scheduled_at: string;
  duration_minutes: number;
  is_live: boolean;
  is_completed: boolean;
  recordings?: { id: number; recording_url: string; duration_seconds: number | null }[];
}

interface ExamResult {
  score: number;
  passed: boolean;
  total_questions: number;
  correct_answers: number;
  completed_at: string;
}

export function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joinMessage, setJoinMessage] = useState('');
  const [joiningId, setJoiningId] = useState<number | null>(null);

  const handleJoinLecture = async (lectureId: number) => {
    setJoiningId(lectureId);
    setJoinMessage('');
    try {
      const result = await api.post(`/lectures/join?lecture_id=${lectureId}`);
      if (result.meeting_link) {
        window.open(result.meeting_link, '_blank');
      }
      setJoinMessage(result.message || 'Joined successfully!');
    } catch (err: any) {
      setJoinMessage(err.message || 'Unable to join lecture');
    } finally {
      setJoiningId(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsData, lecturesData] = await Promise.all([
          api.get('/courses/enrolled'),
          api.get('/lectures'),
        ]);
        setEnrollments(enrollmentsData);
        setLectures(lecturesData);
        
        // Try to get exam result (may 404 if no exam taken)
        try {
          const entranceExams = await api.get('/exams/entrance');
          if (entranceExams.length > 0) {
            const result = await api.get(`/exams/result?exam_id=${entranceExams[0].id}`);
            setExamResult(result);
          }
        } catch (e) {
          // No exam result available — that's fine
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Derived stats
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress_percent, 0) / enrollments.length)
    : 0;
  const completedCount = enrollments.filter(e => e.completed_at !== null).length;

  const isLectureActiveOrUpcoming = (l: Lecture) => {
    if (l.is_completed) return false;
    const endTime = new Date(l.scheduled_at).getTime() + (l.duration_minutes * 60000);
    return endTime >= new Date().getTime();
  };

  const upcomingLectures = lectures.filter(isLectureActiveOrUpcoming);
  const completedLectures = lectures.filter(l => !isLectureActiveOrUpcoming(l));
  const nextLecture = upcomingLectures.length > 0 ? upcomingLectures[0] : null;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Dashboard</h1>
        <p className="text-sm text-[#9CA3AF]">Welcome back, {user?.full_name || user?.name || 'Student'}</p>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}
      {joinMessage && (
        <div className="mb-6 text-[#00D1B2] text-sm p-4 bg-[#00D1B2]/10 rounded-lg border border-[#00D1B2]/20 relative">
          {joinMessage}
          <button onClick={() => setJoinMessage('')} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#E5E7EB]">dismiss</button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Avg. Progress</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-3 font-mono">{avgProgress}%</div>
          <Progress value={avgProgress} className="h-2" />
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Enrolled Courses</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{enrollments.length}</div>
          <div className="text-xs text-[#00D1B2]">{completedCount} completed</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Upcoming Lectures</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{upcomingLectures.length}</div>
          <div className="text-xs text-[#9CA3AF]">scheduled</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Lectures</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{lectures.length}</div>
          <div className="text-xs text-[#9CA3AF]">available</div>
        </div>
      </div>

      {/* Exam Result */}
      {examResult && (
        <div className="mb-8 bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Entrance Exam Result</h2>
          <div className="flex items-center gap-6">
            <div className={`text-4xl font-bold font-mono ${examResult.passed ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {examResult.score}%
            </div>
            <div>
              <span className={`text-xs px-3 py-1 rounded-full ${examResult.passed ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                {examResult.passed ? 'PASSED' : 'FAILED'}
              </span>
              <div className="text-xs text-[#9CA3AF] mt-2">
                {examResult.correct_answers}/{examResult.total_questions} correct
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts and Cards Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Enrolled Courses List */}
        <div className="col-span-2 bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">My Courses</h2>
          {enrollments.length === 0 ? (
            <div className="text-center text-sm text-[#9CA3AF] py-8">
              <p className="mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses">
                <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90">
                  Browse Courses
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <Link to={`/student/modules?course_id=${enrollment.course_id}`} key={enrollment.id} className="block group">
                  <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4 transition-colors group-hover:border-[#00D1B2]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-[#E5E7EB] group-hover:text-[#00D1B2] transition-colors">{enrollment.course.title}</h3>
                        <p className="text-xs text-[#9CA3AF] capitalize">{enrollment.course.difficulty_level}{enrollment.course.duration_hours ? ` • ${enrollment.course.duration_hours}h` : ''}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${enrollment.completed_at ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#3B82F6]/10 text-[#3B82F6]'}`}>
                        {enrollment.completed_at ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-[#0F172A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00D1B2] rounded-full transition-all" style={{ width: `${enrollment.progress_percent || 0}%` }}></div>
                      </div>
                      <span className="text-xs font-mono text-[#E5E7EB]">{enrollment.progress_percent || 0}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Next Lecture */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Next Lecture</h2>
          {nextLecture ? (
            <div>
              <div className="mb-4">
                <div className="text-sm font-medium text-[#E5E7EB] mb-2">{nextLecture.title}</div>
                <div className="text-xs text-[#9CA3AF] mb-3">{nextLecture.duration_minutes} minutes</div>
                <div className="text-xs text-[#9CA3AF] mb-1">
                  {new Date(nextLecture.scheduled_at).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                </div>
                <div className="text-xs text-[#00D1B2]">
                  {new Date(nextLecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="aspect-video bg-[#0F172A] border border-[#334155] rounded-lg mb-3 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#00D1B2]/10 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#00D1B2] border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
              <Link to={nextLecture.course_id ? `/student/modules?course_id=${nextLecture.course_id}` : "/student/modules"}>
                <Button className="w-full bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90">
                  Continue Learning
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center text-sm text-[#9CA3AF] py-8">
              No upcoming lectures
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Lectures */}
      <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Upcoming Lectures</h2>
        <div className="space-y-3">
          {upcomingLectures.length === 0 ? (
            <div className="text-center text-sm text-[#9CA3AF] py-4">No upcoming lectures</div>
          ) : (
            upcomingLectures.slice(0, 5).map((lecture) => (
              <div key={lecture.id} className="flex items-center justify-between bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div>
                  <div className="text-sm text-[#E5E7EB] mb-1">{lecture.title}</div>
                  <div className="text-xs text-[#9CA3AF]">
                    {new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {new Date(lecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} • {lecture.duration_minutes} min
                  </div>
                </div>
                {lecture.is_live && (
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#EF4444]/10 text-[#EF4444]">LIVE</span>
                    <Button 
                      onClick={() => handleJoinLecture(lecture.id)} 
                      disabled={joiningId === lecture.id} 
                      className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-6 text-xs px-3 py-0"
                    >
                      {joiningId === lecture.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Join'}
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Completed Lectures & Recordings */}
        {completedLectures.length > 0 && (
          <div className="mt-8 border-t border-[#334155] pt-6">
            <h3 className="text-sm font-semibold text-[#E5E7EB] mb-4">Past Sessions & Recordings</h3>
            <div className="space-y-3">
              {completedLectures.slice(0, 5).map((lecture) => (
                <div key={lecture.id} className="flex flex-col gap-3 bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#E5E7EB] mb-1">{lecture.title}</div>
                      <div className="text-xs text-[#9CA3AF]">
                        {new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  {lecture.recordings && lecture.recordings.length > 0 && (
                    <div className="flex gap-2">
                      {lecture.recordings.map(rec => (
                        <a key={rec.id} href={getFullUrl(rec.recording_url)} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-[#00D1B2]/50 text-[#00D1B2] bg-[#00D1B2]/10 hover:bg-[#00D1B2]/20 h-6 text-xs px-3 py-0">
                            Watch Recording
                          </Button>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/student/performance" className="block mt-4">
          <Button variant="outline" className="w-full border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
            View Full Performance
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
