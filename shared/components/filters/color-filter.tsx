"use client";

import { Palette } from "lucide-react";
import { ReactNode, useState } from "react";

interface ColorItem {
  value: string;
  color: string;
  icon: ReactNode;
}

export const filtersData = [
  {
    id: "color",
    icon: <Palette />,
    title: "Color",
    items: [
      { value: "black", color: "#111827" },
      { value: "silver", color: "#CBD5E1" },
      { value: "blue", color: "#3B82F6" },
      { value: "purple", color: "#A855F7" },
      { value: "gold", color: "#E8C39E" },
    ],
  },
];

export const ColorFilter = ({}) => {
  const [selectedColor, setSelectedColor] = useState("black");

  return (
    <div>
      {filtersData.map((filters) => (
        <div key={filters.id} className="flex flex-col gap-3">
          {filters.icon}
          <span>{filters.title}</span>
        </div>
      ))}
    </div>
  )
};