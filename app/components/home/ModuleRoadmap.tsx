import { CheckCircle, BookOpen, LineChart, Award, Trophy, Brain, Target, Zap } from "lucide-react";

const modules = [
  { id: 1, title: "Market Foundations", desc: "Understanding stock markets, exchanges, and instruments", icon: BookOpen, status: "completed" as const },
  { id: 2, title: "Technical Analysis", desc: "Chart patterns, indicators, and price action", icon: LineChart, status: "completed" as const },
  { id: 3, title: "Risk Management", desc: "Position sizing, stop-loss strategies, and capital protection", icon: Target, status: "active" as const },
  { id: 4, title: "Trading Psychology", desc: "Emotional discipline, bias management, and consistency", icon: Brain, status: "upcoming" as const },
  { id: 5, title: "Options & Derivatives", desc: "Options pricing, Greeks, and strategy building", icon: Zap, status: "upcoming" as const },
  { id: 6, title: "Advanced Strategies", desc: "Algo trading, quant analysis, portfolio optimization", icon: Award, status: "upcoming" as const },
  { id: 7, title: "Trading Simulator", desc: "Live market practice with virtual capital", icon: LineChart, status: "upcoming" as const },
  { id: 8, title: "Certification & Placement", desc: "Final assessment and placement preparation", icon: Trophy, status: "upcoming" as const },
];

function getColor(s: string) { return s === "upcoming" ? "#9CA3AF" : "#E53935"; }
function getBg(s: string) { return s === "upcoming" ? "rgba(156,163,175,0.1)" : "rgba(229,57,53,0.1)"; }

export default function ModuleRoadmap() {
  return (
    <section className="py-20 relative z-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(229,57,53,0.02), transparent)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full mb-4 border border-[#E53935]/30" style={{ background: "rgba(229,57,53,0.08)" }}>
            <span className="text-[#E53935] font-semibold text-sm">🗺️ Course Roadmap</span>
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#121212" }}>Your Learning Path</h2>
          <p className="text-xl text-gray-600">A structured roadmap from beginner to professional trader</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="p-5 rounded-2xl border-2 transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              style={{
                borderColor: mod.status === "active" ? "#E53935" : `${getColor(mod.status)}30`,
                background: mod.status === "active" ? "rgba(229,57,53,0.05)" : "white",
                boxShadow: mod.status === "active" ? "0 0 30px rgba(229,57,53,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: getBg(mod.status), color: getColor(mod.status), border: `2px solid ${getColor(mod.status)}` }}>
                  {mod.status === "completed" ? <CheckCircle className="h-5 w-5" /> : mod.id}
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: getBg(mod.status) }}>
                  <mod.icon className="h-5 w-5" style={{ color: getColor(mod.status) }} />
                </div>
              </div>
              <h4 className="font-bold mb-1" style={{ color: mod.status === "upcoming" ? "#9CA3AF" : "#121212" }}>{mod.title}</h4>
              <p className="text-xs" style={{ color: mod.status === "upcoming" ? "#D1D5DB" : "#6B7280" }}>{mod.desc}</p>
              {mod.status === "active" && (
                <div className="mt-3 px-3 py-1 rounded-full text-xs font-bold inline-block animate-pulse" style={{ background: "#E53935", color: "white" }}>Current Module</div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #E53935, #9CA3AF)" }} />
          <div className="space-y-6">
            {modules.map((mod) => (
              <div key={mod.id} className="flex gap-4 relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-white" style={{ background: mod.status === "upcoming" ? "#E5E7EB" : "#E53935", boxShadow: mod.status === "active" ? "0 0 20px rgba(229,57,53,0.4)" : "0 2px 8px rgba(0,0,0,0.1)" }}>
                  {mod.status === "completed" ? <CheckCircle className="h-5 w-5 text-white" /> : <mod.icon className="h-5 w-5" style={{ color: mod.status === "upcoming" ? "#9CA3AF" : "white" }} />}
                </div>
                <div className="flex-1 p-4 rounded-xl border-2" style={{ borderColor: mod.status === "active" ? "#E53935" : "rgba(229,57,53,0.1)", background: mod.status === "active" ? "rgba(229,57,53,0.05)" : "white" }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: getBg(mod.status), color: getColor(mod.status) }}>Module {mod.id}</span>
                  {mod.status === "active" && <span className="text-xs font-bold px-2 py-0.5 rounded-full ml-2 animate-pulse" style={{ background: "#E53935", color: "white" }}>Active</span>}
                  <h4 className="font-bold mt-2 mb-1" style={{ color: mod.status === "upcoming" ? "#9CA3AF" : "#121212" }}>{mod.title}</h4>
                  <p className="text-xs" style={{ color: mod.status === "upcoming" ? "#D1D5DB" : "#6B7280" }}>{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
