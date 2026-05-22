"use client";

import { authClient } from "@/lib/auth-client";
import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdCalendarMonth, MdAttachMoney, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const BookingModal = ({ isOpen, onOpenChange, room }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const today = new Date().toISOString().split("T")[0];

  const availableEndTimes = useMemo(() => {
    if (!startTime) return [];
    return timeSlots.slice(timeSlots.indexOf(startTime) + 1);
  }, [startTime]);

  const totalHours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return Number(endTime.split(":")[0]) - Number(startTime.split(":")[0]);
  }, [startTime, endTime]);

  const totalCost = totalHours * (room?.hourlyRate || 0);

  const { data: session } = authClient.useSession();

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);

      // ! JWT Token Accessing from client
      const { data: tokenData } = await authClient.token();
      // console.log(tokenData);

      const res = await fetch(`http://localhost:5004/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          roomId: room?._id,
          roomName: room?.roomName,
          roomImage: room?.image,
          bookingDate,
          startTime,
          endTime,
          totalHours,
          totalCost,
          specialNote: note,
          userEmail: session?.user?.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed.");
        return;
      }

      toast.success("Room booked successfully!");
      setBookingDate("");
      setStartTime("");
      setEndTime("");
      setNote("");
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-[#1e293b] border border-white/10
    text-white placeholder:text-slate-500
    focus:outline-none focus:border-violet-500
    transition appearance-none
    [color-scheme:dark]
  `;

  const modal = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* PANEL */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F172A] border border-white/10 shadow-2xl shadow-black/50">
        {/* CLOSE */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <MdClose className="text-xl" />
        </button>

        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b border-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-400 mb-2">
            Study Room Booking
          </p>
          <h2 className="text-3xl font-black text-white font-(family-name:--font-space-grotesk) ">
            Book This Room
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Reserve your preferred study session.
          </p>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-6">
          {/* ROOM INFO */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-(family-name:--font-space-grotesk) text-xl font-bold text-white">
              {room?.roomName}
            </h3>
            <p className="mt-1 text-slate-400 text-sm">
              ${room?.hourlyRate}/hour
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-5">
            {/* DATE */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Booking Date
              </label>
              <div className="relative">
                <MdCalendarMonth className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-cyan-400 pointer-events-none z-10" />
                <input
                  type="date"
                  required
                  min={today}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            {/* TIME */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Start Time
                </label>
                <select
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setEndTime("");
                  }}
                  className={inputClass}
                >
                  <option value="" disabled className="bg-[#1e293b]">
                    Select start
                  </option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="bg-[#1e293b]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  End Time
                </label>
                <select
                  value={endTime}
                  disabled={!startTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={`${inputClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <option value="" disabled className="bg-[#1e293b]">
                    Select end
                  </option>
                  {availableEndTimes.map((t) => (
                    <option key={t} value={t} className="bg-[#1e293b]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TOTAL COST */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Cost</p>
                  <h3 className="mt-1 text-4xl font-black text-white">
                    ${totalCost}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Duration: {totalHours} hour{totalHours !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/20">
                  <MdAttachMoney className="text-3xl text-cyan-300" />
                </div>
              </div>
            </div>

            {/* NOTE */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Special Note
              </label>
              <textarea
                placeholder="Write any special note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold text-base disabled:opacity-60 hover:opacity-90 transition"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default BookingModal;
