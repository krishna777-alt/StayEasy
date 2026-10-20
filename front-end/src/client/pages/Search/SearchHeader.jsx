import { useState } from "react";

function SearchHeader({ location, setLocation }) {
  const [checkIn, setCheckIn] = useState("2026-09-10");
  const [checkOut, setCheckOut] = useState("2026-09-15");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <form className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {/* Location */}
          <div className="px-2">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400/90">
              Destination
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-100 font-medium focus:outline-none placeholder-zinc-500"
              placeholder="Where to next?"
            />
          </div>

          {/* Dates */}
          <div className="px-2 sm:border-l border-zinc-800">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400/90">
              Dates
            </label>
            <div className="flex items-center gap-1 text-xs text-zinc-200">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              />
              <span className="text-zinc-500">-</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="px-2 lg:border-l border-zinc-800">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400/90">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="1 Guest, 1 Room" className="bg-zinc-900">
                1 Guest, 1 Room
              </option>
              <option value="2 Guests, 1 Room" className="bg-zinc-900">
                2 Guests, 1 Room
              </option>
              <option value="3 Guests, 2 Rooms" className="bg-zinc-900">
                3 Guests, 2 Rooms
              </option>
              <option value="4+ Guests, Suite" className="bg-zinc-900">
                4+ Guests, Suite
              </option>
            </select>
          </div>

          {/* Submit / Update Button */}
          <div>
            <button
              type="button"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10 flex items-center justify-center gap-2"
            >
              <svg
                className="w-3.5 h-3.5"
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
              Update Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}

export default SearchHeader;
