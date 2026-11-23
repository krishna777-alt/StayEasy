import { useState } from "react";
import { ChevronRight, Star, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const PAGE_SIZE = 6;

function HotelCards({
  setSortOption,
  sortOption,
  filteredHotels,
  toggleWishlist,
  isLoading,
  error,
  onRetry,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredHotels.length / PAGE_SIZE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedHotels = filteredHotels.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  return (
    <main className="lg:col-span-3 space-y-6">
      {/* SORT BY BAR */}
      <Sort setSortOption={setSortOption} sortOption={sortOption} />

      {/* HOTEL CARDS LIST */}
      <div className="space-y-6">
        {isLoading ? (
          <div
            className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-12 text-center text-sm text-zinc-400"
            role="status"
          >
            Loading hotels...
          </div>
        ) : error ? (
          <div
            className="space-y-4 rounded-3xl border border-rose-500/30 bg-rose-500/5 p-12 text-center"
            role="alert"
          >
            <p className="text-sm text-rose-300">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-amber-300"
            >
              Try again
            </button>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 space-y-2">
            <p className="text-base text-zinc-300 font-semibold">
              No hotels match your filters.
            </p>
            <p className="text-xs">
              Try resetting your filter parameters or widening your price range.
            </p>
          </div>
        ) : (
          paginatedHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col sm:flex-row group hover:border-amber-400/40 transition-all duration-300"
            >
              {/* Hotel Image with Wishlist Button */}
              <div className="relative sm:w-72 h-56 sm:h-auto shrink-0 overflow-hidden bg-zinc-950">
                {hotel.image ? (
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-xs text-zinc-500"
                    aria-label="No hotel image available"
                  >
                    No image available
                  </div>
                )}

                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(hotel.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-950/70 border border-zinc-800 backdrop-blur-md text-zinc-300 hover:text-rose-500 transition-colors z-10"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${hotel.isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
                  />
                </button>

                {/* Property Type Badge */}
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-amber-400 font-mono text-[10px] uppercase font-bold border border-zinc-800">
                  {hotel.propertyType}
                </span>
              </div>

              {/* Hotel Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />{" "}
                        {hotel.locationAddress || hotel.location}
                        {hotel.locationAddress &&
                        hotel.location &&
                        hotel.locationAddress !== hotel.location
                          ? ` (${hotel.location})`
                          : ""}
                      </p>
                    </div>

                    {/* Rating Pill */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-400 font-mono">
                          {hotel.rating}
                        </span>
                      </div>
                      <span className="block text-[10px] text-zinc-500 mt-1">
                        {hotel.guestRatingText} ({hotel.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {hotel.tagline && (
                    <p className="line-clamp-1 text-xs leading-5 text-zinc-300">
                      {hotel.tagline}
                    </p>
                  )}
                  {hotel.description && (
                    <p className="line-clamp-2 text-xs leading-5 text-zinc-400">
                      {hotel.description}
                    </p>
                  )}

                  {/* Amenities Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hotel.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg text-zinc-300"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & View Details Action */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500">
                      Starting Rate
                    </span>
                    <p className="text-2xl font-serif font-bold text-amber-400">
                      ₹{hotel.pricePerNight.toLocaleString()}{" "}
                      <span className="text-xs text-zinc-400 font-normal font-sans">
                        / night
                      </span>
                    </p>
                  </div>

                  <Link
                    to={`/hotels/hotelDetails?hotelId=${encodeURIComponent(hotel.id)}`}
                    className="py-2.5 px-5 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/10 flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* -------------------------------------------------------------- */}
      {/* 4. PAGINATION CONTROLS                                         */}
      {/* -------------------------------------------------------------- */}
      {!isLoading && !error && (
        <Pagination
          currentPage={activePage}
          pageSize={PAGE_SIZE}
          totalItems={filteredHotels.length}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}

function Sort({ setSortOption, sortOption }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-xs backdrop-blur-md">
      <span className="text-zinc-400">Sort results by:</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSortOption("recommended")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
            sortOption === "recommended"
              ? "bg-amber-400 text-zinc-950 font-bold"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          Recommended
        </button>
        <button
          onClick={() => setSortOption("price-low")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
            sortOption === "price-low"
              ? "bg-amber-400 text-zinc-950 font-bold"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => setSortOption("price-high")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
            sortOption === "price-high"
              ? "bg-amber-400 text-zinc-950 font-bold"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          Price: High to Low
        </button>
        <button
          onClick={() => setSortOption("rating-high")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
            sortOption === "rating-high"
              ? "bg-amber-400 text-zinc-950 font-bold"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          Top Rated
        </button>
      </div>
    </div>
  );
}

export default HotelCards;
