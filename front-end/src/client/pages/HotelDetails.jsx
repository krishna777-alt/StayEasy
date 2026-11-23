import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../api/axios";
import Header from "../componets/HotelDetails/Header";
import ImageGallery from "../componets/HotelDetails/ImageGallery";
import GalleryModel from "../componets/HotelDetails/GalleryModel";
// import Booking from "../componets/HotelDetails/Booking";
import Reviews from "../componets/HotelDetails/Reviews";
import Overview from "../componets/HotelDetails/Overview";
import RoomsCard from "../componets/HotelDetails/RoomsCard";
import Policies from "../componets/HotelDetails/Policies";

import Location from "../componets/HotelDetails/Location";
import Amenities from "../componets/HotelDetails/Amenities";
import BreadCrumb from "../componets/HotelDetails/BreadCrumb";
import RoomOccupancyBox from "../componets/HotelDetails/RoomOccupancyBox";

function toDisplayHotel(hotel) {
  return {
    ...hotel,
    id: String(hotel._id),
    category: hotel.category || "HOTEL",
    rating: Number(hotel.rating) || 0,
    reviews: Number(hotel.reviewsCount) || 0,
    price: Number(hotel.priceFrom) || 0,
    images: Array.isArray(hotel.images)
      ? hotel.images.filter(
          (image) => typeof image === "string" && image.trim(),
        )
      : [],
    amenities: Array.isArray(hotel.amenities)
      ? hotel.amenities
          .map((amenity) => ({
            icon: Sparkles,
            name: typeof amenity === "string" ? amenity : amenity?.title,
          }))
          .filter((amenity) => amenity.name)
      : [],
  };
}

function toDisplayRoom(room, fallbackImage) {
  const bedCount = Number(room.beds) || 1;
  const status = room.status || "available";

  return {
    id: String(room._id),
    name: room.name,
    description: room.description,
    size: room.size ? `${room.size} m²` : "Size not specified",
    guests: Number(room.maxOccupancy) || 1,
    bed: `${bedCount} ${room.bedType || "Bed"}${bedCount > 1 ? "s" : ""}`,
    price: Number(room.pricePerNight) || 0,
    image: room.image || room.photos?.[0] || fallbackImage,
    status,
    totalRooms: Number(room.totalRooms) || 0,
    availableRooms: Number(room.availableRooms) || 0,
    features: [
      room.roomTypeCode,
      room.hasAC ? "Air conditioning" : null,
      room.hasBalcony ? "Balcony" : null,
      room.smokingAllowed ? "Smoking allowed" : "Non-smoking",
    ].filter(Boolean),
  };
}

