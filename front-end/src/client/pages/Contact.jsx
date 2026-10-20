import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "VIP Reservation Request",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 px-4 sm:px-8 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-zinc-950">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            24/7 Bespoke Guest Relations
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            How May We Assist Your Journey?
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Whether planning a bespoke private island retreat, arranging
            helicopter transfers, or tailoring dietary preferences, our global
            concierge team is available around the clock.
          </p>
        </div>
      </section>

      {/* 2. DIRECT CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Concierge Phone */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md hover:border-amber-400/40 transition-all group">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-2xl mb-4 group-hover:scale-110 transition-transform">
              📞
            </div>
            <h3 className="text-lg font-bold text-zinc-100">
              Direct VIP Hotline
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Immediate priority line for urgent booking edits or live stay
              support.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-1">
              <p className="text-sm font-bold text-amber-400">
                +1 (800) 555-STAY
              </p>
              <p className="text-[11px] text-zinc-500">
                Global Toll-Free • 24/7 Availability
              </p>
            </div>
          </div>

          {/* Card 2: WhatsApp / Chat */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md hover:border-amber-400/40 transition-all group">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-2xl mb-4 group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-lg font-bold text-zinc-100">
              Private Messenger & WhatsApp
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Instant digital correspondence with your dedicated personal
              advisor.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-1">
              <p className="text-sm font-bold text-amber-400">
                +44 20 7946 0912
              </p>
              <p className="text-[11px] text-zinc-500">
                Average response time: &lt; 5 minutes
              </p>
            </div>
          </div>

          {/* Card 3: Email Secretariat */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md hover:border-amber-400/40 transition-all group">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-2xl mb-4 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h3 className="text-lg font-bold text-zinc-100">
              Concierge Desk Email
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              For itinerary planning, custom property inquiries, and media
              requests.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-1">
              <p className="text-sm font-bold text-amber-400">
                concierge@stayeasy-luxury.com
              </p>
              <p className="text-[11px] text-zinc-500">
                Guaranteed response within 2 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN FORM & GLOBAL OFFICES */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* INQUIRY FORM (7 COLS) */}
        <section className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-100">
              Send an Advisory Request
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Please provide details about your itinerary and special
              preferences.
            </p>
          </div>

          {submitted ? (
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-8 text-center space-y-3">
              <span className="text-4xl">✨</span>
              <h3 className="text-xl font-bold text-amber-400">
                Inquiry Received
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you,{" "}
                <span className="text-zinc-100 font-semibold">
                  {formData.fullName}
                </span>
                . A senior StayEasy VIP Concierge officer has been assigned to
                your request and will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold text-amber-400 underline hover:text-amber-300"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lord / Lady / Mr. / Ms. John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Inquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) =>
                      setFormData({ ...formData, inquiryType: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors cursor-pointer"
                  >
                    <option
                      value="VIP Reservation Request"
                      className="bg-zinc-900"
                    >
                      VIP Reservation Request
                    </option>
                    <option
                      value="Yacht / Private Flight Charter"
                      className="bg-zinc-900"
                    >
                      Yacht / Private Flight Charter
                    </option>
                    <option
                      value="Private Event & Buyout"
                      className="bg-zinc-900"
                    >
                      Private Event & Buyout
                    </option>
                    <option
                      value="Corporate Membership"
                      className="bg-zinc-900"
                    >
                      Corporate Membership
                    </option>
                    <option value="Press & Media" className="bg-zinc-900">
                      Press & Media
                    </option>
                  </select>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                  Message / Special Requests
                </label>
                <textarea
                  rows="5"
                  required
                  placeholder="Specify dates, preferred destinations, dietary needs, or security preferences..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98]"
              >
                Dispatch Inquiry to Concierge
              </button>
            </form>
          )}
        </section>

        {/* GLOBAL OFFICES & FAQ (5 COLS) */}
        <section className="lg:col-span-5 space-y-8">
          {/* Office Locations */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-zinc-100">
              Global Secretariats
            </h3>

            <div className="space-y-4">
              {/* Office 1 */}
              <div className="pb-4 border-b border-zinc-800/80 last:border-none last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400">
                    Mayfair, London
                  </h4>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    GMT
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  42 Berkeley Square, London W1J 5AW, United Kingdom
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  📞 +44 20 7946 0912
                </p>
              </div>

              {/* Office 2 */}
              <div className="pb-4 border-b border-zinc-800/80 last:border-none last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400">
                    DIFC, Dubai
                  </h4>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    GST
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Gate Precinct 4, Dubai International Financial Centre, UAE
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  📞 +971 4 312 8000
                </p>
              </div>

              {/* Office 3 */}
              <div className="pb-4 border-b border-zinc-800/80 last:border-none last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400">
                    Marina Bay, Singapore
                  </h4>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    SGT
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  10 Collyer Quay, Ocean Financial Centre, Singapore 049315
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">📞 +65 6789 0123</p>
              </div>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-amber-400 text-xl">🛡️</span>
            <div>
              <h4 className="text-xs font-bold text-zinc-200">
                Guaranteed VIP Discretion
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                All inquiries, guest profiles, and itinerary communications are
                secured under strict non-disclosure protocols.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
