import { Cpu, HardDrive } from "lucide-react";
import { ReactNode } from "react";

interface Filter {
  id: string;
  icon: ReactNode;
  title: string;
  items: FilterItem[];
  defaultValue: string;
}

interface FilterItem {
  label: string;
  value: string;
}

export const filtersData: Filter[] = [
  {
    id: "ram",
    icon: <Cpu />,
    title: "RAM",
    defaultValue: "16",
    items: [
      { label: "8 GB", value: "8" },
      { label: "16 GB", value: "16" },
      { label: "32 GB", value: "32" },
      { label: "64 GB", value: "64" },
    ],
  },
  {
    id: "ssd",
    icon: <HardDrive />,
    title: "SSD Storage",
    defaultValue: "512",
    items: [
      { label: "256 GB", value: "256" },
      { label: "512 GB", value: "512" },
      { label: "1 TB", value: "1024" },
      { label: "2 TB", value: "2048" },
    ],
  },
  {
    id: "processor",
    icon: <Cpu />,
    title: "Processor",
    defaultValue: "M2",
    items: [
      { label: "Galaxy M1", value: "M1" },
      { label: "Galaxy M2", value: "M2" },
      { label: "Galaxy M3", value: "M3" },
      { label: "Galaxy M4", value: "M4" },
    ],
  },
];

export const FilterGroup = () => {
  return (
    <div className="flex flex-col gap-6">
  {filtersData.map((filter) => (
    <div key={filter.id} className="flex flex-col gap-3 mt-3.5">
      
      <div className="flex items-center pl-7 font-bold gap-2">
        {filter.icon}
        <p className="text-base font-semibold">{filter.title}</p>
      </div>

      <div className="flex justify-center flex-wrap gap-2">
        {filter.items.map((item) => (
          <label
            key={item.value}
            className="
              flex h-12 min-w-27 cursor-pointer
              items-center justify-center
              rounded-xl border border-[#E5E7EB] px-5
              text-sm font-medium shadow-sm
              transition-all duration-200
              hover:border-gray-400 hover:bg-gray-50
              has-checked:border-[#1E2230]
              has-checked:bg-[#1E2230]
              has-checked:text-white
            "
          >
            <input
              type="radio"
              name={filter.id}
              value={item.value}
              defaultChecked={item.value === filter.defaultValue}
              className="sr-only"
            />

            <p className="font-semibold">{item.label}</p>
          </label>
        ))}
      </div>
    </div>
  ))}
</div>
  );
};
