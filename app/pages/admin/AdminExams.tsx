import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit } from "lucide-react";

const exams = [
  { id: 1, title: "Month 1 Assessment", questions: 30, duration: "60 min", avgScore: 76.5, attempts: 1142, status: "active" },
  { id: 2, title: "Month 2 Assessment", questions: 30, duration: "60 min", avgScore: 82.3, attempts: 1028, status: "active" },
  { id: 3, title: "Month 3 Assessment", questions: 30, duration: "60 min", avgScore: 0, attempts: 0, status: "draft" },
];

export default function AdminExams() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Exam Management</h1>
          <p className="text-[#0B2A5B]/70">Create and manage student assessments</p>
        </div>
        <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
          <Plus size={16} className="mr-2" />
          Create Exam
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="p-6 bg-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#0B2A5B]">{exam.title}</h3>
              <Badge className={exam.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                {exam.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm text-[#0B2A5B]/70 mb-4">
              <p>Questions: {exam.questions}</p>
              <p>Duration: {exam.duration}</p>
              {exam.status === "active" && (
                <>
                  <p>Avg Score: {exam.avgScore}%</p>
                  <p>Total Attempts: {exam.attempts}</p>
                </>
              )}
            </div>
            <Button size="sm" className="w-full bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
              <Edit size={14} className="mr-2" />
              Edit Exam
            </Button>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
