import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, PieChart, Users, Database, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Search Analytics', icon: <PieChart size={20} />, path: '/admin/analytics' },
    { name: 'Lead Management', icon: <Users size={20} />, path: '/admin/leads' },
    { name: 'Stock Import', icon: <Database size={20} />, path: '/admin/stock' },
  ];

  return (
    <div className={`relative border-r border-secondary-200 bg-white ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out h-full`}>
      <div className="p-4 border-b border-secondary-200 flex items-center justify-center">
        {collapsed ? (
          <Logo size="sm" />
        ) : (
          <Logo />
        )}
      </div>
      
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-16 bg-white border border-secondary-200 rounded-full p-1 text-secondary-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-700 hover:bg-secondary-50 hover:text-primary-600'
                  } transition-colors duration-200`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 w-full px-2">
        <button
          onClick={logout}
          className="flex items-center p-2 w-full rounded-md text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-colors duration-200"
        >
          <span className="flex-shrink-0">
            <LogOut size={20} />
          </span>
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;