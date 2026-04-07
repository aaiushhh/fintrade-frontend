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
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <nav className="border-b border-[#334155] bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
              <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardPath()}>
                    <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="outline" className="border-[#334155] bg-transparent text-[#EF4444] hover:bg-[#1F2937]">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90">
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
          <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Choose Your Course</h1>
          <p className="text-[#9CA3AF]">Select a course that matches your trading experience level</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center text-[#E5E7EB] py-12">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="col-span-2 text-center text-[#9CA3AF] py-12">No courses found.</div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="bg-[#111827] border border-[#334155] rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#E5E7EB] mb-1">{course.name || course.title}</h2>
                      <div className="inline-block bg-[#00D1B2]/10 border border-[#00D1B2] text-[#00D1B2] text-xs px-2 py-1 rounded">
                        {course.level || 'All Levels'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#00D1B2] font-mono">₹{(course.price || 0).toLocaleString('en-IN')}</div>
                      <div className="text-xs text-[#9CA3AF]">one-time fee</div>
                    </div>
                  </div>

                  <p className="text-sm text-[#9CA3AF] mb-6">{course.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#00D1B2]" />
                      <div>
                        <div className="text-xs text-[#9CA3AF]">Duration</div>
                        <div className="text-sm text-[#E5E7EB]">{course.duration || '3 months'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#00D1B2]" />
                      <div>
                        <div className="text-xs text-[#9CA3AF]">Modules</div>
                        <div className="text-sm text-[#E5E7EB]">{course.modules_count || course.modules || 0} modules</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <CheckCircle2 className="h-4 w-4 text-[#00D1B2]" />
                      <span>Video lectures & resources</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <CheckCircle2 className="h-4 w-4 text-[#00D1B2]" />
                      <span>AI tutor support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <CheckCircle2 className="h-4 w-4 text-[#00D1B2]" />
                      <span>Monthly exams</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Award className="h-4 w-4 text-[#00D1B2]" />
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
                        className="flex-1 bg-[#1F2937] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00D1B2] font-mono"
                      />
                      <button
                        onClick={() => handleApplyOffer(course.id)}
                        className="px-3 py-2 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs hover:bg-[#3B82F6]/20 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {offerResults[course.id] && (
                      <div className="text-xs text-[#10B981] bg-[#10B981]/10 rounded p-2 border border-[#10B981]/20">
                        {offerResults[course.id].message} — Save ₹{offerResults[course.id].discount_applied?.toLocaleString('en-IN')}
                      </div>
                    )}
                    {offerErrors[course.id] && (
                      <div className="text-xs text-[#EF4444]">{offerErrors[course.id]}</div>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolling[course.id]}
                    className="w-full bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-11">
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
