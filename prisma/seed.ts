import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const slug = "galaxybook-pro";

  await prisma.cartItemOption.deleteMany({
    where: {
      optionValue: {
        option: {
          product: {
            slug,
          },
        },
      },
    },
  });

  await prisma.productOptionValue.deleteMany({
    where: {
      option: {
        product: {
          slug,
        },
      },
    },
  });

  await prisma.productOption.deleteMany({
    where: {
      product: {
        slug,
      },
    },
  });

  await prisma.product.deleteMany({
    where: {
      slug,
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "GalaxyBook Pro",
      slug,
      basePrice: 1100,
      options: {
        create: [
          {
            name: "RAM",
            type: "ram",
            values: {
              create: [
                { label: "8 GB", value: "8", price: -100 },
                { label: "16 GB", value: "16", price: 0 },
                { label: "32 GB", value: "32", price: 100 },
                { label: "64 GB", value: "64", price: 250 },
              ],
            },
          },

          {
            name: "SSD Storage",
            type: "ssd",
            values: {
              create: [
                { label: "256 GB", value: "256", price: -50 },
                { label: "512 GB", value: "512", price: 0 },
                { label: "1 TB", value: "1024", price: 100 },
                { label: "2 TB", value: "2048", price: 250 },
              ],
            },
          },

          {
            name: "Processor",
            type: "processor",
            values: {
              create: [
                { label: "Galaxy M1", value: "M1", price: -101 },
                { label: "Galaxy M2", value: "M2", price: 0 },
                { label: "Galaxy M3", value: "M3", price: 260 },
                { label: "Galaxy M4", value: "M4", price: 500 },
              ],
            },
          },
        ],
      },

      colorOption: {
        create: [
          {
            name: "Color",
            type: "color",
            values: {
              create: [
                { label: "Black", value: "black", price: 0, color: "#111827" },
                { label: "Silver", value: "silver", price: 0, color: "#CBD5E1" },
                { label: "Blue", value: "blue", price: 0, color: "#3B82F6" },
                { label: "Gold", value: "gold", price: 0, color: "#E8C39E" },
              ],
            },
          }
        ]
      }
    },
  });

  console.log(product);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });