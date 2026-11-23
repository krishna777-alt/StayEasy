import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../../api/axios";
import { updateGuest } from "../../../features/user/guestSlice";

function UpdateUser({
  userId,
  setActiveModal,
  editForm,
  handleSaveEdit,
  setEditForm,
}) {
  const dispatch = useDispatch();
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveError("");
    setIsSaving(true);

    const roleByLabel = {
      "Standard Guest": "user",
      "VIP Guest": "user",
      "Property Owner": "hotel",
      Administrator: "admin",
    };

    try {
      await api.patch(`/admin/users/${userId}`, {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        role: roleByLabel[editForm.role] ?? editForm.role,
      });
      dispatch(updateGuest(editForm));
      handleSaveEdit(event);
    } catch (error) {
      console.error("Failed to update user:", error);
      setSaveError(
        error.response?.data?.message ||
          "Could not update user. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-100">Edit User Profile</h3>
          <button
            onClick={() => setActiveModal(null)}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {saveError && (
            <p role="alert" className="text-sm text-red-400">
              {saveError}
            </p>
          )}
          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              Full Name
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
              Email Address
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              Phone Number
            </label>
            <input
              type="text"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-400 uppercase font-semibold text-[10px]">
              User Role
            </label>
            <select
              value={editForm.role}
              onChange={(e) =>
                setEditForm({ ...editForm, role: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="Standard Guest">Standard Guest</option>
              <option value="VIP Guest">VIP Guest</option>
              <option value="Property Owner">Property Owner</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => setActiveModal(null)}
              className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-5 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-400/20"
            >
              {isSaving ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
