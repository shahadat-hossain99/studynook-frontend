import Link from "next/link";
import { FaCalendarXmark } from "react-icons/fa6";

const NoBookingsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* ICON */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl scale-150" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <FaCalendarXmark className="text-4xl text-violet-400" />
        </div>
      </div>

      {/* TEXT */}
      <h2 className="text-2xl font-bold text-white">No Bookings Yet</h2>
      <p className="mt-3 max-w-sm text-slate-400 leading-relaxed">
        You haven&apos;t booked any study rooms yet. Find your perfect study
        space and get started.
      </p>

      {/* CTA */}
      <Link href="/rooms" className="mt-8">
        <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition">
          Explore Rooms
        </button>
      </Link>
    </div>
  );
};

export default NoBookingsFound;
