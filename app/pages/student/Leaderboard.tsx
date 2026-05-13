import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Trophy, Medal, Award, Star, TrendingUp } from "lucide-react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mocking leaderboard data for MVP
  useEffect(() => {
    setTimeout(() => {
      setLeaderboard([
        { id: 1, name: "Arjun Mehta", score: 9850, rank: 1, avatar: "https://i.pravatar.cc/150?img=11", badge: "Grandmaster" },
        { id: 2, name: "Priya Sharma", score: 9420, rank: 2, avatar: "https://i.pravatar.cc/150?img=5", badge: "Master" },
        { id: 3, name: "Rahul Verma", score: 8900, rank: 3, avatar: "https://i.pravatar.cc/150?img=15", badge: "Expert" },
        { id: 4, name: "Neha Singh", score: 8450, rank: 4, avatar: "https://i.pravatar.cc/150?img=9", badge: "Pro" },
        { id: 5, name: "Vikram Desai", score: 8100, rank: 5, avatar: "https://i.pravatar.cc/150?img=8", badge: "Pro" },
        { id: 6, name: "Ananya Patel", score: 7850, rank: 6, avatar: "https://i.pravatar.cc/150?img=20", badge: "Challenger" },
        { id: 7, name: "Karan Johar", score: 7600, rank: 7, avatar: "https://i.pravatar.cc/150?img=33", badge: "Challenger" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-400 w-8 h-8" />;
    if (rank === 2) return <Medal className="text-gray-400 w-8 h-8" />;
    if (rank === 3) return <Award className="text-amber-600 w-8 h-8" />;
    return <span className="text-xl font-bold text-[#0B2A5B]/60 w-8 text-center">{rank}</span>;
  };

  return (
    <DashboardLayout role="student">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2 flex items-center gap-3">
            <Trophy className="text-[#C2A86A]" /> Global Leaderboard
          </h1>
          <p className="text-[#0B2A5B]/70">See where you stand among top traders</p>
        </div>
        <Card className="px-6 py-3 bg-[#0B2A5B] text-white flex items-center gap-4 hidden md:flex">
          <div className="text-right">
            <p className="text-xs text-white/70 uppercase tracking-wider">Your Rank</p>
            <p className="text-2xl font-bold text-[#C2A86A]">#42</p>
          </div>
          <div className="w-px h-10 bg-white/20 mx-2"></div>
          <div className="text-left">
            <p className="text-xs text-white/70 uppercase tracking-wider">Your Score</p>
            <p className="text-2xl font-bold">4,250</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-[#0B2A5B]/60">Loading rankings...</div>
          ) : (
            leaderboard.map((user, idx) => (
              <Card 
                key={user.id} 
                className={`p-4 flex items-center gap-4 transition-all hover:scale-[1.01] ${
                  idx < 3 ? 'bg-gradient-to-r from-white to-[#C2A86A]/5 border-[#C2A86A]/20 shadow-md' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(user.rank)}
                </div>
                
                <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-bold text-[#0B2A5B] text-lg">{user.name}</h3>
                  <Badge variant="outline" className="text-xs text-[#0B2A5B]/70 border-[#0B2A5B]/20">
                    {user.badge}
                  </Badge>
                </div>

                <div className="text-right pr-4">
                  <p className="text-2xl font-bold text-[#0B2A5B] flex items-center gap-1">
                    {user.score} <Star className="w-4 h-4 text-[#C2A86A]" fill="currentColor" />
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#0B2A5B] to-[#1a3d7a] text-white shadow-xl">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <TrendingUp className="text-[#C2A86A]" /> Rank Progression
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/70 mb-1">Current Tier</p>
                <p className="text-xl font-semibold text-[#C2A86A]">Advanced Trader</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Points to next tier</span>
                  <span className="font-bold">750 XP</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-[#C2A86A] h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <h3 className="font-bold text-[#0B2A5B] mb-4">How to earn points?</h3>
            <ul className="space-y-3 text-sm text-[#0B2A5B]/70">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Complete modules (+50 XP)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Pass monthly exams (+200 XP)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Submit assignments on time (+100 XP)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Profitable simulator trades (+10 XP/trade)
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
