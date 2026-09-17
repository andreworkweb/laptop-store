"use client";

import { useState } from "react";
import { Filters } from "@/shared/components/filters/filters";
import { Header } from "@/shared/components/header/header";
import { Hero, LaptopColor } from "@/shared/hero";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<LaptopColor>("silver");

  return (
    <section className="w-full max-w-7xl mx-auto mt-7">
      <Header />
      <div className="mt-14 flex items-center justify-between">
        <Hero selectedColor={selectedColor} />
        <Filters
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
      </div>
    </section>
  );
}
