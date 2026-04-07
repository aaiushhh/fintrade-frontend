import { Outlet } from 'react-router';
import { AuthProvider } from '../context/AuthContext';

/**
 * Root layout that provides AuthContext to all routes.
 * This is necessary because createBrowserRouter creates its own React tree,
 * so wrapping <RouterProvider> with <AuthProvider> does NOT propagate context
 * to route components. Instead, we use this layout route as the root.
 */
export function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
