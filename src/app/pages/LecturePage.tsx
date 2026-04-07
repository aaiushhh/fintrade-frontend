import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  Bot, Play, CheckCircle2, ChevronRight, Loader2
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

const resources = [
  { name: 'Technical Analysis Guide.pdf', size: '2.4 MB' },
  { name: 'Chart Patterns Reference.pdf', size: '1.8 MB' },
  { name: 'Practice Exercises.xlsx', size: '856 KB' },
];

const discussions = [
  { id: 1, user: 'Aditi Mehta', comment: 'Great explanation on candlestick patterns!', time: '2h ago', replies: 3 },
  { id: 2, user: 'Karan Patel', comment: 'Can you explain more about RSI divergence?', time: '5h ago', replies: 1 },
  { id: 3, user: 'Neha Shah', comment: 'The practical examples were very helpful', time: '1d ago', replies: 0 },
];

export function LecturePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course_id');
  const moduleId = searchParams.get('module_id');

  const [course, setCourse] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        const mod = (courseData.modules || []).find((m: any) => m.id.toString() === moduleId);
        setActiveModule(mod);
        if (mod && mod.lessons && mod.lessons.length > 0) {
          setActiveLesson(mod.lessons[0]); // default to first lesson
        }
      } catch(err: any) {
        setError(err.message || 'Failed to load module');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [courseId, moduleId]);

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" /></div>;
  }

  if (error || !activeModule) {
    return <div className="p-8 text-red-400">{error || 'Module not found'}</div>;
  }

  const moduleLessons = activeModule.lessons || [];
  const nextLessonIndex = moduleLessons.findIndex((l: any) => l.id === activeLesson?.id) + 1;
  const nextLesson = nextLessonIndex < moduleLessons.length ? moduleLessons[nextLessonIndex] : null;



  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-2">
          <Link to={`/student/modules?course_id=${courseId}`} className="hover:text-[#00D1B2]">Modules</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{activeModule.title}</span>
        </div>
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">{activeLesson ? activeLesson.title : activeModule.title}</h1>
        <p className="text-sm text-[#9CA3AF]">Course: {course.title} • Module {activeModule.order}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Video Section */}
        <div className="col-span-2 space-y-6">
          {/* Video Player */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg overflow-hidden">
            {activeLesson?.content_type === 'video' && activeLesson.video_url ? (
              <video 
                controls 
                className="w-full aspect-video bg-[#0F172A]"
                src={getFullUrl(activeLesson.video_url)}
              />
            ) : activeLesson?.content_type === 'audio' && activeLesson.video_url ? (
              <div className="aspect-video bg-[#0F172A] flex items-center justify-center p-8">
                <audio controls className="w-full" src={getFullUrl(activeLesson.video_url)} />
              </div>
            ) : (
                <div className="aspect-video bg-[#0F172A] p-8 overflow-auto text-[#E5E7EB] text-sm leading-relaxed whitespace-pre-wrap">
                  {activeLesson?.content || 'No content provided for this lesson.'}
                </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-12">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Mark Complete
            </Button>
            <Link to="/student/ai-tutor" className="flex-1">
              <Button variant="outline" className="w-full border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-12">
                <Bot className="h-5 w-5 mr-2" />
                Ask AI Tutor
              </Button>
            </Link>
          </div>

          {/* Tabs Section */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#1F2937] border border-[#334155]">
                <TabsTrigger value="notes" className="data-[state=active]:bg-[#00D1B2] data-[state=active]:text-[#0F172A]">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-[#00D1B2] data-[state=active]:text-[#0F172A]">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="discussion" className="data-[state=active]:bg-[#00D1B2] data-[state=active]:text-[#0F172A]">
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#E5E7EB] mb-2">Lecture Notes</h3>
                    <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                      <div className="space-y-3 text-sm text-[#9CA3AF]">
                        <p>• Technical analysis studies past market data to forecast future price movements</p>
                        <p>• Key assumption: Price discounts everything - all information is reflected in price</p>
                        <p>• Price movements follow trends that can be identified and analyzed</p>
                        <p>• History tends to repeat itself - patterns recur in markets</p>
                        <p>• Support and resistance levels are crucial price zones</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#E5E7EB] mb-2">Your Notes</h3>
                    <textarea
                      className="w-full bg-[#1F2937] border border-[#334155] rounded-lg p-4 text-sm text-[#E5E7EB] placeholder:text-[#9CA3AF] min-h-32"
                      placeholder="Add your personal notes here..."
                    ></textarea>
                    <Button className="mt-2 bg-[#3B82F6] text-[#E5E7EB] hover:bg-[#3B82F6]/90">
                      Save Notes
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <h3 className="text-sm font-semibold text-[#E5E7EB] mb-4">Downloadable Resources</h3>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <div key={index} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#E5E7EB] mb-1">{resource.name}</div>
                        <div className="text-xs text-[#9CA3AF]">{resource.size}</div>
                      </div>
                      <Button variant="outline" className="border-[#334155] bg-transparent text-[#00D1B2] hover:bg-[#1F2937]">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="mt-6">
                <h3 className="text-sm font-semibold text-[#E5E7EB] mb-4">Discussion Board</h3>
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#E5E7EB] mb-1">{discussion.user}</div>
                          <div className="text-sm text-[#9CA3AF]">{discussion.comment}</div>
                        </div>
                        <span className="text-xs text-[#9CA3AF]">{discussion.time}</span>
                      </div>
                      {discussion.replies > 0 && (
                        <div className="text-xs text-[#00D1B2] mt-2">{discussion.replies} replies</div>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                    Add Comment
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Module Progress */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
            <h2 className="text-sm font-semibold text-[#E5E7EB] mb-4">Module Progress</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#9CA3AF]">Technical Analysis</span>
                <span className="text-xs font-mono text-[#E5E7EB]">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div className="space-y-2">
              {moduleLessons.map((lesson: any) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    activeLesson?.id === lesson.id ? 'bg-[#00D1B2]/10 border border-[#00D1B2]' : 'bg-[#1F2937] hover:bg-[#334155]'
                  }`}
                >
                  <div className="mt-0.5">
                    {/* Placeholder for completion check */}
                    <div className={`w-4 h-4 rounded-full border-2 ${
                        activeLesson?.id === lesson.id ? 'border-[#00D1B2]' : 'border-[#334155]'
                      }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs mb-1 ${
                      activeLesson?.id === lesson.id ? 'text-[#00D1B2] font-medium' : 'text-[#9CA3AF]'
                    }`}>
                      {lesson.title}
                    </div>
                    <div className="text-xs text-[#9CA3AF] capitalize">{lesson.content_type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {nextLesson && (
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-sm font-semibold text-[#E5E7EB] mb-4">Up Next</h2>
              <div className="mb-4">
                <div className="text-sm text-[#E5E7EB] mb-1">{nextLesson.title}</div>
                <div className="text-xs text-[#9CA3AF] capitalize">{nextLesson.content_type}</div>
              </div>
              <Button onClick={() => setActiveLesson(nextLesson)} className="w-full bg-[#3B82F6] text-[#E5E7EB] hover:bg-[#3B82F6]/90">
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
