
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DB_PRISMA_DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const options = [
  {
    name: "RAM",
    type: "ram",
    values: [
      { label: "8 GB", value: "8", price: -100 },
      { label: "16 GB", value: "16", price: 0 },
      { label: "32 GB", value: "32", price: 100 },
      { label: "64 GB", value: "64", price: 250 },
    ],
  },
  {
    name: "SSD Storage",
    type: "ssd",
    values: [
      { label: "256 GB", value: "256", price: -50 },
      { label: "512 GB", value: "512", price: 0 },
      { label: "1 TB", value: "1024", price: 100 },
      { label: "2 TB", value: "2048", price: 250 },
    ],
  },
  {
    name: "Processor",
    type: "processor",
    values: [
      { label: "Galaxy M1", value: "M1", price: -101 },
      { label: "Galaxy M2", value: "M2", price: 0 },
      { label: "Galaxy M3", value: "M3", price: 260 },
      { label: "Galaxy M4", value: "M4", price: 500 },
    ],
  },
];

const colors = [
  {
    label: "Black",
    value: "black",
    price: 0,
    color: "#111827",
    imageUrl: "/images/laptops/v2-black-laptop.png",
  },
  {
    label: "Silver",
    value: "silver",
    price: 0,
    color: "#CBD5E1",
    imageUrl: "/images/laptops/v1-silver-laptop.png",
  },
  {
    label: "Blue",
    value: "blue",
    price: 0,
    color: "#3B82F6",
    imageUrl: "/images/laptops/3-blue-laptop.png",
  },
  {
    label: "Gold",
    value: "gold",
    price: 0,
    color: "#E8C39E",
    imageUrl: "/images/laptops/4-gold-laptop.png",
  },
];

async function main() {
  const slug = "galaxybook-pro";

  const product = await prisma.product.upsert({
    where: { slug },
    update: {
      name: "GalaxyBook Pro",
      basePrice: 1100,
    },
    create: {
      name: "GalaxyBook Pro",
      slug,
      basePrice: 1100,
    },
  });

  // RAM, SSD, Processor
  for (const option of options) {
    const existingOption = await prisma.productOption.findFirst({
      where: {
        productId: product.id,
        type: option.type,
      },
    });

    const savedOption = existingOption
      ? await prisma.productOption.update({
          where: { id: existingOption.id },
          data: { name: option.name },
        })
      : await prisma.productOption.create({
          data: {
            name: option.name,
            type: option.type,
            productId: product.id,
          },
        });

    for (const value of option.values) {
      const existingValue = await prisma.productOptionValue.findFirst({
        where: {
          optionId: savedOption.id,
          value: value.value,
        },
      });

      if (existingValue) {
        await prisma.productOptionValue.update({
          where: { id: existingValue.id },
          data: {
            label: value.label,
            price: value.price,
          },
        });
      } else {
        await prisma.productOptionValue.create({
          data: {
            ...value,
            optionId: savedOption.id,
          },
        });
      }
    }
  }

  // Colors
  const existingColorOption = await prisma.colorOption.findFirst({
    where: {
      productId: product.id,
      type: "color",
    },
  });

  const savedColorOption = existingColorOption
    ? await prisma.colorOption.update({
        where: { id: existingColorOption.id },
        data: { name: "Color" },
      })
    : await prisma.colorOption.create({
        data: {
          name: "Color",
          type: "color",
          productId: product.id,
        },
      });

  for (const color of colors) {
    const existingColor = await prisma.colorOptionValue.findFirst({
      where: {
        optionId: savedColorOption.id,
        value: color.value,
      },
    });

    if (existingColor) {
      await prisma.colorOptionValue.update({
        where: { id: existingColor.id },
        data: {
          label: color.label,
          price: color.price,
          color: color.color,
          imageUrl: color.imageUrl,
        },
      });
    } else {
      await prisma.colorOptionValue.create({
        data: {
          ...color,
          optionId: savedColorOption.id,
        },
      });
    }
  }

  console.log("✅ Product, options and colors seeded successfully!");
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
