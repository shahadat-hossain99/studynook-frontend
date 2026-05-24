"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/UI/FadeIn";
import { MdCalendarMonth, MdAccessTime, MdAttachMoney } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import CancelModal from "./CancelModal";
import Image from "next/image";
const BookingCard = ({ booking, onCancelled, index = 0 }) => {
  const [showModal, setShowModal] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const isCancellable =
    booking.status === "confirmed" && booking.bookingDate >= today;

  const statusStyles =
    booking.status === "confirmed"
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : "bg-red-500/10 text-red-400 border border-red-500/20";

  return (
    <>
      <FadeIn direction="up" delay={index * 0.1}>
        <div className="group relative rounded-2xl bg-[#0F172A] border border-white/8 hover:border-violet-500/30 transition-all duration-300 overflow-hidden">
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 ${
              booking.status === "confirmed"
                ? "bg-linear-to-b from-violet-500 to-cyan-500"
                : "bg-linear-to-b from-red-500 to-red-700"
            }`}
          />

          <div className="flex flex-col md:flex-row md:items-center gap-6 px-7 py-6">
            {/* Room image */}
            <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-white/5 relative">
              {booking.roomImage ? (
                <Image
                  src={booking.roomImage}
                  alt={booking.roomName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-3xl">
                  🏠
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className="text-lg font-bold text-white truncate font-(family-name:--font-space-grotesk)">
                  {booking.roomName}
                </h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles}`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MdCalendarMonth className="text-violet-400 text-base" />
                  {booking.bookingDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MdAccessTime className="text-cyan-400 text-base" />
                  {booking.startTime} – {booking.endTime}
                  <span className="text-slate-600 text-xs ml-1">
                    ({booking.totalHours}h)
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MdAttachMoney className="text-emerald-400 text-base" />
                  <span className="text-white font-semibold">
                    ${booking.totalCost}
                  </span>
                </span>
              </div>

              {booking.specialNote && (
                <p className="text-xs text-slate-500 italic truncate">
                  {booking.specialNote}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-3 shrink-0">
              <Link
                href={`/rooms/${booking.roomId}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-500/20 border border-white/8 hover:border-violet-500/30 text-sm text-slate-300 hover:text-white transition-all duration-200"
              >
                View
                <HiArrowRight className="text-base" />
              </Link>

              {isCancellable && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-sm text-red-400 hover:text-red-300 transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      <CancelModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        bookingId={booking._id}
        roomName={booking.roomName}
        onCancelled={onCancelled}
      />
    </>
  );
};

export default BookingCard;
