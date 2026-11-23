function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl text-white md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
