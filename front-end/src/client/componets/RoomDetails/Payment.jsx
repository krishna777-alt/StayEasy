import { Lock, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function getTodayDateInputValue() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDaysToDate(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10);
}

const guestCountsBySelection = {
  "1 Adult": { adults: 1, children: 0 },
  "2 Adults": { adults: 2, children: 0 },
  "2 Adults, 1 Child": { adults: 2, children: 1 },
};

export default function Payment({
  room,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  roomsBooked,
  setRoomsBooked,
  availableRooms,
  availabilityLoading,
  availabilityError,
  nightsCount,
  totalPrice,
}) {
  const navigate = useNavigate();
  const selectableRooms = Math.min(
    Math.max(0, Number(availableRooms) || 0),
    10,
  );
  const selectedGuestCounts =
    guestCountsBySelection[guests] || guestCountsBySelection["1 Adult"];
  const guestCapacity = (Number(room.maxOccupancy) || 1) * roomsBooked;
  const selectedGuests =
    selectedGuestCounts.adults + selectedGuestCounts.children <= guestCapacity
      ? guests
      : "1 Adult";
  const minCheckOut = checkIn
    ? addDaysToDate(checkIn, 1)
    : getTodayDateInputValue();

  function handleCheckInChange(event) {
    const nextCheckIn = event.target.value;
    setCheckIn(nextCheckIn);
    if (nextCheckIn && (!checkOut || checkOut <= nextCheckIn)) {
      setCheckOut(addDaysToDate(nextCheckIn, 1));
    }
  }

  function proceedToCheckout() {
    if (
      !room.id ||
      !checkIn ||
      !checkOut ||
      nightsCount < 1 ||
      availabilityError ||
      roomsBooked > selectableRooms
    ) {
      return;
    }

    const guestCounts = guestCountsBySelection[selectedGuests];

    const search = new URLSearchParams({
      roomId: room.id,
      checkIn,
      checkOut,
      roomsBooked: String(roomsBooked),
      adults: String(guestCounts.adults),
      children: String(guestCounts.children),
    });

    navigate(`/payment?${search.toString()}`, { state: { room } });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-zinc-100">
          Book This Room
        </h2>

        <div className="divide-y divide-zinc-800/80 overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950">
          <div className="p-3.5">
            <label
              htmlFor="booking-check-in"
              className="mb-1 block font-mono text-[10px] uppercase text-zinc-500"
            >
              Check In
            </label>
            <div className="flex items-center space-x-2 text-xs text-zinc-200">
              <span className="text-amber-400">📅</span>
              <input
                id="booking-check-in"
                type="date"
                value={checkIn}
                min={getTodayDateInputValue()}
                onChange={handleCheckInChange}
                className="w-full cursor-pointer bg-transparent font-mono text-xs text-zinc-100 [color-scheme:dark] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5">
            <label
              htmlFor="booking-check-out"
              className="mb-1 block font-mono text-[10px] uppercase text-zinc-500"
            >
              Check Out
            </label>
            <div className="flex items-center space-x-2 text-xs text-zinc-200">
              <span className="text-amber-400">📅</span>
              <input
                id="booking-check-out"
                type="date"
                value={checkOut}
                min={minCheckOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className="w-full cursor-pointer bg-transparent font-mono text-xs text-zinc-100 [color-scheme:dark] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5">
            <label className="mb-1 block font-mono text-[10px] uppercase text-zinc-500">
              Rooms
            </label>
            <select
              value={roomsBooked}
              disabled={availabilityLoading || selectableRooms === 0}
              onChange={(event) => {
                const nextRoomsBooked = Number(event.target.value);
                setRoomsBooked(nextRoomsBooked);
                const currentGuestCounts =
                  guestCountsBySelection[selectedGuests];
                if (
                  currentGuestCounts.adults + currentGuestCounts.children >
                  (Number(room.maxOccupancy) || 1) * nextRoomsBooked
                ) {
                  setGuests("1 Adult");
                }
              }}
              className="w-full cursor-pointer bg-transparent text-xs text-zinc-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {selectableRooms === 0 ? (
                <option value={roomsBooked}>No rooms available</option>
              ) : (
                Array.from({ length: selectableRooms }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count} className="bg-zinc-900">
                      {count} {count === 1 ? "room" : "rooms"}
                    </option>
                  ),
                )
              )}
            </select>
          </div>

          <div className="relative p-3.5">
            <label className="mb-1 block font-mono text-[10px] uppercase text-zinc-500">
              Guests
            </label>
            <div className="flex items-center justify-between text-xs text-zinc-200">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-amber-400" />
                <select
                  value={selectedGuests}
                  onChange={(event) => setGuests(event.target.value)}
                  className="cursor-pointer bg-transparent pr-4 text-xs text-zinc-100 focus:outline-none"
                >
                  <option value="1 Adult" className="bg-zinc-900">
                    1 Adult
                  </option>
                  <option
                    value="2 Adults"
                    disabled={(Number(room.maxOccupancy) || 1) * roomsBooked < 2}
                    className="bg-zinc-900"
                  >
                    2 Adults
                  </option>
                  <option
                    value="2 Adults, 1 Child"
                    disabled={(Number(room.maxOccupancy) || 1) * roomsBooked < 3}
                    className="bg-zinc-900"
                  >
                    2 Adults, 1 Child
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {availabilityError ? (
          <p role="alert" className="text-xs text-rose-300">
            {availabilityError}
          </p>
        ) : availabilityLoading ? (
          <p role="status" className="text-xs text-zinc-400">
            Checking availability for your stay...
          </p>
        ) : (
          <p className="text-xs text-zinc-400">
            {selectableRooms} room{selectableRooms === 1 ? "" : "s"} available
            for these dates
          </p>
        )}

        <div className="space-y-2 pt-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-400">Price Details</span>
            <span className="font-mono font-bold text-zinc-200">
              ₹{room.pricePerNight.toLocaleString("en-IN")}{" "}
              <span className="text-[10px] font-normal text-zinc-500">
                / night
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Nights</span>
            <span className="font-mono text-zinc-200">{nightsCount}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Rooms</span>
            <span className="font-mono text-zinc-200">{roomsBooked}</span>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
            <span className="font-serif text-sm font-bold text-zinc-100">
              Total
            </span>
            <span className="font-serif text-2xl font-extrabold text-amber-400">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={proceedToCheckout}
          disabled={
            !room.id ||
            !checkIn ||
            !checkOut ||
            nightsCount < 1 ||
            availabilityLoading ||
            Boolean(availabilityError) ||
            selectableRooms < 1 ||
            roomsBooked > selectableRooms
          }
          className="flex w-full items-center justify-center space-x-2 rounded-xl bg-amber-400 py-3.5 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Lock className="h-4 w-4" />
          <span>Continue to Checkout</span>
        </button>

        <div className="flex items-center justify-center space-x-1.5 font-mono text-[10px] text-zinc-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Room availability is checked again when booking.</span>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md">
        <h3 className="font-serif text-sm font-bold text-zinc-100">
          Payment status
        </h3>
        <p className="text-xs leading-5 text-zinc-400">
          Choose a payment method on the next step. This project records a
          pending payment only; it does not collect card details or charge you.
        </p>
      </div>
    </div>
  );
}