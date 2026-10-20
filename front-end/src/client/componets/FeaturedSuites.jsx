import { Link } from "react-router-dom";

const SUITES_DATA = [
  {
    id: "suite-01",
    title: "The Royal Oceanfront Villa",
    location: "Santorini, Greece",
    rating: 4.98,
    reviewsCount: 124,
    pricePerNight: 550,
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    amenities: [
      "🏊 Private Pool",
      "⚡ High-Speed WiFi",
      "🍷 Complimentary Breakfast",
      "🌊 Sea View",
    ],
    featuredTag: "Top Rated",
  },
  {
    id: "suite-02",
    title: "Midnight Panorama Penthouse",
    location: "Tokyo, Japan",
    rating: 4.95,
    reviewsCount: 98,
    pricePerNight: 420,
    imageUrl:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
    amenities: [
      "🍸 Sky Lounge Access",
      "🧘 Private Spa",
      "⚡ High-Speed WiFi",
      "🏙 Skyline View",
    ],
    featuredTag: "Trending",
  },
  {
    id: "suite-03",
    title: "Alpine Sanctuary & Chalet",
    location: "Zermatt, Switzerland",
    rating: 4.99,
    reviewsCount: 156,
    pricePerNight: 680,
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
    amenities: [
      "🔥 Private Fireplace",
      "🍷 Complimentary Breakfast",
      "⛷ Ski-in / Ski-out",
      "🏔 Mountain View",
    ],
    featuredTag: "Exclusive",
  },
];

const FeaturedSuites = () => {
  return (
    <section className="py-20 bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Handpicked Luxury
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mt-1">
              Featured Luxury Suites
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Immerse yourself in unrivaled luxury with our highest-rated
              private suites and villas worldwide.
            </p>
          </div>

          <Link
            to="/suites"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium text-sm group transition-colors self-start md:self-auto"
          >
            <span>View All Suites</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUITES_DATA.map((suite) => (
            <div
              key={suite.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Wrapper with Hover Zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <img
                  src={suite.imageUrl}
                  alt={suite.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/20" />

                {/* Top Badge: Tag & Rating */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  <span className="bg-zinc-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                    {suite.featuredTag}
                  </span>
                  <div className="bg-zinc-950/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-800 flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span>{suite.rating}</span>
                    <span className="text-zinc-400">
                      ({suite.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-amber-400/90 font-medium uppercase tracking-wider flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {suite.location}
                  </p>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {suite.title}
                  </h3>
                </div>

                {/* Pill-Style Amenity Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {suite.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-950/60 border border-zinc-800 text-zinc-300 text-[11px] font-medium px-2.5 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Pricing & CTA */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-2xl font-bold text-amber-400">
                      ${suite.pricePerNight}
                    </span>
                    <span className="text-xs text-zinc-400 ml-1">/ night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/suites/${suite.id}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/book/${suite.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10 active:scale-95"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSuites;
