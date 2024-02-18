"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { User } from "@prisma/client";

export default async function getCurrentUserFromSession(): Promise<User | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (err) {
    return null;
  }
}
