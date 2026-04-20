import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  Bot, Play, CheckCircle2, ChevronRight, Loader2, FileText
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { api, API_URL } from '../services/api';

const getFullUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export function LecturePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course_id');
  const moduleId = searchParams.get('module_id');

  const [course, setCourse] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completing, setCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!courseId || !moduleId) {
        setError('Invalid course or module selection');
        setLoading(false);
        return;
      }
      try {
        const courseData = await api.get(`/courses/${courseId}`);
        setCourse(courseData);
        // We assume dashboard data gives completion status, if not we will just track locally for now
        // A full integration would fetch course progress
        const mod = (courseData.modules || []).find((m: any) => m.id.toString() === moduleId);
        setActiveModule(mod);
        if (mod && mod.lessons && mod.lessons.length > 0) {
          setActiveLesson(mod.lessons[0]);
        }
      } catch(err: any) {
        setError(err.message || 'Failed to load module');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [courseId, moduleId]);

  const markComplete = async () => {
    if (!activeLesson || !courseId) return;
    setCompleting(true);
    try {
      await api.post('/learning/lesson/complete', {
        course_id: Number(courseId),
        lesson_id: activeLesson.id
      });
      setIsCompleted(true);
    } catch (err: any) {
      alert(err.message || 'Failed to mark lesson complete');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" /></div>;
  }

  if (error || !activeModule) {
    return <div className="p-8 text-red-400">{error || 'Module not found'}</div>;
  }

  const moduleLessons = activeModule.lessons || [];
  const activeIndex = moduleLessons.findIndex((l: any) => l.id === activeLesson?.id);
  const nextLesson = activeIndex >= 0 && activeIndex + 1 < moduleLessons.length ? moduleLessons[activeIndex + 1] : null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--ft-muted)] mb-2">
          <Link to={`/student/modules?course_id=${courseId}`} className="hover:text-[var(--ft-red)]">Modules</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{activeModule.title}</span>
        </div>
        <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">{activeLesson ? activeLesson.title : activeModule.title}</h1>
        <p className="text-sm text-[var(--ft-muted)]">Course: {course.title} • Module {activeModule.order}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Video/Content Section */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg overflow-hidden">
            {activeLesson?.content_type === 'video' && activeLesson.video_url ? (
              <video 
                controls 
                className="w-full aspect-video bg-[var(--ft-bg)]"
                src={getFullUrl(activeLesson.video_url)}
              />
            ) : activeLesson?.content_type === 'audio' && activeLesson.video_url ? (
              <div className="aspect-video bg-[var(--ft-bg)] flex items-center justify-center p-8">
                <audio controls className="w-full" src={getFullUrl(activeLesson.video_url)} />
              </div>
            ) : activeLesson?.content_type === 'pdf' ? (
               <div className="aspect-video bg-[var(--ft-bg)] flex flex-col items-center justify-center p-8">
                 <FileText className="h-16 w-16 text-[var(--ft-red)] mb-4" />
                 <p className="text-[var(--ft-charcoal)] mb-4 font-medium">This lesson is a PDF Document</p>
                 {activeLesson.video_url ? (
                   <a target="_blank" rel="noreferrer" href={getFullUrl(activeLesson.video_url)}>
                     <Button className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90">
                       Open PDF Document
                     </Button>
                   </a>
                 ) : (
                   <p className="text-sm text-[var(--ft-muted)]">No PDF URL provided</p>
                 )}
               </div>
            ) : (
                <div className="aspect-video bg-[var(--ft-bg)] p-8 overflow-auto text-[var(--ft-charcoal)] text-sm leading-relaxed whitespace-pre-wrap">
                  {activeLesson?.content || 'No content provided for this lesson.'}
                </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
                onClick={markComplete} 
                disabled={completing || isCompleted} 
                className={`flex-1 h-12 text-white ${isCompleted ? 'bg-[var(--ft-success)] hover:bg-[var(--ft-success)]' : 'bg-[var(--ft-red)] hover:bg-[var(--ft-red)]/90'}`}
            >
              {completing ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </Button>
            <Link to="/student/ai-tutor" className="flex-1">
              <Button variant="outline" className="w-full border-[var(--ft-border)] bg-transparent text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)] h-12">
                <Bot className="h-5 w-5 mr-2" />
                Ask AI Tutor
              </Button>
            </Link>
          </div>

          {/* Tabs Section */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[var(--ft-surface)] border border-[var(--ft-border)]">
                <TabsTrigger value="notes" className="data-[state=active]:bg-[var(--ft-red)] data-[state=active]:text-white">
                  Lesson Notes
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-[var(--ft-red)] data-[state=active]:text-white">
                  Attached Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ft-charcoal)] mb-2">Lesson Description / Notes</h3>
                    <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
                      <div className="space-y-3 text-sm text-[var(--ft-muted)] whitespace-pre-wrap">
                        {activeLesson?.content || "No detailed notes provided for this lesson."}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--ft-charcoal)] mb-4">Downloadable Resources</h3>
                <div className="space-y-3">
                    {activeLesson?.video_url ? (
                        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-[var(--ft-charcoal)] mb-1">Lesson File Attachment</div>
                            <div className="text-xs text-[var(--ft-muted)] capitalize">{activeLesson.content_type}</div>
                        </div>
                        <a target="_blank" rel="noreferrer" href={getFullUrl(activeLesson.video_url)}>
                          <Button variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-red)] hover:bg-[var(--ft-surface)]">
                              Open File
                          </Button>
                        </a>
                        </div>
                    ) : (
                        <div className="text-sm text-[var(--ft-muted)]">No resources attached to this lesson.</div>
                    )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h2 className="text-sm font-semibold text-[var(--ft-charcoal)] mb-4">Module Content</h2>
            <div className="space-y-2">
              {moduleLessons.map((lesson: any) => {
                 const isActive = activeLesson?.id === lesson.id;
                 return (
                  <div
                    key={lesson.id}
                    onClick={() => { setActiveLesson(lesson); setIsCompleted(false); }}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isActive ? 'bg-[var(--ft-red)]/10 border border-[var(--ft-red)]' : 'bg-[var(--ft-surface)] hover:bg-[var(--ft-border)]'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                          isActive ? 'border-[var(--ft-red)]' : 'border-[var(--ft-border)]'
                        }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs mb-1 ${
                        isActive ? 'text-[var(--ft-red)] font-medium' : 'text-[var(--ft-muted)]'
                      }`}>
                        {lesson.title}
                      </div>
                      <div className="text-xs text-[var(--ft-muted)] capitalize">{lesson.content_type}</div>
                    </div>
                  </div>
                 )
              })}
            </div>
          </div>

          {nextLesson && (
            <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
              <h2 className="text-sm font-semibold text-[var(--ft-charcoal)] mb-4">Up Next</h2>
              <div className="mb-4">
                <div className="text-sm text-[var(--ft-charcoal)] mb-1">{nextLesson.title}</div>
                <div className="text-xs text-[var(--ft-muted)] capitalize">{nextLesson.content_type}</div>
              </div>
              <Button onClick={() => { setActiveLesson(nextLesson); setIsCompleted(false); }} className="w-full bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90">
                <Play className="h-4 w-4 mr-2" />
                Start Next Lesson
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
