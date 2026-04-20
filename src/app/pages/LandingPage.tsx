import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { TrendingUp, Users, Target, Award, Megaphone, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useTheme } from '../hooks/useTheme';

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: string;
  published_at: string;
}

interface Advertisement {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  placement: string;
}

export function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    // Fetch announcements and ads (public-ish — need auth but show on landing if logged in)
    if (isAuthenticated) {
      api.get('/dashboard/announcements').then(setAnnouncements).catch(() => {});
      api.get('/dashboard/advertisements?placement=banner').then(setAds).catch(() => {});
    }
  }, [isAuthenticated]);

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'faculty') return '/teacher/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="min-h-screen bg-[var(--ft-bg)]">
      {/* Navigation */}
      <nav className="border-b border-[var(--ft-border)] bg-[var(--ft-surface)]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[var(--ft-red)]" />
              <span className="text-xl font-medium text-[var(--ft-charcoal)]">FinTrade</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#curriculum" className="text-sm text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">Curriculum</a>
              <a href="#methodology" className="text-sm text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">Methodology</a>
              <a href="#performance" className="text-sm text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">Performance</a>
              <a href="#testimonials" className="text-sm text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">Testimonials</a>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className="p-2 rounded-lg text-[var(--ft-muted)] hover:text-[var(--ft-charcoal)] transition-colors">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardPath()}>
                    <Button className="ft-btn-outline">
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={() => logout()} className="bg-transparent border border-[var(--ft-danger)]/50 text-[var(--ft-danger)] hover:bg-[var(--ft-danger)]/10">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="ft-btn-outline">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="ft-btn-outline">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {(!isAuthenticated || user?.role === 'student') && (
                <Link to="/entrance-exam-payment">
                  <Button className="ft-btn-primary text-white">
                    Start Entrance Exam
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Announcements Banner */}
      {announcements.length > 0 && (
        <div className="bg-[var(--ft-red-tint)] border-b border-[var(--ft-border)]">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex items-center gap-3">
              <Megaphone className="h-4 w-4 text-[var(--ft-red)] shrink-0" />
              <div className="flex gap-6 overflow-hidden">
                {announcements.slice(0, 3).map(a => (
                  <span key={a.id} className="text-sm text-[var(--ft-red-text)] whitespace-nowrap">
                    <strong>{a.title}</strong> — {a.content.substring(0, 80)}{a.content.length > 80 ? '...' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6 text-5xl font-medium leading-tight">
              Trade With Discipline.<br />Not Guesswork.
            </h1>
            <p className="mb-8 text-lg text-[var(--ft-slate)] leading-relaxed">
              FinTrade trains traders through structured learning, exams, and simulated trading practice.
            </p>
            
            <div className="flex gap-4 mb-12">
              <Link to="/entrance-exam-payment">
                <Button className="ft-btn-primary h-12 px-8 text-white">
                  Start Entrance Exam
                </Button>
              </Link>
              <Link to="/courses">
                <Button className="ft-btn-outline h-12 px-8">
                  Explore Program
                </Button>
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="border-l-2 border-[var(--ft-red)] pl-4">
                <div className="text-2xl font-medium text-[var(--ft-red)] font-mono">1200+</div>
                <div className="text-sm text-[var(--ft-muted)]">Students Trained</div>
              </div>
              <div className="border-l-2 border-[var(--ft-charcoal)] pl-4">
                <div className="text-2xl font-medium text-[var(--ft-charcoal)] font-mono">78%</div>
                <div className="text-sm text-[var(--ft-muted)]">Completion Rate</div>
              </div>
              <div className="border-l-2 border-[var(--ft-red)] pl-4">
                <div className="text-sm text-[var(--ft-muted)]">Students from</div>
                <div className="text-sm text-[var(--ft-charcoal)]">Mumbai, Ahmedabad, Bengaluru</div>
              </div>
            </div>
          </div>

          {/* Trading Dashboard Preview */}
          <div className="ft-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-[var(--ft-muted)]">NIFTY 50</div>
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 rounded-full bg-[var(--ft-success)]"></div>
                <div className="text-xs text-[var(--ft-muted)]">Live</div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">18,456.75</div>
              <div className="text-sm text-[var(--ft-success)]">+124.50 (+0.68%)</div>
            </div>

            {/* Candlestick Chart Visualization */}
            <div className="h-64 border border-[var(--ft-border)] rounded-lg bg-[var(--ft-bg)] p-4">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <line x1="0" y1="50" x2="400" y2="50" stroke="var(--ft-border)" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="var(--ft-border)" strokeWidth="1" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="var(--ft-border)" strokeWidth="1" />
                
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
                    <line x1={candle.x} y1={candle.high} x2={candle.x} y2={candle.low} stroke={candle.bull ? "var(--ft-success)" : "var(--ft-danger)"} strokeWidth="1" />
                    <rect x={candle.x - 8} y={Math.min(candle.open, candle.close)} width="16" height={Math.abs(candle.close - candle.open)} fill={candle.bull ? "var(--ft-success)" : "var(--ft-danger)"} />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisements */}
      {ads.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.slice(0, 2).map(ad => (
              <a key={ad.id} href={ad.link_url || '#'} className="block ft-card p-5 hover:border-[var(--ft-red)] transition-colors group">
                <div className="flex items-start gap-4">
                  {ad.image_url && <img src={ad.image_url} alt={ad.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                  <div>
                    <div className="text-sm font-medium text-[var(--ft-charcoal)] group-hover:text-[var(--ft-red)] transition-colors">{ad.title}</div>
                    {ad.description && <div className="text-xs text-[var(--ft-muted)] mt-1">{ad.description}</div>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="curriculum" className="bg-[var(--ft-surface)] border-y border-[var(--ft-border)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-medium">
            Structured Learning Path
          </h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="ft-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--ft-red-tint)]">
                <Target className="h-6 w-6 text-[var(--ft-red)]" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Entrance Exam</h3>
              <p className="text-sm text-[var(--ft-muted)]">30-minute proctored exam to assess your trading fundamentals</p>
            </div>

            <div className="ft-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--ft-red-tint)]">
                <Users className="h-6 w-6 text-[var(--ft-red)]" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Structured Courses</h3>
              <p className="text-sm text-[var(--ft-muted)]">3-month comprehensive curriculum with video lectures and resources</p>
            </div>

            <div className="ft-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--ft-red-tint)]">
                <TrendingUp className="h-6 w-6 text-[var(--ft-red)]" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Trading Simulator</h3>
              <p className="text-sm text-[var(--ft-muted)]">Practice with ₹5,00,000 virtual capital on real market data</p>
            </div>

            <div className="ft-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--ft-red-tint)]">
                <Award className="h-6 w-6 text-[var(--ft-red)]" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Certification</h3>
              <p className="text-sm text-[var(--ft-muted)]">Earn certification after passing monthly exams and assessments</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
