import getCurrentUser from "@/actions/getCurrentUserFromSession";
import getListingById from "@/actions/getListingById";
import ClientWrapper from "@/components/ClientWrapper";
import { EmptyState } from "@/components/EmptyState";
import { ListingClient } from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);

  if (!listing) {
    return (
      <ClientWrapper>
        <EmptyState />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientWrapper>
  );
};

export default ListingPage;
