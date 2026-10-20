import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Mock Hotel Data
const HOTEL_DATA = {
  id: "obsidian-sanctum",
  name: "The Obsidian Sanctum",
  tagline: "Ultra-luxury overwater villas nestled in private coral reefs.",
  location: "Baa Atoll, Maldives",
  rating: 4.98,
  reviewsCount: 142,
  priceFrom: 850,
  images: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200", // Main Hero
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600",
  ],
  description:
    "Architecturally designed to blend into the surrounding marine biosystem, The Obsidian Sanctum offers unmatched seclusion, private butler services, and private infinity pools attached to every villa.",
  amenities: [
    { icon: "🏊", title: "Private Infinity Pools" },
    { icon: "🛥️", title: "Yacht Airport Transfers" },
    { icon: "🍷", title: "Undersea Wine Cellar" },
    { icon: "💆", title: "Overwater Ayurvedic Spa" },
    { icon: "⚡", title: "High-Speed Starlink Wifi" },
    { icon: "🛎️", title: "Dedicated 24/7 Butler" },
  ],
  rooms: [
    {
      id: "presidential-ocean-suite",
      name: "Presidential Overwater Villa",
      size: "240 m² / 2,580 ft²",
      maxOccupancy: "2 Guests • 1 King Bed",
      pricePerNight: 1250,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "360° Ocean Horizon",
        "Private Glass Floor",
        "Plunge Pool & Deck",
      ],
    },
    {
      id: "sunset-lagoon-suite",
      name: "Sunset Lagoon Pavilion",
      size: "180 m² / 1,930 ft²",
      maxOccupancy: "3 Guests • 1 Super King",
      pricePerNight: 980,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Direct Reef Access",
        "Outdoor Rain Shower",
        "Sunset Facing",
      ],
    },
    {
      id: "royal-beach-residence",
      name: "Royal Beachfront Estate",
      size: "350 m² / 3,760 ft²",
      maxOccupancy: "6 Guests • 3 Bedrooms",
      pricePerNight: 2400,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Private Beach Strip",
        "Personal Chef Suite",
        "Private Sauna",
      ],
    },
  ],
};

export default function Hotels() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24">
      {/* 1. PHOTO GALLERY (LUXURY Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-3xl overflow-hidden border border-zinc-800">
          {/* Main Showcase Banner */}
          <div className="lg:col-span-2 lg:row-span-2 relative h-96 lg:h-[480px]">
            <img
              src={HOTEL_DATA.images[0]}
              alt="Main Property View"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-amber-400 text-zinc-950 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest">
                ★ 5-Star Luxury Resort
              </span>
              <h1 className="text-3xl font-extrabold text-zinc-100 mt-2">
                {HOTEL_DATA.name}
              </h1>
              <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                📍 {HOTEL_DATA.location}
              </p>
            </div>
          </div>

          {/* Grid Thumbnails */}
          {HOTEL_DATA.images.slice(1, 5).map((imgUrl, index) => (
            <div
              key={index}
              className="relative h-48 lg:h-[234px] overflow-hidden group"
            >
              <img
                src={imgUrl}
                alt={`Property preview ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* 2. MAIN DETAILS & BOOKING GATEWAY CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: OVERVIEW, STORY & ROOM SELECTION (8 Cols) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Property Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-100">
              About the Sanctuary
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {HOTEL_DATA.description}
            </p>

            {/* Micro Badge Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wider">
                  Rating
                </p>
                <p className="text-xl font-bold text-amber-400 mt-1">
                  ★ {HOTEL_DATA.rating}
                </p>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wider">
                  Villas
                </p>
                <p className="text-xl font-bold text-zinc-100 mt-1">
                  32 Suites
                </p>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wider">
                  Transfer
                </p>
                <p className="text-xl font-bold text-zinc-100 mt-1">
                  Yacht / Seaplane
                </p>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wider">
                  Check-in
                </p>
                <p className="text-xl font-bold text-zinc-100 mt-1">
                  15:00 VIP
                </p>
              </div>
            </div>
          </section>

          {/* Key Amenities Grid */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-xl font-bold text-zinc-100">
              Bespoke Perks & Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {HOTEL_DATA.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/60 p-3.5 rounded-xl"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs text-zinc-300 font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. AVAILABLE ROOMS & SUITES SECTION (Key transition point!) */}
          <section
            id="available-rooms"
            className="space-y-6 border-t border-zinc-800/80 pt-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">
                  Available Suites & Villas
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Select a room to view floor plans, full amenities, and reserve
                </p>
              </div>
              <span className="text-xs text-amber-400 font-medium">
                3 Tiers Available
              </span>
            </div>

            {/* Room Card List */}
            <div className="space-y-6">
              {HOTEL_DATA.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 hover:border-amber-400/40 transition-all duration-300 shadow-xl"
                >
                  {/* Room Thumbnail */}
                  <div className="sm:col-span-5 relative h-56 sm:h-auto">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Room Info */}
                  <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>📐 {room.size}</span>
                        <span>👤 {room.maxOccupancy}</span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-100 mt-1">
                        {room.name}
                      </h3>

                      {/* Micro Perks */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {room.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-zinc-950 border border-zinc-800/80 px-2.5 py-1 rounded-md text-zinc-300"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-zinc-400 tracking-wider">
                          Per Night
                        </span>
                        <p className="text-2xl font-extrabold text-amber-400">
                          ${room.pricePerNight}
                        </p>
                      </div>

                      {/* Link/Button navigating to individual Room Page */}
                      <NavLink
                        // href={`/hotel/${HOTEL_DATA.id}/room/${room.id}`}
                        to={`/hotel/rooms`}
                        className="py-2.5 px-5 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
                      >
                        Select & View Room
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STICKY RESERVATION SIDEBAR (4 Cols) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex items-baseline justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">
                  Rates start at
                </span>
                <p className="text-3xl font-extrabold text-amber-400">
                  ${HOTEL_DATA.priceFrom}{" "}
                  <span className="text-xs text-zinc-400 font-normal">
                    / night
                  </span>
                </p>
              </div>
              <span className="text-xs text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                VIP Guaranteed
              </span>
            </div>

            {/* Quick Date Selector Form */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                Check Dates & Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-2.5 text-left">
                  <span className="block text-[10px] text-zinc-500 uppercase">
                    Check-In
                  </span>
                  <input
                    type="date"
                    defaultValue="2026-09-10"
                    className="bg-transparent text-xs text-zinc-200 focus:outline-none w-full"
                  />
                </div>
                <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-2.5 text-left">
                  <span className="block text-[10px] text-zinc-500 uppercase">
                    Check-Out
                  </span>
                  <input
                    type="date"
                    defaultValue="2026-09-15"
                    className="bg-transparent text-xs text-zinc-200 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>

            <a
              href="#available-rooms"
              className="w-full block text-center py-3.5 px-4 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
            >
              Choose Room Tier
            </a>

            <div className="space-y-2 pt-2 text-xs text-zinc-400 border-t border-zinc-800">
              <p className="flex items-center gap-2">
                🛡️ <span>Free cancellation up to 48 hours before check-in</span>
              </p>
              <p className="flex items-center gap-2">
                💳 <span>No prepayment required today</span>
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
