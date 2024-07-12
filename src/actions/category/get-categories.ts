"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetCategories = async () => {
  const session = await auth();

  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
