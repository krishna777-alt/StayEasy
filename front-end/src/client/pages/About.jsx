import {
  Diamond,
  Key,
  ShieldCheck,
  Wine,
  X,
  IceCream,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-zinc-100 px-6 py-24">
      {/* 1. Atmospheric Background Image with Dark Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-75 scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />

      {/* 2. Golden Ambient Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* VIP Sub-header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs uppercase tracking-[0.25em] font-medium shadow-lg shadow-amber-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          The StayEasy Legacy
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white leading-[1.15]">
          Crafting Unforgettable <br className="hidden sm:inline" />
          <span className="font-normal italic bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Sanctuaries
          </span>
        </h1>

        {/* Subtext Statement */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed tracking-wide">
          Connecting discerning travelers with world-class architecture and
          bespoke luxury hospitality. Where modern refinement meets timeless
          sophistication.
        </p>

        {/* Decorative Separator Bar */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>
      </div>
    </section>
  );
};

// export default AboutHero;
function AboutMission() {
  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: High-Definition Portrait Photo */}
          <div className="relative group">
            {/* Glow outline frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-amber-500/0 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />

            <div className="relative border border-amber-400/20 rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Signature Luxury Infinity View"
                className="w-full h-[480px] sm:h-[560px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay gradient for atmospheric lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Exclusivity Rate
                  </p>
                  <p className="text-sm text-zinc-300 mt-0.5">
                    Top 1% Approved Properties
                  </p>
                </div>
                <span className="text-2xl font-serif text-amber-400">1.0%</span>
              </div>
            </div>
          </div>

          {/* Right Side: Brand Story Content */}
          <div className="space-y-6">
            {/* Small Label */}
            <div className="inline-flex items-center space-x-2">
              <span className="h-px w-8 bg-amber-400" />
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Our Mission & Heritage
              </span>
            </div>

            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100 leading-tight">
              Curating Sanctuaries for the{" "}
              <span className="text-amber-400 italic">Discerning</span> Traveler
            </h2>

            {/* Paragraph Storyteller */}
            <div className="space-y-4 text-zinc-400 leading-relaxed font-light">
              <p>
                Founded on the belief that true luxury lies in detail and
                tranquility, StayEasy was established to redefine how travelers
                experience world-class hospitality.
              </p>
              <p>
                We inspect over{" "}
                <strong className="text-zinc-200 font-medium">
                  1,000 properties annually
                </strong>
                , approving only top{" "}
                <strong className="text-amber-400 font-medium">
                  1% suites
                </strong>{" "}
                that meet our uncompromising standards for architectural design,
                absolute privacy, and bespoke service.
              </p>
              <p>
                Whether it is a private cliffside villa overlooking the Aegean
                or a secluded penthouse in a bustling metropolis, every
                sanctuary on our platform promises an unmatched standard of
                refined living.
              </p>
            </div>

            {/* Key Quality Pillars (Micro Grid) */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
              <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-4 rounded-xl">
                <h4 className="text-amber-400 font-semibold text-lg font-serif">
                  100%
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Hand-Verified Properties
                </p>
              </div>
              <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-4 rounded-xl">
                <h4 className="text-amber-400 font-semibold text-lg font-serif">
                  24 / 7
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Bespoke VIP Concierge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { Linkedin, Twitter, Instagram } from "lucide-react";

const teamMembers = [
  {
    name: "Elena Rostova",
    role: "Chief Curator & Architect",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Former architectural director specializing in high-end secluded resort design.",
    socials: { linkedin: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Julian Vance",
    role: "Head of Global Concierge",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Two decades managing ultra-exclusive private guest experiences across Europe.",
    socials: { linkedin: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Sophia Chen",
    role: "Director of Guest Discretion",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "Oversees VIP security protocols and seamless private arrival operations.",
    socials: { linkedin: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Marcus Sterling",
    role: "Lead Interior Inspector",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Evaluates global properties for uncompromising acoustic, design, and comfort standards.",
    socials: { linkedin: "#", twitter: "#", instagram: "#" },
  },
];

function LeadershipSection() {
  return (
    <section className="py-24 bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="h-px w-6 bg-amber-400" />
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              The Visionaries
            </span>
            <span className="h-px w-6 bg-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
            Guided by <span className="text-amber-400 italic">Curators</span> of
            Excellence
          </h2>
          <p className="text-zinc-400 font-light text-sm mt-3">
            The masterminds, concierges, and designers ensuring every StayEasy
            property meets our uncompromising benchmark.
          </p>
        </div>

        {/* 4-Card Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Grayscale-to-Color Effect */}
              <div className="relative h-72 overflow-hidden bg-zinc-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                {/* Bottom dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                <div>
                  {/* Name in White Serif Text */}
                  <h3 className="text-xl font-serif font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h3>

                  {/* Title in Gold Text */}
                  <p className="text-xs font-medium text-amber-400 tracking-wide mt-1">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mt-3">
                    {member.bio}
                  </p>
                </div>

                {/* Clean Micro-Social Links */}
                <div className="pt-4 mt-6 border-t border-zinc-800/80 flex items-center space-x-3 text-zinc-500">
                  <a
                    href={member.socials.linkedin}
                    aria-label={`${member.name} LinkedIn`}
                    className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={member.socials.twitter}
                    aria-label={`${member.name} Twitter`}
                    className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  >
                    {/* <Ke className="w-3.5 h-3.5" /> */}Instagram
                  </a>
                  <a
                    href={member.socials.instagram}
                    aria-label={`${member.name} Instagram`}
                    className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  >
                    {/* <IceCream className="w-3.5 h-3.5" /> */}Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <BrandPillars />
      <StatsBanner />
      <LeadershipSection />
      <SignatureCTA />
    </>
  );
}
function SignatureCTA() {
  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* VIP Banner Container with Subtle Border and Radial Gold Glow */}
        <div className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-amber-400/30 p-8 sm:p-12 lg:p-16 overflow-hidden text-center shadow-2xl shadow-black/80">
          {/* Internal Ambient Radial Lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-400/5 blur-[80px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Small Gold Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Your Sanctuary Awaits
              </span>
            </div>

            {/* Banner Main Title */}
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-100 leading-tight">
              Ready to Experience <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 italic">
                Unmatched Opulence?
              </span>
            </h2>

            {/* Banner Subtext */}
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              Explore our handpicked portfolio of world-class suites or register
              for private member access and bespoke concierge privileges.
            </p>

            {/* Dual CTA Button Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Glowing Gold CTA */}
              <a
                href="/rooms"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-4 rounded-xl shadow-lg shadow-amber-400/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Luxury Suites</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Ghost Button for Member Registration */}
              <a
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 border border-zinc-700/80 hover:border-amber-400/40 font-medium px-8 py-4 rounded-xl transition-all duration-300"
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Join VIP Membership</span>
              </a>
            </div>

            {/* Micro Discretion Note */}
            <p className="text-[11px] text-zinc-500 font-mono pt-2">
              Instant Confirmation • 100% Privacy Guaranteed • 24/7 VIP
              Assistance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
const pillars = [
  {
    icon: Diamond,
    title: "Uncompromised Quality",
    description:
      "Every room is physically inspected and verified by our dedicated luxury standards team.",
  },
  {
    icon: Key,
    title: "Private Concierge",
    description:
      "24/7 dedicated guest support catering to every bespoke itinerary and last-minute request.",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Discretion",
    description:
      "VIP privacy protocols, anonymous booking options, and completely seamless check-ins.",
  },
  {
    icon: Wine,
    title: "Bespoke Experiences",
    description:
      "Exclusive access to private dining, local yacht charters, and curated wellness integrations.",
  },
];

function BrandPillars() {
  return (
    <section className="py-20 bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* Ambient background glow for luxury tone */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="h-px w-6 bg-amber-400" />
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              The StayEasy Standard
            </span>
            <span className="h-px w-6 bg-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
            Designed for{" "}
            <span className="text-amber-400 italic">Exclusivity</span> & Comfort
          </h2>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                {/* Accent top highlight bar on hover */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/50 transition-all duration-500" />

                <div>
                  {/* Gold Line Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 group-hover:border-amber-400/30 group-hover:bg-amber-400/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  {/* Pillar Title */}
                  <h3 className="text-xl font-serif font-semibold text-zinc-100 mb-3 group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                {/* Corner Decorative Element */}
                <div className="mt-6 pt-4 border-t border-zinc-800/40 flex justify-end">
                  <span className="text-xs text-zinc-600 group-hover:text-amber-400/60 font-mono transition-colors">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const statsData = [
  {
    target: 500,
    suffix: "+",
    decimals: 0,
    label: "Handpicked Luxury Properties",
    description: "Rigorously evaluated for design and privacy",
  },
  {
    target: 45,
    suffix: "+",
    decimals: 0,
    label: "Global Destinations",
    description: "Prime metropolitan & coastal sanctuaries",
  },
  {
    target: 99.4,
    suffix: "%",
    decimals: 1,
    label: "Verified Guest Satisfaction",
    description: "Based on post-stay concierge reviews",
  },
  {
    target: 24,
    suffix: "/7",
    decimals: 0,
    label: "VIP Concierge Assistance",
    description: "Dedicated around-the-clock support",
  },
];

// Single Animated Counter Sub-Component
function CounterItem({
  target,
  suffix,
  decimals,
  label,
  description,
  isVisible,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation duration
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div className="relative group p-6 sm:p-8 flex flex-col justify-between items-center text-center lg:items-start lg:text-left transition-all duration-300">
      {/* Subtle vertical divider line on wide screens */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-zinc-800 to-transparent group-last:hidden" />

      {/* Number Display */}
      <div className="mb-2">
        <span className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
          {count.toFixed(decimals)}
        </span>
        <span className="text-3xl sm:text-4xl font-serif font-semibold text-amber-400 ml-0.5">
          {suffix}
        </span>
      </div>

      {/* Label and Details */}
      <div>
        <h4 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-1">
          {label}
        </h4>
        <p className="text-xs text-zinc-400 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-zinc-900/80 backdrop-blur-md border-y border-zinc-800/80 relative overflow-hidden py-4"
    >
      {/* Ambient background accent glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y divide-zinc-800/60 sm:divide-y-0">
          {statsData.map((stat, idx) => (
            <CounterItem
              key={idx}
              target={stat.target}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
              description={stat.description}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default About;
