const EXPERIENCES = [
  {
    id: "fine-dining",
    title: "Michelin Fine Dining",
    tagline: "Culinary Masterpieces",
    description:
      "Indulge in bespoke multi-course tasting menus prepared by world-renowned chefs with rare wine pairings.",
    badge: "Popular",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 21a9 9 0 100-18 9 9 0 000 18z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 7v5l3 3"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 12h8"
        />
      </svg>
    ),
  },
  {
    id: "wellness-spa",
    title: "Holistic Wellness & Spa",
    tagline: "Rejuvenation Sanctuary",
    description:
      "Immerse in customized hydrotherapy treatments, deep tissue massages, and thermal infinity baths.",
    badge: "Relaxation",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: "private-concierge",
    title: "24/7 Private Concierge",
    tagline: "Tailored Perfection",
    description:
      "From securing exclusive event access to last-minute charter bookings, our concierge handles every detail.",
    badge: "VIP Service",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
    ),
  },
  {
    id: "helipad-transfers",
    title: "Helipad & Chauffeur VIP",
    tagline: "Seamless Arrivals",
    description:
      "Arrive in style with private helicopter airport transfers or luxury chauffeured Rolls-Royce escorts.",
    badge: "Exclusive",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    id: "private-yacht",
    title: "Private Yacht Charters",
    tagline: "Oceanic Exploration",
    description:
      "Sail coastal waters aboard custom luxury yachts equipped with personal crews and private water sports.",
    badge: "Adventure",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "bespoke-events",
    title: "Private Gala & Events",
    tagline: "Unforgettable Moments",
    description:
      "Host intimate gatherings, rooftop cocktail hours, or beachside celebrations designed to your taste.",
    badge: "Tailored",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

const CuratedExperiences = () => {
  return (
    <section className="py-24 bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* Decorative Subtle Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 inline-block mb-3">
            Beyond Luxury Stays
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Curated Experiences & Amenities
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
            Elevate your stay with signature world-class services crafted
            exclusively for StayEasy guests.
          </p>
        </div>

        {/* Responsive Grid Layout (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group relative bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-8 hover:bg-zinc-900/90 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/5 flex flex-col justify-between"
            >
              {/* Top Container: Icon and Badge */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  {/* Gold Outlined Icon Wrapper */}
                  <div className="w-14 h-14 rounded-xl bg-zinc-950/80 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-inner group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-colors duration-300">
                    {exp.icon}
                  </div>

                  {/* Category Pill Tag */}
                  <span className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-400 border border-zinc-800 group-hover:text-amber-400/90 group-hover:border-amber-400/30 transition-colors">
                    {exp.badge}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <span className="text-xs text-amber-400/80 font-medium tracking-wide uppercase">
                    {exp.tagline}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light pt-1">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors cursor-pointer">
                <span>Reserve Experience</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Glowing Bottom Border Effect on Hover */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/60 transition-all duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedExperiences;
