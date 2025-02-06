import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import { Heading } from "../ui/heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-md
          relative
        "
      >
        <Image
          src={imageSrc}
          alt="Property Image"
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
