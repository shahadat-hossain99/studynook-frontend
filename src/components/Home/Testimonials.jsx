"use client";

import Marquee from "react-fast-marquee";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    name: "John Roy",
    role: "Medical Student",
    room: "Quiet Zone · Floor 3",
    avatar: "https://i.ibb.co.com/KxLrwMpq/09.jpg",
    rating: 5,
    review:
      "Absolutely love this place. The silence policy is strictly maintained and the lighting is perfect for long study sessions.",
  },
  {
    name: "Andrew Tate",
    role: "CS Undergrad",
    room: "Tech Hub · Floor 1",
    avatar: "https://i.ibb.co.com/LXrX4C2N/15215642-AP24206630683906.jpg",
    rating: 4,
    review:
      "Fast Wi-Fi, comfy chairs, and great AC. Booked within a minute. The real-time slot system is a game changer.",
  },
  {
    name: "Abdus Salam",
    role: "Research Scholar",
    room: "Library Suite · Floor 2",
    avatar: "https://i.ibb.co.com/KzNcb44L/IMG-20260110-102223.jpg",
    rating: 5,
    review:
      "The library suite feels like a premium co-working space. I get more done here in 2 hours than at home all day.",
  },
  {
    name: "Ahmed Ruhin",
    role: "IELTS Aspirant",
    room: "Focus Room · Floor 2",
    avatar:
      "https://i.ibb.co.com/Psb6SdnL/Whats-App-Image-2026-05-07-at-2-19-54-PM.jpg",
    rating: 5,
    review:
      "Calm, clean, and perfectly distraction-free. Natural light through frosted glass makes every session refreshing.",
  },
  {
    name: "Shahadat Hossain",
    role: "MBA Student",
    room: "Group Pod · Floor 4",
    avatar: "https://i.ibb.co.com/hxS97HZ3/800kb.png",
    rating: 4,
    review:
      "Booked the group pod for our case study session. The whiteboard setup and projector made it super productive.",
  },
  {
    name: "Hasmotullah",
    role: "HSC Candidate",
    room: "Quiet Zone · Floor 3",
    avatar:
      "https://i.ibb.co.com/xt0nBhZM/Whats-App-Image-2026-05-07-at-2-41-33-PM.jpg",
    rating: 5,
    review:
      "I come here every day before my exams. Staff is friendly and the environment keeps me focused like nothing else.",
  },
];

// duplicate for second row with offset
const reviewsRow2 = [...reviews].reverse();

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star)
          return <FaStar key={star} className="text-violet-400 text-sm" />;
        if (rating >= star - 0.5)
          return (
            <FaStarHalfAlt key={star} className="text-violet-400 text-sm" />
          );
        return <FaRegStar key={star} className="text-slate-600 text-sm" />;
      })}
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="group relative mx-4 w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/40 hover:bg-white/8 hover:-translate-y-1">
    {/* card inner glow */}
    <div className="absolute inset-0 rounded-2xl bg-violet-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

    {/* Stars */}
    <StarRating rating={review.rating} />

    {/* Review text */}
    <p className="mt-4 text-sm text-slate-300 leading-relaxed line-clamp-3">
      &quot;{review.review}&quot;
    </p>

    {/* Divider */}
    <div className="my-4 h-px w-full bg-white/5" />

    {/* Reviewer */}
    <div className="flex items-center gap-3">
      <img
        src={review.avatar}
        alt={review.name}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-500/20"
      />
      <div>
        <p className="text-sm font-semibold text-white">{review.name}</p>
        <p className="text-xs text-slate-500">
          {review.role} ·{" "}
          <span className="text-violet-400/70">{review.room}</span>
        </p>
      </div>
    </div>

    {/* Bottom accent */}
    <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
  </div>
);

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-[90%] mx-auto mb-14">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center">
          {/* BADGE */}
          <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
            <span className="relative z-10 font-medium tracking-wide">
              What People Say
            </span>
          </div>

          {/* TITLE */}
          <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk)">
            Real Experiences,
            <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Real Students
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-xl text-slate-400 leading-relaxed">
            Hear from the students, researchers, and professionals who made
            StudyNook their second home.
          </p>
        </div>
      </div>

      {/* MARQUEE ROW 1 — left to right */}
      <div className="mb-5">
        <Marquee gradient={false} speed={40} pauseOnHover>
          {reviews.map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </Marquee>
      </div>

      {/* MARQUEE ROW 2 — right to left */}
      <Marquee gradient={false} speed={35} direction="right" pauseOnHover>
        {reviewsRow2.map((review, i) => (
          <ReviewCard key={`r2-${i}`} review={review} />
        ))}
      </Marquee>

      {/* FADE EDGES */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#0B1120] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#0B1120] to-transparent z-10" />
    </section>
  );
};

export default Testimonials;
