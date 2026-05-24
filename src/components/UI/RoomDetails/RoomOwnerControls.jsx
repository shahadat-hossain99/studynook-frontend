"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit, MdDelete, MdClose, MdWarning } from "react-icons/md";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const RoomOwnerControls = ({ roomId }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/room/${roomId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${tokenData?.token}` },
        },
      );
      console.log("Response status:", res.status); //

      console.log(
        "Full URL:",
        `$${process.env.NEXT_PUBLIC_SERVER_URL}/room/${roomId}`,
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete room.");
        return;
      }

      toast.success("Room deleted successfully!");
      router.push("/rooms");
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    } finally {
      setLoading(false);
      setDeleteOpen(false);
    }
  };

  return (
    <>
      {/* Edit + Delete buttons */}
      <div className="flex items-center gap-2">
        <Link
          href={`/rooms/${roomId}/edit`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-500/80 hover:bg-violet-500 text-white text-sm font-medium transition backdrop-blur-sm"
        >
          <MdEdit /> Edit
        </Link>
        <button
          onClick={() => setDeleteOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium transition backdrop-blur-sm"
        >
          <MdDelete /> Delete
        </button>
      </div>

      {/* Delete confirmation modal */}
      {deleteOpen &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setDeleteOpen(false)}
            />
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#0F172A] border border-white/10 shadow-2xl p-7">
              <button
                onClick={() => setDeleteOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <MdClose />
              </button>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                  <MdWarning className="text-2xl text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-white font-(family-name:--font-space-grotesk)">
                  Delete Room?
                </h2>
                <p className="text-sm text-slate-400">
                  This will permanently delete the room and all its bookings.
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 mt-7">
                <button
                  onClick={() => setDeleteOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-300 hover:text-white transition"
                >
                  Keep Room
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 h-11 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 transition"
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default RoomOwnerControls;
