import { ColorFilter } from "./color-filter";
import { FilterGroup } from "./filter-group";
import { LaptopColor } from "../../hero";

interface Props {
  selectedColor: LaptopColor;
  onColorChange: (color: LaptopColor) => void;
}

export const Filters = ({ selectedColor, onColorChange }: Props) => {
  return (
    <section className="bg-[#FAFBFD] border-[#1B2233] rounded-3xl max-w-80 shadow-xl">
      <div className="grid justify-center pt-4 mb-4">
        <p className="text-[18px] font-bold text-[#1F2937] font-bold">
          Customize Your Laptop
        </p>
        <p className="text-[#6B7280] text-[16px]">
          Find the perfect specs for your needs.
        </p>
      </div>
      <FilterGroup />
      <ColorFilter
        selectedColor={selectedColor}
        onColorChange={onColorChange}
      />
      <div></div>
      <button className="mt-5 mb-5 w-full rounded-xl bg-[#1E2230] px-6 py-4 font-semibold text-white transition hover:bg-[#2A2F40]">
        ADD TO CART
      </button>
    </section>
  );
};
