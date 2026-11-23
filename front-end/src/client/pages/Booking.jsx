import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hotel,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";

const pageSize = 50;

const bookingStatusDetails = {
  pending: {
    label: "Pending",
    icon: Clock3,
    styles: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    styles: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  },
  checked_in: {
    label: "Checked in",
    icon: CheckCircle2,
    styles: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    styles: "border-zinc-700 bg-zinc-800 text-zinc-300",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    styles: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    styles: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  },
};

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatAmount(value, currency) {
  const amount = Number(value);
  const currencyCode =
    typeof currency === "string" && /^[A-Z]{3}$/.test(currency)
      ? currency
      : "INR";

  if (!Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(amount);
}

function canCancelBooking(booking) {
  return (
    ["pending", "confirmed"].includes(booking.status) &&
    ["pending", "failed"].includes(booking.paymentStatus)
  );
}

export default function BookingPage() {
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState(null);
  const [cancelConfirmationId, setCancelConfirmationId] = useState("");
  const [cancellingId, setCancellingId] = useState("");
  const [cancelError, setCancelError] = useState("");

  const requestKey = `${page}:${retryCount}`;
  const isCurrentResult = result?.key === requestKey;
  const bookings = isCurrentResult ? result.bookings : [];
  const total = isCurrentResult ? result.total : 0;
  const error = isCurrentResult ? result.error : "";
  const isLoading = !isCurrentResult;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    const controller = new AbortController();

    async function loadBookings() {
      try {
        const response = await api.get("/bookings", {
          params: { page },
          signal: controller.signal,
        });
        const responseBookings = response.data?.bookings;
        if (!Array.isArray(responseBookings)) {
          throw new Error("The bookings response was invalid.");
        }

        setResult({
          key: requestKey,
          bookings: responseBookings,
          total: Number.isSafeInteger(response.data.total)
            ? response.data.total
            : responseBookings.length,
          error: "",
        });
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setResult({
            key: requestKey,
            bookings: [],
            total: 0,
            error:
              requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load your bookings.",
          });
        }
      }
    }

    loadBookings();
    return () => controller.abort();
  }, [page, requestKey]);

  async function cancelBooking(bookingId) {
    setCancelError("");
    setCancellingId(bookingId);

    try {
      const response = await api.patch(
        `/bookings/${encodeURIComponent(bookingId)}/cancel`,
        { reason: "Cancelled by customer" },
      );
      const updatedBooking = response.data?.booking;
      if (!updatedBooking) {
        throw new Error("The cancellation response was invalid.");
      }

      setResult((currentResult) => {
        if (currentResult?.key !== requestKey) return currentResult;
        return {
          ...currentResult,
          bookings: currentResult.bookings.map((booking) =>
            String(booking._id) === String(bookingId)
              ? {
                  ...booking,
                  ...updatedBooking,
                  hotel: booking.hotel,
                  room: booking.room,
                  payment: booking.payment,
                }
              : booking,
          ),
        };
      });
      setCancelConfirmationId("");
    } catch (requestError) {
      setCancelError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to cancel this booking.",
      );
    } finally {
      setCancellingId("");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/hotels"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Explore hotels
        </Link>

        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
              StayEasy
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              Your bookings
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Review your stays, payment status, and booking references.
            </p>
          </div>
          <Link
            to="/hotels"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
          >
            Book a stay
          </Link>
        </header>

        {cancelError && (
          <p
            className="mb-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
            role="alert"
          >
            {cancelError}
          </p>
        )}

        {error ? (
          <section
            className="rounded-3xl border border-rose-500/30 bg-zinc-900 p-8 text-center"
            role="alert"
          >
            <p className="text-sm text-rose-200">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-400 hover:text-amber-200"
            >
              Try again
            </button>
          </section>
        ) : isLoading ? (
          <section
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center text-sm text-zinc-400"
            role="status"
          >
            Loading your bookings...
          </section>
        ) : bookings.length === 0 ? (
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
              <CalendarDays className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold">
              No bookings yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Once you book a room, your stay details and payment status will
              appear here.
            </p>
            <Link
              to="/hotels"
              className="mt-6 inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
            >
              Find a hotel
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between text-sm text-zinc-400">
              <p>
                {total} booking{total === 1 ? "" : "s"}
              </p>
              <p>
                Page {page} of {pageCount}
              </p>
            </div>

            <div className="space-y-5">
              {bookings.map((booking) => {
                const status =
                  bookingStatusDetails[booking.status] ||
                  bookingStatusDetails.pending;
                const StatusIcon = status.icon;
                const hotelName = booking.hotel?.name || "Hotel";
                const roomName =
                  booking.room?.name || booking.room?.roomTypeCode || "Room";
                const guestCount =
                  (Number(booking.guests?.adults) || 0) +
                  (Number(booking.guests?.children) || 0);

                return (
                  <article
                    key={booking._id}
                    className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/10"
                  >
                    <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row">
                      {booking.room?.image ? (
                        <img
                          src={booking.room.image}
                          alt={roomName}
                          className="h-48 w-full rounded-2xl object-cover md:h-36 md:w-48"
                        />
                      ) : (
                        <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500 md:w-48">
                          <Hotel className="h-8 w-8" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h2 className="font-serif text-xl font-bold">
                              {hotelName}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-300">
                              {roomName}
                            </p>
                            {booking.hotel?.location && (
                              <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                                <MapPin className="h-3.5 w-3.5" />
                                {booking.hotel.location}
                              </p>
                            )}
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.styles}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-xs text-zinc-500">Check-in</p>
                            <p className="mt-1 text-sm font-medium">
                              {formatDate(booking.checkInDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">Check-out</p>
                            <p className="mt-1 text-sm font-medium">
                              {formatDate(booking.checkOutDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">Stay</p>
                            <p className="mt-1 text-sm font-medium">
                              {booking.nights} night
                              {booking.nights === 1 ? "" : "s"}
                              {" · "}
                              {booking.roomsBooked} room
                              {booking.roomsBooked === 1 ? "" : "s"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">Guests</p>
                            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                              <Users className="h-4 w-4 text-zinc-500" />
                              {guestCount} guest{guestCount === 1 ? "" : "s"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-zinc-800 bg-zinc-950/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                        <p className="text-zinc-400">
                          Reference{" "}
                          <span className="font-mono font-semibold text-zinc-200">
                            {booking.bookingCode || "—"}
                          </span>
                        </p>
                        <p className="text-zinc-400">
                          Payment{" "}
                          <span className="font-semibold capitalize text-zinc-200">
                            {String(booking.paymentStatus || "pending").replaceAll(
                              "_",
                              " ",
                            )}
                          </span>
                        </p>
                        <p className="text-zinc-400">
                          Total{" "}
                          <span className="font-semibold text-amber-200">
                            {formatAmount(booking.totalAmount, booking.currency)}
                          </span>
                        </p>
                      </div>

                      {canCancelBooking(booking) &&
                        (cancelConfirmationId === String(booking._id) ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-xs text-zinc-400">
                              Cancel this booking?
                            </span>
                            <button
                              type="button"
                              disabled={cancellingId === String(booking._id)}
                              onClick={() => cancelBooking(String(booking._id))}
                              className="rounded-lg bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/25 disabled:opacity-50"
                            >
                              {cancellingId === String(booking._id)
                                ? "Cancelling..."
                                : "Confirm cancel"}
                            </button>
                            <button
                              type="button"
                              disabled={Boolean(cancellingId)}
                              onClick={() => setCancelConfirmationId("")}
                              className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-zinc-500 disabled:opacity-50"
                            >
                              Keep booking
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setCancelError("");
                              setCancelConfirmationId(String(booking._id));
                            }}
                            className="w-fit rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-rose-400/50 hover:text-rose-200"
                          >
                            Cancel booking
                          </button>
                        ))}
                    </div>
                  </article>
                );
              })}
            </div>

            {pageCount > 1 && (
              <div className="mt-7 flex justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= pageCount}
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}