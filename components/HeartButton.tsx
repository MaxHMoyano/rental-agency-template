"use client";

import useFavorite from "@/hooks/useFavorite";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 hover:scale-105 transition cursor-pointer"
    >
      <Heart
        size={24}
        className={`
          text-neutral-200
          ${hasFavorited ? "fill-rose-500" : "fill-neutral-400/40"}
          absolute -top-[2px] -right-[2px]`}
      />
    </div>
  );
};
