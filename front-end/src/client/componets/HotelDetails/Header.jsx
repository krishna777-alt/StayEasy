import { Heart, MapPin, Share2, Star } from "lucide-react";

function Header({ hotel, liked, setLiked }) {
  return (
    <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-amber-400">
            {hotel.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-400">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {hotel.rating}
            <span>({hotel.reviews} reviews)</span>
          </span>
        </div>

        <h1 className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
          {hotel.name}
        </h1>

        <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
          <MapPin size={16} className="text-amber-400" />
          {hotel.location}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm transition hover:border-amber-400"
        >
          <Heart
            size={17}
            className={liked ? "fill-red-500 text-red-500" : ""}
          />
          <span>{liked ? "Saved" : "Save"}</span>
        </button>

        <button className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm transition hover:border-amber-400">
          <Share2 size={17} />
          Share
        </button>
      </div>
    </section>
  );
}

export default Header;
