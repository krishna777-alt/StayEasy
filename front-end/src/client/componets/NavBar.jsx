import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthModal from "./AuthModel";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  const isUserLogged = useSelector((state) => state.auth.isAuthenticated);
  console.log(isUserLogged);

  const openAuth = (tabName) => {
    setAuthTab(tabName);
    setIsAuthOpen(true);
  };
  // Helper function for NavLink class active states
  const navLinkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-amber-400 border-b-2 border-amber-400 pb-1"
        : "text-zinc-300 hover:text-amber-400"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-9 h-9 rounded-lg bg-amber-400 text-zinc-950 font-bold flex items-center justify-center text-xl shadow-lg shadow-amber-400/20 group-hover:bg-amber-300 transition-colors">
                S
              </span>
              <span className="text-2xl font-serif font-bold tracking-wide text-white">
                Stay<span className="text-amber-400">Easy</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={navLinkStyles} end>
                Home
              </NavLink>
              <NavLink to="/hotels" className={navLinkStyles}>
                Explore Hotels
              </NavLink>
              <NavLink to="/bookings" className={navLinkStyles}>
                Bookings
              </NavLink>
              <NavLink to="/about" className={navLinkStyles}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkStyles}>
                Contact Us
              </NavLink>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {!isUserLogged ? (
                <>
                  <NavLink
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/account"
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Account
                </NavLink>
              )}
              <NavLink
                to="/hotels"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all duration-200 shadow-md shadow-amber-400/10 active:scale-95"
              >
                Book Now
              </NavLink>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="text-zinc-400 hover:text-white focus:outline-none p-2"
                aria-label="Toggle Navigation Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 text-base font-medium ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/hotels"
              className={({ isActive }) =>
                `block py-2 text-base font-medium ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore Hotels
            </NavLink>
            <NavLink
              to="/suites"
              className={({ isActive }) =>
                `block py-2 text-base font-medium ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Luxury Suites
            </NavLink>
            <NavLink
              to="/amenities"
              className={({ isActive }) =>
                `block py-2 text-base font-medium ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Amenities
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 text-base font-medium ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </NavLink>

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              <NavLink
                to="/login"
                className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/hotels"
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
      />
    </>
  );
};

export default Navbar;
