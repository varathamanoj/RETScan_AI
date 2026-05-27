import { Outlet } from 'react-router';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
