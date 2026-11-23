import { Calendar, X } from "lucide-react";

function BookingHistory({ selectedUser, setActiveModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-md h-full p-6 space-y-6 overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Booking History</h3>
            <p className="text-xs text-zinc-400">
              {selectedUser.name} ({selectedUser.id})
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedUser.bookingHistory.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs">
            No prior or active reservations recorded for this account.
          </div>
        ) : (
          <div className="space-y-4">
            {selectedUser.bookingHistory.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {item.id}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      item.status === "Confirmed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : item.status === "Completed"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-zinc-100">
                  {item.hotel}
                </h4>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />{" "}
                    {item.dates}
                  </span>
                  <span className="font-bold text-zinc-200">{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
