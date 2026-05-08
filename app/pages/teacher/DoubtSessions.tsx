import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";

export default function DoubtSessions() {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Doubt Sessions</h1>
        <p className="text-[#0B2A5B]/70">Resolve student queries and schedule sessions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg opacity-50">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Pending Doubts</p>
          <p className="text-2xl font-bold text-orange-600">0</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg opacity-50">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Resolved Today</p>
          <p className="text-2xl font-bold text-green-600">0</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg opacity-50">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Avg Response Time</p>
          <p className="text-2xl font-bold text-[#C2A86A]">—</p>
        </Card>
      </div>

      <Card className="p-12 bg-white shadow-lg text-center mt-8">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-2">No Pending Doubts</h3>
        <p className="text-[#0B2A5B]/60">
          There are currently no doubt sessions scheduled or pending questions from students.
        </p>
      </Card>
    </DashboardLayout>
  );
}
