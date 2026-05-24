/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdWarning } from "react-icons/md";
import { toast } from "react-toastify";

const CancelModal = ({ isOpen, onClose, bookingId, roomName, onCancelled }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCancel = async () => {
    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();

      console.log("Token:", tokenData?.token);
      console.log("Booking ID:", bookingId);
      console.log(
        "URL:",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}/cancel`,
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();
      console.log(data);

      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (!res.ok) {
        toast.error(data.message || "Failed to cancel booking.");
        return;
      }

      toast.success("Booking cancelled.");
      onCancelled(bookingId);
      onClose();
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#0F172A] border border-white/10 shadow-2xl p-7"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <MdClose />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
            <MdWarning className="text-2xl text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white font-(family-name:--font-space-grotesk)">
            Cancel Booking?
          </h2>
          <p className="text-sm text-slate-400">
            Are you sure you want to cancel your booking for{" "}
            <span className="text-white font-semibold">{roomName}</span>? This
            action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 mt-7">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-300 hover:text-white transition"
          >
            Keep Booking
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 transition"
          >
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};

export default CancelModal;
