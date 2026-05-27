import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes.jsx';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}