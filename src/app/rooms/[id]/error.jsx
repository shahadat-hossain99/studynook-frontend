"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

import { FaArrowLeft } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

const ErrorPage = ({ error, reset }) => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120] px-4 py-20">
      <div className="absolute top-0 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-14 backdrop-blur-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)]">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <MdErrorOutline className="text-5xl text-red-400" />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-(family-name:--font-space-grotesk)">
              Something Went Wrong
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-400 max-w-xl mx-auto">
              We encountered an unexpected error while loading this page. Please
              try again or return to the homepage.
            </p>

            {error?.message && (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-300">
                {error.message}
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => reset()}
                radius="full"
                className="bg-linear-to-r from-violet-500 to-cyan-500 px-8 text-white font-semibold"
              >
                Try Again
              </Button>

              <Link href="/">
                <Button
                  radius="full"
                  variant="bordered"
                  className="border-white/15 bg-white/5 px-8 text-slate-200 hover:bg-white/10"
                >
                  <FaArrowLeft />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
