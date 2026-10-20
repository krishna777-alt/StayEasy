import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const [searchItems, setSearchItems] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  });
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setSearchItems((items) => ({
      ...items,
      location,
      checkIn,
      checkOut,
      guests,
    }));
    navigate("/search");
  }
  useEffect(() => {
    console.log(searchItems);
  }, [searchItems]);

  // function searchForm() {}
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Background Image with Dark Luxury Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Resort Infinity Pool at Night"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse-slow"
        />
        {/* Multi-layered Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 pb-24 flex flex-col items-center text-center">
        {/* Luxury Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          The Ultimate Sanctuary for Discerning Travelers
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
          Redefining Modern{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            Hospitality
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-light">
          Discover handpicked luxury suites, private villas, and 5-star retreats
          tailored to your desires with effortless booking.
        </p>

        {/* Floating Glassmorphic Search Bar */}
        <div className="w-full max-w-5xl mt-12">
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end text-left"
          >
            {/* 1. Location Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 pl-1">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where to next?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* 2. Check-In & Check-Out Dates */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 pl-1">
                Dates
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-2.5 py-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  required
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-2.5 py-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* 3. Guests Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 pl-1">
                Guests & Rooms
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors cursor-pointer"
              >
                <option value="1 Guest, 1 Room">1 Guest, 1 Room</option>
                <option value="2 Guests, 1 Room">2 Guests, 1 Room</option>
                <option value="3 Guests, 2 Rooms">3 Guests, 2 Rooms</option>
                <option value="4+ Guests, Suite">4+ Guests, Suite</option>
              </select>
            </div>

            {/* 4. CTA Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search Stays
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative Bottom Subtle Glow Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
    </section>
  );
}

export default Hero;
