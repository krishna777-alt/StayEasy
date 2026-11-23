import { X } from "lucide-react";

function ViewProfile({ selectedUser, setActiveModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-lg">
              {selectedUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-100">
                {selectedUser.name}
              </h3>
              <p className="text-xs text-zinc-400">
                {selectedUser.id} • {selectedUser.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Grid Details */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-xl space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase">
              Email Address
            </span>
            <p className="font-semibold text-zinc-200">{selectedUser.email}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-xl space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase">
              Phone Number
            </span>
            <p className="font-semibold text-zinc-200">{selectedUser.phone}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-xl space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase">
              Registration Date
            </span>
            <p className="font-semibold text-zinc-200">
              {selectedUser.joinedDate}
            </p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-xl space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase">
              Last Activity
            </span>
            <p className="font-semibold text-zinc-200">
              {selectedUser.lastLogin}
            </p>
          </div>
        </div>

        {/* Spend & Stay Metrics */}
        <div className="bg-amber-400/10 border border-amber-400/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-zinc-400">
              Total Lifetime Spend
            </span>
            <p className="text-2xl font-extrabold text-amber-400">
              {selectedUser.totalSpent}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase text-zinc-400">
              Completed Reservations
            </span>
            <p className="text-2xl font-extrabold text-zinc-100">
              {selectedUser.totalBookings} Stays
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setActiveModal(null)}
            className="py-2.5 px-5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-xl text-xs font-semibold"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
