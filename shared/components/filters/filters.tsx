"use client";

import { useState } from "react";
import { FilterGroup, Product } from "./filter-group";
import { ColorFilter } from "./color-filter";
import type { ColorOption } from "./laptop-configurator";
import type { LaptopColor } from "../../hero";

interface Props {
  product: Product;
  colorOptions: ColorOption[];
  selectedColor: LaptopColor;
  onColorChange: (color: LaptopColor) => void;
}

export const Filters = ({
  product,
  colorOptions,
  selectedColor,
  onColorChange,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<Record<string, number>>(
    {},
  );

  const handleSet = (filterId: string, price: number) => {
    setSelectedValue((prev) => ({
      ...prev,
      [filterId]: price,
    }));
  };

  const priceAccum = Object.values(selectedValue).reduce((sum, price) => {
    return sum + price;
  }, 0);

  const totalPrice = () => {
    return product.basePrice + priceAccum;
  };

  return (
    <section className="">
      <div className="grid pt-7 mb-7 ">
        <p className="font-(family-name:--font-poppins) text-3xl font-bold text-[#1F2937]">
          Customize Your Laptop
        </p>
        <p className="text-[#6B7280] text-md">
          Find the perfect specs for your needs.
        </p>
      </div>
      <FilterGroup product={product} onOptionChange={handleSet} />
      <ColorFilter
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        onColorChange={onColorChange}
      />
      <div className="mt-5 flex items-center justify-between text-[#100E09]">
        <p className="text-xl font-semibold">Total price:</p>

        <p className="text-3xl font-bold tracking-tight">${totalPrice()}</p>
      </div>
      <button className="mt-5 mb-5 w-full rounded-xl bg-[#100E09] px-6 py-4 font-semibold text-white transition hover:bg-[#202020]">
        ADD TO CART
      </button>
    </section>
  );
};
