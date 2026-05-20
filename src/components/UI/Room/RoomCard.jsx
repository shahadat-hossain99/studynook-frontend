"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@heroui/react";

import { FaUsers, FaArrowRight, FaLocationDot } from "react-icons/fa6";

import { MdAttachMoney } from "react-icons/md";

const RoomCard = ({ room }) => {
  const { _id, roomName, image, floor, capacity, hourlyRate } = room;

  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/40">
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={roomName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/10 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* NAME */}
        <h2 className="text-2xl font-bold text-white line-clamp-1 font-(family-name:--font-space-grotesk)">
          {roomName}
        </h2>

        {/* INFO */}
        <div className="mt-6 space-y-3">
          {/* RATE */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-300">
              <MdAttachMoney className="text-cyan-400 text-xl" />

              <span>Hourly Rate</span>
            </div>

            <span className="font-semibold text-white">${hourlyRate}/hr</span>
          </div>

          {/* CAPACITY */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-300">
              <FaUsers className="text-violet-400" />

              <span>Capacity</span>
            </div>

            <span className="font-semibold text-white">{capacity} People</span>
          </div>

          {/* FLOOR */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-300">
              <FaLocationDot className="text-pink-400" />

              <span>Floor</span>
            </div>

            <span className="font-semibold text-white">{floor}</span>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-6">
          <Link href={`/rooms/${_id}`}>
            <Button
              radius="full"
              className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold"
            >
              View Details
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
