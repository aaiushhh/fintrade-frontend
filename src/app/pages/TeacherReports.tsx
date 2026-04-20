import { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { api } from '../services/api';

interface TrendData {
  month: string;
  avgScore: number;
  passRate: number;
}

interface TopicData {
  topic: string;
  struggles: number;
}

interface ModuleData {
  module: string;
  completion: number;
}

interface DistributionData {
  category: string;
  value: number;
}

interface ReportsData {
  avg_class_score: number;
  pass_rate: number;
  completion_rate: number;
  at_risk_students: number;
  performance_trend: TrendData[];
  weak_topics: TopicData[];
  module_completion: ModuleData[];
  student_distribution: DistributionData[];
}

export function TeacherReports() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/faculty/reports')
      .then(setData)
      .catch((err) => setError(err.message || 'Failed to load reports'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-[var(--ft-danger)] p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Performance Reports</h1>
            <p className="text-sm text-[var(--ft-muted)]">Student performance trends and analytics</p>
          </div>
          <Button className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red-hover)]">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="text-sm text-[var(--ft-muted)] mb-2">Avg Class Score</div>
            <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">{data.avg_class_score}%</div>
            <div className="text-xs text-[var(--ft-success)] mt-1">Based on exams</div>
          </div>

          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="text-sm text-[var(--ft-muted)] mb-2">Pass Rate</div>
            <div className="text-3xl font-medium text-[var(--ft-success)] font-mono">{data.pass_rate}%</div>
            <div className="text-xs text-[var(--ft-muted)] mt-1">Exam pass rate</div>
          </div>

          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="text-sm text-[var(--ft-muted)] mb-2">Completion Rate</div>
            <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">{data.completion_rate}%</div>
            <div className="text-xs text-[var(--ft-muted)] mt-1">Average across students</div>
          </div>

          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="text-sm text-[var(--ft-muted)] mb-2">At Risk Students</div>
            <div className="text-3xl font-medium text-[var(--ft-danger)] font-mono">{data.at_risk_students}</div>
            <div className="text-xs text-[var(--ft-danger)] mt-1">Needs intervention</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.performance_trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ft-border)" />
                <XAxis dataKey="month" stroke="var(--ft-muted)" style={{ fontSize: '12px' }} />
                <YAxis stroke="var(--ft-muted)" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--ft-surface)', 
                    border: '1px solid var(--ft-border)',
                    borderRadius: '8px',
                    color: 'var(--ft-charcoal)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--ft-muted)' }} />
                <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="var(--ft-red)" strokeWidth={3} dot={{ fill: 'var(--ft-red)', r: 5 }} />
                <Line type="monotone" dataKey="passRate" name="Pass Rate" stroke="var(--ft-success)" strokeWidth={3} dot={{ fill: 'var(--ft-success)', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Student Skill Distribution */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Average Skill Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={data.student_distribution}>
                <PolarGrid stroke="var(--ft-border)" />
                <PolarAngleAxis dataKey="category" stroke="var(--ft-muted)" style={{ fontSize: '11px' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="var(--ft-muted)" style={{ fontSize: '10px' }} />
                <Radar name="Class Average" dataKey="value" stroke="var(--ft-red)" fill="var(--ft-red)" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--ft-surface)', 
                    border: '1px solid var(--ft-border)',
                    borderRadius: '8px',
                    color: 'var(--ft-charcoal)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Weak Topics */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Topics Needing Focus</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.weak_topics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ft-border)" />
                <XAxis type="number" stroke="var(--ft-muted)" style={{ fontSize: '12px' }} />
                <YAxis dataKey="topic" type="category" stroke="var(--ft-muted)" style={{ fontSize: '12px' }} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--ft-surface)', 
                    border: '1px solid var(--ft-border)',
                    borderRadius: '8px',
                    color: 'var(--ft-charcoal)'
                  }}
                />
                <Bar dataKey="struggles" fill="var(--ft-danger)" name="Students Struggling" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Module Completion */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Module Completion Rates</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.module_completion}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ft-border)" />
                <XAxis dataKey="module" stroke="var(--ft-muted)" style={{ fontSize: '12px' }} />
                <YAxis stroke="var(--ft-muted)" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--ft-surface)', 
                    border: '1px solid var(--ft-border)',
                    borderRadius: '8px',
                    color: 'var(--ft-charcoal)'
                  }}
                />
                <Bar dataKey="completion" fill="var(--ft-red)" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
