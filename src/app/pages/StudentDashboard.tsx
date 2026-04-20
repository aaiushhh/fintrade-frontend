import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Loader2, Megaphone, ExternalLink } from 'lucide-react';
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
  id: number; user_id: number; course_id: number; enrolled_at: string;
  is_active: boolean; progress_percent: number; completed_at: string | null; price_paid: number | null;
  course: { id: number; title: string; price: number; difficulty_level: string; duration_hours: number | null; };
}

interface Lecture {
  id: number; title: string; description: string | null; course_id: number;
  scheduled_at: string; duration_minutes: number; is_live: boolean; is_completed: boolean;
  recordings?: { id: number; recording_url: string; duration_seconds: number | null }[];
}

interface ExamResult { score: number; passed: boolean; total_questions: number; correct_answers: number; completed_at: string; }
interface Announcement { id: number; title: string; content: string; priority: string; published_at: string; }
interface Advertisement { id: number; title: string; description: string | null; image_url: string | null; link_url: string | null; placement: string; }

export function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joinMessage, setJoinMessage] = useState('');
  const [joiningId, setJoiningId] = useState<number | null>(null);

  const handleJoinLecture = async (lectureId: number) => {
    setJoiningId(lectureId);
    setJoinMessage('');
    try {
      const result = await api.post(`/lectures/join?lecture_id=${lectureId}`);
      if (result.meeting_link) window.open(result.meeting_link, '_blank');
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

        // Fetch announcements + ads
        api.get('/dashboard/announcements').then(setAnnouncements).catch(() => {});
        api.get('/dashboard/advertisements?placement=dashboard').then(setAds).catch(() => {});
        
        try {
          const entranceExams = await api.get('/exams/entrance');
          if (entranceExams.length > 0) {
            const result = await api.get(`/exams/result?exam_id=${entranceExams[0].id}`);
            setExamResult(result);
          }
        } catch (e) {}
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress_percent, 0) / enrollments.length) : 0;
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
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-1">Dashboard</h1>
        <p className="text-sm text-[var(--ft-muted)]">Welcome back, {user?.full_name || user?.name || 'Student'}</p>
      </div>

      {error && (
        <div className="mb-6 text-[var(--ft-danger)] text-sm p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">
          {error}
          <button onClick={() => window.location.reload()} className="ml-3 underline">Retry</button>
        </div>
      )}
      {joinMessage && (
        <div className="mb-6 text-[var(--ft-red)] text-sm p-4 bg-[var(--ft-red-tint)] rounded-lg border border-[var(--ft-red)]/20 relative">
          {joinMessage}
          <button onClick={() => setJoinMessage('')} className="absolute top-4 right-4 text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)]">dismiss</button>
        </div>
      )}

      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="mb-6 space-y-2">
          {announcements.slice(0, 3).map(a => (
            <div key={a.id} className={`ft-card p-4 flex items-start gap-3 ${a.priority === 'urgent' || a.priority === 'high' ? 'border-[var(--ft-red)]' : ''}`}>
              <Megaphone className="h-4 w-4 text-[var(--ft-red)] mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium text-[var(--ft-charcoal)]">{a.title}</div>
                <div className="text-xs text-[var(--ft-muted)] mt-0.5">{a.content}</div>
              </div>
              {(a.priority === 'urgent' || a.priority === 'high') && (
                <span className="ft-badge ml-auto shrink-0">{a.priority}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="ft-card p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Avg. Progress</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] mb-3 font-mono">{avgProgress}%</div>
          <div className="ft-progress-track h-2"><div className="ft-progress-fill h-full transition-all" style={{ width: `${avgProgress}%` }}></div></div>
        </div>

        <div className="ft-card p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Enrolled Courses</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] mb-1 font-mono">{enrollments.length}</div>
          <div className="text-xs text-[var(--ft-red)]">{completedCount} completed</div>
        </div>

        <div className="ft-card p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Upcoming Lectures</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] mb-1 font-mono">{upcomingLectures.length}</div>
          <div className="text-xs text-[var(--ft-muted)]">scheduled</div>
        </div>

        <div className="ft-card p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Total Lectures</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] mb-1 font-mono">{lectures.length}</div>
          <div className="text-xs text-[var(--ft-muted)]">available</div>
        </div>
      </div>

      {/* Exam Result */}
      {examResult && (
        <div className="mb-8 ft-card p-6">
          <h2 className="text-lg font-medium mb-4">Entrance Exam Result</h2>
          <div className="flex items-center gap-6">
            <div className={`text-4xl font-medium font-mono ${examResult.passed ? 'text-[var(--ft-success)]' : 'text-[var(--ft-danger)]'}`}>
              {examResult.score}%
            </div>
            <div>
              <span className={`text-xs px-3 py-1 rounded-full ${examResult.passed ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]' : 'bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]'}`}>
                {examResult.passed ? 'PASSED' : 'FAILED'}
              </span>
              <div className="text-xs text-[var(--ft-muted)] mt-2">
                {examResult.correct_answers}/{examResult.total_questions} correct
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses + Next Lecture */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 ft-card p-6">
          <h2 className="text-lg font-medium mb-6">My Courses</h2>
          {enrollments.length === 0 ? (
            <div className="text-center text-sm text-[var(--ft-muted)] py-8">
              <p className="mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses"><Button className="ft-btn-primary text-white">Browse Courses</Button></Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <Link to={`/student/modules?course_id=${enrollment.course_id}`} key={enrollment.id} className="block group">
                  <div className="ft-card p-4 transition-colors group-hover:border-[var(--ft-red)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-[var(--ft-charcoal)] group-hover:text-[var(--ft-red)] transition-colors">{enrollment.course.title}</h3>
                        <p className="text-xs text-[var(--ft-muted)] capitalize">{enrollment.course.difficulty_level}{enrollment.course.duration_hours ? ` • ${enrollment.course.duration_hours}h` : ''}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${enrollment.completed_at ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]' : 'bg-[var(--ft-red-tint)] text-[var(--ft-red-text)]'}`}>
                        {enrollment.completed_at ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 ft-progress-track h-2"><div className="ft-progress-fill h-full transition-all" style={{ width: `${enrollment.progress_percent || 0}%` }}></div></div>
                      <span className="text-xs font-mono text-[var(--ft-charcoal)]">{enrollment.progress_percent || 0}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="ft-card p-6">
          <h2 className="text-lg font-medium mb-4">Next Lecture</h2>
          {nextLecture ? (
            <div>
              <div className="mb-4">
                <div className="text-sm font-medium text-[var(--ft-charcoal)] mb-2">{nextLecture.title}</div>
                <div className="text-xs text-[var(--ft-muted)] mb-3">{nextLecture.duration_minutes} minutes</div>
                <div className="text-xs text-[var(--ft-muted)] mb-1">
                  {new Date(nextLecture.scheduled_at).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                </div>
                <div className="text-xs text-[var(--ft-red)]">
                  {new Date(nextLecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="aspect-video bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg mb-3 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[var(--ft-red-tint)] flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[var(--ft-red)] border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
              <Link to={nextLecture.course_id ? `/student/modules?course_id=${nextLecture.course_id}` : "/student/modules"}>
                <Button className="w-full ft-btn-primary text-white">Continue Learning</Button>
              </Link>
            </div>
          ) : (
            <div className="text-center text-sm text-[var(--ft-muted)] py-8">No upcoming lectures</div>
          )}

          {/* Ads in sidebar */}
          {ads.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[var(--ft-border)]">
              {ads.slice(0, 1).map(ad => (
                <a key={ad.id} href={ad.link_url || '#'} className="block hover:opacity-80 transition-opacity">
                  {ad.image_url && <img src={ad.image_url} alt={ad.title} className="w-full rounded-lg mb-2" />}
                  <div className="text-xs font-medium text-[var(--ft-charcoal)]">{ad.title}</div>
                  {ad.description && <div className="text-xs text-[var(--ft-muted)]">{ad.description}</div>}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Lectures */}
      <div className="ft-card p-6">
        <h2 className="text-lg font-medium mb-4">Upcoming Lectures</h2>
        <div className="space-y-3">
          {upcomingLectures.length === 0 ? (
            <div className="text-center text-sm text-[var(--ft-muted)] py-4">No upcoming lectures</div>
          ) : (
            upcomingLectures.slice(0, 5).map((lecture) => (
              <div key={lecture.id} className="flex items-center justify-between ft-card p-4">
                <div>
                  <div className="text-sm text-[var(--ft-charcoal)] mb-1">{lecture.title}</div>
                  <div className="text-xs text-[var(--ft-muted)]">
                    {new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {new Date(lecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} • {lecture.duration_minutes} min
                  </div>
                </div>
                {lecture.is_live && (
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]">LIVE</span>
                    <Button onClick={() => handleJoinLecture(lecture.id)} disabled={joiningId === lecture.id} className="ft-btn-primary h-6 text-xs px-3 py-0 text-white">
                      {joiningId === lecture.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Join'}
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {completedLectures.length > 0 && (
          <div className="mt-8 border-t border-[var(--ft-border)] pt-6">
            <h3 className="text-sm font-medium text-[var(--ft-charcoal)] mb-4">Past Sessions & Recordings</h3>
            <div className="space-y-3">
              {completedLectures.slice(0, 5).map((lecture) => (
                <div key={lecture.id} className="flex flex-col gap-3 ft-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[var(--ft-charcoal)] mb-1">{lecture.title}</div>
                      <div className="text-xs text-[var(--ft-muted)]">
                        {new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  {lecture.recordings && lecture.recordings.length > 0 && (
                    <div className="flex gap-2">
                      {lecture.recordings.map(rec => (
                        <a key={rec.id} href={getFullUrl(rec.recording_url)} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="ft-btn-outline h-6 text-xs px-3 py-0">
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
          <Button variant="outline" className="w-full ft-btn-outline">
            View Full Performance
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
