import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  // Check,
  // ChevronDown,
  // Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  // Wifi,
  // Wind,
  // Waves,
  // Coffee,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../api/axios";
import RoomCards from "../componets/Room/RoomCards";

const roomData = [
  {
    id: "1",
    name: "Ocean View Luxury Suite",
    type: "Suite",
    description:
      "Wake up to panoramic ocean views in this beautifully designed luxury suite.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000",
    price: 8500,
    capacity: 3,
    size: 65,
    bed: "King Bed",
    rating: 4.9,
    reviews: 86,
    available: 4,
    amenities: ["Ocean View", "Private Balcony", "Free Wi-Fi"],
    featured: true,
  },
  {
    id: "2",
    name: "Deluxe Double Room",
    type: "Deluxe",
    description:
      "An elegant and peaceful room with modern interiors and garden views.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000",
    price: 6000,
    capacity: 2,
    size: 45,
    bed: "Queen Bed",
    rating: 4.8,
    reviews: 54,
    available: 8,
    amenities: ["Garden View", "Breakfast", "Free Wi-Fi"],
    featured: false,
  },
  {
    id: "3",
    name: "Presidential Villa",
    type: "Villa",
    description:
      "Experience ultimate privacy with your own pool and spacious living area.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    price: 15000,
    capacity: 4,
    size: 110,
    bed: "2 King Beds",
    rating: 5.0,
    reviews: 32,
    available: 2,
    amenities: ["Private Pool", "Ocean View", "Butler Service"],
    featured: true,
  },
  {
    id: "4",
    name: "Garden View Standard Room",
    type: "Standard",
    description:
      "A comfortable room surrounded by tropical greenery and natural beauty.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000",
    price: 4200,
    capacity: 2,
    size: 32,
    bed: "Double Bed",
    rating: 4.6,
    reviews: 41,
    available: 12,
    amenities: ["Garden View", "Air Conditioning", "Free Wi-Fi"],
    featured: false,
  },
  {
    id: "5",
    name: "Family Ocean Residence",
    type: "Family",
    description:
      "A spacious residence designed for families who love comfort and ocean views.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    price: 11000,
    capacity: 5,
    size: 90,
    bed: "2 Queen Beds",
    rating: 4.9,
    reviews: 63,
    available: 3,
    amenities: ["Ocean View", "Living Area", "Breakfast"],
    featured: false,
  },
  {
    id: "6",
    name: "Honeymoon Ocean Villa",
    type: "Villa",
    description:
      "A romantic private escape with beautiful ocean surroundings and premium comfort.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1000",
    price: 18000,
    capacity: 2,
    size: 100,
    bed: "King Bed",
    rating: 5.0,
    reviews: 27,
    available: 1,
    amenities: ["Private Pool", "Ocean View", "Jacuzzi"],
    featured: true,
  },
];

