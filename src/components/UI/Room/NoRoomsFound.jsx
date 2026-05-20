"use client";

import Link from "next/link";

import { Button } from "@heroui/react";

import { FaMagnifyingGlass } from "react-icons/fa6";

const NoRoomsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      {/* ICON */}
      <div className="flex items-center justify-center h-24 w-24 rounded-full border border-violet-500/20 bg-violet-500/10">
        <FaMagnifyingGlass className="text-4xl text-violet-400" />
      </div>

      {/* TITLE */}
      <h2 className="mt-8 text-4xl font-bold text-white font-(family-name:--font-space-grotesk)">
        No Rooms Found
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-4 max-w-lg text-slate-400 leading-relaxed">
        We couldn&apos;t find any study rooms matching your search or filters.
        Try exploring different options.
      </p>

      {/* BUTTON */}
      <Link href="/">
        <Button
          radius="full"
          className="mt-8 bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold px-8"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NoRoomsFound;
