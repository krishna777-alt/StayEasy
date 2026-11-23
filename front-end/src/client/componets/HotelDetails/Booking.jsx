import {
  ArrowUpRight,
  CalendarDays,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
// import { formatPrice } from "../../../utils/helpers";

function Booking({
  hotel,
  checkIn,
  checkOut,
  guests,
  setCheckIn,
  setCheckOut,
  setGuests,
  formatPrice,
}) {
  return (
    <aside className="h-fit lg:sticky lg:top-28">
      <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-b from-[#191713] to-[#111113] p-6 shadow-2xl shadow-black/30">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Your escape awaits
          </span>
          <Sparkles size={17} className="text-amber-400" />
        </div>

        <div className="mb-6">
          <p className="text-xs text-zinc-500">Rooms starting from</p>
          <div className="mt-1 flex items-end gap-2">
            <h3 className="font-serif text-4xl text-white">
              {formatPrice(hotel.price)}
            </h3>
            <span className="mb-1 text-xs text-zinc-500">/ night</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs text-zinc-400">
              Check-in date
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <CalendarDays size={17} className="text-amber-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-zinc-400">
              Check-out date
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <CalendarDays size={17} className="text-amber-400" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || undefined}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-zinc-400">Guests</label>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <span className="flex items-center gap-3 text-sm text-white">
                <Users size={17} className="text-amber-400" />
                {guests} Adults
              </span>
              <div className="flex items-center gap-3">
                <button
                  disabled={guests <= 1}
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="rounded-full border border-white/10 p-1.5 text-white disabled:opacity-30"
                >
                  <Minus size={13} />
                </button>
                <button
                  disabled={guests >= 10}
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="rounded-full border border-white/10 p-1.5 text-white disabled:opacity-30"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (!checkIn || !checkOut) {
              alert("Please select your check-in and check-out dates.");
              return;
            }

            if (new Date(checkOut) <= new Date(checkIn)) {
              alert("Check-out must be after check-in.");
              return;
            }

            document
              .getElementById("rooms")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-4 text-sm font-bold text-black transition hover:bg-amber-300"
        >
          Check Availability
          <ArrowUpRight size={17} />
        </button>

        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-zinc-500">
          <ShieldCheck size={14} className="text-amber-400" />
          Secure booking · No hidden charges
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-xs font-medium text-white">Need assistance?</p>
          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Our concierge team is available around the clock to help you.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            Contact concierge →
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Booking;
