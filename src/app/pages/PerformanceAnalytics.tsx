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
        <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Performance Analytics</h1>
        <p className="text-sm text-[var(--ft-muted)]">Track your learning progress and skill development</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Overall Score</div>
          <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">78%</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Course Progress</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">72%</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Exams Passed</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">2/3</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Study Hours</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">48h</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Skill Radar Chart */}
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Skill Assessment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="var(--ft-border)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'var(--ft-muted)', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: 'var(--ft-muted)', fontSize: 12 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="var(--ft-red)"
                fill="var(--ft-red)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Score Trend */}
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Exam Score Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={examTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ft-border)" />
              <XAxis
                dataKey="exam"
                stroke="var(--ft-muted)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="var(--ft-muted)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--ft-surface)',
                  border: '1px solid var(--ft-border)',
                  borderRadius: '8px',
                  color: 'var(--ft-charcoal)'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--ft-red)"
                strokeWidth={3}
                dot={{ fill: 'var(--ft-red)', r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strengths and Improvement Areas */}
      <div className="grid grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Strengths</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--ft-charcoal)]">Technical Analysis</span>
                <span className="text-sm font-mono text-[var(--ft-red)]">85%</span>
              </div>
              <div className="h-2 bg-[var(--ft-surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--ft-red)]" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--ft-charcoal)]">Strategy Development</span>
                <span className="text-sm font-mono text-[var(--ft-red)]">80%</span>
              </div>
              <div className="h-2 bg-[var(--ft-surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--ft-red)]" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--ft-charcoal)]">Risk Management</span>
                <span className="text-sm font-mono text-[var(--ft-red)]">78%</span>
              </div>
              <div className="h-2 bg-[var(--ft-surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--ft-red)]" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Areas for Improvement</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--ft-charcoal)]">Trading Psychology</span>
                <span className="text-sm font-mono text-[var(--ft-danger)]">72%</span>
              </div>
              <div className="h-2 bg-[var(--ft-surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--ft-danger)]" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--ft-charcoal)]">Market Knowledge</span>
                <span className="text-sm font-mono text-[var(--ft-danger)]">75%</span>
              </div>
              <div className="h-2 bg-[var(--ft-surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--ft-danger)]" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="border-t border-[var(--ft-border)] pt-4 mt-4">
              <p className="text-sm text-[var(--ft-muted)]">
                Focus on improving your trading psychology and market knowledge to achieve better overall performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