function HotelDetailsPage() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hotelLoading, setHotelLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [hotelError, setHotelError] = useState("");
  const [roomsError, setRoomsError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [liked, setLiked] = useState(false);
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");
  // const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHotelDetails() {
      setHotel(null);
      setRooms([]);
      setHotelError("");
      setRoomsError("");
      setHotelLoading(true);
      setRoomsLoading(true);
      setActiveImage(0);
      setSelectedRoom(null);

      if (!hotelId) {
        setHotelError(
          "No hotel was selected. Choose a hotel to view its details.",
        );
        setHotelLoading(false);
        setRoomsLoading(false);
        return;
      }

      const [hotelResult, roomsResult] = await Promise.allSettled([
        api.get(`/hotels/hotel/${encodeURIComponent(hotelId)}`, {
          signal: controller.signal,
        }),
        api.get("/hotels/display_rooms", {
          params: { hotelId },
          signal: controller.signal,
        }),
      ]);

      if (controller.signal.aborted) return;

      if (hotelResult.status === "fulfilled") {
        const hotelData = hotelResult.value.data?.hotel;
        if (hotelData) {
          setHotel(toDisplayHotel(hotelData));
        } else {
          setHotelError(
            hotelResult.value.data?.message || "Hotel details were not found.",
          );
        }
      } else {
        setHotelError(
          hotelResult.reason?.response?.data?.message ||
            hotelResult.reason?.message ||
            "Unable to load hotel details.",
        );
      }

      if (roomsResult.status === "fulfilled") {
        const roomData = roomsResult.value.data?.rooms;
        if (Array.isArray(roomData)) {
          setRooms(roomData);
        } else {
          setRoomsError(
            roomsResult.value.data?.message || "Room data was invalid.",
          );
        }
      } else {
        setRoomsError(
          roomsResult.reason?.response?.data?.message ||
            roomsResult.reason?.message ||
            "Unable to load rooms.",
        );
      }

      setHotelLoading(false);
      setRoomsLoading(false);
    }

    loadHotelDetails();

    return () => controller.abort();
  }, [hotelId, retryCount]);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const nextImage = () => {
    if (hotel?.images.length) {
      setActiveImage((prev) => (prev + 1) % hotel.images.length);
    }
  };

  const previousImage = () => {
    if (hotel?.images.length) {
      setActiveImage(
        (prev) => (prev - 1 + hotel.images.length) % hotel.images.length,
      );
    }
  };

  if (hotelLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#09090B] text-sm text-zinc-400"
        role="status"
      >
        Loading hotel details...
      </div>
    );
  }

  if (hotelError || !hotel) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#09090B] px-5 text-center"
        role="alert"
      >
        <p className="text-sm text-rose-300">
          {hotelError || "Hotel details are unavailable."}
        </p>
        {hotelId && (
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="rounded-full bg-amber-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-amber-300"
          >
            Try again
          </button>
        )}
        <Link to="/hotels" className="text-sm text-amber-400 hover:underline">
          Back to hotels
        </Link>
      </main>
    );
  }

  const displayRooms = rooms.map((room) =>
    toDisplayRoom(room, hotel.images[0]),
  );
  const totalRoomInventory = displayRooms.reduce(
    (total, room) => total + room.totalRooms,
    0,
  );
  const availableRoomInventory = displayRooms.reduce(
    (total, room) => total + room.availableRooms,
    0,
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-white selection:bg-amber-400 selection:text-black">
      {/* ========================== Navbar ========================== */}

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* ========================== Breadcrumb ========================== */}
        <BreadCrumb hotel={hotel} />

        {/* ========================== Hotel Header ========================== */}
        <Header hotel={hotel} liked={liked} setLiked={setLiked} />

        {/* ========================== Image Gallery ========================== */}
        <ImageGallery
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          setShowGallery={setShowGallery}
          hotel={hotel}
        />

        {/* ========================== Overview + Booking ========================== */}
        {/* <section className="grid grid-cols-2 gap-12 lg:grid-cols-[2fr_470px]"> */}
        <section className="grid grid-cols-2 gap-5 lg:grid-cols-[2fr_470px] ">
          <div className="">
            {/* Overview */}
            <Overview hotel={hotel} formatPrice={formatPrice} />

            {/* Amenities */}
            <Amenities amenities={hotel.amenities} />

            {/* ========================== Rooms ========================== */}

            {/* ========================== Policies ========================== */}
            <Policies />

            {/* ========================== Reviews ========================== */}
            <Reviews hotel={hotel} />
          </div>

          {/* ========================== Booking Sidebar ========================== */}
          {/* <Booking
            hotel={hotel}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            setCheckIn={setCheckIn}
            setCheckOut={setCheckOut}
            setGuests={setGuests}
            formatPrice={formatPrice}
          /> */}
          <div className="col-start-2 space-y-5">
            {/* ========================== Location ========================== */}
            <Location hotel={hotel} />
            <RoomOccupancyBox
              totalRooms={totalRoomInventory}
              reservedRoomsCount={
                totalRoomInventory - availableRoomInventory
              }
            />
          </div>
        </section>
        <RoomsCard
          key={hotel.id}
          hotelId={hotel.id}
          rooms={displayRooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          formatPrice={formatPrice}
          isLoading={roomsLoading}
          error={roomsError}
          onRetry={() => setRetryCount((count) => count + 1)}
        />
      </main>

      {/* ========================== Photo Gallery Modal ========================== */}
      {showGallery && hotel.images.length > 0 && (
        <GalleryModel
          activeImage={activeImage}
          previousImage={previousImage}
          nextImage={nextImage}
          setShowGallery={setShowGallery}
          hotel={hotel}
        />
      )}
    </div>
  );
}

export default HotelDetailsPage;
