import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Activity, LayoutDashboard, Upload, History, FileText, Settings, LogOut, Users, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Upload, label: 'Upload Image', path: '/upload' },
    { icon: History, label: 'History', path: '/history' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    ...(user?.role === 'admin' ? [{ icon: Users, label: 'User Management', path: '/users' }] : []),
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="bg-[#2C7BE5] p-2 rounded-xl">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">RETScan AI</h1>
            <p className="text-xs text-muted-foreground">DR Detection</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-sidebar-border">
        <div className="bg-muted rounded-xl p-3">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2C7BE5] text-white capitalize">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-[#2C7BE5] text-white'
                  : 'text-foreground hover:bg-sidebar-accent'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-sidebar border-r border-sidebar-border
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
