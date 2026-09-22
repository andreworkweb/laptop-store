import { prisma } from "@/lib/prisma";

export const findProduct = async () => {
  return prisma.product.findFirst({
    include: {
      options: {
        include: {
          values: true,
        },
      },
    },
  });
};