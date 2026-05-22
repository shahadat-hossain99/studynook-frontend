"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-visible">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      />
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />
      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0B1120]/90 via-[#0B1120]/60 to-transparent" />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          max-w-11/12 mx-auto
          px-5 md:px-6
          pt-10 pb-14
          md:pt-20 md:pb-20
          flex items-center
          min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]
        "
      >
        <div className="w-full max-w-3xl">
          {/* BADGE */}
          <div className="group relative mb-5 inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg " />

            <span className="relative z-10 font-medium tracking-wide">
              Smart Study Room Booking Platform
            </span>
          </div>

          {/* HEADING */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-white ">
            Find Your Perfect
            <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Study Environment
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-300 leading-relaxed">
            Book peaceful and fully equipped study rooms designed for focused
            students and productive learning experiences.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/rooms" className="w-full sm:w-auto">
              <Button
                size="lg"
                radius="lg"
                className="w-full sm:w-auto bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold px-8"
              >
                Explore Rooms
                <FaArrowRight />
              </Button>
            </Link>
            <Link href="/add-rooms" className="w-full sm:w-auto">
              <Button
                size="lg"
                radius="lg"
                variant="bordered"
                className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 px-8"
              >
                Add Your Room
              </Button>
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { value: "120+", label: "Study Rooms" },
              { value: "5k+", label: "Active Students" },
              { value: "24/7", label: "Room Access" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4 md:p-5"
              >
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
