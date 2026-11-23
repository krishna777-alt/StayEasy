export default function Thumbnail({ room, selectedImage, setSelectedImage }) {
  return (
    <div className="space-y-3">
      <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl sm:h-96 md:h-[420px]">
        <img
          src={selectedImage}
          alt={room.name}
          className="h-full w-full object-cover transition-all duration-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {room.gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            aria-label={`Show room image ${index + 1}`}
            aria-pressed={selectedImage === image}
            className={`h-20 overflow-hidden rounded-2xl border transition-all ${
              selectedImage === image
                ? "scale-[0.98] border-amber-400 ring-2 ring-amber-400/20"
                : "border-zinc-800 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={image}
              alt={`${room.name} view ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}