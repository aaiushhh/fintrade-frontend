import { Outlet } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import { useEffect } from 'react';

/**
 * Root layout that provides AuthContext to all routes.
 * Also initializes the theme from localStorage.
 */
export function RootLayout() {
  useEffect(() => {
    const saved = localStorage.getItem('ft-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
