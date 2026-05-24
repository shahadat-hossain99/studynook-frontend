"use client";

import { useState, useMemo } from "react";
import RoomCard from "@/components/UI/Home/RoomCard";
import NoRoomsFound from "@/components/UI/Room/NoRoomsFound";
import { MdSearch, MdClose } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Lowest Price", value: "price_asc" },
  { label: "Highest Price", value: "price_desc" },
];

const RoomFilter = ({ rooms }) => {
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinRate("");
    setMaxRate("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    search ||
    selectedAmenities.length > 0 ||
    minRate ||
    maxRate ||
    sortBy !== "newest";

  const filteredAndSortedRooms = useMemo(() => {
    let result = rooms.filter((room) => {
      const matchesSearch = room.roomName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => room.amenities?.includes(a));

      const matchesMin = minRate === "" || room.hourlyRate >= Number(minRate);
      const matchesMax = maxRate === "" || room.hourlyRate <= Number(maxRate);

      return matchesSearch && matchesAmenities && matchesMin && matchesMax;
    });

    if (sortBy === "price_asc") {
      result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === "price_desc") {
      result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return result;
  }, [rooms, search, selectedAmenities, minRate, maxRate, sortBy]);

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="relative max-w-xl mx-auto mb-6">
        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
        <input
          type="text"
          placeholder="Search rooms by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
          >
            <MdClose />
          </button>
        )}
      </div>

      {/* AMENITY FILTERS */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {amenitiesList.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);
          return (
            <button
              key={amenity}
              onClick={() => toggleAmenity(amenity)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                isSelected
                  ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {amenity}
            </button>
          );
        })}
      </div>

      {/* RATE FILTER + SORT */}
      <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
        {/* MIN RATE */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Min $</label>
          <input
            type="number"
            min={0}
            placeholder="0"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        {/* MAX RATE */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Max $</label>
          <input
            type="number"
            min={0}
            placeholder="999"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        {/* SORT DROPDOWN */}
        <div className="relative">
          <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-violet-500 transition cursor-pointer scheme-dark"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* CLEAR FILTERS */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-sm transition"
          >
            <MdClose className="text-base" />
            Clear All
          </button>
        )}
      </div>

      {/* RESULTS COUNT */}
      {hasActiveFilters && (
        <p className="text-center text-sm text-slate-500 mb-8">
          Showing{" "}
          <span className="text-violet-400 font-semibold">
            {filteredAndSortedRooms.length}
          </span>{" "}
          of {rooms.length} rooms
        </p>
      )}

      {/* ROOM GRID */}
      {filteredAndSortedRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:mt-10 mt-6">
          {filteredAndSortedRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <NoRoomsFound />
      )}
    </div>
  );
};

export default RoomFilter;
