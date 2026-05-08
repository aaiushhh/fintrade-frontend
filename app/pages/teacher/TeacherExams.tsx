import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Eye, Clock, FileText } from "lucide-react";
import api from "../../services/api";

export default function TeacherExams() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/exams/all")
      .then((res) => {
        // Combine entrance and course exams
        const allExams = [
          ...(res.data.entrance_exams || []),
          ...(res.data.course_exams || [])
        ];
        setExams(allExams);
      })
      .catch((err) => console.error("Error fetching exams:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Exam Management</h1>
            <p className="text-[#0B2A5B]/70">Create and manage student assessments</p>
          </div>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            <Plus size={16} className="mr-2" />
            Create New Exam
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#0B2A5B]/60">Loading exams...</div>
      ) : exams.length === 0 ? (
        <Card className="p-8 bg-white shadow-lg text-center">
          <p className="text-[#0B2A5B]/60 mb-4">No exams found. Create one to get started.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card key={`${exam.type}-${exam.id}`} className="p-6 bg-white shadow-lg flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#0B2A5B] line-clamp-2">{exam.title}</h3>
                <Badge className={exam.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                  {exam.is_active ? "Active" : "Draft"}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-[#0B2A5B]/70 mb-6 flex-1">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-[#C2A86A]" />
                  <p>Questions: {exam.questions_count}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C2A86A]" />
                  <p>Duration: {exam.duration_minutes} min</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#C2A86A] text-[#C2A86A]">
                    {exam.type}
                  </Badge>
                </div>
                {exam.is_active && (
                  <p className="mt-2 text-green-600 font-semibold">Passing: {exam.passing_score}%</p>
                )}
              </div>
              <div className="flex gap-2 mt-auto">
                <Button size="sm" variant="outline" className="flex-1 border-[#0B2A5B]/20">
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-[#0B2A5B]/20">
                  <Eye size={14} className="mr-2" />
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
