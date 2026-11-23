import { MapPin, Star, Eye, Trash2, Edit3 } from "lucide-react";

function HotelTable({
  filteredHotels,
  setActiveModal,
  setSelectedHotel,
  handleOpenEdit,
  handleUpdateStatus,
}) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-950/80 text-amber-400 uppercase tracking-wider font-mono border-b border-zinc-800 text-[10px]">
            <tr>
              <th className="py-4 px-6">Hotel Property</th>
              <th className="py-4 px-4">Owner / Host</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Rating & Reviews</th>
              <th className="py-4 px-4">Rate</th>
              <th className="py-4 px-6 text-right">Moderation Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {filteredHotels.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-zinc-500">
                  No hotel listings found matching criteria.
                </td>
              </tr>
            ) : (
              filteredHotels.map((hotel) => (
                <tr
                  key={hotel.id}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Hotel Thumbnail & Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-800"
                      />
                      <div>
                        <p className="font-serif font-bold text-zinc-100">
                          {hotel.name}
                        </p>
                        <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />{" "}
                          {hotel.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="py-4 px-4 text-zinc-400">{hotel.owner}</td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        hotel.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : hotel.status === "Pending Approval"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {hotel.status}
                    </span>
                  </td>

                  {/* Rating & Reviews */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setActiveModal("reviews");
                      }}
                      className="flex items-center space-x-1 text-amber-400 hover:underline font-bold"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{hotel.rating > 0 ? hotel.rating : "N/A"}</span>
                      <span className="text-zinc-500 font-normal">
                        ({hotel.reviewsCount})
                      </span>
                    </button>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-mono text-zinc-200">
                    {hotel.priceFrom}
                  </td>

                  {/* Moderation Controls */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* Approve/Publish (if pending) */}
                      {hotel.status === "Pending Approval" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(hotel.id, "Published")
                          }
                          className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-[11px] font-semibold hover:bg-emerald-500/30 transition-colors"
                        >
                          Approve
                        </button>
                      )}

                      {/* Suspend / Unsuspend */}
                      {hotel.status === "Published" ? (
                        <button
                          onClick={() =>
                            handleUpdateStatus(hotel.id, "Suspended")
                          }
                          className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold hover:bg-amber-500/20"
                        >
                          Suspend
                        </button>
                      ) : hotel.status === "Suspended" ? (
                        <button
                          onClick={() =>
                            handleUpdateStatus(hotel.id, "Published")
                          }
                          className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-semibold"
                        >
                          Restore
                        </button>
                      ) : null}

                      {/* View Details */}
                      <button
                        onClick={() => {
                          setSelectedHotel(hotel);
                          setActiveModal("details");
                        }}
                        className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100"
                        title="View Details, Photos, Rooms"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Info */}
                      <button
                        onClick={() => handleOpenEdit(hotel)}
                        className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-amber-400"
                        title="Edit Information"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Remove / Fraudulent Listing */}
                      <button
                        onClick={() => {
                          setSelectedHotel(hotel);
                          setActiveModal("delete");
                        }}
                        className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-rose-400"
                        title="Remove Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HotelTable;
