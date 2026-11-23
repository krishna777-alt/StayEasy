import { ChevronRight } from "lucide-react";

function BreadCrumb({ hotel }) {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
      <a href="/" className="hover:text-amber-400">
        Home
      </a>
      <ChevronRight size={13} />
      <a href="/hotels" className="hover:text-amber-400">
        Hotels
      </a>
      <ChevronRight size={13} />
      <span className="text-zinc-300">{hotel.name}</span>
    </div>
  );
}

export default BreadCrumb;
