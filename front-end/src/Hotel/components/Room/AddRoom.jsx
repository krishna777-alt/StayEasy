import { X } from "lucide-react";

function AddRoom({
  editingRoomId,
  setIsModalOpen,
  setFormData,
  handleSaveRoom,
  formData,
  isSaving,
  submitError,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <h3 className="text-xl font-serif font-bold text-zinc-100">
            {editingRoomId
              ? "Edit Room Type Configuration"
              : "Add New Room Type"}
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1 text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveRoom} className="space-y-4 text-xs">
          {submitError && (
            <p role="alert" className="rounded-xl bg-rose-500/10 p-3 text-rose-300">
              {submitError}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Room / Suite Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Presidential Overwater Villa"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Room Type Category *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Penthouse Suite">Penthouse Suite</option>
                <option value="Overwater Villa">Overwater Villa</option>
                <option value="Luxury Suite">Luxury Suite</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Beachfront Estate">Beachfront Estate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Price per Night ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="1250"
                value={formData.pricePerNight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerNight: e.target.value,
                  })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Number of Rooms in This Type *
              </label>
              <input
                type="number"
                required
                min="1"
                step="1"
                placeholder="4"
                value={formData.totalInventory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalInventory: e.target.value,
                  })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
              />
              <p className="text-[10px] text-zinc-500">
                Total physical rooms; available count is calculated for the stay dates.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Room Size *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                placeholder="240"
                value={formData.roomSize}
                onChange={(e) =>
                  setFormData({ ...formData, roomSize: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Maximum Occupancy *
              </label>
              <input
                type="number"
                required
                min="1"
                step="1"
                placeholder="2"
                value={formData.maxOccupancy}
                onChange={(e) =>
                  setFormData({ ...formData, maxOccupancy: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Bed Types *
              </label>
              <select
                required
                value={formData.bedType}
                onChange={(e) =>
                  setFormData({ ...formData, bedType: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
                <option value="Twin">Twin</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-amber-400">
                Number of Beds *
              </label>
              <input
                type="number"
                required
                min="1"
                step="1"
                value={formData.beds}
                onChange={(e) =>
                  setFormData({ ...formData, beds: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-mono text-amber-400">
              Description *
            </label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full resize-y bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Photo Upload URL */}
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-mono text-amber-400">
              Room Photo URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
            />
          </div>

          {/* Toggles Grid (AC, Balcony, Smoking) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <label className="flex items-center space-x-2.5 bg-zinc-950 border border-zinc-800 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, acEnabled: e.target.checked })
                }
                className="accent-amber-400 h-4 w-4 rounded"
              />
              <span className="font-medium text-zinc-200">AC Enabled</span>
            </label>

            <label className="flex items-center space-x-2.5 bg-zinc-950 border border-zinc-800 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasBalcony}
                onChange={(e) =>
                  setFormData({ ...formData, hasBalcony: e.target.checked })
                }
                className="accent-amber-400 h-4 w-4 rounded"
              />
              <span className="font-medium text-zinc-200">Private Balcony</span>
            </label>

            <div className="space-y-1">
              <select
                value={formData.smokingPolicy}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smokingPolicy: e.target.value,
                  })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Non-Smoking">Non-Smoking</option>
                <option value="Smoking Allowed">Smoking Allowed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-6 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Publishing..."
                : editingRoomId
                  ? "Save Changes"
                  : "Publish Room Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
