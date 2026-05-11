import { Award, CheckCircle, Shield } from "lucide-react";
import { Card } from "../ui/card";

export default function CertificatePreview() {
  return (
    <section className="py-16 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full mb-4 border border-[#E53935]/30" style={{ background: "rgba(229,57,53,0.08)" }}>
            <span className="text-[#E53935] font-semibold text-sm">🏅 Certification</span>
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#121212" }}>Industry-Recognized Certificate</h2>
          <p className="text-xl text-gray-600">Earn a verified certificate upon course completion</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Certificate Preview Card */}
          <div className="md:col-span-1">
            <Card
              className="p-1 border-2 border-gray-200 shadow-xl"
              style={{ background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)" }}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "rgba(229,57,53,0.1)" }}>
                  <Award className="h-8 w-8" style={{ color: "#E53935" }} />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Certificate of Completion</div>
                <div className="text-lg font-bold mb-1" style={{ color: "#121212" }}>FinTrade Academy</div>
                <div className="text-sm text-gray-500 mb-4">Advanced Trading Program</div>
                <div className="w-32 h-0.5 mx-auto mb-3" style={{ background: "#E53935" }} />
                <div className="text-xs text-gray-400">Verified & Blockchain Secured</div>
              </div>
            </Card>
          </div>

          {/* Certificate Info */}
          <div className="md:col-span-2 space-y-6">
            {[
              {
                icon: Award,
                title: "Industry-Recognized",
                desc: "Our certificates are recognized by leading prop trading firms and financial institutions across India.",
              },
              {
                icon: Shield,
                title: "Verified & Tamper-Proof",
                desc: "Each certificate comes with a unique verification ID. Employers can verify authenticity instantly.",
              },
              {
                icon: CheckCircle,
                title: "Skill-Based Assessment",
                desc: "Certificates are awarded based on exam performance, project work, and trading simulator results.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl hover:bg-red-50/50 transition-colors">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(229,57,53,0.1)" }}>
                  <item.icon className="h-6 w-6" style={{ color: "#E53935" }} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: "#121212" }}>{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