function getDateInputValue(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDaysToDate(value, days) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toRoomListItem(room, hotel) {
  const bedCount = Number(room.beds) || 1;
  const status = room.status || "available";

  return {
    _id: String(room._id),
    id: String(room._id),
    name: room.name,
    type: room.roomTypeCode || "Room",
    description: room.description,
    image: room.image || room.photos?.[0] || hotel?.images?.[0] || "",
    price: Number(room.pricePerNight) || 0,
    capacity: Number(room.maxOccupancy) || 1,
    size: Number(room.size) || 0,
    bed: `${bedCount} ${room.bedType || "Bed"}${bedCount > 1 ? "s" : ""}`,
    rating: Number(room.rating) || 0,
    reviews: Number(room.reviewsCount) || 0,
    available:
      status === "available"
        ? Number(room.availableRooms ?? room.totalRooms) || 0
        : 0,
    amenities: [
      room.hasAC ? "Air conditioning" : null,
      room.hasBalcony ? "Balcony" : null,
      room.smokingAllowed ? "Smoking allowed" : "Non-smoking",
    ].filter(Boolean),
    featured: false,
    status,
  };
}

function RoomsPage() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const [backendRooms, setBackendRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(hotelId));
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("All Rooms");
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minGuests, setMinGuests] = useState("Any");
  const [likedRooms, setLikedRooms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [checkInDate, setCheckInDate] = useState(() => getDateInputValue());
  const [checkOutDate, setCheckOutDate] = useState(() =>
    getDateInputValue(3),
  );

  useEffect(() => {
    if (!hotelId) {
      return undefined;
    }

    const controller = new AbortController();

    async function loadHotelRooms() {
      setIsLoading(true);
      setLoadError("");
      setBackendRooms([]);
      setSelectedHotel(null);

      try {
        const [hotelResponse, roomsResponse] = await Promise.all([
          api.get(`/hotels/hotel/${encodeURIComponent(hotelId)}`, {
            signal: controller.signal,
          }),
          api.get("/hotels/display_rooms", {
            params: { hotelId, checkInDate, checkOutDate },
            signal: controller.signal,
          }),
        ]);

        if (
          !hotelResponse.data?.hotel ||
          !Array.isArray(roomsResponse.data?.rooms)
        ) {
          throw new Error("The hotel rooms response was invalid.");
        }

        const hotel = hotelResponse.data.hotel;
        setSelectedHotel(hotel);
        setBackendRooms(
          roomsResponse.data.rooms.map((room) => toRoomListItem(room, hotel)),
        );
      } catch (error) {
        if (!controller.signal.aborted) {
          setBackendRooms([]);
          setSelectedHotel(null);
          setLoadError(
            error.response?.data?.message ||
              error.message ||
              "Unable to load this hotel's rooms.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadHotelRooms();

    return () => controller.abort();
  }, [hotelId, retryCount, checkInDate, checkOutDate]);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;
  const rooms = hotelId ? backendRooms : roomData;
  const roomTypes = useMemo(
    () => [
      "All Rooms",
      ...new Set(rooms.map((room) => room.type).filter(Boolean)),
    ],
    [rooms],
  );
  const activeRoomType = roomTypes.includes(roomType) ? roomType : "All Rooms";

  const filteredRooms = useMemo(() => {
    let result = [...rooms];

    if (search.trim()) {
      result = result.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (activeRoomType !== "All Rooms") {
      result = result.filter((room) => room.type === activeRoomType);
    }

    result = result.filter((room) => room.price <= maxPrice);

    if (minGuests !== "Any") {
      result = result.filter((room) => room.capacity >= Number(minGuests));
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [rooms, search, activeRoomType, maxPrice, minGuests, sort]);

  const toggleLike = (id) => {
    setLikedRooms((prev) =>
      prev.includes(id)
        ? prev.filter((roomId) => roomId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* ========================== Navbar ========================== */}
      {/* <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-black">
              <Sparkles size={19} />
            </div>
            <span className="font-serif text-2xl">
              Stay<span className="text-amber-400">Ease.</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="/" className="hover:text-amber-400">
              Home
            </a>
            <a href="/hotels" className="hover:text-amber-400">
              Hotels
            </a>
            <a href="/bookings" className="hover:text-amber-400">
              My Bookings
            </a>
            <a href="/about" className="hover:text-amber-400">
              About
            </a>
          </div>

          <button className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300">
            Sign In
          </button>
        </div>
      </nav> */}

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* ========================== Breadcrumb ========================== */}
        <div className="mb-8 flex items-center gap-2 text-xs text-zinc-500">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/hotels">Hotels</a>
          <span>/</span>
          <span className="text-amber-400">
            {selectedHotel?.name || "Available Rooms"}
          </span>
        </div>

        {/* ========================== Hotel Header ========================== */}
        <section className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-amber-400">
              {hotelId
                ? selectedHotel?.name?.toUpperCase() || "HOTEL ROOMS"
                : "THE OBSIDIAN SANCTUM"}
            </span>

            <h1 className="mt-3 font-serif text-4xl md:text-5xl">
              {hotelId
                ? `Rooms at ${selectedHotel?.name || "this hotel"}`
                : "Find your perfect room."}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
              <MapPin size={16} className="text-amber-400" />
              {hotelId
                ? selectedHotel?.location || "Loading hotel location..."
                : "Baa Atoll, Maldives"}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111113] px-5 py-3">
            <p className="text-xs text-zinc-500">Property rating</p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold">
                {hotelId
                  ? selectedHotel?.rating
                    ? `${selectedHotel.rating} / 5`
                    : "Not rated"
                  : "4.98 / 5"}
              </span>
              <span className="text-zinc-500">
                ({hotelId ? selectedHotel?.reviewsCount || 0 : 142} reviews)
              </span>
            </p>
          </div>
        </section>

        {/* ========================== Search Bar ========================== */}
        <section className="mb-9 rounded-2xl border border-amber-400/20 bg-[#141311] p-4 md:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
            <div>
              <label className="mb-2 block text-xs text-zinc-400">
                Search room
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <Search size={17} className="text-amber-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Room name..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs text-zinc-400">
                Check-in
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <CalendarDays size={17} className="text-amber-400" />
                <input
                  type="date"
                  min={getDateInputValue()}
                  value={checkInDate}
                  onChange={(event) => {
                    const nextCheckIn = event.target.value;
                    setCheckInDate(nextCheckIn);
                    if (nextCheckIn >= checkOutDate) {
                      setCheckOutDate(addDaysToDate(nextCheckIn, 1));
                    }
                  }}
                  className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs text-zinc-400">
                Check-out
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <CalendarDays size={17} className="text-amber-400" />
                <input
                  type="date"
                  min={checkInDate}
                  value={checkOutDate}
                  onChange={(event) => setCheckOutDate(event.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs text-zinc-400">Guests</label>
              <select
                value={minGuests}
                onChange={(e) => setMinGuests(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none"
              >
                <option value="Any">Any capacity</option>
                <option value="1">1+ Guests</option>
                <option value="2">2+ Guests</option>
                <option value="3">3+ Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
          </div>
        </section>

        {/* ========================== Filters and Sorting ========================== */}
        <section className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs text-zinc-500">EXPLORE ACCOMMODATIONS</p>
            <h2 className="mt-2 font-serif text-2xl">
              Available room collections
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Showing {filteredRooms.length} room types
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs hover:border-amber-400"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-white/10 bg-[#111113] px-4 py-2.5 text-xs outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </section>

        {/* ========================== Room Type Filters ========================== */}
        <section className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {roomTypes.map((type) => (
            <button
              key={type}
              onClick={() => setRoomType(type)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs transition ${
                activeRoomType === type
                  ? "bg-amber-400 font-semibold text-black"
                  : "border border-white/10 bg-[#111113] text-zinc-400 hover:border-amber-400/50 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </section>

        {/* ========================== Price Filter ========================== */}
        {showFilters && (
          <section className="mb-8 rounded-2xl border border-white/10 bg-[#111113] p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">Refine your search</h3>
              <button
                onClick={() => {
                  setMaxPrice(20000);
                  setMinGuests("Any");
                  setRoomType("All Rooms");
                }}
                className="text-xs text-amber-400"
              >
                Reset filters
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs text-zinc-400">
                  Maximum price per night: {formatPrice(maxPrice)}
                </label>
                <input
                  type="range"
                  min="3000"
                  max="20000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-4 w-full accent-amber-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-zinc-400">
                  Minimum guest capacity
                </label>
                <select
                  value={minGuests}
                  onChange={(e) => setMinGuests(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none"
                >
                  <option value="Any">Any capacity</option>
                  <option value="2">2+ guests</option>
                  <option value="3">3+ guests</option>
                  <option value="4">4+ guests</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* ========================== Room Cards ========================== */}
        <section>
          {isLoading ? (
            <p
              className="rounded-2xl border border-white/10 bg-[#111113] px-5 py-20 text-center text-sm text-zinc-400"
              role="status"
            >
              Loading rooms for this hotel...
            </p>
          ) : loadError ? (
            <div
              className="rounded-2xl border border-red-500/30 bg-[#111113] px-5 py-20 text-center"
              role="alert"
            >
              <p className="text-sm text-red-300">{loadError}</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-6 rounded-full bg-amber-400 px-6 py-3 text-xs font-bold text-black"
              >
                Try again
              </button>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111113] px-5 py-20 text-center">
              <Search size={35} className="mx-auto text-zinc-500" />
              <h3 className="mt-5 font-serif text-2xl">
                {hotelId ? "No rooms listed for this hotel" : "No rooms found"}
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                {hotelId
                  ? "Please check back later for available rooms."
                  : "Try changing your filters or search terms."}
              </p>
              {!hotelId && (
                <button
                  onClick={() => {
                    setSearch("");
                    setRoomType("All Rooms");
                    setMaxPrice(20000);
                    setMinGuests("Any");
                  }}
                  className="mt-6 rounded-full bg-amber-400 px-6 py-3 text-xs font-bold text-black"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <>
              <RoomCards
                rooms={filteredRooms}
                toggleLike={toggleLike}
                likedRooms={likedRooms}
                formatPrice={formatPrice}
              />
            </>
          )}
        </section>

        {/* ========================== Footer ========================== */}
      </main>

    </div>
  );
}

export default RoomsPage;
