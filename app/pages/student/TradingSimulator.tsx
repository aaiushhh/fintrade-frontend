import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Home,
  BookOpen,
  Video,
  MessageSquare,
  FileText,
  BarChart3,
  Award,
  TrendingUp,
  GraduationCap,
  TrendingDown,
  IndianRupee,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
} from "recharts";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <Home size={20} /> },
  { label: "Courses", path: "/student/courses", icon: <BookOpen size={20} /> },
  { label: "Modules", path: "/student/modules", icon: <GraduationCap size={20} /> },
  { label: "Lectures", path: "/student/lectures", icon: <Video size={20} /> },
  { label: "AI Tutor", path: "/student/ai-tutor", icon: <MessageSquare size={20} /> },
  { label: "Exams", path: "/student/exams", icon: <FileText size={20} /> },
  { label: "Performance", path: "/student/performance", icon: <BarChart3 size={20} /> },
  { label: "Certificate", path: "/student/certificate", icon: <Award size={20} /> },
  { label: "Simulator", path: "/student/simulator", icon: <TrendingUp size={20} /> },
  { label: "Placement", path: "/student/placement", icon: <Award size={20} /> },
];

const chartData = [
  { time: "9:15", price: 58200, volume: 1200000 },
  { time: "9:30", price: 58350, volume: 1500000 },
  { time: "9:45", price: 58280, volume: 1300000 },
  { time: "10:00", price: 58420, volume: 1450000 },
  { time: "10:15", price: 58560, volume: 1600000 },
  { time: "10:30", price: 58490, volume: 1400000 },
  { time: "10:45", price: 58630, volume: 1550000 },
  { time: "11:00", price: 58720, volume: 1700000 },
];

const instruments = [
  { symbol: "NIFTY 50", price: 58720, change: 2.4, volume: "245M" },
  { symbol: "BANK NIFTY", price: 42580, change: 1.8, volume: "187M" },
  { symbol: "RELIANCE", price: 2456, change: -0.5, volume: "45M" },
  { symbol: "TCS", price: 3842, change: 1.2, volume: "32M" },
  { symbol: "INFY", price: 1567, change: 0.8, volume: "28M" },
  { symbol: "HDFC BANK", price: 1645, change: -0.3, volume: "52M" },
];

const tradeHistory = [
  {
    id: 1,
    symbol: "NIFTY 50",
    type: "BUY",
    quantity: 50,
    price: 58200,
    time: "9:25 AM",
    pnl: 2600,
    status: "closed",
  },
  {
    id: 2,
    symbol: "BANK NIFTY",
    type: "SELL",
    quantity: 25,
    price: 42450,
    time: "10:15 AM",
    pnl: -850,
    status: "closed",
  },
  {
    id: 3,
    symbol: "RELIANCE",
    type: "BUY",
    quantity: 100,
    price: 2456,
    time: "11:30 AM",
    pnl: 0,
    status: "open",
  },
];

