import { useState } from "react";


interface Filter {
  id: string;
  title: string;
  items: FilterItem[];
  defaultValue: string;
}

interface FilterItem {
  label: string;
  value: string;
  price: number;
}

export const filtersData: Filter[] = [
  {
    id: "ram",
    title: "RAM",
    defaultValue: "16",
    items: [
      { label: "8 GB", value: "8", price: -100 },
      { label: "16 GB", value: "16", price: 0 },
      { label: "32 GB", value: "32", price: 100 },
      { label: "64 GB", value: "64", price: 250 },
    ],
  },
  {
    id: "ssd",
    title: "SSD Storage",
    defaultValue: "512",
    items: [
      { label: "256 GB", value: "256", price: -50 },
      { label: "512 GB", value: "512", price: 0 },
      { label: "1 TB", value: "1024", price: 100 },
      { label: "2 TB", value: "2048", price: 250 },
    ],
  },
  {
    id: "processor",
    title: "Processor",
    defaultValue: "M2",
    items: [
      { label: "Galaxy M1", value: "M1", price: -101 },
      { label: "Galaxy M2", value: "M2", price: 0 },
      { label: "Galaxy M3", value: "M3", price: 260 },
      { label: "Galaxy M4", value: "M4", price: 500 },
    ],
  },
];

export const FilterGroup = () => {
  const LAPTOP_PRICE = 1100;

  const [selectedValue, setSelectedValue] = useState<Record<string, number>>(
    {},
  );

  const handleSet = (filterId: string, price: number) => {
    setSelectedValue((prev) => ({
      ...prev,
      [filterId]: price,
    }));
  };

  const priceAccum = Object.values(selectedValue).reduce((sum, price) => {
    return sum + price;
  }, 0);

  const totalPrice = () => {
    return LAPTOP_PRICE + priceAccum;
  };

  return (
    <div className="flex flex-col gap-6">
      {filtersData.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-3 mt-3.5">
          <div className="flex items-center font-bold gap-2">
            <p className="bold text-xl">{filter.title}.</p>
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
              has-checked:bg-[#100E09]
              has-checked:text-white
            "
              >
                <input
                  type="radio"
                  name={filter.id}
                  value={item.value}
                  className="sr-only"
                  onChange={() => handleSet(filter.id, item.price)}
                  defaultChecked={item.value === filter.defaultValue}
                />

                <span className="flex flex-col items-center gap-0.5">
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-[10px] opacity-70">
                    {item.price === 0 ? "Included" : item.price}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-5 flex items-center justify-between text-[#100E09]">
        <p className="text-xl font-semibold">Total price:</p>

        <p className="text-3xl font-bold tracking-tight">${totalPrice()}</p>
      </div>
    </div>
  );
};
