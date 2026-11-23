import { Coffee, Lock, ShieldCheck, Tv, Wifi, Wind } from "lucide-react";

const amenities = [
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Coffee, label: "Mini Bar" },
  { icon: Lock, label: "Safe" },
  { icon: Tv, label: "Flat-Screen TV" },
  { icon: ShieldCheck, label: "Room Service" },
];

export default function Amenities() {
  return (
    <div className="space-y-4 border-t border-zinc-800/80 pt-4">
      <div className="flex items-center justify-center space-x-4">
        <div className="h-px flex-1 bg-zinc-800" />
        <h3 className="font-serif text-sm font-semibold tracking-wide text-amber-400/90">
          Room Amenities
        </h3>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <div className="grid grid-cols-3 gap-4 pt-2 text-center sm:grid-cols-6">
        {amenities.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="group flex flex-col items-center space-y-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 shadow-lg transition-colors group-hover:border-amber-400 group-hover:text-amber-400">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-zinc-400">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
