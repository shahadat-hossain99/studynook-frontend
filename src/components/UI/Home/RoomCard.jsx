"use client";

import Image from "next/image";
import Link from "next/link";

import { Button, Chip } from "@heroui/react";

import { FaUsers, FaArrowRight, FaLocationDot } from "react-icons/fa6";

import { MdAttachMoney } from "react-icons/md";

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName,
    image,
    floor,
    capacity,
    hourlyRate,
    description,
    amenities,
  } = room;

  const visibleAmenities = amenities?.slice(0, 3);

  const remainingAmenities = amenities?.length - 3;

  const isValidImage =
    image?.startsWith("http://") ||
    image?.startsWith("https://") ||
    image?.startsWith("/");

  return (
    <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-[0_20px_80px_rgba(139,92,246,0.15)]">
      <div className="flex h-full flex-col">
        {/* IMAGE */}

        <div className="relative h-60 overflow-hidden">
          {isValidImage ? (
            <Image
              src={image}
              alt={roomName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-slate-600 text-5xl">
              🏠
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1120] via-[#0B1120]/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-6">
          {/* ROOM NAME */}
          <h2 className="line-clamp-1 text-2xl font-bold text-white font-(family-name:--font-space-grotesk)">
            {roomName}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {description?.slice(0, 100)}...
          </p>

          {/* ROOM INFO */}
          <div className="mt-6 space-y-3">
            {/* FLOOR */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-300">
                <FaLocationDot className="text-pink-400" />

                <span>Floor</span>
              </div>

              <span className="font-semibold text-white">{floor}</span>
            </div>

            {/* CAPACITY */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-300">
                <FaUsers className="text-violet-400" />

                <span>Seats</span>
              </div>

              <span className="font-semibold text-white">
                {capacity} People
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-300">
                <MdAttachMoney className="text-xl text-cyan-400" />

                <span>Rate</span>
              </div>

              <span className="font-semibold text-white">${hourlyRate}/hr</span>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="mt-6 flex flex-wrap gap-2">
            {visibleAmenities?.map((amenity, index) => (
              <Chip
                key={index}
                size="sm"
                variant="flat"
                className="border border-white/10 bg-white/5 text-slate-300"
              >
                {amenity}
              </Chip>
            ))}

            {remainingAmenities > 0 && (
              <Chip
                size="sm"
                variant="flat"
                className="border border-violet-500/30 bg-violet-500/10 text-violet-300"
              >
                +{remainingAmenities} more
              </Chip>
            )}
          </div>

          {/* BUTTON */}
          <div className="mt-auto pt-8">
            <Link href={`/rooms/${_id}`}>
              <Button
                radius="full"
                className="w-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold transition-transform duration-300 hover:scale-[1.02]"
              >
                View Details
                <FaArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
