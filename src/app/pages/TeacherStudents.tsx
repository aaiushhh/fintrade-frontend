import { useState, useEffect } from 'react';
import {
  Search, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { api } from '../services/api';

interface StudentData {
  student_id: number;
  student_name: string;
  student_email: string;
  course_title: string;
  enrolled_at: string;
}

export function TeacherStudents() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await api.get('/faculty/students');
        setStudents(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Students</h1>
        <p className="text-sm text-[#9CA3AF]">View and track student performance directly from backend enrollments</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
          <div className="text-sm text-[#9CA3AF] mb-2">Total Students</div>
          <div className="text-3xl font-bold text-[#E5E7EB] font-mono">{students.length}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#111827] border border-[#334155] rounded-lg p-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
            <Input
              placeholder="Search students..."
              className="pl-9 bg-[#1F2937] border-[#334155] text-[#E5E7EB] placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-[#111827] border border-[#334155] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155] bg-[#1F2937]">
                <th className="text-left text-xs text-[#9CA3AF] px-6 py-4">Student Name</th>
                <th className="text-left text-xs text-[#9CA3AF] px-6 py-4">Email</th>
                <th className="text-left text-xs text-[#9CA3AF] px-6 py-4">Course</th>
                <th className="text-left text-xs text-[#9CA3AF] px-6 py-4">Enrolled At</th>
                <th className="text-center text-xs text-[#9CA3AF] px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-[#9CA3AF]">No students enrolled yet.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={`${student.student_id}-${student.course_title}`} className="border-b border-[#334155] hover:bg-[#1F2937] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#E5E7EB]">{student.student_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#9CA3AF]">{student.student_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#9CA3AF]">{student.course_title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#9CA3AF]">{new Date(student.enrolled_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#10B981]/10 text-[#10B981]">
                        Active
                      </span>
                    </td>
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
