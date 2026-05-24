import { FaUsers, FaLightbulb, FaHeart } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export const metadata = { title: "About Us" };

const values = [
  {
    icon: <FaUsers className="text-violet-400 text-2xl" />,
    title: "Community First",
    description:
      "Built for students, researchers, and creators who need a focused space to do their best work.",
  },
  {
    icon: <FaLightbulb className="text-cyan-400 text-2xl" />,
    title: "Smart Booking",
    description:
      "Real-time availability, conflict detection, and instant confirmation — booking made simple.",
  },
  {
    icon: <FaHeart className="text-pink-400 text-2xl" />,
    title: "Passion for Learning",
    description:
      "We believe the right environment transforms the quality of study and research.",
  },
  {
    icon: <MdVerified className="text-emerald-400 text-2xl" />,
    title: "Trusted Platform",
    description:
      "Secure authentication, verified room listings, and transparent pricing you can count on.",
  },
];

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-16">
          <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
            <span className="relative z-10 font-medium tracking-wide">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-(family-name:--font-space-grotesk)">
            About{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              StudyNook
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-slate-400 leading-relaxed">
            StudyNook was created with one goal — to give every learner access
            to a premium, distraction-free study environment. We connect room
            owners with students who need focused spaces to thrive.
          </p>
        </div>

        {/* MISSION */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 mb-12 text-center">
          <h2 className="text-3xl font-bold text-white font-(family-name:--font-space-grotesk) mb-4">
            Our Mission
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-3xl mx-auto text-lg">
            To make quality study spaces accessible to everyone — from high
            school students preparing for exams to PhD researchers working on
            their next breakthrough. Where Focus Finds Its Place.
          </p>
        </div>

        {/* VALUES */}
        <h2 className="text-2xl font-bold text-white font-(family-name:--font-space-grotesk) mb-8 text-center">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Study Rooms" },
            { value: "10K+", label: "Happy Users" },
            { value: "50+", label: "Cities" },
            { value: "99%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <h3 className="text-3xl font-black text-white font-(family-name:--font-space-grotesk) bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text">
                {stat.value}
              </h3>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
