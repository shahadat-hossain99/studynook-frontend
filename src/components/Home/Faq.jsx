"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import FadeIn from "@/components/UI/FadeIn";

const faqs = [
  {
    question: "How do I book a study room?",
    answer:
      "Simply browse available rooms, pick your preferred slot from the real-time calendar, and confirm your booking. The entire process takes under a minute and you'll receive an instant confirmation.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes. You can cancel or reschedule any booking up to 1 hour before your slot starts — completely free of charge. Cancellations made within the hour may be subject to a small fee.",
  },
  {
    question: "Is walk-in allowed without a booking?",
    answer:
      "Walk-ins are welcome based on availability, but we strongly recommend booking in advance to guarantee your preferred room and time slot, especially during peak hours.",
  },
  {
    question: "Can I extend my session if I need more time?",
    answer:
      "If the next slot is available, you can extend your session directly from the app or at the front desk. Extensions are processed in 30-minute increments.",
  },
  {
    question: "What amenities are included with every room?",
    answer:
      "All rooms come with high-speed Wi-Fi, AC, ergonomic seating, and USB charging ports. Select rooms also include whiteboards, projectors, lockers, and printer access.",
  },
  {
    question: "Are group bookings supported?",
    answer:
      "Absolutely. Our Group Pods and Discussion Rooms support 4–12 people. You can book these for team projects, study groups, or collaborative sessions.",
  },
  {
    question: "Is there a membership or subscription plan?",
    answer:
      "Yes! StudyNook offers monthly and semester-long plans that give you discounted hourly rates, priority booking, and exclusive access to premium rooms.",
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-violet-500/40 bg-white/[0.07]"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/6"
      } backdrop-blur-xl overflow-hidden`}
    >
      <button
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`text-base font-medium transition-colors duration-300 font-(family-name:--font-space-grotesk) ${
            isOpen ? "text-white" : "text-slate-300"
          }`}
        >
          {faq.question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-violet-500/40 bg-violet-500/10 text-violet-400"
              : "border-white/10 bg-white/5 text-slate-400 group-hover:border-white/20"
          }`}
        >
          {isOpen ? <FaMinus size={11} /> : <FaPlus size={11} />}
        </span>
      </button>

      {/* ANSWER — animated expand */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5">
            {/* top divider */}
            <div className="mb-4 h-px w-full bg-linear-to-r from-violet-500/20 via-cyan-500/20 to-transparent" />
            <p className="text-sm text-slate-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-[90%] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            {/* BADGE */}
            <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-1 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
              <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
              <span className="relative z-10 font-medium tracking-wide">
                FAQ
              </span>
            </div>

            <FadeIn direction="up">
              {" "}
              {/* TITLE */}
              <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk)">
                Got Questions?
                <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  We Have Answers.
                </span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              {/* DESCRIPTION */}
              <p className="mt-5 max-w-xl text-slate-400 leading-relaxed">
                Everything you need to know about booking, cancellations,
                amenities, and more — answered in one place.
              </p>
            </FadeIn>
          </div>

          {/* COUNTER PILL */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-xl self-start md:self-auto">
            <span className="text-2xl font-bold bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-(family-name:--font-space-grotesk)">
              {faqs.length}
            </span>
            <span className="text-sm text-slate-400">questions answered</span>
          </div>
        </div>

        {/* FAQ LIST */}
        <div className="flex flex-col gap-3 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-slate-500 text-sm">Still have questions?</p>
          <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-violet-600 to-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40">
            <span>Contact Support</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
