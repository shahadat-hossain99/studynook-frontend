"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-black bg-linear-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          The page you are looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to your study journey.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button
              size="lg"
              radius="lg"
              className="bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold px-8"
            >
              <FaHome />
              Back to Home
            </Button>
          </Link>

          <Button
            size="lg"
            radius="lg"
            variant="bordered"
            onPress={() => window.history.back()}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8"
          >
            <FaArrowLeft />
            Go Back
          </Button>
        </div>

        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      </div>
    </section>
  );
};

export default NotFound;
