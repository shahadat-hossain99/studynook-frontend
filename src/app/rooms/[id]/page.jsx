import Image from "next/image";

import { Button, Chip, Separator } from "@heroui/react";

import {
  FaUsers,
  FaLocationDot,
  FaWifi,
  FaSnowflake,
  FaChalkboard,
} from "react-icons/fa6";

import { LuProjector, LuPlugZap, LuArrowLeft } from "react-icons/lu";

import { HiMiniSpeakerWave } from "react-icons/hi2";

import { MdAttachMoney, MdBookOnline } from "react-icons/md";
import BookingButton from "@/components/UI/RoomDetails/BookingButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RoomOwnerControls from "@/components/UI/RoomDetails/RoomOwnerControls";
import Link from "next/link";

const amenityIcons = {
  "Wi-Fi": <FaWifi />,
  Whiteboard: <FaChalkboard />,
  Projector: <LuProjector />,
  "Power Outlets": <LuPlugZap />,
  "Quiet Zone": <HiMiniSpeakerWave />,
  "Air Conditioning": <FaSnowflake />,
};

const roomDetailsPage = async ({ params }) => {
  const { id } = await params;

  // ! SERVER COMPONENT JWT TOKEN
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  // ! SERVER COMPONENT

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(token);

  const res = await fetch(`http://localhost:5004/room/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const room = await res.json();
  // console.log(room);

  const {
    _id,
    roomName,
    image,
    floor,
    capacity,
    hourlyRate,
    description,
    amenities,
    bookingCount,
    ownerUserId,
  } = room;

  const isOwner = session?.user?.id === ownerUserId;

  return (
    <section className="min-h-screen bg-[#0B1120] px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 px-1">
          <Link
            href="/rooms"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200"
          >
            <LuArrowLeft className="text-base" />
            Go Back
          </Link>

          {isOwner && (
            <div className="flex items-center gap-3">
              <RoomOwnerControls roomId={id} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-8">
          {/* LEFT SIDE */}
          <div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 h-75 md:h-112.5 xl:h-130">
              <Image src={image} alt={roomName} fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute top-5 left-5 flex items-center gap-3 flex-wrap">
                <Chip
                  className="bg-black/30 backdrop-blur-xl text-white border border-white/10 px-3"
                  variant="flat"
                >
                  Premium Study Room
                </Chip>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  {roomName}
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* ABOUT */}
            <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-violet-400 text-sm font-medium uppercase tracking-widest">
                    Study Environment
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white">
                    Built For Deep Focus
                  </h2>
                </div>
                <div className="rounded-full bg-linear-to-r from-violet-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white">
                  Available Now
                </div>
              </div>
              <Separator className="my-6 bg-white/10" />
              <p className="text-slate-400 leading-loose">
                This premium workspace is designed for students, developers,
                researchers, and creators who need a distraction-free
                environment. With modern facilities, ambient lighting, and
                comfortable seating, this room delivers a calm and productive
                study experience.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h2 className="text-2xl font-bold text-white">
                Room Information
              </h2>

              <div className="mt-6 space-y-4">
                {/* FLOOR */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500/10">
                    <FaLocationDot className="text-pink-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Floor</p>
                    <h3 className="text-white font-semibold">{floor}</h3>
                  </div>
                </div>

                {/* CAPACITY */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/10">
                    <FaUsers className="text-violet-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Capacity</p>
                    <h3 className="text-white font-semibold">
                      {capacity} People
                    </h3>
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10">
                    <MdAttachMoney className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Hourly Rate</p>
                    <h3 className="text-white font-semibold">
                      ${hourlyRate}/hr
                    </h3>
                  </div>
                </div>

                {/* BOOKING COUNT */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500/10">
                    <MdBookOnline className="text-yellow-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Bookings</p>
                    <h3 className="text-white font-semibold">
                      {bookingCount ?? 0}
                    </h3>
                  </div>
                </div>
              </div>

              <BookingButton room={room} />
            </div>

            {/* AMENITIES */}
            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Amenities</h2>
                <div className="text-sm text-slate-400">
                  {amenities?.length} Included
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111827] px-4 py-4 transition-all duration-300 hover:border-violet-500/40"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/10">
                      <span className="text-violet-400 text-lg">
                        {amenityIcons[item]}
                      </span>
                    </div>
                    <span className="text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default roomDetailsPage;
