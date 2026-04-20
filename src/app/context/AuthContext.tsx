import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setAuthToken, getAuthToken } from '../services/api';

export interface User {
  id: number | string;
  email: string;
  role: 'admin' | 'faculty' | 'student' | 'distributor';
  full_name?: string;
  name?: string;
  roles?: { id: number; name: string }[];
  [key: string]: any;
}

/**
 * Normalize a user object from the backend to ensure a flat `role` string exists.
 * Backend returns `roles: [{id, name}]` but frontend expects `user.role`.
 */
function normalizeUser(raw: any): User {
  let role: string = raw.role || 'student';
  if (!raw.role && Array.isArray(raw.roles) && raw.roles.length > 0) {
    role = raw.roles[0].name;
  }
  return { ...raw, role } as User;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const storedToken = getAuthToken();
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await api.get('/auth/me');
      setUser(normalizeUser(userData));
      setToken(storedToken);
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthToken(null);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (newToken: string, userData: User) => {
    setAuthToken(newToken);
    setToken(newToken);
    setUser(normalizeUser(userData));
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore errors — clear local state regardless
    }
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
