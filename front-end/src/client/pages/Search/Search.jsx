import { useState } from "react";
import SearchHeader from "./SearchHeader";
import LeftSideBar from "./LeftSideBar";

// Mock Search Results Data
const MOCK_HOTELS = [
  {
    id: 1,
    name: "The Obsidian Sanctum",
    location: "Maldives, Private Atoll",
    rating: 4.98,
    reviewsCount: 124,
    pricePerNight: 850,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    badges: ["Overwater Villa", "Private Pool", "24/7 Butler"],
    isSuperhost: true,
  },
  {
    id: 2,
    name: "Aura Chalet & Alpine Spa",
    location: "Zermatt, Switzerland",
    rating: 4.92,
    reviewsCount: 88,
    pricePerNight: 620,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    badges: ["Ski-in/Ski-out", "Thermal Spa", "Fireplace"],
    isSuperhost: false,
  },
  {
    id: 3,
    name: "The Midnight Tower",
    location: "Tokyo, Japan",
    rating: 4.95,
    reviewsCount: 210,
    pricePerNight: 490,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    badges: ["Sky Lounge", "Michelin Dining", "City View"],
    isSuperhost: true,
  },
  {
    id: 4,
    name: "Villa Celestial",
    location: "Santorini, Greece",
    rating: 4.89,
    reviewsCount: 96,
    pricePerNight: 740,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    badges: ["Caldera View", "Infinity Pool", "Wine Cellar"],
    isSuperhost: false,
  },
];

export default function SearchResultsPage() {
  // Search Form State (Inherited from previous page or URL params)
  const [location, setLocation] = useState("Maldives");

  // Filter States

  const [selectedSort, setSelectedSort] = useState("recommended");

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-20">
      {/* 1. TOP COMPACT REFINEMENT SEARCH BAR */}
      <SearchHeader location={location} setLocation={setLocation} />
      {/* 2. MAIN CONTENT LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT SIDEBAR: FILTERS */}
        <LeftSideBar />
        {/* RIGHT COLUMN: RESULTS GRID */}
        <section className="lg:col-span-3 space-y-6">
          {/* Results Header / Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/40 p-4 border border-zinc-800/60 rounded-xl">
            <div>
              <h1 className="text-xl font-bold text-zinc-100">
                Stays in{" "}
                <span className="text-amber-400">
                  {location || "Selected Destination"}
                </span>
              </h1>
              <p className="text-xs text-zinc-400">
                Showing {MOCK_HOTELS.length} verified luxury properties
              </p>
            </div>

            {/* Sort Dropdown & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden py-2 px-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-200 flex items-center gap-2"
              >
                Filters
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="recommended">Featured & Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* HOTEL CARDS LIST */}
          <div className="space-y-6">
            {MOCK_HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 shadow-xl grid grid-cols-1 md:grid-cols-12"
              >
                {/* Property Image */}
                <div className="md:col-span-5 relative overflow-hidden h-64 md:h-auto">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {hotel.isSuperhost && (
                    <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-amber-400/40 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      ★ VIP Preferred
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-zinc-950/60 backdrop-blur-md rounded-full text-zinc-300 hover:text-amber-400 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-1.782-7.38c-1.89-1.077-4.32-.42-5.5.9-1.18-1.32-3.61-1.977-5.5-.9z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Property Details */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 flex items-center gap-1">
                        📍 {hotel.location}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                        <span className="text-amber-400 font-bold">
                          ★ {hotel.rating}
                        </span>
                        <span className="text-zinc-500">
                          ({hotel.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {hotel.name}
                    </h2>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {hotel.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] px-2.5 py-1 rounded-lg"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-zinc-400 tracking-wider">
                        Starting from
                      </p>
                      <p className="text-2xl font-extrabold text-amber-400">
                        ${hotel.pricePerNight}{" "}
                        <span className="text-xs font-normal text-zinc-400">
                          / night
                        </span>
                      </p>
                    </div>

                    <button className="py-2.5 px-5 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20">
                      Reserve Suite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
