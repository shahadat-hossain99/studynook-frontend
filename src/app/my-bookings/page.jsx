"use client";

import { useEffect, useState } from "react";

import NoBookingsFound from "@/components/UI/Bookings/NoBookingsFound";
import { authClient } from "@/lib/auth-client";
import BookingCard from "@/components/UI/Bookings/BookingCard";

const MyBookingPage = () => {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "StudyNook – My Bookings";
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    const fetchBookings = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`http://localhost:5004/bookings`, {
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        });

        const data = await res.json();
        setBookings(data);
      } catch {
        console.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const handleCancelled = (cancelledId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === cancelledId ? { ...b, status: "cancelled" } : b,
      ),
    );
  };

  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-11/12 mx-auto">
        <div className="mb-14">
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white md:leading-18 font-(family-name:--font-space-grotesk)">
            My{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-slate-400 leading-relaxed">
            Where Focus Finds its Place. Book your room in seconds.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : bookings?.length > 0 ? (
          <div className="flex flex-col gap-5">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancelled={handleCancelled}
              />
            ))}
          </div>
        ) : (
          <NoBookingsFound />
        )}
      </div>
    </section>
  );
};

export default MyBookingPage;
