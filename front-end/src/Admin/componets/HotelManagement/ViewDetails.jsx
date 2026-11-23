import { X } from "lucide-react";

function ViewDetails({ selectedHotel, setActiveModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-xl font-serif font-bold text-zinc-100">
              {selectedHotel.name}
            </h3>
            <p className="text-xs text-zinc-400">
              📍 {selectedHotel.location} • ID: {selectedHotel.id}
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Preview */}
        <div className="rounded-2xl overflow-hidden h-64 border border-zinc-800">
          <img
            src={selectedHotel.image}
            alt={selectedHotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <h4 className="text-xs font-mono uppercase text-amber-400">
            Property Overview
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {selectedHotel.description}
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-amber-400">
            Amenities & Perks
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedHotel.amenities.map((a, i) => (
              <span
                key={i}
                className="text-xs bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-xl text-zinc-200"
              >
                ✓ {a}
              </span>
            ))}
          </div>
        </div>

        {/* Rooms Tiers */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-amber-400">
            Configured Suites & Rooms
          </h4>
          <div className="space-y-2">
            {selectedHotel.rooms.map((room, i) => (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-zinc-200">
                  {room.name} ({room.size})
                </span>
                <span className="font-mono text-amber-400">
                  {room.price} / night
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setActiveModal(null)}
            className="py-2 px-5 bg-zinc-800 text-zinc-200 rounded-xl text-xs font-semibold"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
