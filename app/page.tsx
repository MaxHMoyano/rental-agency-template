import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/listings/ListingCard";
import getCurrentUser from "@/actions/getCurrentUserFromSession";
import getListing from "@/actions/getListings";
import ClientWrapper from "@/components/ClientWrapper";

export default async function Home() {
  const listings = await getListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientWrapper>
        <EmptyState showReset />
      </ClientWrapper>
    );
  }
  return (
    <ClientWrapper>
      <div className="grid container gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </ClientWrapper>
  );
}
