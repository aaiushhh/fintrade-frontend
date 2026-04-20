import { useState } from 'react';
import {
  TrendingUp, TrendingDown, AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const instruments = [
  { symbol: 'NIFTY 50', price: 18456.75, change: 124.50, changePercent: 0.68 },
  { symbol: 'BANK NIFTY', price: 43287.20, change: -89.30, changePercent: -0.21 },
  { symbol: 'RELIANCE', price: 2456.80, change: 34.20, changePercent: 1.41 },
  { symbol: 'TCS', price: 3542.60, change: 12.40, changePercent: 0.35 }
];

const tradeHistory = [
  { id: 1, symbol: 'NIFTY 50', type: 'BUY', qty: 50, entry: 18420.00, exit: 18456.75, pnl: 1837.50, date: '14 Mar 10:30' },
  { id: 2, symbol: 'BANK NIFTY', type: 'SELL', qty: 25, entry: 43350.00, exit: 43287.20, pnl: 1570.00, date: '14 Mar 11:15' },
  { id: 3, symbol: 'RELIANCE', type: 'BUY', qty: 100, entry: 2420.00, exit: 2456.80, pnl: 3680.00, date: '14 Mar 14:20' },
  { id: 4, symbol: 'TCS', type: 'BUY', qty: 50, entry: 3560.00, exit: 3542.60, pnl: -870.00, date: '13 Mar 15:45' },
];

export function TradingSimulator() {
  const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]);

  return (
    <div className="p-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
          <div className="text-xs text-[var(--ft-muted)] mb-1">Available Capital</div>
          <div className="text-xl font-medium text-[var(--ft-charcoal)] font-mono">₹5,06,217</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
          <div className="text-xs text-[var(--ft-muted)] mb-1">Today's P&L</div>
          <div className="text-xl font-medium text-[var(--ft-success)] font-mono">+₹6,217</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
          <div className="text-xs text-[var(--ft-muted)] mb-1">Total P&L</div>
          <div className="text-xl font-medium text-[var(--ft-success)] font-mono">+₹6,217</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
          <div className="text-xs text-[var(--ft-muted)] mb-1">Win Rate</div>
          <div className="text-xl font-medium text-[var(--ft-charcoal)] font-mono">75%</div>
        </div>

        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-4">
          <div className="text-xs text-[var(--ft-muted)] mb-1">Daily Loss Limit</div>
          <div className="text-xl font-medium text-[var(--ft-danger)] font-mono">₹10,000</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chart & Instruments */}
        <div className="col-span-2 space-y-6">
          {/* Chart */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-[var(--ft-charcoal)]">{selectedInstrument.symbol}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-medium text-[var(--ft-charcoal)] font-mono">{selectedInstrument.price.toFixed(2)}</span>
                  <span className={`text-sm ${selectedInstrument.change > 0 ? 'text-[var(--ft-success)]' : 'text-[var(--ft-danger)]'}`}>
                    {selectedInstrument.change > 0 ? '+' : ''}{selectedInstrument.change.toFixed(2)} ({selectedInstrument.changePercent > 0 ? '+' : ''}{selectedInstrument.changePercent}%)
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--ft-success)]"></div>
                <div className="text-xs text-[var(--ft-muted)]">Live</div>
              </div>
            </div>

            {/* Candlestick Chart */}
            <div className="h-80 border border-[var(--ft-border)] rounded bg-[var(--ft-bg)] p-4">
              <svg className="w-full h-full" viewBox="0 0 600 280">
                {/* Grid lines */}
                <line x1="0" y1="70" x2="600" y2="70" stroke="var(--ft-border)" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="var(--ft-border)" strokeWidth="1" />
                <line x1="0" y1="210" x2="600" y2="210" stroke="var(--ft-border)" strokeWidth="1" />

                {/* Candlesticks */}
                {[
                  { x: 60, high: 40, low: 130, open: 100, close: 55, bull: true },
                  { x: 100, high: 55, low: 145, open: 80, close: 120, bull: false },
                  { x: 140, high: 70, low: 160, open: 150, close: 85, bull: true },
                  { x: 180, high: 50, low: 140, open: 120, close: 65, bull: true },
                  { x: 220, high: 65, low: 155, open: 70, close: 140, bull: false },
                  { x: 260, high: 80, low: 170, open: 150, close: 95, bull: true },
                  { x: 300, high: 60, low: 150, open: 135, close: 75, bull: true },
                  { x: 340, high: 45, low: 135, open: 105, close: 55, bull: true },
                  { x: 380, high: 55, low: 145, open: 60, close: 130, bull: false },
                  { x: 420, high: 75, low: 165, open: 150, close: 90, bull: true },
                  { x: 460, high: 50, low: 140, open: 120, close: 60, bull: true },
                  { x: 500, high: 40, low: 130, open: 100, close: 50, bull: true },
                  { x: 540, high: 35, low: 125, open: 70, close: 45, bull: true },
                ].map((candle, i) => (
                  <g key={i}>
                    <line
                      x1={candle.x}
                      y1={candle.high}
                      x2={candle.x}
                      y2={candle.low}
                      stroke={candle.bull ? "var(--ft-success)" : "var(--ft-danger)"}
                      strokeWidth="1"
                    />
                    <rect
                      x={candle.x - 12}
                      y={Math.min(candle.open, candle.close)}
                      width="24"
                      height={Math.abs(candle.close - candle.open)}
                      fill={candle.bull ? "var(--ft-success)" : "var(--ft-danger)"}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Trade History */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Trade History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--ft-border)]">
                    <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Symbol</th>
                    <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Type</th>
                    <th className="text-right text-xs text-[var(--ft-muted)] pb-3">Qty</th>
                    <th className="text-right text-xs text-[var(--ft-muted)] pb-3">Entry</th>
                    <th className="text-right text-xs text-[var(--ft-muted)] pb-3">Exit</th>
                    <th className="text-right text-xs text-[var(--ft-muted)] pb-3">P&L</th>
                    <th className="text-right text-xs text-[var(--ft-muted)] pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeHistory.map((trade) => (
                    <tr key={trade.id} className="border-b border-[var(--ft-border)]">
                      <td className="py-3 text-sm text-[var(--ft-charcoal)]">{trade.symbol}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          trade.type === 'BUY'
                            ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]'
                            : 'bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]'
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-[var(--ft-charcoal)] text-right font-mono">{trade.qty}</td>
                      <td className="py-3 text-sm text-[var(--ft-charcoal)] text-right font-mono">₹{trade.entry.toFixed(2)}</td>
                      <td className="py-3 text-sm text-[var(--ft-charcoal)] text-right font-mono">₹{trade.exit.toFixed(2)}</td>
                      <td className={`py-3 text-sm text-right font-mono ${
                        trade.pnl > 0 ? 'text-[var(--ft-success)]' : 'text-[var(--ft-danger)]'
                      }`}>
                        {trade.pnl > 0 ? '+' : ''}₹{trade.pnl.toFixed(2)}
                      </td>
                      <td className="py-3 text-xs text-[var(--ft-muted)] text-right">{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Entry & Watchlist */}
        <div className="col-span-1 space-y-6">
          {/* Order Entry */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Place Order</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-[var(--ft-charcoal)] mb-2 block">Instrument</Label>
                <select className="w-full bg-[var(--ft-surface)] border border-[var(--ft-border)] text-[var(--ft-charcoal)] rounded-lg px-3 py-2 text-sm">
                  {instruments.map((inst) => (
                    <option key={inst.symbol} value={inst.symbol}>{inst.symbol}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-[var(--ft-charcoal)] mb-2 block">Quantity</Label>
                <Input
                  type="number"
                  defaultValue="50"
                  className="bg-[var(--ft-surface)] border-[var(--ft-border)] text-[var(--ft-charcoal)]"
                />
              </div>

              <div>
                <Label className="text-[var(--ft-charcoal)] mb-2 block">Price</Label>
                <Input
                  type="number"
                  defaultValue={selectedInstrument.price}
                  className="bg-[var(--ft-surface)] border-[var(--ft-border)] text-[var(--ft-charcoal)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-[var(--ft-success)] text-[var(--ft-charcoal)] hover:bg-[var(--ft-success)]/90">
                  BUY
                </Button>
                <Button className="bg-[var(--ft-danger)] text-[var(--ft-charcoal)] hover:bg-[var(--ft-danger)]/90">
                  SELL
                </Button>
              </div>
            </div>
          </div>

          {/* Watchlist */}
          <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Watchlist</h3>

            <div className="space-y-3">
              {instruments.map((inst) => (
                <button
                  key={inst.symbol}
                  onClick={() => setSelectedInstrument(inst)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedInstrument.symbol === inst.symbol
                      ? 'border-[var(--ft-red)] bg-[var(--ft-red)]/10'
                      : 'border-[var(--ft-border)] bg-[var(--ft-surface)] hover:border-[var(--ft-red)]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--ft-charcoal)]">{inst.symbol}</span>
                    {inst.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-[var(--ft-success)]" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-[var(--ft-danger)]" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-[var(--ft-charcoal)]">₹{inst.price.toFixed(2)}</span>
                    <span className={`text-xs font-mono ${inst.change > 0 ? 'text-[var(--ft-success)]' : 'text-[var(--ft-danger)]'}`}>
                      {inst.change > 0 ? '+' : ''}{inst.changePercent}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Loss Alert */}
          <div className="bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[var(--ft-danger)] mt-0.5" />
              <div>
                <div className="text-sm font-medium text-[var(--ft-danger)] mb-1">Daily Loss Limit</div>
                <div className="text-xs text-[var(--ft-muted)]">You have ₹3,783 remaining before hitting your daily loss limit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
