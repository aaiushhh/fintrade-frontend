import { useState, useEffect } from 'react';
import { Loader2, Users } from 'lucide-react';
import { api } from '../services/api';

interface UserItem {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  roles: { id: number; name: string }[];
}

export function AdminStudents() {
  const [students, setStudents] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await api.get('/admin/users?limit=100');
        const allUsers: UserItem[] = data.users || [];
        // Filter specifically for the student role
        const filteredStudents = allUsers.filter(u => 
          u.roles?.some(r => r.name === 'student')
        );
        setStudents(filteredStudents);
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
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 text-[var(--ft-red)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Users className="h-8 w-8 text-[var(--ft-charcoal)]" />
          <h1 className="text-2xl font-medium text-[var(--ft-charcoal)]">Registered Students</h1>
        </div>
        <p className="text-sm text-[var(--ft-muted)]">Manage and view all students actively using the platform.</p>
      </div>

      {error ? (
        <div className="mb-6 text-red-400 text-sm p-4 bg-[var(--ft-danger)]/10 rounded-lg border border-[var(--ft-danger)]/20">
          {error}
        </div>
      ) : (
        <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--ft-charcoal)]">All Students</h2>
            <div className="text-sm text-[var(--ft-muted)]">Total: {students.length}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--ft-border)]">
                  <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Name</th>
                  <th className="text-left text-xs text-[var(--ft-muted)] pb-3">Email</th>
                  <th className="text-center text-xs text-[var(--ft-muted)] pb-3">Status</th>
                  <th className="text-right text-xs text-[var(--ft-muted)] pb-3">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan={4} className="py-8 text-center text-sm text-[var(--ft-muted)]">No students found.</td></tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="border-b border-[var(--ft-border)] hover:bg-[var(--ft-surface)] transition-colors">
                      <td className="py-4 text-sm text-[var(--ft-charcoal)] font-medium">{student.full_name || '—'}</td>
                      <td className="py-4 text-sm text-[var(--ft-muted)]">{student.email}</td>
                      <td className="py-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${student.is_active ? 'bg-[var(--ft-success)]/10 text-[var(--ft-success)]' : 'bg-[var(--ft-danger)]/10 text-[var(--ft-danger)]'}`}>
                          {student.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 text-right text-sm text-[var(--ft-muted)]">
                        {new Date(student.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
