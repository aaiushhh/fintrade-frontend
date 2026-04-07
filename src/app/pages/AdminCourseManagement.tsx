import { useState, useEffect } from 'react';
import { Loader2, Plus, BookOpen, Layers, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';

interface Course {
  id: number;
  title: string;
  price: number;
  difficulty_level: string;
  is_published: boolean;
  modules?: Module[];
}

interface Module {
  id: number;
  title: string;
  order: number;
  lessons?: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  content_type: string;
  order: number;
}

export function AdminCourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');

  // Module creation form
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', order: 1 });
  const [moduleLoading, setModuleLoading] = useState(false);

  // Lesson creation form
  const [isAddingLesson, setIsAddingLesson] = useState<number | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', content_type: 'text', content_url: '', text_content: '', order: 1 });
  const [lessonFile, setLessonFile] = useState<File | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const data = await api.get('/courses');
      setCourses(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const viewCourseDetail = async (courseId: number) => {
    setDetailLoading(true);
    try {
      const data = await api.get(`/courses/${courseId}`);
      setSelectedCourse(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load course details');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setModuleLoading(true);
    try {
      await api.post('/admin/modules', { ...moduleForm, course_id: selectedCourse.id });
      await viewCourseDetail(selectedCourse.id);
      setIsAddingModule(false);
      setModuleForm({ title: '', description: '', order: 1 });
    } catch (err: any) {
      setError(err.message || 'Failed to create module');
    } finally {
      setModuleLoading(false);
    }
  };

  const handleAddLesson = async (e: React.FormEvent, moduleId: number) => {
    e.preventDefault();
    setLessonLoading(true);
    let finalVideoUrl = lessonForm.content_url;

    try {
      if ((lessonForm.content_type === 'video' || lessonForm.content_type === 'audio') && lessonFile) {
        const formData = new FormData();
        formData.append('file', lessonFile);
        const uploadRes: any = await api.post('/admin/upload', formData);
        finalVideoUrl = uploadRes.url;
      }

      await api.post('/admin/lessons', { 
        title: lessonForm.title,
        content_type: lessonForm.content_type,
        video_url: finalVideoUrl,
        content: lessonForm.text_content,
        order: lessonForm.order,
        module_id: moduleId 
      });
      if (selectedCourse) await viewCourseDetail(selectedCourse.id);
      setIsAddingLesson(null);
      setLessonForm({ title: '', content_type: 'text', content_url: '', text_content: '', order: 1 });
      setLessonFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create lesson');
    } finally {
      setLessonLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Course Management</h1>
        <p className="text-sm text-[#9CA3AF]">Manage courses, modules, and lessons</p>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">{error}
          <button onClick={() => setError('')} className="ml-4 underline text-xs">dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Courses List */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-[#00D1B2]" />
            <h2 className="text-sm font-semibold text-[#E5E7EB]">Courses ({courses.length})</h2>
          </div>
          <div className="space-y-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => viewCourseDetail(course.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedCourse?.id === course.id
                    ? 'border-[#00D1B2] bg-[#00D1B2]/10'
                    : 'border-[#334155] bg-[#1F2937] hover:border-[#00D1B2]/50'
                }`}
              >
                <div className="text-sm text-[#E5E7EB] mb-1">{course.title}</div>
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                  <span className="capitalize">{course.difficulty_level}</span>
                  <span>•</span>
                  <span className="font-mono">₹{course.price.toLocaleString('en-IN')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Course Detail — Modules & Lessons */}
        <div className="col-span-2 bg-[#111827] border border-[#334155] rounded-lg p-6">
          {detailLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 text-[#00D1B2] animate-spin" />
            </div>
          ) : selectedCourse ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-[#E5E7EB]">{selectedCourse.title}</h2>
                  <p className="text-xs text-[#9CA3AF]">Course ID: {selectedCourse.id}</p>
                </div>
                <Button onClick={() => setIsAddingModule(true)} className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-8 text-xs">
                  <Plus className="h-3 w-3 mr-1" /> Add Module
                </Button>
              </div>

              {/* Add Module Form */}
              {isAddingModule && (
                <form onSubmit={handleAddModule} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <input required type="text" value={moduleForm.title}
                      onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                      className="col-span-2 bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
                      placeholder="Module title"
                    />
                    <input required type="number" min={1} value={moduleForm.order}
                      onChange={(e) => setModuleForm({ ...moduleForm, order: Number(e.target.value) })}
                      className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
                      placeholder="Order"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={moduleLoading} className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-8 text-xs">
                      {moduleLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Save Module'}
                    </Button>
                    <Button type="button" onClick={() => setIsAddingModule(false)} variant="outline" className="border-[#334155] bg-transparent text-[#9CA3AF] h-8 text-xs">
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              {/* Modules List */}
              <div className="space-y-4">
                {(selectedCourse.modules || []).length === 0 ? (
                  <div className="text-center text-sm text-[#9CA3AF] py-8">No modules yet. Add one above.</div>
                ) : (
                  (selectedCourse.modules || []).map((mod) => (
                    <div key={mod.id} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-[#3B82F6]" />
                          <span className="text-sm font-medium text-[#E5E7EB]">{mod.title}</span>
                          <span className="text-xs text-[#9CA3AF]">#{mod.order}</span>
                        </div>
                        <Button onClick={() => setIsAddingLesson(isAddingLesson === mod.id ? null : mod.id)}
                          variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#0F172A] h-7 text-xs">
                          <Plus className="h-3 w-3 mr-1" /> Lesson
                        </Button>
                      </div>

                      {/* Add Lesson Form */}
                      {isAddingLesson === mod.id && (
                        <form onSubmit={(e) => handleAddLesson(e, mod.id)} className="bg-[#0F172A] border border-[#334155] rounded-lg p-3 mb-3">
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <input required type="text" value={lessonForm.title}
                              onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                              className="col-span-2 bg-[#111827] border border-[#334155] rounded px-3 py-1.5 text-xs text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
                              placeholder="Lesson title"
                            />
                            <select value={lessonForm.content_type}
                              onChange={(e) => setLessonForm({ ...lessonForm, content_type: e.target.value })}
                              className="bg-[#111827] border border-[#334155] rounded px-2 py-1.5 text-xs text-[#E5E7EB]"
                            >
                              <option value="text">Text</option>
                              <option value="video">Video</option>
                              <option value="audio">Audio</option>
                            </select>
                          </div>
                          {(lessonForm.content_type === 'video' || lessonForm.content_type === 'audio') && (
                            <div className="mb-2">
                              <input type="file" accept={lessonForm.content_type === 'video' ? 'video/*' : 'audio/*'}
                                onChange={(e) => setLessonFile(e.target.files ? e.target.files[0] : null)}
                                className="w-full bg-[#111827] border border-[#334155] rounded px-3 py-1.5 text-xs text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
                              />
                              <p className="text-[10px] text-[#9CA3AF] mt-1">Or provide a link instead (optional if file uploaded)</p>
                              <input type="text" value={lessonForm.content_url}
                                onChange={(e) => setLessonForm({ ...lessonForm, content_url: e.target.value })}
                                className="w-full mt-1 bg-[#111827] border border-[#334155] rounded px-3 py-1.5 text-xs text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2]"
                                placeholder={`External ${lessonForm.content_type} link...`}
                              />
                            </div>
                          )}
                          {lessonForm.content_type === 'text' && (
                            <div className="mb-2">
                              <textarea value={lessonForm.text_content}
                                onChange={(e) => setLessonForm({ ...lessonForm, text_content: e.target.value })}
                                className="w-full bg-[#111827] border border-[#334155] rounded px-3 py-1.5 text-xs text-[#E5E7EB] focus:outline-none focus:border-[#00D1B2] min-h-[60px]"
                                placeholder="Text content..."
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button type="submit" disabled={lessonLoading} className="bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 h-7 text-xs">
                              {lessonLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Add'}
                            </Button>
                            <Button type="button" onClick={() => setIsAddingLesson(null)} variant="outline" className="border-[#334155] bg-transparent text-[#9CA3AF] h-7 text-xs">
                              Cancel
                            </Button>
                          </div>
                        </form>
                      )}

                      {/* Lessons */}
                      {(mod.lessons || []).length > 0 && (
                        <div className="space-y-1 mt-2">
                          {(mod.lessons || []).map((lesson) => (
                            <div key={lesson.id} className="flex items-center gap-2 p-2 rounded bg-[#0F172A] text-xs">
                              <FileText className="h-3 w-3 text-[#9CA3AF]" />
                              <span className="text-[#E5E7EB]">{lesson.title}</span>
                              <span className="text-[#9CA3AF] capitalize ml-auto">{lesson.content_type}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-[#9CA3AF] py-12">
              Select a course to view and manage modules & lessons
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
