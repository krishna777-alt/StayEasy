import { Search as SearchIcon } from "lucide-react";

function Search({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
        <input
          type="text"
          placeholder="Search rooms by name or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>
    </div>
  );
}

export default Search;
