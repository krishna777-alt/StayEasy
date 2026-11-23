import { useState, useMemo } from "react";
import {
  //   CalendarCheck,
  Search,
  Filter,
  Eye,
  //   CheckCircle2,
  //   XCircle,
  RotateCcw,
  User,
  Building2,
  Calendar,
  X,
  //   ShieldAlert,
  //   BedDouble,
} from "lucide-react";

// Mock Initial Bookings Dataset
const INITIAL_BOOKINGS = [
  {
    id: "BK-8821",
    customer: {
      name: "Eleanor Vance",
      email: "e.vance@sovereign.com",
      phone: "+1 (555) 234-5678",
      tier: "VIP Member",
    },
    hotel: "The Obsidian Sanctum",
    room: "Presidential Overwater Villa",
    dates: { checkIn: "2026-09-10", checkOut: "2026-09-15" },
    status: "Confirmed", // "Confirmed" | "Pending" | "Completed" | "Cancelled" | "Rejected"
    paymentStatus: "Paid", // "Paid" | "Pending" | "Refunded"
    total: "$6,250",
  },
  {
    id: "BK-9104",
    customer: {
      name: "Alexander Wright",
      email: "a.wright@architects.io",
      phone: "+44 20 7946 0192",
      tier: "Standard",
    },
    hotel: "Aura Chalet & Alpine Spa",
    room: "Matterhorn Suite",
    dates: { checkIn: "2026-12-20", checkOut: "2026-12-28" },
    status: "Pending", // Requires manual confirmation or rejection
    paymentStatus: "Pending",
    total: "$9,400",
  },
  {
    id: "BK-7110",
    customer: {
      name: "Sophia Martinez",
      email: "sophia.m@luxe-travel.es",
      phone: "+34 91 123 4567",
      tier: "VIP Member",
    },
    hotel: "The Midnight Tower Tokyo",
    room: "Skyline Penthouse",
    dates: { checkIn: "2026-05-02", checkOut: "2026-05-06" },
    status: "Completed",
    paymentStatus: "Paid",
    total: "$3,450",
  },
  {
    id: "BK-9942",
    customer: {
      name: "Marcus Chen",
      email: "marcus.chen@horizon.cn",
      phone: "+86 21 6123 4567",
      tier: "Standard",
    },
    hotel: "Villa Celestial Santorini",
    room: "Caldera View Suite",
    dates: { checkIn: "2026-10-01", checkOut: "2026-10-05" },
    status: "Cancelled",
    paymentStatus: "Refunded",
    total: "$2,960",
  },
];

