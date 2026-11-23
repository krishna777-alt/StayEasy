import { useState } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  //   AlertTriangle,
  Wrench,
  //   CalendarOff,
  Sun,
  //   Users,
  //   Plus,
  X,
  Search,
  //   RefreshCw,
  //   ShieldAlert,
} from "lucide-react";

// Mock Initial Availability Inventory Dataset
const INITIAL_INVENTORY = [
  {
    id: "INV-01",
    roomName: "Presidential Overwater Villa",
    totalCount: 4,
    occupiedCount: 3,
    availableCount: 1,
    maintenanceCount: 0,
    status: "High Demand",
    seasonalMultiplier: "1.5x (Peak Summer)",
    maintenanceLogs: [],
  },
  {
    id: "INV-02",
    roomName: "Sunset Lagoon Pavilion",
    totalCount: 6,
    occupiedCount: 4,
    availableCount: 2,
    maintenanceCount: 0,
    status: "Available",
    seasonalMultiplier: "1.2x (Autumn)",
    maintenanceLogs: [],
  },
  {
    id: "INV-03",
    roomName: "Royal Beachfront Estate",
    totalCount: 2,
    occupiedCount: 2,
    availableCount: 0,
    maintenanceCount: 0,
    status: "Fully Booked",
    seasonalMultiplier: "2.0x (Holiday Season)",
    maintenanceLogs: [],
  },
  {
    id: "INV-04",
    roomName: "Deluxe Ocean Room",
    totalCount: 10,
    occupiedCount: 6,
    availableCount: 3,
    maintenanceCount: 1,
    status: "Maintenance Block",
    seasonalMultiplier: "1.0x (Standard)",
    maintenanceLogs: [{ reason: "Plumbing repair", dates: "Sep 12 - Sep 15" }],
  },
];

