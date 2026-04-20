import { useState, useEffect } from 'react';
import {
  Plus, Play, Video, Calendar, Clock, Loader2, Upload
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { api, API_URL } from '../services/api';
import { CreateLectureModal } from '../components/CreateLectureModal';

const getFullUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

interface Lecture {
  id: number;
  title: string;
  description: string | null;
  course_id: number;
  scheduled_at: string;
  duration_minutes: number;
  is_live: boolean;
  is_completed: boolean;
  max_participants: number;
  meeting_link: string | null;
  recordings: { id: number; recording_url: string; duration_seconds: number | null }[];
}

export function TeacherLectures() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchLectures = async () => {
    try {
      const data = await api.get('/lectures');
      setLectures(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load lectures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLectures(); }, []);

  const isLectureActiveOrUpcoming = (l: Lecture) => {
    if (l.is_completed) return false;
    const endTime = new Date(l.scheduled_at).getTime() + (l.duration_minutes * 60000);
    return endTime >= new Date().getTime();
  };

  const upcomingLectures = lectures.filter(isLectureActiveOrUpcoming);
  const completedLectures = lectures.filter(l => !isLectureActiveOrUpcoming(l));

  const handleEndLecture = async (id: number) => {
    setActionLoading(id);
    try {
      await api.post(`/faculty/lectures/${id}/complete`);
      await fetchLectures();
    } catch(err: any) {
      setError(err.message || "Failed to end lecture.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUploadRecording = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setActionLoading(id);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes: any = await api.post('/admin/upload', formData);
      await api.post(`/faculty/lectures/${id}/recordings`, {
        recording_url: uploadRes.url,
      });
      await fetchLectures();
    } catch(err: any) {
      setError(err.message || "Failed to upload recording.");
    } finally {
      setActionLoading(null);
      e.target.value = ''; // clear input
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <CreateLectureModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchLectures} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Lectures</h1>
          <p className="text-sm text-[var(--ft-muted)]">Manage live and recorded lectures</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-9">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Lecture
        </Button>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">{error}</div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Total Lectures</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">{lectures.length}</div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Upcoming</div>
          <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">{upcomingLectures.length}</div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Completed</div>
          <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">{completedLectures.length}</div>
        </div>
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">With Recordings</div>
          <div className="text-3xl font-medium text-[var(--ft-success)] font-mono">{lectures.filter(l => l.recordings?.length > 0).length}</div>
        </div>
      </div>

      {/* Tabs for Live and Recorded */}
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[var(--ft-surface)] border border-[var(--ft-border)] mb-6">
            <TabsTrigger value="live" className="data-[state=active]:bg-[var(--ft-red)] data-[state=active]:text-white">
              Upcoming ({upcomingLectures.length})
            </TabsTrigger>
            <TabsTrigger value="recorded" className="data-[state=active]:bg-[var(--ft-red)] data-[state=active]:text-white">
              Completed ({completedLectures.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="live">
            <div className="space-y-4">
              {upcomingLectures.length === 0 ? (
                <div className="text-center text-sm text-[var(--ft-muted)] py-8">No upcoming lectures. Schedule one above.</div>
              ) : (
                upcomingLectures.map((lecture) => (
                  <div key={lecture.id} className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[var(--ft-charcoal)] mb-2">{lecture.title}</h3>
                        {lecture.description && <div className="text-sm text-[var(--ft-muted)] mb-3">{lecture.description}</div>}
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-[var(--ft-muted)]">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[var(--ft-muted)]">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(lecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="text-[var(--ft-muted)]">{lecture.duration_minutes} min</div>
                        </div>
                      </div>
                      
                      {lecture.is_live ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]">LIVE NOW</span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--ft-red-tint)] text-[var(--ft-red)]">Scheduled</span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {lecture.meeting_link && (
                        <a href={lecture.meeting_link} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90">
                            <Play className="h-4 w-4 mr-2" />
                            {lecture.is_live ? 'Join Live' : 'Start Lecture'}
                          </Button>
                        </a>
                      )}
                      <Button onClick={() => handleEndLecture(lecture.id)} disabled={actionLoading === lecture.id} variant="outline" className="border-[var(--ft-danger)]/20 text-[var(--ft-danger)] hover:bg-[var(--ft-danger)]/10 bg-transparent">
                         {actionLoading === lecture.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'End Lecture'}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recorded">
            <div className="space-y-4">
              {completedLectures.length === 0 ? (
                <div className="text-center text-sm text-[var(--ft-muted)] py-8">No completed lectures yet.</div>
              ) : (
                completedLectures.map((lecture) => (
                  <div key={lecture.id} className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-48 h-28 bg-[var(--ft-bg)] border border-[var(--ft-border)] rounded-lg flex items-center justify-center shrink-0">
                        <Video className="h-8 w-8 text-[var(--ft-muted)]" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[var(--ft-charcoal)] mb-2">{lecture.title}</h3>
                        
                        <div className="flex items-center gap-6 text-sm text-[var(--ft-muted)] mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{lecture.duration_minutes} min</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          {lecture.recordings?.length > 0 && (
                            <div className="flex gap-3">
                              {lecture.recordings.map((rec) => (
                                <a key={rec.id} href={getFullUrl(rec.recording_url)} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
                                    <Play className="h-4 w-4 mr-2" />
                                    View Recording
                                  </Button>
                                </a>
                              ))}
                            </div>
                          )}
                          <div className="relative overflow-hidden inline-block">
                            <input type="file" accept="video/*" onChange={(e) => handleUploadRecording(e, lecture.id)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" title="Upload Recording" />
                            <Button disabled={actionLoading === lecture.id} variant="outline" className="border-[var(--ft-red)]/20 text-[var(--ft-red)] hover:bg-[var(--ft-red)]/10 bg-transparent relative z-0">
                              {actionLoading === lecture.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                              Upload Recording
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
