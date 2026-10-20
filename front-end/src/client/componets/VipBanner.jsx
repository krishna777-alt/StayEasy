import { useState } from "react";

const VipBanner = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-y border-amber-400/20 py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-amber-400/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Promotional Headline & Content */}
          <div className="text-center lg:text-left space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              VIP Exclusive Perks
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Join StayEasy VIP —{" "}
              <span className="text-amber-400">Get 15% Off</span> Your First
              Luxury Stay
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-light">
              Unlock secret member rates, complimentary room upgrades, priority
              late check-outs, and curated concierge perks across all global
              properties.
            </p>
          </div>

          {/* Form / Subscription Box */}
          <div className="w-full lg:max-w-md">
            {isSubmitted ? (
              <div className="bg-zinc-950/80 border border-amber-400/40 rounded-2xl p-6 text-center space-y-2 backdrop-blur-md shadow-xl animate-fade-in">
                <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/40 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Welcome to StayEasy VIP!
                </h3>
                <p className="text-xs text-zinc-400">
                  Your 15% discount code has been sent to your inbox. Use it at
                  checkout on your next reservation.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs text-amber-400 hover:underline font-medium"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 rounded-2xl focus-within:border-amber-400/60 transition-all shadow-2xl">
                  {/* Email Input */}
                  <div className="relative w-full flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-zinc-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  {/* Glowing Gold Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[130px] px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-zinc-950"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Joining...</span>
                      </>
                    ) : (
                      <span>Get 15% Off</span>
                    )}
                  </button>
                </div>

                {/* Validation Error Message */}
                {error && (
                  <p className="text-xs text-rose-400 pl-3 font-medium">
                    {error}
                  </p>
                )}

                <p className="text-[11px] text-zinc-500 text-center lg:text-left pl-1">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipBanner;
