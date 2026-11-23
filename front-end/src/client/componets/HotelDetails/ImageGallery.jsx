import { Sparkles } from "lucide-react";

function ImageGallery({ activeImage, setActiveImage, setShowGallery, hotel }) {
  return (
    <section className="mb-16">
      {hotel.images.length > 0 ? (
        <div className="grid h-[450px] grid-cols-1 gap-3 overflow-hidden rounded-2xl md:grid-cols-4 md:grid-rows-2">
          <div className="group relative overflow-hidden md:col-span-2 md:row-span-2">
            <img
              src={hotel.images[activeImage]}
              alt={`${hotel.name} view`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400" />
              {hotel.name}
            </div>
          </div>

          {hotel.images.slice(1, 5).map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => {
                setActiveImage(index + 1);
                setShowGallery(true);
              }}
              className="group relative hidden overflow-hidden md:block"
              aria-label={`View photo ${index + 2}`}
            >
              <img
                src={image}
                alt={`${hotel.name} gallery ${index + 2}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

              {index === 3 && (
                <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs backdrop-blur-md">
                  View all photos
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#111113] text-sm text-zinc-500">
          No hotel photos are available.
        </div>
      )}
    </section>
  );
}

export default ImageGallery;
