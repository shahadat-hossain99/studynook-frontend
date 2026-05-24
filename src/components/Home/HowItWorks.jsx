import Link from "next/link";
import { FiSearch, FiCalendar, FiBookOpen } from "react-icons/fi";
import FadeIn from "@/components/UI/FadeIn";

const steps = [
  {
    number: "01",
    icon: FiSearch,
    title: "Browse Rooms",
    description:
      "Filter by location, capacity, and amenities to find the perfect study space tailored to your needs.",
    accent: "violet",
    glowClass: "bg-violet-500/20",
    borderHover: "hover:border-violet-500/40",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
    gradientFrom: "from-violet-400",
    gradientTo: "to-violet-300",
  },
  {
    number: "02",
    icon: FiCalendar,
    title: "Pick a Slot",
    description:
      "Choose any available hour in real-time. No double bookings, no surprises — just your time, reserved.",
    accent: "cyan",
    glowClass: "bg-cyan-500/20",
    borderHover: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
    gradientFrom: "from-cyan-400",
    gradientTo: "to-cyan-300",
  },
  {
    number: "03",
    icon: FiBookOpen,
    title: "Study & Thrive",
    description:
      "Show up, settle in, and dive deep. Your ideal environment is ready the moment you arrive.",
    accent: "violet",
    glowClass: "bg-violet-500/20",
    borderHover: "hover:border-violet-500/40",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
    gradientFrom: "from-violet-400",
    gradientTo: "to-cyan-400",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-0 right-1/3 h-56 w-56 rounded-full bg-violet-500/5 blur-2xl" />
      </div>

      <div className="relative max-w-[88%] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* BADGE */}
          <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
            <span className="relative z-10 font-medium tracking-wide">
              How It Works
            </span>
          </div>

          {/* TITLE */}
          <FadeIn direction="up">
            {" "}
            <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk)">
              Book in Three
              <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Simple Steps
              </span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            {/* DESCRIPTION */}
            <p className="mt-5 max-w-xl text-slate-400 leading-relaxed">
              From search to first page turn in under a minute. StudyNook makes
              reserving your perfect space effortless.
            </p>
          </FadeIn>
        </div>

        {/* STEPS GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CONNECTOR LINE (desktop only) */}
          <div className="hidden md:block absolute top-15 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-linear-to-r from-violet-500/30 via-cyan-500/30 to-violet-500/30 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 ${step.borderHover} hover:bg-white/[0.07] hover:-translate-y-1`}
              >
                {/* CARD GLOW ON HOVER */}
                <div
                  className={`absolute inset-0 rounded-2xl ${step.glowClass} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}
                />

                {/* TOP ROW: step number + icon */}
                <div className="flex items-start justify-between">
                  {/* ICON CIRCLE */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${step.iconBg} backdrop-blur-sm z-10`}
                  >
                    <Icon className={`h-5 w-5 ${step.iconColor}`} size={20} />
                  </div>

                  {/* STEP NUMBER */}
                  <span
                    className={`text-5xl font-bold bg-linear-to-b ${step.gradientFrom} ${step.gradientTo} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500 font-(family-name:--font-space-grotesk) select-none`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-white font-(family-name:--font-space-grotesk)">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* BOTTOM ACCENT LINE */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-px bg-linear-to-r ${step.gradientFrom} ${step.gradientTo} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link href={"/rooms"}>
            {" "}
            <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-linear-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40">
              <span>Find Your Study Space</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
