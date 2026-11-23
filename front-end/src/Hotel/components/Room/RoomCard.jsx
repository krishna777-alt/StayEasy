import {
  Users,
  BedDouble,
  Maximize2,
  Wind,
  Sun,
  Flame,
  Trash2,
} from "lucide-react";

function RoomCard({
  filteredRooms,
  handleDeleteRoom,
  toggleDeactivateRoom,
  handleOpenEdit,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {filteredRooms.length === 0 ? (
        <div className="col-span-full py-12 text-center text-zinc-500 text-xs bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          No room types found matching your query.
        </div>
      ) : (
        filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`rounded-3xl bg-zinc-900/80 border p-6 backdrop-blur-md space-y-5 shadow-xl relative transition-all ${
              room.status === "Deactivated"
                ? "border-zinc-800 opacity-60"
                : "border-zinc-800 hover:border-amber-400/40"
            }`}
          >
            {/* Top Row: Thumbnail + Details */}
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="relative w-full sm:w-36 h-32 rounded-2xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                <img
                  src={
                    room.image ||
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                  }
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    room.status === "Active"
                      ? "bg-emerald-400 text-zinc-950"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {room.status}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">
                      {room.type}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-zinc-100">
                      {room.name}
                    </h3>
                  </div>
                  <span className="text-lg font-serif font-extrabold text-amber-400">
                    ${room.pricePerNight}{" "}
                    <span className="text-[10px] text-zinc-400 font-normal">
                      / night
                    </span>
                  </span>
                </div>

                {/* Specs Pill Grid */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-zinc-300">
                  <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" />{" "}
                    {room.maxOccupancy}
                  </span>
                  <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <BedDouble className="w-3 h-3 text-amber-400" />{" "}
                    {room.bedType}
                  </span>
                  <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-amber-400" />{" "}
                    {room.roomSize}
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities & Policies Flags */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800/80">
                <Wind
                  className={`w-3.5 h-3.5 ${room.acEnabled ? "text-amber-400" : "text-zinc-600"}`}
                />
                <span>{room.acEnabled ? "AC Enabled" : "No AC"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800/80">
                <Sun
                  className={`w-3.5 h-3.5 ${room.hasBalcony ? "text-amber-400" : "text-zinc-600"}`}
                />
                <span>
                  {room.hasBalcony ? "Private Balcony" : "No Balcony"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800/80">
                <Flame
                  className={`w-3.5 h-3.5 ${room.smokingPolicy === "Smoking Allowed" ? "text-rose-400" : "text-emerald-400"}`}
                />
                <span className="truncate">{room.smokingPolicy}</span>
              </div>
            </div>

            {/* Inventory & Availability Bar */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase font-mono">
                  Inventory & Availability Tonight:
                </span>
                <p className="font-bold text-zinc-200">
                  <span className="text-amber-400">
                    {room.availableCount} available
                  </span>{" "}
                  / {room.totalInventory} total units
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(room)}
                  className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleDeactivateRoom(room.id)}
                  className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {room.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 hover:text-rose-400 transition-colors"
                  title="Delete Room Type"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RoomCard;
