"use client";

import { useState } from "react";
import { FilterGroup } from "./filter-group";
import type { Product } from "./filter-group";
import { ColorFilter } from "./color-filter";
import type { ColorOption } from "./laptop-configurator";
import type { LaptopColor } from "../../hero";
import { AddToCart } from "./add-to-cart";

interface Props {
  product: Product;
  colorOptions: ColorOption[];
  selectedColor: LaptopColor;
  onColorChange: (color: LaptopColor) => void;
}

type SelectedOption = {
  id: number;
  price: number;
};

export const Filters = ({
  product,
  colorOptions,
  selectedColor,
  onColorChange,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<
    Record<string, SelectedOption>
  >(() => {
    const values: Record<string, SelectedOption> = {};

    for (const option of product.options) {
      const value = option.values.find((value) => value.price === 0);

      if (value) {
        values[option.name] = {
          id: value.id,
          price: value.price,
        };
      }
    }

    return values;
  });

  const handleSet = (filterId: string, price: number, valueId: number) => {
    setSelectedValue((prev) => ({
      ...prev,
      [filterId]: {
        id: valueId,
        price,
      },
    }));
  };

  const selectedOptions = Object.values(selectedValue);

  const priceAccum = selectedOptions.reduce((sum, option) => {
    return sum + option.price;
  }, 0);

  const totalPrice = product.basePrice + priceAccum;

  const optionValueIds = selectedOptions.map((option) => option.id);

  return (
    <section className="">
      <div className="grid pt-7 mb-7">
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
        <p className="text-3xl font-bold tracking-tight">${totalPrice}</p>
      </div>

      <AddToCart productId={product.id} optionValueIds={optionValueIds} />
    </section>
  );
};
