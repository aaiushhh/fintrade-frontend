import { Link } from 'react-router';
import { 
  TrendingUp, LayoutDashboard, Users, BookOpen, MessageCircle, 
  FileText, BarChart3, User, Calendar, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';

const sessions = [
  { 
    id: 1, 
    topic: 'Advanced RSI Divergence Patterns', 
    students: ['Rahul Sharma', 'Karan Patel', 'Priya Gupta'], 
    module: 'Technical Analysis',
    date: 'Wed, 27 Mar 2026', 
    time: '3:00 PM',
    status: 'Scheduled',
    type: 'Complex'
  },
  { 
    id: 2, 
    topic: 'Options Hedging Strategies', 
    students: ['Aditi Mehta', 'Vikram Desai'], 
    module: 'Advanced Trading',
    date: 'Thu, 28 Mar 2026', 
    time: '11:00 AM',
    status: 'Scheduled',
    type: 'Complex'
  },
  { 
    id: 3, 
    topic: 'Position Sizing in Volatile Markets', 
    students: ['Neha Shah', 'Arjun Singh', 'Divya Reddy'], 
    module: 'Risk Management',
    date: 'Fri, 29 Mar 2026', 
    time: '2:00 PM',
    status: 'Scheduled',
    type: 'Complex'
  },
];

const resolvedSessions = [
  { 
    id: 1, 
    topic: 'Moving Average Crossovers', 
    students: 5, 
    module: 'Technical Analysis',
    date: '20 Mar 2026',
    resolution: 'Explained with live chart examples'
  },
  { 
    id: 2, 
    topic: 'Fibonacci Retracement Levels', 
    students: 8, 
    module: 'Technical Analysis',
    date: '18 Mar 2026',
    resolution: 'Shared detailed video tutorial'
  },
  { 
    id: 3, 
    topic: 'Stop Loss Placement Techniques', 
    students: 6, 
    module: 'Risk Management',
    date: '15 Mar 2026',
    resolution: 'Provided practical examples with case studies'
  },
];

export function TeacherDoubtSessions() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] border-r border-[#334155] flex flex-col">
        <div className="p-6 border-b border-[#334155]">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
            <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
          </div>
          
          <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-xs text-[#9CA3AF]">Role: Teacher</span>
            </div>
            <div className="text-sm font-medium text-[#E5E7EB]">Amit Desai</div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link to="/teacher/dashboard">
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-sm">Dashboard</span>
              </div>
            </Link>
            
            <Link to="/teacher/students">
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <Users className="h-4 w-4" />
                <span className="text-sm">Students</span>
              </div>
            </Link>
            
            <Link to="/teacher/lectures">
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">Lectures</span>
              </div>
            </Link>
            
            <Link to="/teacher/doubt-sessions">
              <div className="flex items-center gap-3 px-3 py-2 rounded bg-[#00D1B2]/10 text-[#00D1B2]">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Doubt Sessions</span>
              </div>
            </Link>
            
            <Link to="/teacher/exams">
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Exams</span>
              </div>
            </Link>
            
            <Link to="/teacher/reports">
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Reports</span>
              </div>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Doubt Sessions</h1>
            <p className="text-sm text-[#9CA3AF]">Manage complex doubts escalated from AI tutor</p>
          </div>

          {/* Info Card */}
          <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-[#3B82F6] mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-[#3B82F6] mb-1">How Doubt Sessions Work</h3>
                <div className="text-sm text-[#9CA3AF] space-y-1">
                  <p>• AI Tutor handles common doubts and shows relevant video tutorials</p>
                  <p>• Complex or advanced doubts are escalated to scheduled teacher sessions</p>
                  <p>• Multiple students with similar doubts are grouped into one session</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Scheduled Sessions</div>
              <div className="text-3xl font-bold text-[#3B82F6] font-mono">3</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Students Waiting</div>
              <div className="text-3xl font-bold text-[#EF4444] font-mono">8</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Resolved This Month</div>
              <div className="text-3xl font-bold text-[#10B981] font-mono">24</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Avg Resolution Time</div>
              <div className="text-3xl font-bold text-[#00D1B2] font-mono">2.3h</div>
            </div>
          </div>

          {/* Scheduled Sessions */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Upcoming Sessions</h2>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="bg-[#1F2937] border border-[#334155] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-[#E5E7EB]">{session.topic}</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EF4444]/10 text-[#EF4444]">
                          {session.type}
                        </span>
                      </div>
                      <div className="text-sm text-[#9CA3AF] mb-4">Module: {session.module}</div>
                      
                      <div className="flex items-center gap-6 text-sm text-[#9CA3AF] mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{session.students.length} students</span>
                        </div>
                      </div>
                      
                      <div className="bg-[#0F172A] border border-[#334155] rounded-lg p-3">
                        <div className="text-xs text-[#9CA3AF] mb-2">Students:</div>
                        <div className="flex flex-wrap gap-2">
                          {session.students.map((student, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded bg-[#1F2937] text-xs text-[#E5E7EB]">
                              {student}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90">
                      Join Session
                    </Button>
                    <Button variant="outline" className="border-[#334155] bg-transparent text-[#10B981] hover:bg-[#1F2937]">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Resolved
                    </Button>
                    <Button variant="outline" className="border-[#334155] bg-transparent text-[#9CA3AF] hover:bg-[#1F2937]">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resolved Sessions */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Recently Resolved</h2>
            <div className="space-y-3">
              {resolvedSessions.map((session) => (
                <div key={session.id} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                        <h3 className="text-sm font-semibold text-[#E5E7EB]">{session.topic}</h3>
                      </div>
                      <div className="text-sm text-[#9CA3AF] mb-2">
                        {session.module} • {session.students} students • {session.date}
                      </div>
                      <div className="text-sm text-[#10B981]">Resolution: {session.resolution}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
