"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import BookingModal from "./BookingModal";

const BookingButton = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        radius="full"
        size="lg"
        className="mt-8 w-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold h-14 text-base"
      >
        Book This Room
      </Button>

      <BookingModal isOpen={isOpen} onOpenChange={setIsOpen} room={room} />
    </>
  );
};

export default BookingButton;
