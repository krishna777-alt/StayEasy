import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/axios";
import { createRoom } from "../../features/hotel/roomSlice";

import RoomCard from "../components/Room/RoomCard";
import AddRoom from "../components/Room/AddRoom";
import Header from "../components/Room/Header";
import Search from "../components/Room/Search";

const toRoomCard = (room) => ({
  id: room._id,
  name: room.name,
  type: room.roomTypeCode,
  description: room.description,
  pricePerNight: room.pricePerNight,
  maxOccupancy: `${room.maxOccupancy} Guests`,
  beds: room.beds,
  bedType: room.bedType,
  size: room.size,
  roomSize: room.size == null ? "—" : `${room.size} m²`,
  acEnabled: room.hasAC,
  hasBalcony: room.hasBalcony,
  smokingPolicy: room.smokingAllowed ? "Smoking Allowed" : "Non-Smoking",
  totalInventory: room.totalRooms,
  availableCount:
    room.availableRooms ??
    (room.status === "available" ? room.totalRooms : 0),
  status:
    room.status === "available"
      ? "Active"
      : room.status === "maintenance"
        ? "Maintenance"
        : "Deactivated",
  image: room.image,
});

export default function RoomManagementTab() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [roomLoadStatus, setRoomLoadStatus] = useState("loading");
  const [isSavingRoom, setIsSavingRoom] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Add / Edit Room
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "Luxury Suite",
    description: "",
    pricePerNight: "",
    maxOccupancy: "2",
    beds: "1",
    bedType: "King",
    roomSize: "",
    acEnabled: true,
    hasBalcony: true,
    smokingPolicy: "Non-Smoking",
    totalInventory: "1",
    image: "",
  });

  useEffect(() => {
    let isCurrent = true;

    async function loadRooms() {
      try {
        const { data } = await api.get("/hotels/dashboard");
        const currentHotelId = data.hotel?._id;

        if (!currentHotelId) {
          throw new Error("No hotel is associated with this account.");
        }

        if (!Array.isArray(data.rooms)) {
          throw new Error("Hotel dashboard returned invalid room data.");
        }

        if (isCurrent) {
          setHotelId(currentHotelId);
          setRooms(data.rooms.map(toRoomCard));
          setRoomLoadStatus("succeeded");
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            (typeof error === "string" && error) ||
              error.response?.data?.message ||
              error.message ||
              "Could not load rooms. Please try again.",
          );
          setRoomLoadStatus("failed");
        }
      }
    }

    loadRooms();
    return () => {
      isCurrent = false;
    };
  }, [dispatch]);

  // Open Modal for Create
  const handleOpenCreate = () => {
    setSubmitError("");
    setEditingRoomId(null);
    setFormData({
      name: "",
      type: "Luxury Suite",
      description: "",
      pricePerNight: "",
      maxOccupancy: "2",
      beds: "1",
      bedType: "King",
      roomSize: "",
      acEnabled: true,
      hasBalcony: true,
      smokingPolicy: "Non-Smoking",
      totalInventory: "1",
      image: "",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (room) => {
    setEditingRoomId(room.id);
    setFormData({
      name: room.name,
      type: room.type,
      description: room.description || "",
      pricePerNight: room.pricePerNight,
      maxOccupancy: Number.parseInt(room.maxOccupancy, 10),
      beds: room.beds || 1,
      bedType: room.bedType,
      roomSize: room.size ?? "",
      acEnabled: room.acEnabled,
      hasBalcony: room.hasBalcony,
      smokingPolicy: room.smokingPolicy,
      totalInventory: room.totalInventory,
      image: room.image,
    });
    setIsModalOpen(true);
  };

  // Save Room (Create or Update)
  const handleSaveRoom = async (e) => {
    e.preventDefault();
    if (isSavingRoom) return;
    if (editingRoomId) {
      setIsSavingRoom(true);
      setSubmitError("");
      try {
        const { data } = await api.patch(
          `/hotels/room/${encodeURIComponent(editingRoomId)}`,
          {
            name: formData.name.trim(),
            roomTypeCode: formData.type,
            description: formData.description.trim(),
            maxOccupancy: Number(formData.maxOccupancy),
            beds: Number(formData.beds),
            bedType: formData.bedType,
            pricePerNight: Number(formData.pricePerNight),
            image: formData.image,
            totalRooms: Number(formData.totalInventory),
            hasAC: formData.acEnabled,
            size: Number(formData.roomSize),
            hasBalcony: formData.hasBalcony,
            smokingAllowed: formData.smokingPolicy === "Smoking Allowed",
          },
        );
        setRooms((currentRooms) =>
          currentRooms.map((room) =>
            room.id === editingRoomId ? toRoomCard(data.room) : room,
          ),
        );
        setIsModalOpen(false);
      } catch (error) {
        setSubmitError(
          error.response?.data?.message ||
            error.message ||
            "Could not update room. Please try again.",
        );
      } finally {
        setIsSavingRoom(false);
      }
      return;
    } else {
      if (!hotelId) {
        setSubmitError("Hotel details are not loaded yet. Please try again.");
        return;
      }

      setIsSavingRoom(true);
      setSubmitError("");
      try {
        const room = await dispatch(
          createRoom({
            hotelId,
            name: formData.name.trim(),
            roomTypeCode: formData.type,
            description: formData.description.trim(),
            maxOccupancy: Number(formData.maxOccupancy),
            beds: Number(formData.beds),
            bedType: formData.bedType,
            pricePerNight: Number(formData.pricePerNight),
            image: formData.image,
            totalRooms: Number(formData.totalInventory),
            hasAC: formData.acEnabled,
            size: Number(formData.roomSize),
            hasBalcony: formData.hasBalcony,
            smokingAllowed: formData.smokingPolicy === "Smoking Allowed",
          }),
        ).unwrap();

        setRooms((currentRooms) => [...currentRooms, toRoomCard(room)]);
        setIsModalOpen(false);
      } catch (error) {
        setSubmitError(
          (typeof error === "string" && error) ||
            error.message ||
            "Could not create room. Please try again.",
        );
      } finally {
        setIsSavingRoom(false);
      }
      return;
    }
  };

  // Deactivate or Activate Room
  const toggleDeactivateRoom = (roomId) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, status: r.status === "Active" ? "Deactivated" : "Active" }
          : r,
      ),
    );
  };

  // Delete Room Type
  const handleDeleteRoom = (roomId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this room type?",
      )
    ) {
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
    }
  };

  // Filtered Rooms
  const filteredRooms = rooms.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {loadError && (
        <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          {loadError}
        </p>
      )}
      {roomLoadStatus === "loading" && (
        <p className="text-sm text-zinc-400">Loading rooms...</p>
      )}
      {/* 1. HEADER & ADD BUTTON */}
      <Header handleOpenCreate={handleOpenCreate} />

      {/* 2. SEARCH BAR */}
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 3. ROOMS GRID CARDS */}
      <RoomCard
        filteredRooms={filteredRooms}
        handleDeleteRoom={handleDeleteRoom}
        toggleDeactivateRoom={toggleDeactivateRoom}
        handleOpenEdit={handleOpenEdit}
      />

      {/* ------------------------------------------------------------------ */}
      {/* ADD / EDIT ROOM MODAL                                              */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && (
        <AddRoom
          editingRoomId={editingRoomId}
          setIsModalOpen={setIsModalOpen}
          setFormData={setFormData}
          handleSaveRoom={handleSaveRoom}
          formData={formData}
          isSaving={isSavingRoom}
          submitError={submitError}
        />
      )}
    </div>
  );
}
