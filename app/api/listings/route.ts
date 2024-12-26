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
      imageSrc:
        "https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
