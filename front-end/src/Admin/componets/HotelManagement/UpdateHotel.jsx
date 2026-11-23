import { X } from "lucide-react";
function UpdateHotel({
  setActiveModal,
  handleSaveEdit,
  setEditForm,
  editForm,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-lg font-serif font-bold text-zinc-100">
            Edit Hotel Listing
          </h3>
          <button
            onClick={() => setActiveModal(null)}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              Hotel Name
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              Location
            </label>
            <input
              type="text"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              Starting Rate
            </label>
            <input
              type="text"
              value={editForm.priceFrom}
              onChange={(e) =>
                setEditForm({ ...editForm, priceFrom: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              Description
            </label>
            <textarea
              rows="3"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400 resize-none"
              required
            />
          </div>

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
              className="py-2.5 px-5 bg-amber-400 text-zinc-950 font-bold rounded-xl hover:bg-amber-300 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateHotel;
