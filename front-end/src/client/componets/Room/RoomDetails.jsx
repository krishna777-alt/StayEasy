import { X } from "lucide-react";

function RoomDetails({ selectedRoom, formatPrice, setSelectedRoom }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-2xl">
        <div className="relative h-60">
          <img
            src={selectedRoom.image}
            alt={selectedRoom.name}
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => setSelectedRoom(null)}
            className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-widest text-amber-400">
            Room details
          </p>
          <h2 className="mt-2 font-serif text-3xl">{selectedRoom.name}</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            {selectedRoom.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-400">
            <span>{selectedRoom.capacity} Guests</span>
            <span>·</span>
            <span>{selectedRoom.size} m²</span>
            <span>·</span>
            <span>{selectedRoom.bed}</span>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <div>
              <p className="text-xs text-zinc-500">Price per night</p>
              <p className="mt-1 font-serif text-3xl text-amber-400">
                {formatPrice(selectedRoom.price)}
              </p>
            </div>

            <button
              onClick={() => {
                alert(`Selected: ${selectedRoom.name}`);
                setSelectedRoom(null);
              }}
              className="rounded-full bg-amber-400 px-6 py-3 text-xs font-bold text-black hover:bg-amber-300"
            >
              Choose This Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
