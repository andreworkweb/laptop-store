"use client";

import { useState } from "react";
import type { Prisma } from "@prisma/client";

import { Filters } from "./filters";
import { Hero, LaptopColor } from "../../hero";

import { Product } from "./filter-group";

export type ColorOption = Prisma.ColorOptionGetPayload<{
  include: { values: true };
}>;

interface Props {
  product: Product;
  colorOptions: ColorOption[];
}

export const LaptopConfigurator = ({ product, colorOptions }: Props) => {
  const [selectedColor, setSelectedColor] = useState<LaptopColor>("silver");

  return (
    <>
      <Hero selectedColor={selectedColor} productName={product.name} />
      <Filters
        product={product}
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </>
  );
};
