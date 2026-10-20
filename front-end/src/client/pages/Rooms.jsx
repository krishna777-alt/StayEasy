import { useState } from "react";

// Mock Room Details Data
const ROOM_DATA = {
  id: "presidential-ocean-suite",
  hotelName: "The Obsidian Sanctum",
  hotelId: "obsidian-sanctum",
  name: "Presidential Overwater Villa",
  tagline:
    "Unrivaled ocean panoramas with direct reef access and private glass-bottom observatory.",
  pricePerNight: 1250,
  sizeM2: 240,
  sizeFt2: 2580,
  maxGuests: "2 Adults, 1 Child",
  bedType: "King Signature Cloud Bed",
  view: "360° Indian Ocean Horizon",
  gallery: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", // Master View
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  ],
  floorPlanUrl:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  amenityCategories: [
    {
      category: "Sanctuary & Comfort",
      items: [
        "Private Infinity Plunge Pool",
        "Outdoor Rainfall Shower",
        "Glass Floor Ocean Viewing Deck",
        "Motorized Blackout Shades",
      ],
    },
    {
      category: "Bespoke Services",
      items: [
        "Dedicated 24/7 Island Butler",
        "Unpacking & Packing Service",
        "Daily Sunset Champagne & Canapés",
        "In-Villa Spa Treatments",
      ],
    },
    {
      category: "Technology & Entertainment",
      items: [
        "Bang & Olufsen Surround Audio",
        "High-Speed Starlink Wi-Fi",
        "Automated Ambient Lighting Modes",
        "Custom Wine Cellar Stocking",
      ],
    },
  ],
};

