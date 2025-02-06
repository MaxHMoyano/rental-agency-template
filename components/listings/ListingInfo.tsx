import { Category } from "@/constants/categories";
import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import { ListingCategory } from "./ListingCategory";

interface ListingInfoProps {
  user: User;
  category?: Category;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

export const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div
          className="
          text-xl
          font-semibold
          flex
          flex-row
          items-center
          gap-2
        "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
          flex
          flex-row
          items-center
          gap-4
          font-light
          text-neutral-500
        "
        >
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">{description}</div>
      </div>
    </div>
  );
};
