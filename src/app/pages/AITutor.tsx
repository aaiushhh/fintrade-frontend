import { useState, useEffect, KeyboardEvent } from 'react';
import {
  Send, Sparkles, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const suggestedTopics = [
  'Stop Loss Strategy',
  'Moving Averages',
  'Risk Management',
  'Position Sizing',
  'Support & Resistance',
  'Candlestick Patterns'
];

const sampleChat = [
  {
    role: 'user',
    message: 'What is risk reward ratio?',
    time: '10:30 AM'
  },
  {
    role: 'ai',
    message: 'Risk reward ratio is a fundamental concept in trading that compares the potential profit of a trade to its potential loss.\n\nFor example, if you risk ₹1,000 to potentially make ₹3,000, your risk-reward ratio is 1:3. This means for every rupee you risk, you stand to gain three rupees.\n\nA favorable risk-reward ratio (typically 1:2 or better) is essential for long-term profitability because it allows you to be profitable even if you win less than 50% of your trades.',
    time: '10:30 AM'
  }
];

export function AITutor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>(sampleChat);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await api.get('/ai/chat-history');
        if (data.sessions && data.sessions.length > 0) {
          const latest = data.sessions[0];
          setSessionId(latest.id?.toString() || null);
          if (latest.messages && latest.messages.length > 0) {
            const historyMsgs = latest.messages.map((m: any) => ({
              role: m.role === 'user' ? 'user' : 'ai',
              message: m.content || m.message || '',
              time: m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
            }));
            setMessages(historyMsgs);
          }
        }
      } catch (e) {
        // Fallback to sample chat if history fails
      }
    };
    loadHistory();
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', message: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await api.post('/ai/ask', { question: text, session_id: sessionId });
      const aiMsg = {
        role: 'ai',
        message: response.answer || response.response || response.message || 'I am not sure how to respond to that.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', message: err.message || 'Sorry, I encountered an error connecting to the server.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-[var(--ft-border)] bg-[var(--ft-surface)] p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--ft-red)]/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-[var(--ft-red)]" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-[var(--ft-charcoal)]">AI Trading Tutor</h1>
            <p className="text-sm text-[var(--ft-muted)]">Ask me anything about trading concepts</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-lg p-4 ${
                  msg.role === 'user'
                    ? 'bg-[var(--ft-red)] text-white'
                    : 'bg-[var(--ft-surface)] border border-[var(--ft-border)] text-[var(--ft-charcoal)]'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                </div>
                <div className={`text-xs text-[var(--ft-muted)] mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Topics */}
      <div className="border-t border-[var(--ft-border)] bg-[var(--ft-surface)] p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-[var(--ft-muted)] mb-3">Suggested topics:</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSend(topic)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full bg-[var(--ft-surface)] border border-[var(--ft-border)] text-xs text-[var(--ft-charcoal)] hover:border-[var(--ft-red)] hover:bg-[var(--ft-red)]/10 transition-colors disabled:opacity-50"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') handleSend(inputValue);
              }}
              disabled={loading}
              placeholder="Ask about trading concepts..."
              className="flex-1 bg-[var(--ft-surface)] border-[var(--ft-border)] text-[var(--ft-charcoal)] placeholder:text-[var(--ft-muted)]"
            />
            <Button
              onClick={() => handleSend(inputValue)}
              disabled={loading || !inputValue.trim()}
              className="bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" className="border-[var(--ft-border)] bg-transparent text-[var(--ft-charcoal)] hover:bg-[var(--ft-surface)] text-xs">
              Escalate to Human Tutor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
