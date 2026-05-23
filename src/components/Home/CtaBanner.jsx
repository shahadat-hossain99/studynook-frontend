"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const CTABanner = () => {
  return (
    <section className="relative overflow-hidden h-125 md:h-145 flex items-center justify-center">
      {/* BACKGROUND IMAGE */}
      <Image
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop"
        alt="Study space background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#0B1120]/75" />

      {/* VIOLET/CYAN GLOW OVERLAY */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* BADGE */}
        <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)] mb-6">
          <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
          <span className="relative z-10 font-medium tracking-wide">
            Start Today — No Commitment
          </span>
        </div>

        {/* HEADLINE */}
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk)">
          Ready to Find Your
          <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Perfect Study Space?
          </span>
        </h2>

        {/* SUBTEXT */}
        <p className="mt-6 text-slate-400 leading-relaxed max-w-xl">
          Join thousands of students who turned their study goals into results.
          Book your first room in under a minute.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          {/* PRIMARY */}
          <Link
            href="/rooms"
            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40"
          >
            <span>Browse Rooms</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* SECONDARY */}
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:text-white"
          >
            See How It Works
          </Link>
        </div>

        {/* SOCIAL PROOF STRIP */}
        <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-violet-400 font-semibold text-base">
              120+
            </span>
            <span>Rooms Available</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold text-base">10k+</span>
            <span>Sessions Booked</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-violet-400 font-semibold text-base">
              4.9★
            </span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