export default function TradingSimulator() {
  const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]);
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState("50");
  const [portfolioValue, setPortfolioValue] = useState(542500);
  const initialCapital = 500000;
  const pnl = portfolioValue - initialCapital;
  const pnlPercentage = ((pnl / initialCapital) * 100).toFixed(2);

  const handlePlaceOrder = () => {
    const orderValue = selectedInstrument.price * parseInt(quantity);
    alert(`${orderType} order placed: ${quantity} units of ${selectedInstrument.symbol} at ₹${selectedInstrument.price} (Total: ₹${orderValue.toLocaleString("en-IN")})`);
  };

  return (
    <DashboardLayout navItems={navItems} userRole="student" userName="Rahul Sharma">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Trading Simulator</h1>
        <p className="text-[#0B2A5B]/70">Practice trading with ₹5,00,000 virtual capital</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Portfolio Value</p>
          <p className="text-3xl font-bold text-[#0B2A5B] flex items-center gap-1">
            <IndianRupee size={24} />
            {portfolioValue.toLocaleString("en-IN")}
          </p>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Total P&L</p>
          <p className={`text-3xl font-bold flex items-center gap-1 ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
            {pnl >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            ₹{Math.abs(pnl).toLocaleString("en-IN")}
          </p>
          <p className={`text-sm ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
            {pnl >= 0 ? "+" : ""}{pnlPercentage}%
          </p>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Today's P&L</p>
          <p className="text-3xl font-bold text-green-600 flex items-center gap-1">
            <TrendingUp size={24} />
            ₹1,750
          </p>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Available Margin</p>
          <p className="text-3xl font-bold text-[#0B2A5B]">₹2,45,680</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Instruments List */}
        <Card className="lg:col-span-1 p-4 bg-white shadow-lg h-fit">
          <h3 className="font-semibold text-[#0B2A5B] mb-4">Instruments</h3>
          <div className="space-y-2">
            {instruments.map((instrument) => (
              <button
                key={instrument.symbol}
                onClick={() => setSelectedInstrument(instrument)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedInstrument.symbol === instrument.symbol
                    ? "bg-[#C2A86A]/10 border-2 border-[#C2A86A]"
                    : "bg-[#F4F1EA] hover:bg-[#e8e4d9]"
                }`}
              >
                <p className="font-semibold text-[#0B2A5B] text-sm">{instrument.symbol}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">₹{instrument.price.toLocaleString("en-IN")}</span>
                  <span className={`text-xs flex items-center gap-1 ${instrument.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {instrument.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(instrument.change)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Main Chart Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Chart */}
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#0B2A5B]">{selectedInstrument.symbol}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-3xl font-bold text-[#0B2A5B]">
                    ₹{selectedInstrument.price.toLocaleString("en-IN")}
                  </span>
                  <Badge className={selectedInstrument.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {selectedInstrument.change >= 0 ? "+" : ""}{selectedInstrument.change}%
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">1D</Button>
                <Button size="sm" className="bg-[#0B2A5B] text-[#F4F1EA]">1W</Button>
                <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">1M</Button>
                <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">1Y</Button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C2A86A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C2A86A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B10" />
                <XAxis dataKey="time" stroke="#0B2A5B" style={{ fontSize: "12px" }} />
                <YAxis yAxisId="left" stroke="#0B2A5B" style={{ fontSize: "12px" }} domain={['dataMin - 100', 'dataMax + 100']} />
                <YAxis yAxisId="right" orientation="right" stroke="#0B2A5B" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #C2A86A",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="price"
                  stroke="#C2A86A"
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                />
                <Bar yAxisId="right" dataKey="volume" fill="#0B2A5B" opacity={0.3} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          {/* Order Panel */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Place Order</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Order Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      onClick={() => setOrderType("BUY")}
                      className={orderType === "BUY" ? "bg-green-600 text-white" : "bg-white text-green-600 border-2 border-green-600"}
                    >
                      BUY
                    </Button>
                    <Button
                      onClick={() => setOrderType("SELL")}
                      className={orderType === "SELL" ? "bg-red-600 text-white" : "bg-white text-red-600 border-2 border-red-600"}
                    >
                      SELL
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    value={`₹${selectedInstrument.price.toLocaleString("en-IN")}`}
                    disabled
                    className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#F4F1EA] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#0B2A5B] mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#0B2A5B]/70">Instrument:</span>
                      <span className="font-semibold text-[#0B2A5B]">{selectedInstrument.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B2A5B]/70">Quantity:</span>
                      <span className="font-semibold text-[#0B2A5B]">{quantity} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B2A5B]/70">Price:</span>
                      <span className="font-semibold text-[#0B2A5B]">₹{selectedInstrument.price.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="border-t border-[#0B2A5B]/10 pt-2 flex justify-between">
                      <span className="text-[#0B2A5B]">Total Value:</span>
                      <span className="font-bold text-[#C2A86A]">
                        ₹{(selectedInstrument.price * parseInt(quantity || "0")).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handlePlaceOrder}
                  className={`w-full ${
                    orderType === "BUY"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white shadow-lg`}
                  size="lg"
                >
                  {orderType} {selectedInstrument.symbol}
                </Button>
              </div>
            </div>
          </Card>

          {/* Risk Rules & Trade History */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-yellow-50 border-yellow-200 shadow-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-3">Risk Management Rules</h3>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>• Daily loss limit: ₹10,000</li>
                    <li>• Stop loss mandatory on all positions</li>
                    <li>• Max position size: 10% of capital</li>
                    <li>• Risk-reward ratio: Minimum 1:2</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="font-semibold text-[#0B2A5B] mb-4">Recent Trades</h3>
              <div className="space-y-2">
                {tradeHistory.slice(0, 3).map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-3 bg-[#F4F1EA] rounded-lg">
                    <div>
                      <p className="font-semibold text-[#0B2A5B] text-sm">{trade.symbol}</p>
                      <p className="text-xs text-[#0B2A5B]/60">{trade.type} {trade.quantity} @ ₹{trade.price}</p>
                    </div>
                    <div className="text-right">
                      {trade.status === "closed" ? (
                        <span className={`text-sm font-semibold ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl.toLocaleString("en-IN")}
                        </span>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-700">Open</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
