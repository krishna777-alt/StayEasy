import { Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

function Reviews({ hotel }) {
  return (
    <section className="mb-16">
      <SectionTitle
        eyebrow="Guest experiences"
        title="Words from our guests."
      />

      <div className="mb-6 flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111113] p-6">
        <div className="text-center">
          <p className="font-serif text-5xl text-amber-400">{hotel.rating}</p>
          <div className="mt-2 flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                className={
                  star <= Math.round(hotel.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-600"
                }
              />
            ))}
          </div>
        </div>
        <div className="border-l border-white/10 pl-5">
          <p className="font-medium text-white">
            {hotel.rating >= 4.5
              ? "Exceptional"
              : hotel.rating >= 4
                ? "Very good"
                : hotel.rating > 0
                  ? "Guest rating"
                  : "No rating yet"}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Based on {hotel.reviews} guest reviews
          </p>
        </div>
      </div>

      {hotel.reviews === 0 && (
        <p className="rounded-2xl border border-white/10 bg-[#111113] p-5 text-sm text-zinc-400">
          No guest reviews have been added yet.
        </p>
      )}
    </section>
  );
}

export default Reviews;
