import { useState, useMemo } from "react";

import DeleteHotel from "../componets/HotelManagement/DeleteHotel";
import Ratings from "../componets/HotelManagement/Ratings";
import UpdateHotel from "../componets/HotelManagement/UpdateHotel";
import ViewDetails from "../componets/HotelManagement/ViewDetails";
import HotelTable from "../componets/HotelManagement/HotelTable";
import Header from "../componets/HotelManagement/Header";

// Mock Initial Hotels Dataset
const INITIAL_HOTELS = [
  {
    id: "HTL-101",
    name: "The Obsidian Sanctum",
    owner: "Alistair Sterling (OWN-501)",
    location: "Baa Atoll, Maldives",
    status: "Published", // "Pending Approval" | "Published" | "Suspended" | "Rejected"
    rating: 4.98,
    reviewsCount: 142,
    priceFrom: "$850 / night",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    description:
      "Ultra-luxury overwater villas nestled in private coral reefs with 24/7 butler service.",
    amenities: [
      "Private Infinity Pool",
      "Yacht Airport Transfers",
      "Undersea Wine Cellar",
      "Ayurvedic Spa",
    ],
    rooms: [
      { name: "Presidential Overwater Villa", size: "240 m²", price: "$1,250" },
      { name: "Sunset Lagoon Pavilion", size: "180 m²", price: "$980" },
    ],
    reviews: [
      {
        user: "Eleanor V.",
        rating: 5,
        comment:
          "Absolute perfection. The butler service exceeded expectations.",
      },
      {
        user: "Marcus C.",
        rating: 5,
        comment: "Stunning architecture and pristine coral reef access.",
      },
    ],
  },
  {
    id: "HTL-102",
    name: "Sterling Alpine Chalet",
    owner: "Alistair Sterling (OWN-501)",
    location: "Zermatt, Switzerland",
    status: "Pending Approval",
    rating: 0.0,
    reviewsCount: 0,
    priceFrom: "$620 / night",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    description:
      "Ski-in/ski-out luxury chalet overlooking the Matterhorn with private thermal spa.",
    amenities: [
      "Thermal Spa",
      "Ski-in/Ski-out",
      "Wood Fireplace",
      "Helipad Access",
    ],
    rooms: [{ name: "Matterhorn Suite", size: "150 m²", price: "$620" }],
    reviews: [],
  },
  {
    id: "HTL-103",
    name: "Leclair Riviera Palace",
    owner: "Beatrice Leclair (OWN-502)",
    location: "Nice, France",
    status: "Pending Approval",
    rating: 0.0,
    reviewsCount: 0,
    priceFrom: "$740 / night",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    description:
      "Historic 19th-century palace restored into a high-end luxury boutique sanctuary.",
    amenities: ["Private Beach Club", "Michelin Dining", "Valet Parking"],
    rooms: [{ name: "Palace Ocean Suite", size: "200 m²", price: "$740" }],
    reviews: [],
  },
  {
    id: "HTL-104",
    name: "Suspicious Listing Resort",
    owner: "Unknown Entity",
    location: "Fake Coordinates",
    status: "Suspended",
    rating: 1.2,
    reviewsCount: 3,
    priceFrom: "$100 / night",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    description: "Unverified property flagged by automated security system.",
    amenities: ["Basic WiFi"],
    rooms: [{ name: "Standard Room", size: "20 m²", price: "$100" }],
    reviews: [
      {
        user: "System Bot",
        rating: 1,
        comment: "Flagged as potential fraudulent listing.",
      },
    ],
  },
];

export default function HotelManagementTab() {
  const [hotels, setHotels] = useState(INITIAL_HOTELS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Active Modals State
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'details' | 'edit' | 'delete' | 'reviews'

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    priceFrom: "",
    description: "",
  });

  // Filter Hotels
  const filteredHotels = useMemo(() => {
    return hotels.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || h.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [hotels, searchQuery, statusFilter]);

  // Workflow Handlers
  const handleUpdateStatus = (hotelId, newStatus) => {
    setHotels((prev) =>
      prev.map((h) => (h.id === hotelId ? { ...h, status: newStatus } : h)),
    );
  };

  const handleOpenEdit = (hotel) => {
    setSelectedHotel(hotel);
    setEditForm({
      name: hotel.name,
      location: hotel.location,
      priceFrom: hotel.priceFrom,
      description: hotel.description,
    });
    setActiveModal("edit");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setHotels((prev) =>
      prev.map((h) => (h.id === selectedHotel.id ? { ...h, ...editForm } : h)),
    );
    setActiveModal(null);
  };

  const handleDeleteListing = (hotelId) => {
    setHotels((prev) => prev.filter((h) => h.id !== hotelId));
    setActiveModal(null);
  };

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* 1. HEADER & CONTROLS */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStatusFilter={setStatusFilter}
      />
      {/* 2. HOTELS DATA TABLE / GRID */}
      <HotelTable
        filteredHotels={filteredHotels}
        setActiveModal={setActiveModal}
        setSelectedHotel={setSelectedHotel}
        handleOpenEdit={handleOpenEdit}
        handleUpdateStatus={handleUpdateStatus}
      />

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: VIEW FULL HOTEL DETAILS (Photos, Amenities, Rooms)        */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "details" && selectedHotel && (
        <ViewDetails
          selectedHotel={selectedHotel}
          setActiveModal={setActiveModal}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: EDIT HOTEL INFORMATION (Authorized)                       */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "edit" && selectedHotel && (
        <UpdateHotel
          setActiveModal={setActiveModal}
          handleSaveEdit={handleSaveEdit}
          setEditForm={setEditForm}
          editForm={editForm}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: MONITOR RATINGS & REVIEWS                                 */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "reviews" && selectedHotel && (
        <Ratings
          setActiveModal={setActiveModal}
          selectedHotel={selectedHotel}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 4: REMOVE FRAUDULENT / INAPPROPRIATE LISTINGS                */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "delete" && selectedHotel && (
        <DeleteHotel
          selectedHotel={selectedHotel}
          setActiveModal={setActiveModal}
          handleDeleteListing={handleDeleteListing}
        />
      )}
    </div>
  );
}