export default function RoomAvailabilityTab() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Maintenance / Blackout / Seasonal settings
  const [activeModal, setActiveModal] = useState(null); // 'maintenance' | 'seasonal' | 'calendar'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [maintenanceReason, setMaintenanceReason] = useState("");
  const [maintenanceDates, setMaintenanceDates] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("1.5x (Peak Summer)");

  // Handle Blocking for Maintenance
  const handleBlockMaintenance = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === selectedItem.id) {
          const newMaint = item.maintenanceCount + 1;
          const newAvail = Math.max(0, item.availableCount - 1);
          const logs = [
            ...item.maintenanceLogs,
            { reason: maintenanceReason, dates: maintenanceDates },
          ];
          return {
            ...item,
            maintenanceCount: newMaint,
            availableCount: newAvail,
            maintenanceLogs: logs,
            status: "Maintenance Block",
          };
        }
        return item;
      }),
    );
    setActiveModal(null);
    setMaintenanceReason("");
    setMaintenanceDates("");
  };

  // Handle Seasonal Multiplier Update
  const handleUpdateSeason = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, seasonalMultiplier: selectedSeason }
          : item,
      ),
    );
    setActiveModal(null);
  };

  // Filter inventory
  const filteredInventory = inventory.filter((item) =>
    item.roomName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* 1. SECTION HEADER & QUICK OVERVIEW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Room Availability & Inventory Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Track real-time room occupancy, manage maintenance blocks, schedule
            seasonal rates, and prevent reservation overlaps.
          </p>
        </div>

        {/* Calendar View Toggle / Button */}
        <button
          onClick={() => setActiveModal("calendar")}
          className="flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-amber-400 transition-all"
        >
          <CalendarIcon className="w-4 h-4 text-amber-400" />
          <span>View Master Availability Calendar</span>
        </button>
      </div>

      {/* 2. SEARCH & CONFLICT WARNING BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search room inventory by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Overlapping reservation warning check */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Zero overlapping reservation conflicts detected</span>
        </div>
      </div>

      {/* 3. INVENTORY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md space-y-5 shadow-xl relative"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  {item.id}
                </span>
                <h3 className="text-lg font-serif font-bold text-zinc-100">
                  {item.roomName}
                </h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  item.status === "Fully Booked"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    : item.status === "High Demand"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : item.status === "Maintenance Block"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Inventory Breakdown Progress / Count */}
            <div className="grid grid-cols-4 gap-3 text-center text-xs bg-zinc-950 border border-zinc-800/80 p-3 rounded-2xl">
              <div>
                <span className="text-[10px] uppercase text-zinc-500 font-mono">
                  Total
                </span>
                <p className="font-bold text-zinc-100 text-sm mt-0.5">
                  {item.totalCount}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-amber-400 font-mono">
                  Occupied
                </span>
                <p className="font-bold text-amber-400 text-sm mt-0.5">
                  {item.occupiedCount}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-emerald-400 font-mono">
                  Available
                </span>
                <p className="font-bold text-emerald-400 text-sm mt-0.5">
                  {item.availableCount}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-rose-400 font-mono">
                  Maintenance
                </span>
                <p className="font-bold text-rose-400 text-sm mt-0.5">
                  {item.maintenanceCount}
                </p>
              </div>
            </div>

            {/* Seasonal Setting & Active Maintenance */}
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between bg-zinc-950/60 border border-zinc-800 p-2.5 rounded-xl">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Seasonal Rate
                  Rule:
                </span>
                <span className="font-bold text-amber-400 font-mono">
                  {item.seasonalMultiplier}
                </span>
              </div>

              {item.maintenanceLogs.length > 0 && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl text-[11px] text-rose-300 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <Wrench className="w-3 h-3" /> Maintenance Blocks Active:
                  </span>
                  {item.maintenanceLogs.map((log, i) => (
                    <p key={i}>
                      • {log.reason} ({log.dates})
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setActiveModal("seasonal");
                  setSelectedSeason(item.seasonalMultiplier);
                }}
                className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
              >
                Set Season
              </button>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setActiveModal("maintenance");
                }}
                className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1"
              >
                <Wrench className="w-3 h-3" /> Block Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: BLOCK ROOM FOR MAINTENANCE                                */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "maintenance" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Block Room for Maintenance
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleBlockMaintenance}
              className="space-y-4 text-xs"
            >
              <p className="text-zinc-400">
                Reserving a unit for maintenance on{" "}
                <strong className="text-zinc-200">
                  {selectedItem.roomName}
                </strong>{" "}
                will temporarily reduce live bookable inventory.
              </p>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-amber-400">
                  Reason for Maintenance *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep HVAC overhaul & plumbing repair"
                  value={maintenanceReason}
                  onChange={(e) => setMaintenanceReason(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-amber-400">
                  Unavailable Dates / Range *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oct 10 - Oct 15"
                  value={maintenanceDates}
                  onChange={(e) => setMaintenanceDates(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-rose-500 text-zinc-950 font-bold hover:bg-rose-400 rounded-xl text-xs transition-all shadow-lg shadow-rose-500/20"
                >
                  Confirm Maintenance Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: SET SEASONAL AVAILABILITY & RATES                         */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "seasonal" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Manage Seasonal Availability
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSeason} className="space-y-4 text-xs">
              <p className="text-zinc-400">
                Select seasonal multiplier and demand tier for{" "}
                <strong className="text-zinc-200">
                  {selectedItem.roomName}
                </strong>
                :
              </p>

              <div className="space-y-2">
                {[
                  "1.0x (Standard)",
                  "1.2x (Autumn)",
                  "1.5x (Peak Summer)",
                  "2.0x (Holiday Season)",
                ].map((season) => (
                  <label
                    key={season}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedSeason === season
                        ? "bg-amber-400/10 border-amber-400 text-amber-400 font-bold"
                        : "bg-zinc-950 border-zinc-800 text-zinc-300"
                    }`}
                  >
                    <span>{season}</span>
                    <input
                      type="radio"
                      name="season"
                      checked={selectedSeason === season}
                      onChange={() => setSelectedSeason(season)}
                      className="accent-amber-400"
                    />
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 rounded-xl text-xs transition-all shadow-lg shadow-amber-400/20"
                >
                  Update Seasonal Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: MASTER AVAILABILITY CALENDAR PREVIEW                      */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "calendar" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Master Availability Timeline Calendar
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-zinc-400">
                Live booking timeline overview for September 2026 across all
                inventory tiers.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-3 font-mono">
                <div className="flex justify-between text-[10px] text-zinc-500 uppercase border-b border-zinc-800 pb-2">
                  <span>Room Type</span>
                  <span>Sep 10 | 11 | 12 | 13 | 14 | 15</span>
                </div>
                {inventory.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between text-zinc-300"
                  >
                    <span className="font-serif text-xs font-semibold">
                      {inv.roomName}
                    </span>
                    <span className="text-emerald-400 tracking-widest">
                      🟢 🟢 🟡 🔴 🟢 🟢
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-5 bg-zinc-800 text-zinc-200 rounded-xl text-xs font-semibold"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
