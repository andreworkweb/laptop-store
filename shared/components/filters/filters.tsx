import { ColorFilter } from "./color-filter";
import { FilterGroup, filtersData } from "./filter-group";

interface Props {}

export const Filters = ({}: Props) => {
  return (
    <section className="bg-[#10141F] border-[#1B2233] rounded-3xl max-w-70">
      <div className="flex justify-between">
        <p className="text-[18px] font-bold text-white">Filters</p>
        <button className="text-[13px] font-bold text-[#6884FF]">Reset</button>
      </div>
      <FilterGroup />
      <ColorFilter />
      <div></div>
    </section>
  );
};
