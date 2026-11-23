import { ChevronRight } from "lucide-react";

function Heading({ searchLocation, filteredHotels }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
      <nav className="flex items-center space-x-2 text-xs text-zinc-500 mb-2 font-mono">
        <a href="#" className="hover:text-amber-400">
          Home
        </a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-300">Hotels</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100">
          {searchLocation ? `Hotels in ${searchLocation}` : "Available hotels"}{" "}
          <span className="text-xs font-mono text-amber-400 font-normal">
            ({filteredHotels.length} properties found)
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Heading;
