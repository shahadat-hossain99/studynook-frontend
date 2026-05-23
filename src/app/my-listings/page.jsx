"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import RoomCard from "@/components/UI/Home/RoomCard";
import Link from "next/link";

const MyListingsPage = () => {
  const { data: session } = authClient.useSession();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "StudyNook – My Listings";
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    const fetchListings = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`http://localhost:5004/my-listings`, {
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        });

        const data = await res.json();
        setRooms(data);
      } catch {
        console.error("Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [session]);

  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-11/12 mx-auto">
        {/* HEADING */}
        <div className="mb-14">
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white md:leading-18 font-(family-name:--font-space-grotesk)">
            My{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Listings
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-slate-400 leading-relaxed">
            Manage all the study rooms you&apos;ve added to StudyNook.
          </p>
        </div>

        {loading ? (
          // Skeleton loader
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-120 rounded-3xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : rooms?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <span className="text-4xl">🏠</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-(family-name:--font-space-grotesk)">
              No listings yet
            </h2>
            <p className="mt-3 text-slate-400 max-w-md">
              You haven&apos;t added any study rooms yet. Start by adding your
              first room.
            </p>
            <Link
              href="/add-rooms"
              className="mt-8 px-6 py-3 rounded-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
            >
              Add a Room
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyListingsPage;
