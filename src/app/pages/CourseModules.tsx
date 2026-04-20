import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { Loader2, Play, Calendar, Clock, Video } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';
import { api, API_URL } from '../services/api';

const getFullUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

interface Lesson {
  id: number;
  title: string;
  content_type: string;
  video_url?: string;
  content?: string;
  order: number;
}

interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
  progress?: number; 
}

interface CourseDetail {
  id: number;
  title: string;
  modules: Module[];
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
  meeting_link: string | null;
  recordings?: { id: number; recording_url: string; duration_seconds: number | null }[];
}

export function CourseModules() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseIdParam = searchParams.get('course_id');

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        let loadedCourseId = courseIdParam;
        if (!loadedCourseId) {
          const enrollments = await api.get('/courses/enrolled');
          if (enrollments && enrollments.length > 0) {
            loadedCourseId = enrollments[0].course_id;
            navigate(`/student/modules?course_id=${loadedCourseId}`, { replace: true });
            return;
          }
        }
        
        if (loadedCourseId) {
          const [courseData, lecturesData] = await Promise.all([
            api.get(`/courses/${loadedCourseId}`),
            api.get(`/lectures?course_id=${loadedCourseId}`),
          ]);
          setCourse(courseData);
          setLectures(lecturesData);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load modules");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [courseIdParam, navigate]);

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" /></div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  if (!course) {
    return <div className="p-8 text-[var(--ft-muted)]">You are not enrolled in any courses to view modules.</div>;
  }

  const modules = course.modules || [];
  const completedModules = 0; 
  const overallProgress = 0;

  const upcomingLectures = lectures.filter(l => !l.is_completed);
  const completedLectures = lectures.filter(l => l.is_completed);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">{course.title} - Modules</h1>
        <p className="text-sm text-[var(--ft-muted)]">Course Material • {modules.length} Modules in total</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-1">Overall Progress</h2>
            <p className="text-sm text-[var(--ft-muted)]">{completedModules} of {modules.length} modules completed</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">{overallProgress}%</div>
          </div>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      {/* Scheduled Lectures for this Course */}
      {lectures.length > 0 && (
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">
            Scheduled Lectures ({upcomingLectures.length} upcoming)
          </h2>
          <div className="space-y-3">
            {upcomingLectures.map((lecture) => (
              <div key={lecture.id} className="flex items-center justify-between bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
                <div>
                  <div className="text-sm text-[var(--ft-charcoal)] mb-1">{lecture.title}</div>
                  <div className="flex items-center gap-4 text-xs text-[var(--ft-muted)]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(lecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <span>{lecture.duration_minutes} min</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lecture.is_live && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]">LIVE</span>
                  )}
                  {lecture.meeting_link && (
                    <a href={lecture.meeting_link} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-7 text-xs px-3">
                        Join
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
            {completedLectures.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[var(--ft-border)]">
                <h3 className="text-sm font-medium text-[var(--ft-muted)] mb-3">Past Lectures & Recordings</h3>
                {completedLectures.map((lecture) => (
                  <div key={lecture.id} className="flex items-center justify-between bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4 mb-2">
                    <div>
                      <div className="text-sm text-[var(--ft-charcoal)] mb-1">{lecture.title}</div>
                      <div className="text-xs text-[var(--ft-muted)]">
                        {new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    {lecture.recordings && lecture.recordings.length > 0 && (
                      <div className="flex gap-2">
                        {lecture.recordings.map(rec => (
                          <a key={rec.id} href={getFullUrl(rec.recording_url)} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-[var(--ft-red)]/50 text-[var(--ft-red)] bg-[var(--ft-red)]/10 hover:bg-[var(--ft-red)]/20 h-7 text-xs px-3">
                              <Video className="h-3 w-3 mr-1" />
                              Recording
                            </Button>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modules Grid */}
      <div className="grid grid-cols-2 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[var(--ft-muted)]">Module {module.order}</span>
                </div>
                <h3 className="text-base font-semibold text-[var(--ft-charcoal)] mb-3">{module.title}</h3>

                <div className="flex gap-4 text-xs text-[var(--ft-muted)] mb-4">
                  <div>{(module.lessons || []).length} lessons</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--ft-muted)]">Progress</span>
                <span className="text-xs font-mono text-[var(--ft-charcoal)]">{module.progress || 0}%</span>
              </div>
              <Progress value={module.progress || 0} className="h-2" />
            </div>

            <Link to={`/student/lecture?module_id=${module.id}&course_id=${course.id}`}>
                <Button className="w-full bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90">
                  <Play className="h-4 w-4 mr-2" />
                  View Lessons
                </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}