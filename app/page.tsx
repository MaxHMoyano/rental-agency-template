import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/listings/ListingCard";
import getCurrentUserFromSession from "@/util/getCurrentUserFromSession";
import getListing from "@/util/getListings";

export default async function Home() {
  const listings = await getListing();
  const currentUser = await getCurrentUserFromSession();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <div className="grid container gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          currentUser={currentUser}
          data={listing}
        />
      ))}
    </div>
  );
}
