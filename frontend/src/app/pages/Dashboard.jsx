import { useAuth } from '../context/AuthContext';
import DoctorDashboard from '../components/dashboards/DoctorDashboard';
import PatientDashboard from '../components/dashboards/PatientDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  }

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <PatientDashboard />;
}
