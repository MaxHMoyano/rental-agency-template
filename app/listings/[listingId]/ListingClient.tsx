"use client";

import { ListingHeader } from "@/components/listings/ListingHeader";
import { ListingInfo } from "@/components/listings/ListingInfo";
import { CATEGORIES } from "@/constants/categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";

interface ListingClientProps {
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
  reservations?: Reservation[];
}

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return CATEGORIES.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <div className="container">
      <div className="flex flex-col gap-6">
        <ListingHeader
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-7
          md:gap-10
          mt-6
        "
        >
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </div>
  );
};
