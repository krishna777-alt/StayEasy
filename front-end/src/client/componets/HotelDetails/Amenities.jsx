import SectionTitle from "./SectionTitle";

function Amenities({ amenities }) {
  return (
    <section className="mb-16">
      <SectionTitle
        eyebrow="Designed for comfort"
        title="Exceptional amenities"
        description="Every detail is thoughtfully considered to make your stay unforgettable."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {amenities.map(({ icon: Icon, name }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111113] p-4 transition hover:border-amber-400/40"
          >
            <Icon size={19} className="shrink-0 text-amber-400" />
            <span className="text-xs text-zinc-300">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;
