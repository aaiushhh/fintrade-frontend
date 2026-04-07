import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Plus, Calendar, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface FacultyStudent {
  student_id: number;
  student_name: string;
  student_email: string;
  course_id: number;
  course_title: string;
  enrolled_at: string;
}

interface Lecture {
  id: number;
  title: string;
  description: string | null;
  course_id: number;
  scheduled_at: string;
  duration_minutes: number;
  is_live: boolean;
  is_completed: boolean;
  max_participants: number;
}

interface Course {
  id: number;
  title: string;
  price: number;
  difficulty_level: string;
  is_published: boolean;
  modules: any[];
}

export function TeacherDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState<FacultyStudent[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, lecturesData, coursesData] = await Promise.all([
          api.get('/faculty/students'),
          api.get('/lectures'),
          api.get('/faculty/courses'),
        ]);
        setStudents(studentsData);
        setLectures(lecturesData);
        setCourses(coursesData);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const upcomingLectures = lectures.filter(l => !l.is_completed && new Date(l.scheduled_at) >= new Date());
  const pendingStudentsCount = students.length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Teacher Dashboard</h1>
        <p className="text-sm text-[#9CA3AF]">Welcome back, {user?.full_name || user?.name || 'Teacher'}</p>
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Active Students</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{pendingStudentsCount}</div>
          <div className="text-xs text-[#9CA3AF]">Enrolled in your courses</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">My Courses</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{courses.length}</div>
          <div className="text-xs text-[#9CA3AF]">Total courses</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Upcoming Lectures</div>
          <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{upcomingLectures.length}</div>
          <div className="text-xs text-[#9CA3AF]">Scheduled</div>
        </div>

        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Lectures</div>
          <div className="text-3xl font-bold text-[#00D1B2] mb-1 font-mono">{lectures.length}</div>
          <div className="text-xs text-[#9CA3AF]">All time</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Upcoming Lectures */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#E5E7EB]">Upcoming Lectures</h2>
            <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-9">
              <Plus className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingLectures.length === 0 ? (
              <div className="text-center text-sm text-[#9CA3AF] py-6">No upcoming lectures</div>
            ) : (
              upcomingLectures.slice(0, 5).map((lecture) => (
                <div key={lecture.id} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#E5E7EB] mb-1">{lecture.title}</h3>
                      <p className="text-xs text-[#9CA3AF]">{lecture.duration_minutes} min</p>
                    </div>
                    {lecture.is_live && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#EF4444]/10 text-[#EF4444]">LIVE</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(lecture.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div>{new Date(lecture.scheduled_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#E5E7EB]">My Courses</h2>
          </div>

          <div className="space-y-3">
            {courses.length === 0 ? (
              <div className="text-center text-sm text-[#9CA3AF] py-6">No courses assigned</div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#E5E7EB] mb-1">{course.title}</h3>
                      <p className="text-xs text-[#9CA3AF] capitalize">{course.difficulty_level} • {course.modules?.length || 0} modules</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${course.is_published ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                      {course.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#E5E7EB]">Student List</h2>
          <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-9">
            Export Report
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Student Name</th>
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Email</th>
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Course</th>
                <th className="text-left text-xs text-[#9CA3AF] pb-3">Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-sm text-[#9CA3AF]">No students enrolled</td></tr>
              ) : (
                students.map((student, index) => (
                  <tr key={index} className="border-b border-[#334155]">
                    <td className="py-4 text-sm text-[#E5E7EB]">{student.student_name}</td>
                    <td className="py-4 text-sm text-[#9CA3AF]">{student.student_email}</td>
                    <td className="py-4 text-sm text-[#9CA3AF]">{student.course_title}</td>
                    <td className="py-4 text-sm text-[#9CA3AF]">{new Date(student.enrolled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}