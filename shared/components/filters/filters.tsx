"use client";

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
      <FilterGroup product={product} />
      <ColorFilter
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        onColorChange={onColorChange}
      />
      <div></div>
      <button className="mt-5 mb-5 w-full rounded-xl bg-[#100E09] px-6 py-4 font-semibold text-white transition hover:bg-[#202020]">
        ADD TO CART
      </button>
    </section>
  );
};
