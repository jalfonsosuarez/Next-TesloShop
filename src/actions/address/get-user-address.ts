"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    let userAddress = await prisma.userAddress.findFirst({
      where: { userId },
    });

    if (!userAddress) {
      userAddress = {
        id: "",
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        phone: "",
        city: "",
        countryId: "",
        userId: "",
      };
    }

    const { countryId, address2, ...rest } = userAddress;

    return {
      ...rest,
      address2: address2 ? address2 : "",
      country: countryId,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Dirección no encontrada");
  }
};
