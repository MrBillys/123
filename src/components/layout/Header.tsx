import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // In a real app, this would navigate to search results
    // window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'B2B Partnership', path: '/b2b' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `text-sm font-medium py-2 border-b-2 ${
                    isActive 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-secondary-600 hover:text-primary-500 hover:border-primary-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-400" />
            </form>
            <Button variant="primary" size="sm" to="/login">
              Admin Login
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-4 px-2 space-y-1 sm:px-3 bg-white">
          <form onSubmit={handleSearch} className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-400" />
            </div>
          </form>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-secondary-800 hover:bg-secondary-50 hover:text-primary-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          <div className="px-3 py-3 mt-4 border-t border-secondary-200">
            <Button variant="primary" size="sm" fullWidth to="/login">
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;