import SectionTitle from "./SectionTitle";
function Overview({ hotel, formatPrice }) {
  return (
    <section className="mb-14">
      <SectionTitle
        eyebrow="A world of its own"
        title="An extraordinary escape."
        description={hotel.description}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          [hotel.rating || "New", "Guest rating"],
          [hotel.reviews, "Guest reviews"],
          [hotel.amenities.length, "Amenities"],
          [formatPrice(hotel.price), "Starting price / night"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-[#111113] p-4"
          >
            <h3 className="font-serif text-xl text-amber-400">{value}</h3>
            <p className="mt-1 text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Overview;
