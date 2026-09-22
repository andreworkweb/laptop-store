"use client";

import { useState } from "react";

import { Filters } from "./filters";
import { Hero, LaptopColor } from "../../hero";

import { Product } from "./filter-group";

interface Props {
  product: Product;
}

export const LaptopConfigurator = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState<LaptopColor>("silver");

  return (
    <>
      <Hero selectedColor={selectedColor} productName={product.name} />
      <Filters
        product={product}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </>
  );
};