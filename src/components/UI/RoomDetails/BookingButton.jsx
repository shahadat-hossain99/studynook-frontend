"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import BookingModal from "./BookingModal";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const BookingButton = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onPress={handleClick}
        radius="full"
        size="lg"
        className="mt-8 w-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold h-14 text-base"
      >
        {session?.user ? "Book This Room" : "Login to Book"}
      </Button>

      <BookingModal isOpen={isOpen} onOpenChange={setIsOpen} room={room} />
    </>
  );
};

export default BookingButton;
