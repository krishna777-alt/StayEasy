import { MapPin } from "lucide-react";

export default function Location({ location }) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-md md:flex-row">
      <div className="flex items-start space-x-3.5">
        <div className="shrink-0 rounded-xl border border-amber-400/20 bg-amber-400/10 p-2.5 text-amber-400">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-serif text-base font-bold text-zinc-100">
            Location
          </h4>
          <p className="mt-0.5 text-xs font-semibold text-zinc-300">
            {location.address}
          </p>
          <p className="mt-1 text-xs text-zinc-400">{location.description}</p>
        </div>
      </div>

      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 md:w-64">
        <img
          src={location.mapPreview}
          alt="Map location"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full bg-rose-500 text-zinc-950 shadow-lg">
            <MapPin className="h-4 w-4 fill-zinc-950 text-rose-500" />
          </div>
        </div>
      </div>
    </div>
  );
}