import { useState } from "react";
import { ArrowRight, BedDouble, Bath, Users } from "lucide-react";
import { Link } from "react-router-dom";
// import Pagination from "../Pagination";
import SectionTitle from "./SectionTitle";

const PAGE_SIZE = 3;

function RoomsCard({
  rooms,
  selectedRoom,
  setSelectedRoom,
  formatPrice,
  isLoading,
  error,
  onRetry,
  hotelId,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rooms.length / PAGE_SIZE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedRooms = rooms.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  return (
    <section id="rooms" className="mt-12 space-y-10">
      <SectionTitle
        eyebrow="Find your sanctuary"
        title="Rooms & suites"
        description="Choose the space that makes your stay extraordinary."
      />

      {isLoading ? (
        <p
          className="rounded-2xl border border-white/10 bg-[#111113] p-6 text-sm text-zinc-400"
          role="status"
        >
          Loading rooms...
        </p>
      ) : error ? (
        <div
          className="space-y-4 rounded-2xl border border-red-500/30 bg-[#111113] p-6 "
          role="alert"
        >
          <p className="text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full bg-amber-400 px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-amber-300"
          >
            Try again
          </button>
        </div>
      ) : rooms.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-[#111113] p-6 text-sm text-zinc-400">
          No rooms are listed for this hotel yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 ">
          {paginatedRooms.map((room) => (
            <div
              key={room.id}
              className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-[#111113] transition ${
                selectedRoom === room.id
                  ? "border-amber-400/70"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex h-full flex-col">
                <div className="h-44 overflow-hidden bg-zinc-900">
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                      No room image available
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 font-serif text-xl leading-tight text-white">
                      {room.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                        room.status === "available"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {room.status || "Available"}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-5 text-zinc-400">
                    {room.description}
                  </p>
                  <p className="mt-2 text-xs text-emerald-300">
                    {room.status === "available"
                      ? `${room.availableRooms} units available tonight`
                      : "Currently unavailable"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={14} className="text-amber-400" />
                      {room.bed}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-amber-400" />
                      {room.guests} guests
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath size={14} className="text-amber-400" />
                      {room.size}
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[10px] text-zinc-500">Starting from</p>
                      <p className="mt-0.5 font-serif text-2xl text-amber-400">
                        {formatPrice(room.price)}
                      </p>
                      <p className="text-[10px] text-zinc-500">Per night</p>
                    </div>
                    <button
                      type="button"
                      disabled={room.status && room.status !== "available"}
                      onClick={() =>
                        setSelectedRoom(
                          selectedRoom === room.id ? null : room.id,
                        )
                      }
                      className={`rounded-full px-4 py-2.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        selectedRoom === room.id
                          ? "bg-white/10 text-white"
                          : "bg-amber-400 text-black hover:bg-amber-300"
                      }`}
                    >
                      {room.status && room.status !== "available"
                        ? "Unavailable"
                        : selectedRoom === room.id
                          ? "Room Selected"
                          : "Select Room"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {!isLoading && !error && (
        <Pagination
          currentPage={activePage}
          pageSize={PAGE_SIZE}
          totalItems={rooms.length}
          onPageChange={setCurrentPage}
        />
      )} */}

      <div className="mt-6 flex justify-center">
        <Link
          to={`/hotel/hotelDetails/rooms?hotelId=${encodeURIComponent(hotelId)}`}
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-6 py-3 text-sm font-semibold text-amber-400 transition hover:border-amber-400 hover:bg-amber-400/10"
        >
          View all rooms
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default RoomsCard;
