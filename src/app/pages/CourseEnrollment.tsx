import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { TrendingUp, Clock, BookOpen, Award, CheckCircle2, ChevronLeft, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function CourseEnrollment() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<Record<string, boolean>>({});
  const [offerCodes, setOfferCodes] = useState<Record<number, string>>({});
  const [offerResults, setOfferResults] = useState<Record<number, any>>({});
  const [offerErrors, setOfferErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    // ... same content
    api.get('/courses')
      .then(data => {
        setCourses(Array.isArray(data) ? data : (data.items || data.courses || []));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEnroll = async (courseId: number) => {
    setEnrolling(prev => ({ ...prev, [courseId]: true }));
    try {
      const code = offerCodes[courseId] || '';
      await api.post(`/courses/${courseId}/enroll`, code ? { distributor_code: code } : {});
      alert('Successfully enrolled!');
    } catch (err: any) {
      alert(err.message || 'Enrollment failed');
    } finally {
      setEnrolling(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleApplyOffer = async (courseId: number) => {
    setOfferErrors(prev => ({ ...prev, [courseId]: '' }));
    setOfferResults(prev => { const next = { ...prev }; delete next[courseId]; return next; });
    const code = offerCodes[courseId] || '';
    if (!code.trim()) {
      setOfferErrors(prev => ({ ...prev, [courseId]: 'Please enter an offer code' }));
      return;
    }
    try {
      const result = await api.post('/offers/apply', { code, course_id: courseId });
      setOfferResults(prev => ({ ...prev, [courseId]: result }));
    } catch (err: any) {
      setOfferErrors(prev => ({ ...prev, [courseId]: err.message || 'Invalid offer code' }));
    }
  };

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'faculty') return '/teacher/dashboard';
    return '/student/dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--ft-bg)]">
      {/* Header */}
      <nav className="border-b border-[var(--ft-border)] bg-[var(--ft-surface)]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[var(--ft-red)]" />
              <span className="text-xl font-medium text-[var(--ft-charcoal)]">FinTrade</span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardPath()}>
                    <Button variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-danger)] hover:bg-[var(--ft-surface)]">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)]">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-medium text-[var(--ft-charcoal)] mb-2">Choose Your Course</h1>
          <p className="text-[var(--ft-muted)]">Select a course that matches your trading experience level</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center text-[var(--ft-charcoal)] py-12">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="col-span-2 text-center text-[var(--ft-muted)] py-12">No courses found.</div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--ft-charcoal)] mb-1">{course.name || course.title}</h2>
                      <div className="inline-block bg-[var(--ft-red)]/10 border border-[var(--ft-red)] text-[var(--ft-red)] text-xs px-2 py-1 rounded">
                        {course.level || 'All Levels'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium text-[var(--ft-red)] font-mono">₹{(course.price || 0).toLocaleString('en-IN')}</div>
                      <div className="text-xs text-[var(--ft-muted)]">one-time fee</div>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--ft-muted)] mb-6">{course.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[var(--ft-red)]" />
                      <div>
                        <div className="text-xs text-[var(--ft-muted)]">Duration</div>
                        <div className="text-sm text-[var(--ft-charcoal)]">{course.duration || '3 months'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[var(--ft-red)]" />
                      <div>
                        <div className="text-xs text-[var(--ft-muted)]">Modules</div>
                        <div className="text-sm text-[var(--ft-charcoal)]">{course.modules_count || course.modules || 0} modules</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[var(--ft-muted)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--ft-red)]" />
                      <span>Video lectures & resources</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--ft-muted)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--ft-red)]" />
                      <span>AI tutor support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--ft-muted)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--ft-red)]" />
                      <span>Monthly exams</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--ft-muted)]">
                      <Award className="h-4 w-4 text-[var(--ft-red)]" />
                      <span>Certification on completion</span>
                    </div>
                  </div>

                  {/* Offer Code */}
                  <div className="mb-4">
                    <div className="flex gap-2 mb-1">
                      <input
                        type="text"
                        value={offerCodes[course.id] || ''}
                        onChange={(e) => setOfferCodes(prev => ({ ...prev, [course.id]: e.target.value.toUpperCase() }))}
                        placeholder="Offer / Referral Code"
                        className="flex-1 bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg px-3 py-2 text-sm text-[var(--ft-charcoal)] placeholder:text-[var(--ft-muted)] focus:outline-none focus:border-[var(--ft-red)] font-mono"
                      />
                      <button
                        onClick={() => handleApplyOffer(course.id)}
                        className="px-3 py-2 rounded-lg bg-[var(--ft-red-tint)] border border-[var(--ft-red)]/30 text-[var(--ft-red)] text-xs hover:bg-[var(--ft-red)]/20 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {offerResults[course.id] && (
                      <div className="text-xs text-[var(--ft-success)] bg-[var(--ft-success)]/10 rounded p-2 border border-[var(--ft-success)]/20">
                        {offerResults[course.id].message} — Save ₹{offerResults[course.id].discount_applied?.toLocaleString('en-IN')}
                      </div>
                    )}
                    {offerErrors[course.id] && (
                      <div className="text-xs text-[var(--ft-danger)]">{offerErrors[course.id]}</div>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolling[course.id]}
                    className="w-full bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-11">
                    {enrolling[course.id] ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
