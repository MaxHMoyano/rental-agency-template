import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUserFromSession from "@/util/getCurrentUserFromSession";

export async function POST(request: Request) {
  const user = await getCurrentUserFromSession();

  if (!user) {
    return NextResponse.json(
      {
        error: "You must be logged in to create a listing",
      },
      { status: 401 },
    );
  }

  const body = await request.json();
  const {
    title,
    description,
    category,
    location,
    price,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
  } = body;

  if (!location) {
    return NextResponse.json(
      {
        error: "You must provide a location",
      },
      { status: 400 },
    );
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      locationValue: location.value,
      price: parseInt(price, 10),
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
