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
    defaultValue: "Gen2",
    items: [
      { label: "Galaxy Core Gen1", value: "Gen1" },
      { label: "Galaxy Core Gen2", value: "Gen2" },
      { label: "Galaxy Core Gen3", value: "Gen3" },
      { label: "Galaxy Core Gen4", value: "Gen4" },
    ],
  },
];

export const FilterGroup = () => {
  return (
    <div className="flex flex-col gap-5">
      {filtersData.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-2.5">
          <div className="flex gap-2">
            {filter.icon}
            <p className="text-base font-semibold">{filter.title}</p>
          </div>

          <div className="flex flex-col gap-1">
            {filter.items.map((item) => (
              <label key={item.value}>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name={filter.id}
                    value={item.value}
                    defaultChecked={item.value === filter.defaultValue}
                  />
                  {item.label}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
