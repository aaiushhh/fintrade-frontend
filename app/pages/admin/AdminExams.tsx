import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Eye, Clock, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import api from "../../services/api";

export default function AdminExams() {
  const [exams, setExams] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "entrance",
    course_id: "",
    duration_minutes: 60,
    passing_score: 60,
  });

  const fetchExams = () => {
    api.get("/admin/exams/all")
      .then((res) => {
        const allExams = [
          ...(res.data.entrance_exams || []),
          ...(res.data.course_exams || [])
        ];
        setExams(allExams);
      })
      .catch((err) => console.error("Error fetching exams:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchExams();
    api.get("/admin/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const handleCreate = async () => {
    try {
      if (!formData.title || !formData.course_id) {
        alert("Please fill in title and course");
        return;
      }
      
      const payload = {
        title: formData.title,
        course_id: parseInt(formData.course_id),
        duration_minutes: formData.duration_minutes,
        passing_score: formData.passing_score,
      };

      if (formData.type === "entrance") {
        await api.post("/admin/exams/create", payload);
      } else {
        await api.post("/admin/exams/course-create", {
          ...payload,
          exam_type: formData.type
        });
      }
      
      setIsModalOpen(false);
      setFormData({ title: "", type: "entrance", course_id: "", duration_minutes: 60, passing_score: 60 });
      setLoading(true);
      fetchExams();
    } catch (err: any) {
      alert("Failed to create exam: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Exam Management</h1>
          <p className="text-[#0B2A5B]/70">Create and manage student assessments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
          <Plus size={16} className="mr-2" />
          Create Exam
        </Button>
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

      {/* Create Exam Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Exam</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Month 1 Final"
              />
            </div>
            <div className="grid gap-2">
              <Label>Exam Type</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="entrance">Entrance Exam</option>
                <option value="course_final">Course Final</option>
                <option value="monthly">Monthly Assessment</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label>Course</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              >
                <option value="">Select a Course</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Duration (min)</Label>
                <Input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Passing %</Label>
                <Input
                  type="number"
                  value={formData.passing_score}
                  onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
              Create Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
