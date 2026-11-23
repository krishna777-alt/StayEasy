import { ShieldAlert } from "lucide-react";

function DeleteHotel({ selectedHotel, setActiveModal, handleDeleteListing }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400 text-xl">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg font-serif font-bold text-zinc-100">
            Remove Listing
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Are you certain you want to remove{" "}
            <span className="text-zinc-100 font-semibold">
              {selectedHotel.name}
            </span>
            ? This action will instantly take the property offline and purge
            fraudulent or inappropriate content from the platform directory.
          </p>
        </div>

        <div className="pt-3 flex justify-end space-x-3">
          <button
            onClick={() => setActiveModal(null)}
            className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteListing(selectedHotel.id)}
            className="py-2.5 px-5 bg-rose-500 text-zinc-950 hover:bg-rose-400 rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/20"
          >
            Confirm Deletion
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHotel;
