const reviews = [
  {
    id: 1,
    name: "Elena Rostova",
    location: "Zurich, Switzerland",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    stayedAt: "Overwater Villa • Maldives",
    date: "Stayed Oct 2025",
    verified: true,
    quote:
      "StayEasy provided the ultimate private luxury experience. From the seamless mobile check-in to the personalized sunset butler service, every detail felt tailored exclusively for us.",
  },
  {
    id: 2,
    name: "Marcus Vance",
    location: "London, UK",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    stayedAt: "Penthouse Suite • Tokyo",
    date: "Stayed Nov 2025",
    verified: true,
    quote:
      "The dark luxury ambiance and VIP member perks made our Tokyo stay unforgettable. Having direct concierge assistance right in the app saved us hours of planning.",
  },
  {
    id: 3,
    name: "Sophia Chen",
    location: "Singapore",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    stayedAt: "Alpine Chalet • St. Moritz",
    date: "Stayed Dec 2025",
    verified: true,
    quote:
      "Absolute perfection. The room view of the Alps was breathtaking, and booking through the StayEasy VIP loyalty program earned us a complimentary spa package.",
  },
];

const GuestReviews = () => {
  return (
    <section className="bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-400/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Guest Testimonials
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
            Unforgettable Stays,{" "}
            <span className="text-amber-400">Verified Proof</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Read authentic reviews from world travelers and VIP members who
            booked their luxury sanctuaries through StayEasy.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-4">
                {/* 5-Star Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  {/* Star Rating Icons */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-4 h-4 fill-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Verified Tag */}
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
                      <svg
                        className="w-3 h-3 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Verified Guest
                    </span>
                  )}
                </div>

                {/* Review Quote Text */}
                <p className="text-zinc-300 text-sm leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Guest Profile & Stay Details */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-400/30 group-hover:border-amber-400 transition-colors"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400">{item.location}</p>
                  </div>
                </div>

                {/* Property & Stay Meta */}
                <div className="text-right">
                  <p className="text-[11px] font-medium text-amber-400/90 max-w-[120px] truncate">
                    {item.stayedAt}
                  </p>
                  <p className="text-[10px] text-zinc-500">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Rating Summary Footer */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">4.9 / 5.0</span>
            <span className="text-zinc-600">•</span>
            <span>Based on 12,400+ verified luxury bookings</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-500">
            <span>
              Trustpilot <strong>4.9/5</strong>
            </span>
            <span>
              Google Reviews <strong>4.8/5</strong>
            </span>
            <span>
              TripAdvisor <strong>5.0/5</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestReviews;
