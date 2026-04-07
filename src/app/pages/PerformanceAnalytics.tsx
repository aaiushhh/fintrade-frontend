import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const skillData = [
  { skill: 'Technical Analysis', score: 85 },
  { skill: 'Risk Management', score: 78 },
  { skill: 'Trading Psychology', score: 72 },
  { skill: 'Strategy', score: 80 },
  { skill: 'Market Knowledge', score: 75 }
];

const examTrendData = [
  { exam: 'Entrance', score: 68 },
  { exam: 'Month 1', score: 85 },
  { exam: 'Month 2', score: 72 },
  { exam: 'Month 3', score: 58 }
];

export function PerformanceAnalytics() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Performance Analytics</h1>
        <p className="text-sm text-[#9CA3AF]">Track your learning progress and skill development</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Overall Score</div>
          <div className="text-3xl font-bold text-[#00D1B2] font-mono">78%</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Course Progress</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">72%</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Exams Passed</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">2/3</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Study Hours</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">48h</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Skill Radar Chart */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Skill Assessment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#00D1B2"
                fill="#00D1B2"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Score Trend */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Exam Score Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={examTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="exam"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#E5E7EB'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strengths and Improvement Areas */}
      <div className="grid grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Strengths</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E5E7EB]">Technical Analysis</span>
                <span className="text-sm font-mono text-[#00D1B2]">85%</span>
              </div>
              <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                <div className="h-full bg-[#00D1B2]" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E5E7EB]">Strategy Development</span>
                <span className="text-sm font-mono text-[#00D1B2]">80%</span>
              </div>
              <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                <div className="h-full bg-[#00D1B2]" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E5E7EB]">Risk Management</span>
                <span className="text-sm font-mono text-[#00D1B2]">78%</span>
              </div>
              <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                <div className="h-full bg-[#00D1B2]" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Areas for Improvement</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E5E7EB]">Trading Psychology</span>
                <span className="text-sm font-mono text-[#EF4444]">72%</span>
              </div>
              <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                <div className="h-full bg-[#EF4444]" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E5E7EB]">Market Knowledge</span>
                <span className="text-sm font-mono text-[#EF4444]">75%</span>
              </div>
              <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                <div className="h-full bg-[#EF4444]" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="border-t border-[#334155] pt-4 mt-4">
              <p className="text-sm text-[#9CA3AF]">
                Focus on improving your trading psychology and market knowledge to achieve better overall performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
