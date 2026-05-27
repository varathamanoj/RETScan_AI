import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import History from './pages/History';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import DashboardLayout from './components/DashboardLayout';

// Protected Route Component
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Auth Route Component (redirect to dashboard if already logged in)
function AuthRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'upload',
        element: <Upload />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
