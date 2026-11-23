import { Search, Filter } from "lucide-react";

function Header({
  statusFilter,
  setSearchQuery,
  setStatusFilter,
  searchQuery,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Registered User Accounts
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Manage client profiles, access credentials, retention policies, and
          stay histories.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Box */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
          />
        </div>

        {/* Status Dropdown */}
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
            <option value="Active" className="bg-zinc-900">
              Active
            </option>
            <option value="Blocked" className="bg-zinc-900">
              Blocked
            </option>
            <option value="Deactivated" className="bg-zinc-900">
              Deactivated
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
