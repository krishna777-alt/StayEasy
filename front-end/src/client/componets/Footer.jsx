import { NavLink, Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-9 h-9 rounded-lg bg-amber-400 text-zinc-950 font-bold flex items-center justify-center text-xl shadow-lg shadow-amber-400/20 group-hover:bg-amber-300 transition-colors">
                S
              </span>
              <span className="text-2xl font-serif font-bold tracking-wide text-white">
                Stay<span className="text-amber-400">Easy</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Experience modern luxury with effortless bookings. Discover
              world-class stays, premium suites, and unforgettable retreats
              worldwide.
            </p>
            {/* Newsletter Subscription Form */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
                Subscribe to Exclusive Offers
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2 max-w-sm"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 flex-grow transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-md shadow-amber-400/10"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hotels"
                  className="hover:text-amber-400 transition-colors"
                >
                  All Hotels
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/suites"
                  className="hover:text-amber-400 transition-colors"
                >
                  Luxury Suites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/amenities"
                  className="hover:text-amber-400 transition-colors"
                >
                  Amenities
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 2: Account & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink
                  to="/help"
                  className="hover:text-amber-400 transition-colors"
                >
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-amber-400 transition-colors"
                >
                  Account Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cancellation-policy"
                  className="hover:text-amber-400 transition-colors"
                >
                  Cancellation Policy
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink
                  to="/privacy"
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/terms"
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/security"
                  className="hover:text-amber-400 transition-colors"
                >
                  Security
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} StayEasy Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#instagram"
              className="hover:text-amber-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="#twitter"
              className="hover:text-amber-400 transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="#facebook"
              className="hover:text-amber-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href="#linkedin"
              className="hover:text-amber-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
