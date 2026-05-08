import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";



const doubts = [
  { id: 1, student: "Rahul Sharma", topic: "RSI Divergence", description: "How to identify bullish vs bearish divergence?", time: "2 hours ago", priority: "high", status: "pending" },
  { id: 2, student: "Aditi Mehta", topic: "Fibonacci Retracement", description: "Which timeframe works best for fibonacci?", time: "4 hours ago", priority: "medium", status: "pending" },
  { id: 3, student: "Karan Patel", topic: "Position Sizing", description: "How to calculate optimal position size?", time: "1 day ago", priority: "low", status: "pending" },
  { id: 4, student: "Priya Singh", topic: "Stop Loss Placement", description: "ATR vs percentage-based stop loss?", time: "5 hours ago", priority: "medium", status: "pending" },
];

const resolvedDoubts = [
  { student: "Vikram Desai", topic: "Moving Average Crossover", resolvedDate: "Apr 9, 2026", rating: 5 },
  { student: "Ananya Reddy", topic: "Volume Profile", resolvedDate: "Apr 8, 2026", rating: 5 },
];

export default function DoubtSessions() {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Doubt Sessions</h1>
        <p className="text-[#0B2A5B]/70">Resolve student queries and schedule sessions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Pending Doubts</p>
          <p className="text-2xl font-bold text-orange-600">8</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Resolved Today</p>
          <p className="text-2xl font-bold text-green-600">5</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Avg Response Time</p>
          <p className="text-2xl font-bold text-[#C2A86A]">2.4 hrs</p>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-lg mb-6">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Pending Doubts</h3>
        <div className="space-y-4">
          {doubts.map((doubt) => (
            <div key={doubt.id} className="p-4 bg-[#F4F1EA] rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-[#0B2A5B]">{doubt.student}</h4>
                    <Badge className={doubt.priority === "high" ? "bg-red-100 text-red-700" : doubt.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}>
                      {doubt.priority}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-[#0B2A5B] mb-1">{doubt.topic}</p>
                  <p className="text-sm text-[#0B2A5B]/70 mb-2">{doubt.description}</p>
                  <p className="text-xs text-[#0B2A5B]/50 flex items-center gap-1">
                    <Clock size={12} />
                    {doubt.time}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
                    Respond
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Recently Resolved</h3>
        <div className="space-y-3">
          {resolvedDoubts.map((doubt, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="font-semibold text-[#0B2A5B]">{doubt.student}</p>
                  <p className="text-sm text-[#0B2A5B]/70">{doubt.topic}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#0B2A5B]/60">{doubt.resolvedDate}</p>
                <p className="text-sm text-yellow-600">⭐ {doubt.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
