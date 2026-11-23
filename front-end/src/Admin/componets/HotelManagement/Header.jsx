import { Search, Filter } from "lucide-react";

function Header({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
      <div>
        <h2 className="text-2xl font-serif font-bold tracking-tight">
          Hotel Property Management
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Review new submissions, monitor ratings, authorize edits, and remove
          inappropriate listings.
        </p>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search hotel name, location, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-900">
              All Statuses
            </option>
            <option value="Published" className="bg-zinc-900">
              Published
            </option>
            <option value="Pending Approval" className="bg-zinc-900">
              Pending Approval
            </option>
            <option value="Suspended" className="bg-zinc-900">
              Suspended
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
