import { MapPin, Search } from "lucide-react";

function SearchBar({
  searchLocation,
  setCheckInDate,
  setSearchLocation,
  setCheckOutDate,
  setGuestCount,
  checkInDate,
  checkOutDate,
  guestCount,
  onSearch,
}) {
  return (
    <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-30 shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-zinc-950 border border-zinc-800 rounded-2xl p-2.5">
          {/* Location Input */}
          <div className="flex items-center space-x-2.5 px-3 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="w-full">
              <span className="block text-[9px] uppercase font-mono text-zinc-500">
                Destination
              </span>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="bg-transparent text-xs font-semibold text-zinc-100 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Check-In */}
          <div className="flex items-center space-x-2.5 px-3 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="w-full">
              <span className="block text-[9px] uppercase font-mono text-zinc-500">
                Check-in
              </span>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent text-xs font-semibold text-zinc-100 focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex items-center space-x-2.5 px-3 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="w-full">
              <span className="block text-[9px] uppercase font-mono text-zinc-500">
                Check-out
              </span>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-transparent text-xs font-semibold text-zinc-100 focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Guests & Search Action */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center space-x-2 px-3 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
              <div className="w-full">
                <span className="block text-[9px] uppercase font-mono text-zinc-500">
                  Occupancy
                </span>
                <input
                  type="text"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-zinc-100 focus:outline-none w-full"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={onSearch}
              className="h-full px-5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl font-bold text-xs transition-all flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/20"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
