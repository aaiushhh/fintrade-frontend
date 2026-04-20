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
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[var(--ft-charcoal)] mb-1">Students</h1>
        <p className="text-sm text-[var(--ft-muted)]">View and track student performance directly from backend enrollments</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-[var(--ft-danger)]/10 border border-[var(--ft-danger)]/20 text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="text-sm text-[var(--ft-muted)] mb-2">Total Students</div>
          <div className="text-3xl font-medium text-[var(--ft-charcoal)] font-mono">{students.length}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ft-muted)]" />
            <Input
              placeholder="Search students..."
              className="pl-9 bg-[var(--ft-surface)] border-[var(--ft-border)] text-[var(--ft-charcoal)] placeholder:text-[var(--ft-muted)]"
            />
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ft-border)] bg-[var(--ft-surface)]">
                <th className="text-left text-xs text-[var(--ft-muted)] px-6 py-4">Student Name</th>
                <th className="text-left text-xs text-[var(--ft-muted)] px-6 py-4">Email</th>
                <th className="text-left text-xs text-[var(--ft-muted)] px-6 py-4">Course</th>
                <th className="text-left text-xs text-[var(--ft-muted)] px-6 py-4">Enrolled At</th>
                <th className="text-center text-xs text-[var(--ft-muted)] px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-[var(--ft-muted)]">No students enrolled yet.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={`${student.student_id}-${student.course_title}`} className="border-b border-[var(--ft-border)] hover:bg-[var(--ft-surface)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--ft-charcoal)]">{student.student_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--ft-muted)]">{student.student_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--ft-muted)]">{student.course_title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--ft-muted)]">{new Date(student.enrolled_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[var(--ft-success)]/10 text-[var(--ft-success)]">
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