export default function Rooms() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "floorplan"
  const [nights, setNights] = useState(3);

  // Luxury Add-ons
  const [addons, setAddons] = useState({
    seaplane: true,
    butler: false,
    spaPackage: false,
  });

  const seaplanePrice = 450;
  const butlerPrice = 200 * nights;
  const spaPrice = 350;

  const roomSubtotal = ROOM_DATA.pricePerNight * nights;
  const addOnTotal =
    (addons.seaplane ? seaplanePrice : 0) +
    (addons.butler ? butlerPrice : 0) +
    (addons.spaPackage ? spaPrice : 0);
  const totalAmount = roomSubtotal + addOnTotal;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24">
      {/* 1. BREADCRUMB & TITLE HEADER */}
      <header className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <a href="/search" className="hover:text-amber-400 transition-colors">
            Stays
          </a>
          <span>/</span>
          <a
            href={`/hotel/${ROOM_DATA.hotelId}`}
            className="hover:text-amber-400 transition-colors"
          >
            {ROOM_DATA.hotelName}
          </a>
          <span>/</span>
          <span className="text-zinc-100 font-medium">{ROOM_DATA.name}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100">
              {ROOM_DATA.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">{ROOM_DATA.tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full font-semibold">
              ★ Signature Suite
            </span>
          </div>
        </div>
      </header>

      {/* 2. GALLERY HERO & THUMBNAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-3">
          {/* Active Featured Image */}
          <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-zinc-800">
            <img
              src={ROOM_DATA.gallery[activePhoto]}
              alt={ROOM_DATA.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-300">
              Photo {activePhoto + 1} of {ROOM_DATA.gallery.length}
            </div>
          </div>

          {/* Thumbnail Selector Strip */}
          <div className="grid grid-cols-4 gap-3">
            {ROOM_DATA.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`h-24 rounded-xl overflow-hidden border transition-all ${
                  activePhoto === idx
                    ? "border-amber-400 ring-2 ring-amber-400/20 scale-[0.99]"
                    : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK SPECS RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center backdrop-blur-md">
          <div className="border-r border-zinc-800/80 last:border-none">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              Villa Size
            </span>
            <span className="text-sm font-bold text-zinc-100">
              {ROOM_DATA.sizeM2} m² / {ROOM_DATA.sizeFt2} ft²
            </span>
          </div>
          <div className="border-r border-zinc-800/80 last:border-none">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              Occupancy
            </span>
            <span className="text-sm font-bold text-zinc-100">
              {ROOM_DATA.maxGuests}
            </span>
          </div>
          <div className="border-r border-zinc-800/80 last:border-none">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              Bed Arrangement
            </span>
            <span className="text-sm font-bold text-zinc-100">
              {ROOM_DATA.bedType}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              View
            </span>
            <span className="text-sm font-bold text-amber-400">
              {ROOM_DATA.view}
            </span>
          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT & SIDEBAR */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: SPECS, FLOOR PLAN & AMENITIES (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* TAB SYSTEM: OVERVIEW VS FLOOR PLAN */}
          <div className="space-y-6">
            <div className="flex border-b border-zinc-800 gap-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 text-sm font-bold transition-colors relative ${
                  activeTab === "overview"
                    ? "text-amber-400"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Suite Highlights
                {activeTab === "overview" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("floorplan")}
                className={`pb-3 text-sm font-bold transition-colors relative ${
                  activeTab === "floorplan"
                    ? "text-amber-400"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Architectural Floor Plan
                {activeTab === "floorplan" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-100">
                  The Overwater Experience
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Suspended directly over turquoise lagoon waters, this
                  presidential villa features floor-to-ceiling retractable glass
                  doors that open seamlessly onto a private teak sun deck with a
                  infinity plunge pool, outdoor rain shower, and direct stair
                  access to the live coral reef below.
                </p>
              </div>
            )}

            {/* TAB CONTENT: FLOOR PLAN */}
            {activeTab === "floorplan" && (
              <div className="space-y-4 bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl text-center">
                <div className="relative h-80 rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex items-center justify-center">
                  <img
                    src={ROOM_DATA.floorPlanUrl}
                    alt="Suite Architectural Floor Plan"
                    className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded border border-amber-400/30 uppercase">
                    Architectural Layout • 240 m²
                  </div>
                </div>
                <p className="text-xs text-zinc-500">
                  Includes master suite, ensuite spa bathroom, private glass
                  floor deck, and sunset dining gazebo.
                </p>
              </div>
            )}
          </div>

          {/* AMENITIES CATEGORIES */}
          <section className="space-y-6 border-t border-zinc-800/80 pt-8">
            <h3 className="text-xl font-bold text-zinc-100">
              In-Room Amenities & Privileges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ROOM_DATA.amenityCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl space-y-3"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
                    {cat.category}
                  </h4>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-zinc-300 flex items-center gap-2"
                      >
                        <span className="text-amber-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* LUXURY EXPERIENCES / ADD-ONS SELECTOR */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h3 className="text-xl font-bold text-zinc-100">
              Enhance Your Stay (Optional Add-ons)
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl cursor-pointer hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addons.seaplane}
                    onChange={(e) =>
                      setAddons({ ...addons, seaplane: e.target.checked })
                    }
                    className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-sm font-semibold text-zinc-100 block">
                      Roundtrip Luxury Seaplane Transfer
                    </span>
                    <span className="text-xs text-zinc-400">
                      VIP airport lounge access included
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-amber-400">
                  +${seaplanePrice}
                </span>
              </label>

              <label className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl cursor-pointer hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addons.butler}
                    onChange={(e) =>
                      setAddons({ ...addons, butler: e.target.checked })
                    }
                    className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-sm font-semibold text-zinc-100 block">
                      Personal 24/7 Butler Service
                    </span>
                    <span className="text-xs text-zinc-400">
                      Dedicated staff for packing, dining & excursions
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-amber-400">
                  +${butlerPrice} (${200}/night)
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STICKY CHECKOUT SUMMARY CARD (4 Cols) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6">
            {/* Pricing Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">
                  Nightly Rate
                </span>
                <p className="text-3xl font-extrabold text-amber-400">
                  ${ROOM_DATA.pricePerNight}
                </p>
              </div>
              <span className="text-[11px] text-zinc-400">
                Taxes & Fees calculated at checkout
              </span>
            </div>

            {/* Stay Duration Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                Duration of Stay
              </label>
              <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-3">
                <span className="text-xs text-zinc-300 font-medium">
                  Number of Nights
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNights(Math.max(1, nights - 1))}
                    className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-zinc-100">
                    {nights}
                  </span>
                  <button
                    onClick={() => setNights(nights + 1)}
                    className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs border-t border-zinc-800 pt-4">
              <div className="flex justify-between text-zinc-400">
                <span>
                  ${ROOM_DATA.pricePerNight} x {nights} nights
                </span>
                <span className="text-zinc-200 font-medium">
                  ${roomSubtotal}
                </span>
              </div>
              {addOnTotal > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Selected Luxury Add-ons</span>
                  <span className="text-amber-400 font-medium">
                    +${addOnTotal}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Resort Fee & Tax</span>
                <span className="text-zinc-200 font-medium">
                  ${Math.round(totalAmount * 0.12)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-100 pt-3 border-t border-zinc-800">
                <span>Total Due</span>
                <span className="text-amber-400 text-lg">
                  ${totalAmount + Math.round(totalAmount * 0.12)}
                </span>
              </div>
            </div>

            {/* Direct Checkout Trigger Button */}
            <a
              href={`/checkout?room=${ROOM_DATA.id}&nights=${nights}&addons=${Object.keys(
                addons,
              )
                .filter((k) => addons[k])
                .join(",")}`}
              className="w-full block text-center py-4 px-6 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98]"
            >
              Proceed to Reserve Suite
            </a>

            <p className="text-[11px] text-zinc-500 text-center">
              🔒 Instant Confirmation • Instant VIP Booking
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
