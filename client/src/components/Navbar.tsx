import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
  isButton?: boolean;
  onClick?: () => void;
}

const NavLinkItem: React.FC<NavLinkProps> = ({ to, label, isButton = false, onClick }) => {
  const location = useLocation();
  const active = location.pathname === to;

  const baseClasses = isButton
    ? 'px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 shadow-sm font-semibold'
    : 'py-2 relative hover:text-teal-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 hover:after:w-full after:transition-all after:duration-300';

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${active && !isButton ? 'text-teal-600 font-semibold' : ''}`}
    >
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/event-logo1.png"
            alt="EventTracker Logo"
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
            EventTracker
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium" role="navigation">
          <NavLinkItem to="/" label="Home" />
          <NavLinkItem to="/events" label="Events" />
          <NavLinkItem to="/events/new" label="Add Event" isButton />
          <NavLinkItem to="/about" label="About" />
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
        >
          <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden bg-white shadow transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-3">
          <NavLinkItem to="/" label="Home" onClick={() => setMenuOpen(false)} />
          <NavLinkItem to="/events" label="Events" onClick={() => setMenuOpen(false)} />
          <NavLinkItem to="/events/new" label="Add Event" isButton onClick={() => setMenuOpen(false)} />
          <NavLinkItem to="/about" label="About" onClick={() => setMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
