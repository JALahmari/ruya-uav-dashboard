import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  AlertTriangle, 
  Navigation, 
  Settings, 
  FileText,
  LogOut,
  Radar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'operator'] },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', roles: ['admin', 'operator'] },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts', roles: ['admin', 'operator'] },
    { path: '/flight-control', icon: Navigation, label: 'Flight Control', roles: ['admin', 'operator'] },
    { path: '/settings', icon: Settings, label: 'Settings', roles: ['admin'] },
    { path: '/logs', icon: FileText, label: 'Logs', roles: ['admin'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="w-64 bg-neutral-900 text-white flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Radar className="h-6 w-6 text-primary-500" />
          Ru'ya Monitor
        </div>
        <div className="mt-2 text-sm text-neutral-400">
          UAV Crowd Detection System
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-neutral-400 capitalize">{user?.role}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
