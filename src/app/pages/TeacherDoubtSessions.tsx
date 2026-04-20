import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, MessageCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { api } from '../services/api';

interface FAQEntry {
  id: number;
  question: string;
  answer: string;
  frequency: number;
  created_at: string;
}

export function TeacherDoubtSessions() {
  const [faqs, setFaqs] = useState<FAQEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/ai/faqs')
      .then(setFaqs)
      .catch((err) => setError(err.message || 'Failed to load FAQ/Doubt data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">AI Doubt Resolution</h1>
          <p className="text-sm text-[var(--ft-muted)]">Monitor student doubts automatically resolved by the AI Tutor</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[var(--ft-danger)]/10 text-[var(--ft-danger)] rounded-lg text-sm border border-[var(--ft-danger)]/20">
            {error}
          </div>
        )}

        {/* Info Card */}
        <div className="bg-[var(--ft-red-tint)] border border-[var(--ft-border)] rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-[var(--ft-red)] mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[var(--ft-red)] mb-1">How Doubt Tracking Works</h3>
              <div className="text-sm text-[var(--ft-red-text)] space-y-1">
                <p>• The AI Tutor handles common student doubts instantly</p>
                <p>• Frequently asked questions are aggregated and ranked by frequency</p>
                <p>• Use this data to identify gaps in your course lectures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-4 w-4 text-[var(--ft-muted)]" />
              <div className="text-sm text-[var(--ft-muted)]">Tracked Topics</div>
            </div>
            <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">{faqs.length}</div>
          </div>

          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-4 w-4 text-[var(--ft-muted)]" />
              <div className="text-sm text-[var(--ft-muted)]">Total Queries Handled</div>
            </div>
            <div className="text-3xl font-medium text-[var(--ft-red)] font-mono">
              {faqs.reduce((acc, curr) => acc + curr.frequency, 0)}
            </div>
          </div>

          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--ft-success)]" />
              <div className="text-sm text-[var(--ft-muted)]">Highest Frequency Status</div>
            </div>
            <div className="text-3xl font-medium text-[var(--ft-success)] font-mono">
              {Math.max(0, ...faqs.map(f => f.frequency))}
            </div>
          </div>
        </div>

        {/* Resolved Sessions */}
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Frequently Asked & Resolved Doubts</h2>
          
          {faqs.length === 0 ? (
            <div className="text-center py-8 text-[var(--ft-muted)]">No AI doubts tracked yet.</div>
          ) : (
            <div className="space-y-3">
              {faqs.sort((a, b) => b.frequency - a.frequency).map((faq) => (
                <div key={faq.id} className="bg-[var(--ft-surface)] border border-[var(--ft-border)] hover:border-[var(--ft-red)] transition-colors rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-[var(--ft-success)] shrink-0" />
                        <h3 className="text-sm font-semibold text-[var(--ft-charcoal)] leading-snug">{faq.question}</h3>
                      </div>
                      <div className="text-sm text-[var(--ft-muted)] mb-2 mt-3 p-3 bg-[var(--ft-bg)] rounded">
                        <strong>AI Resolution:</strong> {faq.answer}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="text-xs text-[var(--ft-muted)]">Frequency</div>
                      <div className="text-xl font-medium text-[var(--ft-red)] font-mono">{faq.frequency}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
