import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useLoginModal } from "./useLoginModal";
import { User } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

export function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter();
  const { toast } = useToast();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      console.log("toggleFavorite");
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          await axios.post(`/api/favorites/${listingId}`);
        }
        router.refresh();
        toast({
          title: hasFavorited ? "Removed from favorites" : "Added to favorites",
          description: hasFavorited
            ? "This listing has been removed from your favorites"
            : "This listing has been added to your favorites",
          variant: "success",
        });
      } catch (error) {}
    },
    [currentUser, hasFavorited, listingId, loginModal, router, toast],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}

export default useFavorite;
