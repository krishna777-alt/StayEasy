import { useState, useMemo } from "react";
import {
  //   CalendarCheck,
  Search,
  Filter,
  Eye,
  //   AlertCircle,
  RotateCcw,
  //   CheckCircle2,
  //   XCircle,
  User,
  Building2,
  //   CreditCard,
  Calendar,
  X,
  ShieldAlert,
  //   ArrowUpRight,
} from "lucide-react";

// Mock Bookings Dataset
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
    status: "Confirmed", // "Confirmed" | "Pending" | "Completed" | "Disputed" | "Cancelled"
    paymentStatus: "Paid", // "Paid" | "Pending" | "Refunded"
    total: "$6,250",
    disputeReason: null,
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
    status: "Disputed",
    paymentStatus: "Paid",
    total: "$9,400",
    disputeReason:
      "Guest claims amenities listed (private thermal spa) were unavailable during stay.",
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
    disputeReason: null,
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
    disputeReason: null,
  },
];

export default function BookingManagementTab() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Active Modals State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'details' | 'dispute' | 'refund'

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

  // Handle Refund Action
  const processRefund = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: "Cancelled", paymentStatus: "Refunded" }
          : b,
      ),
    );
    setActiveModal(null);
  };

  // Resolve Dispute Action
  const resolveDispute = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: newStatus, disputeReason: null }
          : b,
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
            Reservation & Booking Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor live itineraries, handle guest disputes, oversee payment
            states, and process authorized refunds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by ID, guest, or hotel..."
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
                Pending
              </option>
              <option value="Completed" className="bg-zinc-900">
                Completed
              </option>
              <option value="Disputed" className="bg-zinc-900">
                Disputed
              </option>
              <option value="Cancelled" className="bg-zinc-900">
                Cancelled
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
                <th className="py-4 px-4">Hotel & Suite</th>
                <th className="py-4 px-4">Dates</th>
                <th className="py-4 px-4">Booking Status</th>
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
                      <p className="text-[11px] text-zinc-400">
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
                              : booking.status === "Disputed"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse"
                                : booking.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-zinc-800 text-zinc-400 border-zinc-700"
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

                        {/* Handle Dispute button if disputed */}
                        {booking.status === "Disputed" && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActiveModal("dispute");
                            }}
                            className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-lg text-[11px] font-semibold hover:bg-rose-500/30"
                            title="Handle Booking Dispute"
                          >
                            Resolve Dispute
                          </button>
                        )}

                        {/* Refund/Cancel button */}
                        {booking.paymentStatus === "Paid" &&
                          booking.status !== "Completed" && (
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setActiveModal("refund");
                              }}
                              className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-amber-400"
                              title="Process Cancellation & Refund"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
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
      {/* MODAL 1: VIEW FULL BOOKING, CUSTOMER & HOTEL INFORMATION           */}
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
                  Reservation Details
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
              {/* Customer Info Card */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <h4 className="text-[10px] uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Customer Profile
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

              {/* Hotel & Room Info Card */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <h4 className="text-[10px] uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Property & Suite
                </h4>
                <div className="space-y-1 text-zinc-300">
                  <p>
                    <strong className="text-zinc-500">Hotel Property:</strong>{" "}
                    {selectedBooking.hotel}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Suite/Room:</strong>{" "}
                    {selectedBooking.room}
                  </p>
                  <p>
                    <strong className="text-zinc-500">Stay Dates:</strong>{" "}
                    {selectedBooking.dates.checkIn} to{" "}
                    {selectedBooking.dates.checkOut}
                  </p>
                </div>
              </div>

              {/* Payment & Status Card */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Payment State
                  </span>
                  <p className="font-bold text-zinc-200">
                    {selectedBooking.paymentStatus}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Total Paid
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
      {/* MODAL 2: HANDLE BOOKING DISPUTES                                   */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "dispute" && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400 text-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Booking Dispute Resolution
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Booking ID:{" "}
                <span className="font-mono text-amber-400">
                  {selectedBooking.id}
                </span>
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-xs text-zinc-300 space-y-1">
              <span className="text-[10px] uppercase text-rose-400 font-mono font-bold block">
                Dispute Logged:
              </span>
              <p className="italic">"{selectedBooking.disputeReason}"</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => resolveDispute(selectedBooking.id, "Confirmed")}
                className="py-2.5 px-4 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-xl text-xs font-semibold"
              >
                Dismiss & Confirm Booking
              </button>
              <button
                onClick={() => processRefund(selectedBooking.id)}
                className="py-2.5 px-5 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-400/20"
              >
                Authorize Full Refund & Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: PROCESS AUTHORIZED CANCELLATIONS & REFUNDS                */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "refund" && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center text-amber-400 text-xl">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Process Cancellation & Refund
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Are you authorized to issue a refund for booking{" "}
                <span className="text-zinc-100 font-semibold">
                  {selectedBooking.id}
                </span>{" "}
                ({selectedBooking.total}) to{" "}
                <span className="text-zinc-100 font-semibold">
                  {selectedBooking.customer.name}
                </span>
                ?
              </p>
            </div>

            <div className="pt-3 flex justify-end space-x-3">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
              >
                Abort
              </button>
              <button
                onClick={() => processRefund(selectedBooking.id)}
                className="py-2.5 px-5 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-400/20"
              >
                Confirm Refund & Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
