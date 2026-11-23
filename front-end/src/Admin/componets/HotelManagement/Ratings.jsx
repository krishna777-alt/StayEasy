import { X, Star } from "lucide-react";

function Ratings({ setActiveModal, selectedHotel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-serif font-bold text-zinc-100">
              Guest Ratings & Reviews
            </h3>
            <p className="text-xs text-zinc-400">{selectedHotel.name}</p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedHotel.reviews.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 text-xs">
            No guest reviews recorded yet for this property.
          </div>
        ) : (
          <div className="space-y-3">
            {selectedHotel.reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-200">
                    {rev.user}
                  </span>
                  <span className="flex items-center text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400 mr-1" />{" "}
                    {rev.rating}/5
                  </span>
                </div>
                <p className="text-xs text-zinc-400 italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setActiveModal(null)}
            className="py-2 px-5 bg-zinc-800 text-zinc-200 rounded-xl text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ratings;
