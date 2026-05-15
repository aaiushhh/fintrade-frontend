import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Plus, Calendar, Clock, X } from "lucide-react";
import api from "../../services/api";

export default function AdminLectures() {
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLecture, setNewLecture] = useState({
    title: "",
    description: "",
    instructor_name: "",
    start_time: "",
    end_time: "",
    meeting_url: ""
  });

  const fetchLectures = async () => {
    try {
      const res = await api.get("/lectures");
      setLectures(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const handleAddLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/lectures", {
        ...newLecture,
        start_time: new Date(newLecture.start_time).toISOString(),
        end_time: new Date(newLecture.end_time).toISOString()
      });
      setShowAddModal(false);
      setNewLecture({ title: "", description: "", instructor_name: "", start_time: "", end_time: "", meeting_url: "" });
      fetchLectures();
    } catch (err: any) {
      alert("Error creating lecture: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Lecture Management</h1>
          <p className="text-[#0B2A5B]/70">Schedule and assign lectures to teachers</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
          <Plus size={16} className="mr-2" />
          Schedule Lecture
        </Button>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture) => (
          <Card key={lecture.id} className="p-6 bg-white shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#0B2A5B]">{lecture.title}</h3>
                  <Badge className={lecture.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                    {lecture.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-[#0B2A5B]/70">
                  <span>Teacher: {lecture.instructor_name || "Unassigned"}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(lecture.start_time).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(lecture.start_time).toLocaleTimeString()}
                  </span>
                  {lecture.meeting_url && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <a href={lecture.meeting_url} target="_blank" rel="noreferrer" className="hover:underline">Join Link</a>
                    </span>
                  )}
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                Edit
              </Button>
            </div>
          </Card>
        ))}
        {lectures.length === 0 && !loading && (
           <p className="text-[#0B2A5B]/70">No lectures scheduled yet.</p>
        )}
      </div>

      {/* Add Lecture Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 bg-white shadow-2xl relative border-t-4 border-[#0B2A5B]">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#0B2A5B]">Schedule New Lecture</h2>
            <form onSubmit={handleAddLecture} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#0B2A5B] mb-1 block">Lecture Title <span className="text-red-500">*</span></label>
                <Input required placeholder="e.g. Technical Analysis Basics" value={newLecture.title} onChange={(e) => setNewLecture({...newLecture, title: e.target.value})} className="border-[#0B2A5B]/20" />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0B2A5B] mb-1 block">Description <span className="text-red-500">*</span></label>
                <textarea 
                  required
                  placeholder="What will students learn in this session?"
                  className="w-full p-3 border border-[#0B2A5B]/20 rounded-md bg-white text-sm focus:ring-2 focus:ring-[#0B2A5B]/20 outline-none transition-all"
                  rows={3}
                  value={newLecture.description} 
                  onChange={(e) => setNewLecture({...newLecture, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0B2A5B] mb-1 block">Instructor Name <span className="text-red-500">*</span></label>
                <Input required placeholder="Enter name" value={newLecture.instructor_name} onChange={(e) => setNewLecture({...newLecture, instructor_name: e.target.value})} className="border-[#0B2A5B]/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#0B2A5B] mb-1 block">Start Time <span className="text-red-500">*</span></label>
                  <Input required type="datetime-local" value={newLecture.start_time} onChange={(e) => setNewLecture({...newLecture, start_time: e.target.value})} className="border-[#0B2A5B]/20" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#0B2A5B] mb-1 block">End Time <span className="text-red-500">*</span></label>
                  <Input required type="datetime-local" value={newLecture.end_time} onChange={(e) => setNewLecture({...newLecture, end_time: e.target.value})} className="border-[#0B2A5B]/20" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0B2A5B] mb-1 block">Google Meet / Zoom Link <span className="text-red-500">*</span></label>
                <Input required type="url" placeholder="https://meet.google.com/..." value={newLecture.meeting_url} onChange={(e) => setNewLecture({...newLecture, meeting_url: e.target.value})} className="border-[#0B2A5B]/20" />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-[#0B2A5B] text-white hover:bg-[#1a3d7a] h-12 text-lg shadow-lg shadow-[#0B2A5B]/20">
                  Create & Notify Students
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </DashboardLayout>
  );
}
