import { ChevronLeft, ChevronRight, X } from "lucide-react";

function GalleryModel({
  activeImage,
  previousImage,
  nextImage,
  setShowGallery,
  hotel,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-5">
      <button
        onClick={() => setShowGallery(false)}
        className="absolute right-6 top-6 rounded-full border border-white/20 p-3 text-white hover:bg-white/10"
      >
        <X size={22} />
      </button>

      <button
        onClick={previousImage}
        className="absolute left-4 rounded-full border border-white/20 p-3 text-white hover:bg-white/10 md:left-10"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full max-w-5xl">
        <img
          src={hotel.images[activeImage]}
          alt="Hotel gallery"
          className="mx-auto max-h-[75vh] w-full rounded-xl object-contain"
        />
        <p className="mt-5 text-center text-sm text-zinc-400">
          {activeImage + 1} / {hotel.images.length}
        </p>
      </div>

      <button
        onClick={nextImage}
        className="absolute right-4 rounded-full border border-white/20 p-3 text-white hover:bg-white/10 md:right-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default GalleryModel;
