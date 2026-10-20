import { useState } from "react";

function LeftSideBar() {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  return (
    <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 h-fit backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h3 className="font-semibold text-lg text-zinc-100">Filter Stays</h3>
        <button className="text-xs text-amber-400 hover:underline">
          Reset All
        </button>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
          Max Price / Night: <span className="text-zinc-100">${maxPrice}</span>
        </label>
        <input
          type="range"
          min="200"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full accent-amber-400 bg-zinc-800 rounded-lg h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>$200</span>
          <span>$2,000+</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-2 border-t border-zinc-800/80 pt-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
          Property Type
        </label>
        {[
          "Luxury Resort",
          "Private Villa",
          "Penthouse Suite",
          "Boutique Hotel",
        ].map((type) => (
          <label
            key={type}
            className="flex items-center gap-3 text-sm text-zinc-300 hover:text-zinc-100 cursor-pointer"
          >
            <input
              type="checkbox"
              className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Luxury Amenities */}
      <div className="space-y-2 border-t border-zinc-800/80 pt-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
          Exclusive Amenities
        </label>
        {[
          "Private Pool",
          "24/7 Butler Service",
          "Helipad Access",
          "Spa & Wellness",
          "Ocean View",
        ].map((amenity) => (
          <label
            key={amenity}
            className="flex items-center gap-3 text-sm text-zinc-300 hover:text-zinc-100 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
              className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
            />
            {amenity}
          </label>
        ))}
      </div>
    </aside>
  );
}

export default LeftSideBar;
