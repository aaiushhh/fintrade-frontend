import { useState, useEffect } from "react";
import { toast } from "sonner";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { FileText, Plus, Users, Calendar, CheckCircle } from "lucide-react";
import api from "../../services/api";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // New assignment form state
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [maxScore, setMaxScore] = useState("100");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const coursesRes = await api.get("/admin/courses");
      setCourses(coursesRes.data);
      
      // In a real app we'd fetch all assignments for the teacher's courses
      // For MVP we just show a placeholder list or fetch sequentially
      const allAssignments: any[] = [];
      for (const c of coursesRes.data) {
        const aRes = await api.get(`/courses/${c.id}/assignments`);
        allAssignments.push(...aRes.data);
      }
      setAssignments(allAssignments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    try {
      await api.post("/admin/assignments", {
        course_id: parseInt(courseId),
        title,
        description,
        due_date: new Date(dueDate).toISOString(),
        max_score: parseFloat(maxScore)
      });
      toast.success("Assignment created successfully");
      setIsCreating(false);
      fetchInitialData();
    } catch (err: any) {
      toast.error("Failed to create assignment: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <DashboardLayout role="teacher">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Assignments Management</h1>
          <p className="text-[#0B2A5B]/70">Create and grade student assignments</p>
        </div>
        <Button 
          className="bg-[#C2A86A] hover:bg-[#C2A86A]/90 text-[#0B2A5B] font-medium"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? "Cancel" : <><Plus size={18} className="mr-2" /> New Assignment</>}
        </Button>
      </div>

      {isCreating && (
        <Card className="p-6 bg-white shadow-lg mb-8 border-t-4 border-[#C2A86A]">
          <h2 className="text-xl font-semibold text-[#0B2A5B] mb-6">Create New Assignment</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Course</label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Assignment Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Technical Analysis Report" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Due Date</label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Max Score</label>
              <Input type="number" value={maxScore} onChange={(e) => setMaxScore(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-gray-700">Description & Instructions</label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Provide clear instructions for the assignment..." 
              className="h-32"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button className="bg-[#0B2A5B] text-white hover:bg-[#1a3d7a]" onClick={handleCreateAssignment}>
              Create Assignment
            </Button>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12 text-[#0B2A5B]/60">Loading assignments...</div>
      ) : assignments.length === 0 ? (
        <Card className="p-12 text-center bg-white border-dashed border-2">
          <FileText size={48} className="mx-auto text-[#0B2A5B]/20 mb-4" />
          <h3 className="text-xl font-medium text-[#0B2A5B] mb-2">No Assignments Yet</h3>
          <p className="text-[#0B2A5B]/60 mb-6">Create your first assignment to start evaluating students.</p>
          <Button className="bg-[#0B2A5B] text-white" onClick={() => setIsCreating(true)}>Create Assignment</Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="p-6 bg-white shadow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-[#0B2A5B] line-clamp-2">{assignment.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{assignment.description}</p>
              
              <div className="space-y-2 text-sm text-[#0B2A5B]/70 mb-6 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#C2A86A]" />
                  <p>Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#C2A86A]" />
                  <p>Max Score: {assignment.max_score}</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-[#0B2A5B]/20 text-[#0B2A5B]">
                View Submissions
              </Button>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
