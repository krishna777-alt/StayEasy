import { useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Heart,
  Star,
  Sparkles,
  Users,
} from "lucide-react";
import Pagination from "../Pagination";
import { NavLink } from "react-router-dom";

function getAvailabilityDisplay(room) {
  if (room.status && room.status !== "available") {
    return {
      label: room.status,
      dotClass: "bg-rose-400",
      textClass: "text-rose-400",
    };
  }

  const availableCount = Number(room.available);
  if (!Number.isFinite(availableCount)) {
    return {
      label: "Availability unknown",
      dotClass: "bg-zinc-400",
      textClass: "text-zinc-400",
    };
  }
  if (availableCount < 1) {
    return {
      label: "None left for selected dates",
      dotClass: "bg-rose-400",
      textClass: "text-rose-400",
    };
  }
  if (availableCount < 5) {
    return {
      label: `Only ${availableCount} left for selected dates`,
      dotClass: "bg-rose-400",
      textClass: "text-rose-400",
    };
  }

  return {
    label: `${availableCount} units available for selected dates`,
    dotClass: "bg-emerald-400",
    textClass: "text-emerald-400",
  };
}

function RoomCards({ rooms, toggleLike, likedRooms, formatPrice }) {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rooms.length / pageSize);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedRooms = rooms.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize,
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedRooms.map((room) => {
          const availability = getAvailabilityDisplay(room);
          return (
          <article
            key={room.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111113] transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-950/10"
          >
            {/* Room Image */}
            <div className="relative h-60 overflow-hidden">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-zinc-900 text-xs text-zinc-500">
                  No room image available
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {room.featured && (
                <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}

              <button
                onClick={() => toggleLike(room.id)}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2.5 backdrop-blur-md transition hover:bg-black/70"
              >
                <Heart
                  size={17}
                  className={
                    likedRooms.includes(room.id)
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }
                />
              </button>

              <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs backdrop-blur-md">
                {room.rating ? (
                  <>
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    {room.rating}
                    <span className="text-zinc-400">({room.reviews})</span>
                  </>
                ) : (
                  <span className="text-zinc-300">Not rated</span>
                )}
              </div>

              <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] text-white backdrop-blur-md">
                {room.type}
              </span>
            </div>

            {/* Room Details */}
            <div className="p-5">
              <h3 className="font-serif text-2xl text-white transition group-hover:text-amber-400">
                {room.name}
              </h3>

              <p className="mt-2 min-h-10 text-xs leading-6 text-zinc-500">
                {room.description}
              </p>

              {/* Room Information */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4">
                <div className="text-center">
                  <Users size={16} className="mx-auto text-amber-400" />
                  <p className="mt-2 text-[10px] text-zinc-400">
                    {room.capacity} Guests
                  </p>
                </div>

                <div className="border-x border-white/10 text-center">
                  <BedDouble size={16} className="mx-auto text-amber-400" />
                  <p className="mt-2 text-[10px] text-zinc-400">{room.bed}</p>
                </div>

                <div className="text-center">
                  <Bath size={16} className="mx-auto text-amber-400" />
                  <p className="mt-2 text-[10px] text-zinc-400">
                    {room.size} m²
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-md bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-400"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-5 flex items-center gap-2 text-xs">
                <span className={`h-2 w-2 rounded-full ${availability.dotClass}`} />
                <span className={availability.textClass}>
                  {availability.label}
                </span>
              </div>

              {/* Price and Button */}
              <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-5">
                <div>
                  <p className="text-[10px] text-zinc-500">Starting from</p>
                  <h4 className="mt-1 font-serif text-3xl text-amber-400">
                    {formatPrice(room.price)}
                  </h4>
                  <p className="mt-1 text-[10px] text-zinc-500">Per night</p>
                </div>

                <NavLink
                  to={`/hotel/hotelDetails/rooms/roomDetails/${encodeURIComponent(room._id ?? room.id)}`}
                  className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-amber-300"
                >
                  View Room
                  <ArrowRight size={15} />
                </NavLink>
              </div>
            </div>
          </article>
          );
        })}
      </div>
      <Pagination
        currentPage={activePage}
        pageSize={pageSize}
        totalItems={rooms.length}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default RoomCards;
