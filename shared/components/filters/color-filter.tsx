import { Palette } from "lucide-react";
import type { LaptopColor } from "../../hero";
import type { ColorOption } from "./laptop-configurator";

interface Props {
  colorOptions: ColorOption[];
  selectedColor: LaptopColor;
  onColorChange: (color: LaptopColor) => void;
}

export const ColorFilter = ({
  colorOptions,
  selectedColor,
  onColorChange,
}: Props) => {
  const colorOption = colorOptions.find((option) => option.type === "color");

  if (!colorOption) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {colorOptions.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-3 mt-9">
          <div className="flex items-center pl-7 font-bold gap-2">
            <Palette />
            <p className="text-base font-semibold">{filter.name}</p>
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {filter.values.map((item) => (
              <label
                key={item.value}
                className="
                    group relative flex h-10 w-10 cursor-pointer
                    items-center justify-center
                    rounded-full border border-[#E5E7EB]
                    p-1
                    has-checked:border-[#000414]
                    has-focus-visible:outline-2
                    has-focus-visible:outline-offset-4
                    has-focus-visible:outline-[#100E09]
                "
              >
                <input
                  type="radio"
                  aria-label={item.label}
                  name={filter.name}
                  value={item.value}
                  checked={item.value === selectedColor}
                  onChange={() => onColorChange(item.value as LaptopColor)}
                  className="sr-only"
                />
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-[#100E09] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-has-focus-visible:translate-y-0 group-has-focus-visible:opacity-100 motion-reduce:transition-none"
                >
                  {item.label}
                  <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#100E09]" />
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
