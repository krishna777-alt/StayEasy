import { BedDouble, Eye, Star, Sun, Users, Wifi } from "lucide-react";

export default function Header({ room }) {
  return (
    <div className="space-y-4">
      <span className="inline-block rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
        {room.category}
      </span>

      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          {room.name}
        </h1>
        <p className="mt-1 text-sm font-light text-zinc-400">{room.tagline}</p>
      </div>

      <div className="flex items-center space-x-2 text-xs">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="font-mono font-bold text-zinc-100">{room.rating}</span>
        <span className="text-zinc-500">({room.reviewsCount} reviews)</span>
      </div>

      <div className="my-2 w-full border-t border-zinc-800/80" />

      <div className="space-y-2.5 text-xs text-zinc-300">
        <div className="flex items-center space-x-3">
          <Users className="h-4 w-4 text-amber-400/90" />
          <span>{room.maxOccupancy} Guests</span>
        </div>
        <div className="flex items-center space-x-3">
          <BedDouble className="h-4 w-4 text-amber-400/90" />
          <span>{room.bedType}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Eye className="h-4 w-4 text-amber-400/90" />
          <span>{room.viewType}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Wifi className="h-4 w-4 text-amber-400/90" />
          <span>Free Wi-Fi</span>
        </div>
        <div className="flex items-center space-x-3">
          <Sun className="h-4 w-4 text-amber-400/90" />
          <span>Private Balcony</span>
        </div>
      </div>

      <p className="pt-2 text-xs leading-relaxed text-zinc-400">
        {room.description}
      </p>
    </div>
  );
}