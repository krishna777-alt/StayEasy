import { useState, useMemo } from "react";
import {
  //   BedDouble,
  Search,
  Filter,
  AlertTriangle,
  Power,
  PowerOff,
  Users,
  //   DollarSign,
  //   CheckCircle2,
  //   Building2,
  //   X,
  ShieldAlert,
  //   Info,
} from "lucide-react";

// Initial Rooms Dataset for "The Obsidian Sanctum"
const INITIAL_ROOMS = [
  {
    id: "RM-301",
    hotel: "The Obsidian Sanctum",
    name: "Ocean View Suite",
    type: "Suite",
    pricePerNight: 650,
    capacity: "2 Guests (1 King Bed)",
    status: "Available", // "Available" | "Occupied" | "Cleaning" | "Disabled"
    isMisconfigured: false,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "RM-302",
    hotel: "The Obsidian Sanctum",
    name: "Deluxe Room",
    type: "Standard Room",
    pricePerNight: 420,
    capacity: "2 Guests (1 Queen Bed)",
    status: "Occupied",
    isMisconfigured: false,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "RM-303",
    hotel: "The Obsidian Sanctum",
    name: "Presidential Suite",
    type: "Penthouse Suite",
    pricePerNight: 1250,
    capacity: "4 Guests (2 King Beds)",
    status: "Available",
    isMisconfigured: false,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "RM-304",
    hotel: "The Obsidian Sanctum",
    name: "Beach Villa",
    type: "Private Villa",
    pricePerNight: 980,
    capacity: "Unspecified Capacity", // FLAG: Misconfigured!
    status: "Cleaning",
    isMisconfigured: true, // Trigger audit flag
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
  },
];

export default function RoomManagementTab() {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showOnlyMisconfigured, setShowOnlyMisconfigured] = useState(false);

  // Filtered Rooms Logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.hotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || room.status === statusFilter;
      const matchesMisconfigured = showOnlyMisconfigured
        ? room.isMisconfigured
        : true;

      return matchesSearch && matchesStatus && matchesMisconfigured;
    });
  }, [rooms, searchQuery, statusFilter, showOnlyMisconfigured]);

  // Toggle Room Disable State
  const toggleDisableRoom = (roomId) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          const newStatus =
            room.status === "Disabled" ? "Available" : "Disabled";
          return { ...room, status: newStatus };
        }
        return room;
      }),
    );
  };

  const misconfiguredCount = rooms.filter((r) => r.isMisconfigured).length;

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* 1. HEADER & AUDIT BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Room Management • The Obsidian Sanctum
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor inventory configuration, real-time availability, capacities,
            and pricing tiers.
          </p>
        </div>

        {/* Misconfigured Alert Quick Filter Button */}
        {misconfiguredCount > 0 && (
          <button
            onClick={() => setShowOnlyMisconfigured(!showOnlyMisconfigured)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              showOnlyMisconfigured
                ? "bg-rose-500 text-zinc-950 border-rose-400 shadow-lg shadow-rose-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
            }`}
          >
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>
              {misconfiguredCount} Misconfigured Listing
              {misconfiguredCount > 1 ? "s" : ""} Detected
            </span>
          </button>
        )}
      </div>

      {/* 2. SEARCH & STATUS FILTERS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search rooms by name, ID, or hotel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-zinc-900">
                All Statuses
              </option>
              <option value="Available" className="bg-zinc-900">
                Available
              </option>
              <option value="Occupied" className="bg-zinc-900">
                Occupied
              </option>
              <option value="Cleaning" className="bg-zinc-900">
                Cleaning
              </option>
              <option value="Disabled" className="bg-zinc-900">
                Disabled
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. ROOMS GRID CARD INVENTORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRooms.length === 0 ? (
          <div className="col-span-full py-16 text-center text-zinc-500 text-xs bg-zinc-900/40 border border-zinc-800 rounded-2xl">
            No rooms match your filter or search criteria.
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`rounded-2xl bg-zinc-900/80 border p-4 backdrop-blur-md space-y-4 shadow-xl relative transition-all ${
                room.isMisconfigured
                  ? "border-rose-500/60 ring-1 ring-rose-500/20"
                  : "border-zinc-800"
              }`}
            >
              {/* Thumbnail & Status Badge */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-zinc-950">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />

                {/* Status indicator tag */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    room.status === "Available"
                      ? "bg-emerald-400 text-zinc-950"
                      : room.status === "Occupied"
                        ? "bg-amber-400 text-zinc-950"
                        : room.status === "Cleaning"
                          ? "bg-blue-400 text-zinc-950"
                          : "bg-zinc-800 text-zinc-400 line-through"
                  }`}
                >
                  {room.status}
                </span>

                {/* Hotel Tag */}
                <span className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md text-[10px] text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-800">
                  {room.hotel}
                </span>
              </div>

              {/* Misconfiguration Warning Banner */}
              {room.isMisconfigured && (
                <div className="bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-xl flex items-start space-x-2 text-[11px] text-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Configuration Error</span>
                    <span>Capacity parameter missing or unverified.</span>
                  </div>
                </div>
              )}

              {/* Room Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-500">
                    {room.id} • {room.type}
                  </span>
                  <span className="font-serif font-bold text-amber-400 text-sm">
                    ${room.pricePerNight}{" "}
                    <span className="text-[10px] text-zinc-400 font-normal">
                      / night
                    </span>
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-zinc-100">
                  {room.name}
                </h4>
              </div>

              {/* Capacity Details */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span
                    className={
                      room.isMisconfigured
                        ? "text-rose-400 font-semibold"
                        : "text-zinc-300"
                    }
                  >
                    {room.capacity}
                  </span>
                </span>
              </div>

              {/* Disable / Enable Action Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => toggleDisableRoom(room.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    room.status === "Disabled"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/30"
                  }`}
                >
                  {room.status === "Disabled" ? (
                    <>
                      <Power className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enable Room Listing</span>
                    </>
                  ) : (
                    <>
                      <PowerOff className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Disable Room</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
