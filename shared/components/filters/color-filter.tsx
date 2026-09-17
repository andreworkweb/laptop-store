import { Palette } from "lucide-react";
import { LaptopColor } from "../../hero";

interface Props {
  selectedColor: LaptopColor;
  onColorChange: (color: LaptopColor) => void;
}

export const filtersData = [
  {
    id: "color",
    icon: <Palette />,
    title: "Color",
    defaultValue: "silver",
    items: [
      { value: "black", color: "#111827" },
      { value: "silver", color: "#CBD5E1" },
      { value: "blue", color: "#3B82F6" },
      { value: "gold", color: "#E8C39E" },
    ],
  },
];

export const ColorFilter = ({ selectedColor, onColorChange }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {filtersData.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-3 mt-9">
          <div className="flex items-center pl-7 font-bold gap-2">
            {filter.icon}
            <p className="text-base font-semibold">{filter.title}</p>
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {filter.items.map((item) => (
              <label
                key={item.value}
                className="
                    flex h-10 w-10 cursor-pointer
                    items-center justify-center
                    rounded-full border border-[#E5E7EB]
                    p-1
                    has-checked:border-[#000414]
                "
              >
                <input
                  type="radio"
                  name={filter.id}
                  value={item.value}
                  checked={item.value === selectedColor}
                  onChange={() => onColorChange(item.value as LaptopColor)}
                  className="sr-only"
                />
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
