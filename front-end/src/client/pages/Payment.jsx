import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { api } from "../../api/axios";
import PaymentStatus from "../componets/PymentStatus";

const paymentMethods = [
  { value: "card", label: "Credit or debit card" },
  { value: "upi", label: "UPI" },
  { value: "google_pay", label: "Google Pay" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "bank_transfer", label: "Bank transfer" },
];

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function formatDate(value) {
  if (!value) return "Not selected";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? "Not selected"
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function parseCount(value, fallback) {
  const count = Number(value);
  return Number.isSafeInteger(count) && count >= fallback ? count : fallback;
}

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId =
    searchParams.get("roomId") || location.state?.room?.id || "";
  const checkInDate = searchParams.get("checkIn") || "";
  const checkOutDate = searchParams.get("checkOut") || "";
  const adults = parseCount(searchParams.get("adults"), 1);
  const children = parseCount(searchParams.get("children"), 0);
  const roomsBooked = Math.min(
    10,
    parseCount(searchParams.get("roomsBooked"), 1),
  );

  const [room, setRoom] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  useEffect(() => {
    if (!roomId) return undefined;

    const controller = new AbortController();
    async function loadRoom() {
      try {
        const response = await api.get(
          `/hotels/room/${encodeURIComponent(roomId)}`,
          {
            params: { checkInDate, checkOutDate },
            signal: controller.signal,
          },
        );
        if (!response.data?.room) {
          throw new Error("Room details were not found.");
        }
        setRoom(response.data.room);
        setLoadError("");
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error.response?.data?.message ||
              error.message ||
              "Unable to load room details.",
          );
        }
      }
    }

    loadRoom();
    return () => controller.abort();
  }, [roomId, checkInDate, checkOutDate]);

  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = Date.parse(`${checkInDate}T00:00:00.000Z`);
    const checkOut = Date.parse(`${checkOutDate}T00:00:00.000Z`);
    const duration = (checkOut - checkIn) / 86_400_000;
    return Number.isInteger(duration) && duration > 0 ? duration : 0;
  }, [checkInDate, checkOutDate]);

  const estimatedTotal =
    nights > 0 ? Number(room?.pricePerNight || 0) * nights * roomsBooked : 0;

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (!roomId || !checkInDate || !checkOutDate || nights < 1) {
      setSubmitError("Choose valid check-in and check-out dates before continuing.");
      return;
    }
    if (Number(room?.availableRooms) < roomsBooked) {
      setSubmitError(
        `Only ${Number(room?.availableRooms) || 0} rooms are available for these dates.`,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/bookings", {
        roomId,
        checkInDate,
        checkOutDate,
        roomsBooked,
        guests: { adults, children },
        paymentMethod,
      });
      setCreatedBooking(response.data);
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Unable to create your booking. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!roomId) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-zinc-950 px-5">
        <div className="max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-zinc-100">
            Checkout details missing
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Select a room and stay dates before opening checkout.
          </p>
          <button
            type="button"
            onClick={() => navigate("/hotels")}
            className="mt-6 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 hover:bg-amber-300"
          >
            Explore hotels
          </button>
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main
        className="flex min-h-[60vh] items-center justify-center bg-zinc-950 px-5"
        role="alert"
      >
        <div className="max-w-lg rounded-3xl border border-rose-900/70 bg-zinc-900 p-8 text-center">
          <p className="text-sm text-rose-200">{loadError}</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main
        className="flex min-h-[60vh] items-center justify-center bg-zinc-950 text-sm text-zinc-400"
        role="status"
      >
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Loading checkout...
      </main>
    );
  }

  const roomImage = room.image || room.photos?.[0];
  const guestCount = adults + children;

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to room
        </button>

        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
            StayEasy checkout
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
            Confirm your stay
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Review your reservation details and choose a payment method.
          </p>
        </div>

        {createdBooking ? (
          <section
            className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/30 bg-zinc-900 p-8 text-center shadow-2xl"
            role="status"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold">
              Booking request saved
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Booking reference:{" "}
              <span className="font-mono font-bold text-amber-300">
                {createdBooking.booking?.bookingCode || "Created"}
              </span>
            </p>
            <div className="mt-4 text-left">
              <PaymentStatus
                active={Boolean(createdBooking)}
                inline
                status={createdBooking.payment?.status || "pending"}
                bookingCode={createdBooking.booking?.bookingCode}
              />
            </div>
            <p className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-100">
              Payment is pending. This project stores the payment record only;
              no money was charged.
            </p>
            <button
              type="button"
              onClick={() => navigate("/hotels")}
              className="mt-7 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
            >
              Continue exploring
            </button>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <section className="space-y-6">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
                <h2 className="text-lg font-bold">Payment method</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Select a method to store with your pending payment record.
                </p>

                <fieldset className="mt-5 space-y-3">
                  <legend className="sr-only">Choose a payment method</legend>
                  {paymentMethods.map((method) => (
                    <label
                      key={method.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                        paymentMethod === method.value
                          ? "border-amber-400/70 bg-amber-400/5"
                          : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(event) => setPaymentMethod(event.target.value)}
                        className="accent-amber-400"
                      />
                      <CreditCard className="h-4 w-4 text-amber-300" />
                      <span className="text-sm font-medium text-zinc-200">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </fieldset>

                <div className="mt-5 flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-100">
                  <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    No card number or banking credentials are requested or
                    stored. A real charge is not processed in this project.
                  </p>
                </div>
              </div>

              {submitError && (
                <p
                  className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                  role="alert"
                >
                  {submitError}
                </p>
              )}
            </section>

            <aside className="h-fit rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
              <h2 className="text-lg font-bold">Booking summary</h2>
              <div className="mt-5 flex gap-4">
                {roomImage ? (
                  <img
                    src={roomImage}
                    alt={room.name}
                    className="h-24 w-28 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-28 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{room.name}</p>
                  <p className="mt-1 truncate text-sm text-zinc-400">
                    {room.hotel?.name || room.roomTypeCode || "StayEasy room"}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {inr.format(Number(room.pricePerNight) || 0)} / night
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 border-t border-zinc-800 pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Check-in</dt>
                  <dd>{formatDate(checkInDate)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Check-out</dt>
                  <dd>{formatDate(checkOutDate)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Guests</dt>
                  <dd>
                    {guestCount} guest{guestCount === 1 ? "" : "s"}
                    {children > 0 && ` (${children} child${children === 1 ? "" : "ren"})`}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Rooms</dt>
                  <dd>{roomsBooked}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Nights</dt>
                  <dd>{nights || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Available for these dates</dt>
                  <dd>{room.availableRooms}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Room subtotal</dt>
                  <dd>{inr.format(estimatedTotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-400">Taxes and fees</dt>
                  <dd>{inr.format(0)}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-5">
                <span className="font-serif text-lg font-bold">Estimated total</span>
                <span className="font-serif text-2xl font-extrabold text-amber-300">
                  {inr.format(estimatedTotal)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Final amount is calculated by the server from the room price.
              </p>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !nights ||
                  Number(room.availableRooms) < roomsBooked
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/10 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber-400"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Saving booking...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Confirm booking
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
                You will not be charged. This creates a pending booking and
                payment record.
              </p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}