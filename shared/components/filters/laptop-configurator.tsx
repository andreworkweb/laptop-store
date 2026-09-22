"use client";

import { useState } from "react";

import { Filters } from "./filters";
import { Hero, LaptopColor } from "../../hero";


export const LaptopConfigurator = () => {
  const [selectedColor, setSelectedColor] = useState<LaptopColor>("silver");

  return (
    <>
      <Hero selectedColor={selectedColor} />
      <Filters
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </>
  );
};