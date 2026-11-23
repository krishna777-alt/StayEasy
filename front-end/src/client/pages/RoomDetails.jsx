import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../../api/axios";
import Amenities from "../componets/RoomDetails/Amenities";
import Header from "../componets/RoomDetails/Header";
import Location from "../componets/RoomDetails/Location";
import Payment from "../componets/RoomDetails/Payment";
import Thumbnail from "../componets/RoomDetails/Thumbnail";

const MOCK_ROOM_DATA = {
  id: "6ae0bfd2b0ba545e096cf661",
  name: "Ocean View Villa",
  category: "Luxury Room",
  tagline: "Wake up to breathtaking ocean views.",
  rating: 4.9,
  reviewsCount: 124,
  maxOccupancy: 2,
  bedType: "1 King Bed",
  viewType: "Ocean View",
  hasWifi: true,
  hasBalcony: true,
  pricePerNight: 450,
  description:
    "Experience ultimate comfort in our Ocean View Villa, featuring modern amenities, a private balcony with panoramic ocean views, and elegant interiors designed for relaxation.",
  mainImage:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
  gallery: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
  ],
  location: {
    address: "Baa Atoll, Maldives",
    description: "A serene getaway in the heart of paradise.",
    mapPreview:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  },
};

function getDateInputValue(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toRoomDetails(room) {
  const images = [room.image, ...(Array.isArray(room.photos) ? room.photos : [])]
    .filter((image) => typeof image === "string" && image.trim());
  const bedCount = Number(room.beds) || 1;

  return {
    ...MOCK_ROOM_DATA,
    id: String(room._id),
    name: room.name || "Room",
    category: room.roomTypeCode || "Room",
    tagline: room.description || "Room details",
    rating: Number(room.rating) || 0,
    reviewsCount: Number(room.reviewsCount) || 0,
    maxOccupancy: Number(room.maxOccupancy) || 1,
    totalRooms: Number(room.totalRooms) || 1,
    bedType: `${bedCount} ${room.bedType || "Bed"}${bedCount > 1 ? "s" : ""}`,
    viewType: room.hasBalcony ? "Balcony" : "Standard view",
    pricePerNight: Number(room.pricePerNight) || 0,
    description: room.description || "",
    mainImage: images[0] || MOCK_ROOM_DATA.mainImage,
    gallery: images.length ? images : [MOCK_ROOM_DATA.mainImage],
    location: {
      ...MOCK_ROOM_DATA.location,
      address: room.hotel?.location || "Location not available",
      description: room.hotel?.name || "Hotel location",
    },
  };
}

export default function RoomDetailsPage({
  room: initialRoom = MOCK_ROOM_DATA,
  onBack,
}) {
  const { roomId } = useParams();
  const [room, setRoom] = useState(initialRoom);
  const [selectedImage, setSelectedImage] = useState(
    initialRoom.mainImage || initialRoom.gallery[0],
  );
  const [roomLoadError, setRoomLoadError] = useState(null);
  const loadError =
    roomLoadError?.roomId === roomId ? roomLoadError.message : "";
  const isLoading = Boolean(roomId && room.id !== roomId && !loadError);
  const [checkIn, setCheckIn] = useState(() => getDateInputValue());
  const [checkOut, setCheckOut] = useState(() => getDateInputValue(3));
  const [guests, setGuests] = useState("2 Adults");
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [availabilityResult, setAvailabilityResult] = useState(null);

  useEffect(() => {
    if (!roomId) return undefined;

    const controller = new AbortController();

    async function loadRoom() {
      try {
        const response = await api.get(
          `/hotels/room/${encodeURIComponent(roomId)}`,
          { signal: controller.signal },
        );
        const roomData = response.data?.room;

        if (!roomData) {
          throw new Error("Room details were not found.");
        }

        const details = toRoomDetails(roomData);
        setRoom(details);
        setSelectedImage(details.mainImage);
        setRoomLoadError(null);
      } catch (error) {
        if (!controller.signal.aborted) {
          setRoomLoadError({
            roomId,
            message:
              error.response?.data?.message ||
              error.message ||
              "Unable to load room details.",
          });
        }
      }
    }

    loadRoom();
    return () => controller.abort();
  }, [roomId]);

  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(`${checkIn}T00:00:00.000Z`);
    const end = new Date(`${checkOut}T00:00:00.000Z`);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }, [checkIn, checkOut]);

  const availabilityKey = `${roomId || ""}:${checkIn}:${checkOut}`;
  const hasAvailabilityResult = availabilityResult?.key === availabilityKey;
  const availableRooms = hasAvailabilityResult
    ? availabilityResult.availableRooms
    : null;
  const availabilityLoading = Boolean(
    roomId && nightsCount > 0 && !hasAvailabilityResult,
  );
  const availabilityError = hasAvailabilityResult
    ? availabilityResult.error
    : "";

  useEffect(() => {
    if (!roomId || nightsCount < 1) return undefined;

    const controller = new AbortController();

    async function loadAvailability() {
      try {
        const response = await api.get(
          `/hotels/room/${encodeURIComponent(roomId)}`,
          {
            params: { checkInDate: checkIn, checkOutDate: checkOut },
            signal: controller.signal,
          },
        );
        const count = response.data?.room?.availableRooms;
        if (!Number.isInteger(count) || count < 0) {
          throw new Error("Room availability response was invalid.");
        }
        setAvailabilityResult({
          key: availabilityKey,
          availableRooms: count,
          error: "",
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setAvailabilityResult({
            key: availabilityKey,
            availableRooms: null,
            error:
              error.response?.data?.message ||
              error.message ||
              "Unable to check room availability.",
          });
        }
      }
    }

    loadAvailability();
    return () => controller.abort();
  }, [roomId, checkIn, checkOut, nightsCount, availabilityKey]);

  const effectiveRoomsBooked =
    availableRooms === null
      ? roomsBooked
      : Math.max(1, Math.min(roomsBooked, availableRooms, 10));
  const totalPrice =
    room.pricePerNight * nightsCount * effectiveRoomsBooked;

  if (isLoading || loadError) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-center"
        role={loadError ? "alert" : "status"}
      >
        <p
          className={
            loadError ? "text-sm text-rose-300" : "text-sm text-zinc-400"
          }
        >
          {loadError || "Loading room details..."}
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-16 font-sans text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="mb-6">
          <button
            type="button"
            onClick={onBack || (() => window.history.back())}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-300 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4 text-amber-400" />
            <span>Back to Rooms</span>
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <Thumbnail
              room={room}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <Header room={room} />
            <Amenities />
            <Location location={room.location} />
          </div>

          <aside className="sticky top-6 space-y-5 lg:col-span-5">
            <Payment
              room={room}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              guests={guests}
              setGuests={setGuests}
              roomsBooked={effectiveRoomsBooked}
              setRoomsBooked={setRoomsBooked}
              availableRooms={availableRooms}
              availabilityLoading={availabilityLoading}
              availabilityError={availabilityError}
              nightsCount={nightsCount}
              totalPrice={totalPrice}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
