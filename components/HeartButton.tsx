"use client";

import { User } from "@prisma/client";
import { Heart } from "lucide-react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export const HeartButton: React.FC<HeartButtonProps> = () => {
  const toggleHeart = () => {};

  return (
    <div
      onClick={toggleHeart}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <Heart
        size={28}
        className="text-white absolute -top-[2px] -right-[2px]"
      />
    </div>
  );
};
