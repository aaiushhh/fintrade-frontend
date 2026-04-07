import { Link } from 'react-router';
import { 
  TrendingUp, LayoutDashboard, Users, BookOpen, MessageCircle, 
  FileText, BarChart3, User, Download
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const performanceTrendData = [
  { month: 'Oct', avgScore: 68, passRate: 72 },
  { month: 'Nov', avgScore: 72, passRate: 78 },
  { month: 'Dec', avgScore: 75, passRate: 82 },
  { month: 'Jan', avgScore: 77, passRate: 84 },
  { month: 'Feb', avgScore: 78, passRate: 86 },
  { month: 'Mar', avgScore: 81, passRate: 88 },
];

const weakTopicsData = [
  { topic: 'Options Trading', struggles: 42 },
  { topic: 'Fibonacci', struggles: 38 },
  { topic: 'Elliott Wave', struggles: 35 },
  { topic: 'Risk Hedging', struggles: 32 },
  { topic: 'Portfolio Allocation', struggles: 28 },
];

const moduleCompletionData = [
  { module: 'Foundations', completion: 95 },
  { module: 'Technical Analysis', completion: 88 },
  { module: 'Risk Mgmt', completion: 82 },
  { module: 'Psychology', completion: 76 },
  { module: 'Advanced', completion: 68 },
];

const studentDistributionData = [
  { category: 'Technical Analysis', value: 85 },
  { category: 'Risk Management', value: 78 },
  { category: 'Trading Psychology', value: 72 },
  { category: 'Strategy Development', value: 80 },
  { category: 'Practical Application', value: 75 },
];

export function TeacherReports() {
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
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Doubt Sessions</span>
              </div>
            </Link>
            
            <Link to="/teacher/exams">
              <div className="flex items-center gap-3 px-3 py-2 rounded text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#E5E7EB] transition-colors">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Exams</span>
              </div>
            </Link>
            
            <Link to="/teacher/reports">
              <div className="flex items-center gap-3 px-3 py-2 rounded bg-[#00D1B2]/10 text-[#00D1B2]">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">Reports</span>
              </div>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Performance Reports</h1>
              <p className="text-sm text-[#9CA3AF]">Student performance trends and analytics</p>
            </div>
            <Button className="bg-[#3B82F6] text-[#E5E7EB] hover:bg-[#3B82F6]/90">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Avg Class Score</div>
              <div className="text-3xl font-bold text-[#00D1B2] font-mono">81%</div>
              <div className="text-xs text-[#10B981] mt-1">+3% from last month</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Pass Rate</div>
              <div className="text-3xl font-bold text-[#10B981] font-mono">88%</div>
              <div className="text-xs text-[#10B981] mt-1">+2% improvement</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Completion Rate</div>
              <div className="text-3xl font-bold text-[#3B82F6] font-mono">82%</div>
              <div className="text-xs text-[#9CA3AF] mt-1">Average across modules</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">At Risk Students</div>
              <div className="text-3xl font-bold text-[#EF4444] font-mono">12</div>
              <div className="text-xs text-[#EF4444] mt-1">Needs intervention</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Performance Trend */}
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Performance Trend</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#E5E7EB'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgScore" 
                    name="Avg Score"
                    stroke="#00D1B2" 
                    strokeWidth={3}
                    dot={{ fill: '#00D1B2', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="passRate" 
                    name="Pass Rate"
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Student Skill Distribution */}
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Average Skill Distribution</h2>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={studentDistributionData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    stroke="#9CA3AF" 
                    style={{ fontSize: '11px' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    stroke="#9CA3AF"
                    style={{ fontSize: '10px' }}
                  />
                  <Radar 
                    name="Class Average" 
                    dataKey="value" 
                    stroke="#00D1B2" 
                    fill="#00D1B2" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#E5E7EB'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Weak Topics */}
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Topics Needing Focus</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weakTopicsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="topic" type="category" stroke="#9CA3AF" style={{ fontSize: '12px' }} width={120} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#E5E7EB'
                    }}
                  />
                  <Bar dataKey="struggles" fill="#EF4444" name="Students Struggling" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Module Completion */}
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Module Completion Rates</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={moduleCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="module" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#E5E7EB'
                    }}
                  />
                  <Bar dataKey="completion" fill="#00D1B2" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
