"use client";

import React, { useEffect, useState } from "react";
import FadeIn from "@/components/UI/FadeIn";
import { Button, Card, Input, TextArea } from "@heroui/react";

import {
  FaImage,
  FaWifi,
  FaSnowflake,
  FaChalkboard,
  FaCheck,
} from "react-icons/fa";

import { LuProjector, LuPlugZap } from "react-icons/lu";

import { HiMiniSpeakerWave } from "react-icons/hi2";
import { Bounce, toast } from "react-toastify";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const amenitiesList = [
  {
    label: "Whiteboard",
    icon: <FaChalkboard />,
  },
  {
    label: "Projector",
    icon: <LuProjector />,
  },
  {
    label: "Wi-Fi",
    icon: <FaWifi />,
  },
  {
    label: "Power Outlets",
    icon: <LuPlugZap />,
  },
  {
    label: "Quiet Zone",
    icon: <HiMiniSpeakerWave />,
  },
  {
    label: "Air Conditioning",
    icon: <FaSnowflake />,
  },
];

const AddRoomForm = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    document.title = "StudyNook – Add Room";
  }, []);

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const baseRoomData = Object.fromEntries(formData.entries());

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const finalRoomData = {
      ...baseRoomData,
      floor: parseInt(baseRoomData.floor, 10) || 0,
      capacity: parseInt(baseRoomData.capacity, 10) || 0,
      hourlyRate: parseFloat(baseRoomData.hourlyRate) || 0,
      amenities: selectedAmenities,
    };

    console.log(finalRoomData);

    const { data: tokenData } = await authClient.token();

    const res = await fetch("http://localhost:5004/room", {
      method: "POST",
      headers: {
        "content-type": "application/json",

        Authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(finalRoomData),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      toast.success("Room added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      form.reset();
      redirect("/rooms");
    } else {
      toast.error("Failed to add destination.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* BADGE */}

        {/* HEADING */}
        <div className="text-center mb-12">
          <div className=" group relative mb-5 inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg " />

            <span className="relative z-10 font-medium tracking-wide">
              Add Your Room
            </span>
          </div>
          <FadeIn direction="up" delay={0.2}>
            {" "}
            <h2 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk)">
              Add New{" "}
              <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Study Room
              </span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Create a premium study environment for students and learners. Fill
              in all the room details below.
            </p>
          </FadeIn>
        </div>

        {/* FORM CARD */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl">
          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* INPUT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ROOM NAME */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Room Name
                  </label>

                  <div className="w-full">
                    <Input
                      name="roomName"
                      type="text"
                      required
                      placeholder="Enter room name"
                      radius="lg"
                      variant="bordered"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* IMAGE URL */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Image URL
                  </label>

                  <div className="">
                    <Input
                      name="image"
                      type="url"
                      required
                      placeholder="Paste image URL"
                      radius="lg"
                      variant="bordered"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* FLOOR */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Floor
                  </label>

                  <div className="relative">
                    <Input
                      name="floor"
                      type="text"
                      required
                      placeholder="e.g. 3rd Floor"
                      radius="lg"
                      variant="bordered"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* CAPACITY */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Capacity
                  </label>

                  <Input
                    name="capacity"
                    type="number"
                    required
                    min={1}
                    placeholder="Enter room capacity"
                    radius="lg"
                    variant="bordered"
                    className="w-full"
                  />
                </div>

                {/* HOURLY RATE */}
                <div className="md:col-span-2">
                  <label className="text-sm text-slate-300 mb-2 block">
                    Hourly Rate
                  </label>

                  <div>
                    <Input
                      name="hourlyRate"
                      type="number"
                      required
                      min={1}
                      placeholder="Enter hourly rate"
                      radius="lg"
                      variant="bordered"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Description
                </label>

                <TextArea
                  name="description"
                  required
                  placeholder="Write room description..."
                  radius="lg"
                  variant="bordered"
                  className="w-full"
                />
              </div>

              {/* AMENITIES */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-5 font-(family-name:--font-space-grotesk)">
                  Room Amenities
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => {
                    const isSelected = selectedAmenities.includes(
                      amenity.label,
                    );

                    return (
                      <button
                        key={amenity.label}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity.label)}
                        className={`relative flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-500/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {/* CHECK MARK */}
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                            isSelected
                              ? "bg-cyan-400 border-cyan-400 text-black"
                              : "border-white/20 text-transparent"
                          }`}
                        >
                          <FaCheck className="text-xs" />
                        </div>

                        {/* ICON */}
                        <span
                          className={`text-xl ${
                            isSelected ? "text-cyan-300" : "text-violet-400"
                          }`}
                        >
                          {amenity.icon}
                        </span>

                        {/* LABEL */}
                        <span
                          className={`font-medium ${
                            isSelected ? "text-cyan-200" : "text-slate-200"
                          }`}
                        >
                          {amenity.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                size="lg"
                radius="lg"
                className="w-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold text-base hover:scale-[1.01] transition-all duration-300"
              >
                Add Study Room
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddRoomForm;
