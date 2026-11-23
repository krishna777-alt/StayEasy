import { MapPin, ExternalLink } from "lucide-react";
import SectionTitle from "./SectionTitle";

function Location({ hotel }) {
  const location = hotel.location || "Location not available";

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    location,
  )}&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    location,
  )}`;

  return (
    <>
      <section>
        <SectionTitle
          eyebrow="Find us"
          title="Explore the destination."
          description={location}
        />

        {/* ========================== Map Section ========================== */}

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
          {/* Map */}

          <div className="h-[350px] w-full sm:h-[450px]">
            <iframe
              title="Baa Atoll Maldives Location Map"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location Information */}

          <div className="flex flex-col gap-4 border-t border-white/10 bg-[#111113] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10">
                <MapPin size={22} className="text-amber-400" />
              </div>

              <div>
                <h3 className="font-serif text-lg text-white">{location}</h3>

                <p className="text-xs text-zinc-500">Hotel location</p>
              </div>
            </div>

            {/* Directions Button */}

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Get Directions
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Location;
