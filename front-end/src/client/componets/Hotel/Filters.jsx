import { SlidersHorizontal } from "lucide-react";

SlidersHorizontal;
function Filters({
  setMaxPrice,
  setSelectedRatings,
  setSelectedTypes,
  setSelectedAmenities,
  setSelectedGuestRatings,
  setSelectedLocations,
  onResetFilters,
  maxPrice,
  selectedRatings,
  handleCheckboxChange,
  selectedTypes,
  selectedAmenities,
  selectedGuestRatings,
  selectedLocations,
  propertyTypes,
  amenityOptions,
  guestRatingOptions,
  locationOptions,
}) {
  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6 sticky top-28">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h2 className="font-serif font-bold text-base text-zinc-100 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" /> Filters
          </h2>
          <button
            onClick={onResetFilters}
            className="text-[10px] text-zinc-500 hover:text-amber-400 uppercase font-mono tracking-wider"
          >
            Reset All
          </button>
        </div>

        {/* Price Per Night Range Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">
              Max Price Per Night
            </span>
            <span className="font-mono text-amber-400 font-bold">
              ₹{maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-amber-400 bg-zinc-950 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>₹0</span>
            <span>₹2,000</span>
            <span>₹5,000</span>
            <span>₹10,000+</span>
          </div>
        </div>

        {/* Property Rating */}
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 text-[10px]">
            Property Rating
          </span>
          {["5 stars", "4 stars", "3 stars"].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer hover:text-zinc-100"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() =>
                  handleCheckboxChange(
                    selectedRatings,
                    setSelectedRatings,
                    rating,
                  )
                }
                className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
              />
              <span>{rating}</span>
            </label>
          ))}
        </div>

        {/* Property Type */}
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 text-[10px]">
            Property Type
          </span>
          {propertyTypes.map((type) => (
            <label
              key={type}
              className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer hover:text-zinc-100"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() =>
                  handleCheckboxChange(selectedTypes, setSelectedTypes, type)
                }
                className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        {/* Amenities */}
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 text-[10px]">
            Amenities
          </span>
          {amenityOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer hover:text-zinc-100"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() =>
                  handleCheckboxChange(
                    selectedAmenities,
                    setSelectedAmenities,
                    amenity,
                  )
                }
                className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>

        {/* Guest Rating */}
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 text-[10px]">
            Guest Rating
          </span>
          {guestRatingOptions.map((gRating) => (
            <label
              key={gRating}
              className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer hover:text-zinc-100"
            >
              <input
                type="checkbox"
                checked={selectedGuestRatings.includes(gRating)}
                onChange={() =>
                  handleCheckboxChange(
                    selectedGuestRatings,
                    setSelectedGuestRatings,
                    gRating,
                  )
                }
                className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
              />
              <span>{gRating}</span>
            </label>
          ))}
        </div>

        {/* Locations */}
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90 text-[10px]">
            Locations
          </span>
          {locationOptions.map((loc) => (
            <label
              key={loc}
              className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer hover:text-zinc-100"
            >
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() =>
                  handleCheckboxChange(
                    selectedLocations,
                    setSelectedLocations,
                    loc,
                  )
                }
                className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Filters;
