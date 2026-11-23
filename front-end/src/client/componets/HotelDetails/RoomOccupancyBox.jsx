import { BedDouble } from "lucide-react";

export default function RoomOccupancyBox({
  totalRooms = 0,
  reservedRoomsCount = 0,
}) {
  const inventoryCount = Math.max(0, Number(totalRooms) || 0);
  const reservedCount = Math.min(
    inventoryCount,
    Math.max(0, Number(reservedRoomsCount) || 0),
  );
  const availableRoomsCount = inventoryCount - reservedCount;
  const occupancyPercentage = inventoryCount
    ? Math.round((reservedCount / inventoryCount) * 100)
    : 0;

  const roomGrid = Array.from({ length: inventoryCount }, (_, index) => ({
    roomNumber: index + 1,
    isReserved: index < reservedCount,
  }));

  return (
    <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-5">
      {/* Header & Status Pill */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div>
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
            Live Inventory Tracker
          </span>
          <h3 className="text-lg font-serif font-bold text-zinc-100 flex items-center gap-2 mt-0.5">
            <BedDouble className="w-5 h-5 text-amber-400" />
            Room Status Overview
          </h3>
        </div>

        <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full font-mono text-[11px] text-amber-400 font-bold">
          {occupancyPercentage}% Booked
        </span>
      </div>

      {/* Numerical Metrics Summary */}
      <div className="grid grid-cols-2 gap-3 text-xs font-sans">
        <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-zinc-400">
            Available Rooms
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-serif font-extrabold text-amber-400">
              {availableRoomsCount}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              / {inventoryCount}
            </span>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-zinc-400">
            Reserved Rooms
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-serif font-extrabold text-zinc-400">
              {reservedCount}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              / {inventoryCount}
            </span>
          </div>
        </div>
      </div>

      {/* Legend Indicator */}
      <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-amber-400 shadow-sm shadow-amber-400/40 inline-block"></span>
          <span className="text-amber-400 font-semibold">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-zinc-700/80 border border-zinc-600 inline-block"></span>
          <span className="text-zinc-400">Reserved</span>
        </div>
      </div>

      {/* 10x10 Room Matrix Grid */}
      <div className="bg-zinc-950 border border-zinc-800/90 p-3.5 rounded-2xl">
        <div className="grid grid-cols-10 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {roomGrid.map((room) => (
            <div
              key={room.roomNumber}
              title={`Room ${room.roomNumber}: ${room.isReserved ? "Reserved" : "Available"}`}
              className={`h-4.5 rounded-md flex items-center justify-center text-[9px] font-mono font-bold transition-all duration-300 cursor-default ${
                room.isReserved
                  ? "bg-zinc-800 text-zinc-500 border border-zinc-700/60"
                  : "bg-amber-400/20 text-amber-400 border border-amber-400/40 hover:bg-amber-400 hover:text-zinc-950"
              }`}
            >
              {room.roomNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info Note */}
      <p className="text-[10px] text-zinc-400 font-mono text-center">
        Availability reflects the stay dates used to load room listings.
      </p>
    </div>
  );
}
