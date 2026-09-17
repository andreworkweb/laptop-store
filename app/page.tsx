"use client";

import { useState } from "react";
import { Filters } from "@/shared/components/filters/filters";
import { Header } from "@/shared/components/header/header";
import { Hero, LaptopColor } from "@/shared/hero";



export default function Home() {
  const [selectedColor, setSelectedColor] = useState<LaptopColor>("blue");

  return (
    <section className="w-full max-w-7xl mx-auto mt-7">
      <Header />
      <div className="flex justify-between items-center">
        <Filters
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
        <Hero selectedColor={selectedColor} />
      </div>
    </section>
  );
}
