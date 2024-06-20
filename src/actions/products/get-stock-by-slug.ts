"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    if (!product) return 0;

    return product.inStock;
  } catch (error) {
    throw new Error("Error al obtener stock por slug");
  }
};
