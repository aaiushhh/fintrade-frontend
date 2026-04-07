import { Link } from 'react-router';
import { TrendingUp, Users, Target, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'faculty') return '/teacher/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Navigation */}
      <nav className="border-b border-[#334155] bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
              <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#curriculum" className="text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">Curriculum</a>
              <a href="#methodology" className="text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">Methodology</a>
              <a href="#performance" className="text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">Performance</a>
              <a href="#testimonials" className="text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">Testimonials</a>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardPath()}>
                    <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={() => logout()} variant="outline" className="border-[#334155] bg-transparent text-[#EF4444] hover:bg-[#1F2937]">
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
                    <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937]">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {(!isAuthenticated || user?.role === 'student') && (
                <Link to="/entrance-exam-payment">
                  <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90">
                    Start Entrance Exam
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6 text-5xl font-bold text-[#E5E7EB] leading-tight">
              Trade With Discipline.<br />Not Guesswork.
            </h1>
            <p className="mb-8 text-lg text-[#9CA3AF] leading-relaxed">
              FinTrade trains traders through structured learning, exams, and simulated trading practice.
            </p>
            
            <div className="flex gap-4 mb-12">
              <Link to="/entrance-exam-payment">
                <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-12 px-8">
                  Start Entrance Exam
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-12 px-8">
                  Explore Program
                </Button>
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="border-l-2 border-[#00D1B2] pl-4">
                <div className="text-2xl font-bold text-[#00D1B2] font-mono">1200+</div>
                <div className="text-sm text-[#9CA3AF]">Students Trained</div>
              </div>
              <div className="border-l-2 border-[#3B82F6] pl-4">
                <div className="text-2xl font-bold text-[#3B82F6] font-mono">78%</div>
                <div className="text-sm text-[#9CA3AF]">Completion Rate</div>
              </div>
              <div className="border-l-2 border-[#00D1B2] pl-4">
                <div className="text-sm text-[#9CA3AF]">Students from</div>
                <div className="text-sm text-[#E5E7EB]">Mumbai, Ahmedabad, Bengaluru</div>
              </div>
            </div>
          </div>

          {/* Trading Dashboard Preview */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-[#9CA3AF]">NIFTY 50</div>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
                <div className="text-xs text-[#9CA3AF]">Live</div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-[#E5E7EB] font-mono">18,456.75</div>
              <div className="text-sm text-[#10B981]">+124.50 (+0.68%)</div>
            </div>

            {/* Candlestick Chart Visualization */}
            <div className="h-64 border border-[#334155] rounded bg-[#0F172A] p-4">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#334155" strokeWidth="1" />
                
                {/* Candlesticks */}
                {[
                  { x: 40, high: 30, low: 90, open: 70, close: 40, bull: true },
                  { x: 80, high: 40, low: 100, open: 60, close: 80, bull: false },
                  { x: 120, high: 50, low: 110, open: 100, close: 60, bull: true },
                  { x: 160, high: 35, low: 95, open: 80, close: 45, bull: true },
                  { x: 200, high: 45, low: 105, open: 50, close: 95, bull: false },
                  { x: 240, high: 55, low: 115, open: 100, close: 65, bull: true },
                  { x: 280, high: 40, low: 100, open: 90, close: 50, bull: true },
                  { x: 320, high: 30, low: 90, open: 70, close: 35, bull: true },
                  { x: 360, high: 25, low: 85, open: 50, close: 30, bull: true },
                ].map((candle, i) => (
                  <g key={i}>
                    <line
                      x1={candle.x}
                      y1={candle.high}
                      x2={candle.x}
                      y2={candle.low}
                      stroke={candle.bull ? "#10B981" : "#EF4444"}
                      strokeWidth="1"
                    />
                    <rect
                      x={candle.x - 8}
                      y={Math.min(candle.open, candle.close)}
                      width="16"
                      height={Math.abs(candle.close - candle.open)}
                      fill={candle.bull ? "#10B981" : "#EF4444"}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#111827] border-y border-[#334155] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#E5E7EB]">
            Structured Learning Path
          </h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00D1B2]/10">
                <Target className="h-6 w-6 text-[#00D1B2]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#E5E7EB]">Entrance Exam</h3>
              <p className="text-sm text-[#9CA3AF]">30-minute proctored exam to assess your trading fundamentals</p>
            </div>

            <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                <Users className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#E5E7EB]">Structured Courses</h3>
              <p className="text-sm text-[#9CA3AF]">3-month comprehensive curriculum with video lectures and resources</p>
            </div>

            <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00D1B2]/10">
                <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#E5E7EB]">Trading Simulator</h3>
              <p className="text-sm text-[#9CA3AF]">Practice with ₹5,00,000 virtual capital on real market data</p>
            </div>

            <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                <Award className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#E5E7EB]">Certification</h3>
              <p className="text-sm text-[#9CA3AF]">Earn certification after passing monthly exams and assessments</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
