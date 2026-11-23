import { Plus } from "lucide-react";

function Header({ handleOpenCreate }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
      <div>
        <h2 className="text-2xl font-serif font-bold tracking-tight">
          Room & Suite Inventory Management
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Configure room types, pricing tiers, max occupancies, bed layouts, and
          real-time inventory counts.
        </p>
      </div>

      <button
        onClick={handleOpenCreate}
        className="flex items-center space-x-2 py-2.5 px-5 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
      >
        <Plus className="w-4 h-4" />
        <span>Add New Room Type</span>
      </button>
    </div>
  );
}

export default Header;
