"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input, Button } from "@heroui/react";
import { FaWifi, FaSnowflake, FaChalkboard, FaCheck } from "react-icons/fa";
import { LuProjector, LuPlugZap } from "react-icons/lu";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

const amenitiesList = [
  { label: "Whiteboard", icon: <FaChalkboard /> },
  { label: "Projector", icon: <LuProjector /> },
  { label: "Wi-Fi", icon: <FaWifi /> },
  { label: "Power Outlets", icon: <LuPlugZap /> },
  { label: "Quiet Zone", icon: <HiMiniSpeakerWave /> },
  { label: "Air Conditioning", icon: <FaSnowflake /> },
];

const EditRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (!session?.user) return;

    const fetchRoom = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`http://localhost:5004/room/${id}`, {
          headers: { Authorization: `Bearer ${tokenData?.token}` },
        });
        const data = await res.json();

        if (data.ownerUserId !== session?.user?.id) {
          toast.error("You don't own this room.");
          router.push(`/rooms/${id}`);
          return;
        }

        setRoom(data);
        setSelectedAmenities(data.amenities || []);
      } catch {
        toast.error("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, session, router]);

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const base = Object.fromEntries(formData.entries());

    const updatedRoom = {
      ...base,
      floor: parseInt(base.floor, 10) || 0,
      capacity: parseInt(base.capacity, 10) || 0,
      hourlyRate: parseFloat(base.hourlyRate) || 0,
      amenities: selectedAmenities,
    };

    try {
      setSubmitting(true);

      const { data: tokenData } = await authClient.token();

      const res = await fetch(`http://localhost:5004/room/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updatedRoom),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update room.");
        return;
      }

      toast.success("Room updated successfully!");
      router.push(`/rooms/${id}`);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-(family-name:--font-space-grotesk)">
            Edit{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Study Room
            </span>
          </h2>
          <p className="text-slate-400 mt-4">Update your room details below.</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Room Name
                </label>
                <Input
                  name="roomName"
                  required
                  defaultValue={room?.roomName}
                  radius="lg"
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Image URL
                </label>
                <Input
                  name="image"
                  required
                  defaultValue={room?.image}
                  radius="lg"
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Floor
                </label>
                <Input
                  name="floor"
                  required
                  defaultValue={room?.floor}
                  radius="lg"
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Capacity
                </label>
                <Input
                  name="capacity"
                  type="number"
                  min={1}
                  required
                  defaultValue={room?.capacity}
                  radius="lg"
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-slate-300 mb-2 block">
                  Hourly Rate
                </label>
                <Input
                  name="hourlyRate"
                  type="number"
                  min={1}
                  required
                  defaultValue={room?.hourlyRate}
                  radius="lg"
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-slate-300 mb-2 block">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  defaultValue={room?.description}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition resize-none"
                />
              </div>
            </div>

            {/* AMENITIES */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 font-(family-name:--font-space-grotesk)">
                Room Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {amenitiesList.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity.label);
                  return (
                    <button
                      key={amenity.label}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity.label)}
                      className={`flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-500/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? "bg-cyan-400 border-cyan-400 text-black"
                            : "border-white/20 text-transparent"
                        }`}
                      >
                        <FaCheck className="text-xs" />
                      </div>
                      <span
                        className={`text-xl ${isSelected ? "text-cyan-300" : "text-violet-400"}`}
                      >
                        {amenity.icon}
                      </span>
                      <span
                        className={`font-medium ${isSelected ? "text-cyan-200" : "text-slate-200"}`}
                      >
                        {amenity.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push(`/rooms/${id}`)}
                className="flex-1 h-12 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                radius="lg"
                className="flex-1 bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoomPage;