export default function BookingManagementTab() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Active Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'details' | 'cancel' | 'update'
  const [newStatusInput, setNewStatusInput] = useState("Confirmed");

  // Filter Bookings logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.hotel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  // Confirm Pending Request
  const handleConfirmBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: "Confirmed", paymentStatus: "Paid" }
          : b,
      ),
    );
  };

  // Reject Eligible Pending Request
  const handleRejectBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Rejected" } : b)),
    );
  };

  // Handle Cancellation Request & Refund
  const handleProcessCancellation = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: "Cancelled", paymentStatus: "Refunded" }
          : b,
      ),
    );
    setActiveModal(null);
  };

  // Update Reservation Status Custom
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id ? { ...b, status: newStatusInput } : b,
      ),
    );
    setActiveModal(null);
  };

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* 1. HEADER & SEARCH / FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Hotel Booking Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Review guest itineraries, confirm manual bookings, process
            cancellations, and update reservation states.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by booking ID, guest, hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-zinc-900">
                All Statuses
              </option>
              <option value="Confirmed" className="bg-zinc-900">
                Confirmed
              </option>
              <option value="Pending" className="bg-zinc-900">
                Pending Review
              </option>
              <option value="Completed" className="bg-zinc-900">
                Completed
              </option>
              <option value="Cancelled" className="bg-zinc-900">
                Cancelled
              </option>
              <option value="Rejected" className="bg-zinc-900">
                Rejected
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. BOOKINGS DATA TABLE */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-amber-400 uppercase tracking-wider font-mono border-b border-zinc-800 text-[10px]">
              <tr>
                <th className="py-4 px-6">Booking ID / Guest</th>
                <th className="py-4 px-4">Hotel & Selected Room</th>
                <th className="py-4 px-4">Check-In / Out Dates</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4 text-right">Total</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-zinc-500">
                    No bookings found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    {/* Booking ID & Guest Info */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-mono font-bold text-amber-400">
                          {booking.id}
                        </span>
                        <p className="font-medium text-zinc-100">
                          {booking.customer.name}
                        </p>
                        <span className="text-[10px] text-zinc-500">
                          {booking.customer.email}
                        </span>
                      </div>
                    </td>

                    {/* Hotel & Room */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-zinc-200">
                        {booking.hotel}
                      </p>
                      <p className="text-[11px] text-amber-400/90 font-medium">
                        {booking.room}
                      </p>
                    </td>

                    {/* Dates */}
                    <td className="py-4 px-4 font-mono text-zinc-300">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {booking.dates.checkIn} → {booking.dates.checkOut}
                        </span>
                      </div>
                    </td>

                    {/* Booking Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          booking.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : booking.status === "Completed"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : booking.status === "Pending"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                                : booking.status === "Cancelled"
                                  ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                                  : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          booking.paymentStatus === "Paid"
                            ? "text-emerald-400 bg-emerald-950/40"
                            : booking.paymentStatus === "Refunded"
                              ? "text-blue-400 bg-blue-950/40"
                              : "text-amber-400 bg-amber-950/40"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 text-right font-serif font-bold text-amber-400">
                      {booking.total}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {/* Confirm if Pending */}
                        {booking.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleConfirmBooking(booking.id)}
                              className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-[11px] font-semibold hover:bg-emerald-500/30"
                              title="Confirm Manual Booking"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleRejectBooking(booking.id)}
                              className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-lg text-[11px] font-semibold hover:bg-rose-500/30"
                              title="Reject Pending Request"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {/* View Details */}
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setActiveModal("details");
                          }}
                          className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100"
                          title="View Customer & Room Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Update Status */}
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setNewStatusInput(booking.status);
                            setActiveModal("update");
                          }}
                          className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-amber-400"
                          title="Update Reservation Status"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: VIEW FULL DETAILS (Customer, Room, Dates)                 */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "details" && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="font-mono text-xs text-amber-400">
                  {selectedBooking.id}
                </span>
                <h3 className="text-lg font-serif font-bold text-zinc-100">
                  Booking Itinerary Summary
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer Details Card */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <h4 className="text-[10px] uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Customer Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-zinc-300">
                  <p>
                    <strong className="text-zinc-500">Name:</strong>{" "}
                    {selectedBooking.customer.name}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Tier:</strong>{" "}
                    {selectedBooking.customer.tier}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Email:</strong>{" "}
                    {selectedBooking.customer.email}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Phone:</strong>{" "}
                    {selectedBooking.customer.phone}
                  </p>
                </div>
              </div>

              {/* Hotel & Selected Room Card */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <h4 className="text-[10px] uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Property & Selected Room
                </h4>
                <div className="space-y-1 text-zinc-300">
                  <p>
                    <strong className="text-zinc-500">Hotel:</strong>{" "}
                    {selectedBooking.hotel}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Selected Room:</strong>{" "}
                    <span className="text-amber-400 font-semibold">
                      {selectedBooking.room}
                    </span>
                  </p>
                  <p>
                    <strong className="text-zinc-500">Check-In Date:</strong>{" "}
                    {selectedBooking.dates.checkIn}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Check-Out Date:</strong>{" "}
                    {selectedBooking.dates.checkOut}
                  </p>
                </div>
              </div>

              {/* Payment Status Card */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Payment Status
                  </span>
                  <p className="font-bold text-zinc-200">
                    {selectedBooking.paymentStatus}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Total Rate
                  </span>
                  <p className="text-xl font-serif font-bold text-amber-400">
                    {selectedBooking.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2 px-5 bg-zinc-800 text-zinc-200 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: UPDATE RESERVATION STATUS / HANDLE CANCELLATION           */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "update" && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Update Reservation Status
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <p className="text-zinc-400">
                Modify operational state for booking{" "}
                <strong className="text-amber-400 font-mono">
                  {selectedBooking.id}
                </strong>{" "}
                ({selectedBooking.customer.name}):
              </p>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-amber-400">
                  New Reservation Status
                </label>
                <select
                  value={newStatusInput}
                  onChange={(e) => setNewStatusInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled (Trigger Refund)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {newStatusInput === "Cancelled" && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-300 text-[11px]">
                  ⚠️ Selecting Cancelled will automatically process an
                  authorized refund for {selectedBooking.total}.
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    if (newStatusInput === "Cancelled") {
                      handleProcessCancellation(selectedBooking.id);
                    }
                  }}
                  className="py-2.5 px-5 bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 rounded-xl text-xs transition-all shadow-lg shadow-amber-400/20"
                >
                  Save Status Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
