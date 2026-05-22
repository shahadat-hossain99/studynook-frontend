"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import RoomCard from "../UI/Home/RoomCard";
import NoRoomsFound from "../UI/Room/NoRoomsFound";

const FeaturedRooms = ({ featuredRooms }) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-[90%] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-14">
          <div>
            {/* TOP BADGE */}
            <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
              <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />

              <span className="relative z-10 font-medium tracking-wide">
                Featured Rooms
              </span>
            </div>

            {/* TITLE */}
            <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk)">
              Discover Premium
              <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Study Spaces
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-slate-400 leading-relaxed">
              Explore peaceful, modern, and fully equipped rooms designed for
              productivity, collaboration, and deep focus.
            </p>
          </div>

          {/* NAV BUTTONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={() => swiper?.slideNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        {featuredRooms?.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={setSwiper}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            className="pb-14"
          >
            {featuredRooms.map((room) => (
              <SwiperSlide key={room._id} className="h-auto">
                <RoomCard room={room} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NoRoomsFound />
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
