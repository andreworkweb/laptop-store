import { prisma } from "@/lib/prisma";

export const findColorOption = async (productId: number) => {
  return prisma.colorOption.findMany({
    where: { productId },
    include: {
      values: true,
    },
  });
};