interface FilterItem {
  label: string;
  value: string;
  price: number;
  color?: string | null;
}

export interface Product {
  name: string;
  basePrice: number;
  options: {
    id: number;
    name: string;
    type: string;
    values: FilterItem[];
  }[];
}

interface Props {
  onOptionChange: (filterId: string, price: number) => void;
  product: {
    name: string;
    basePrice: number;
    options: Product["options"];
  };
}

export const FilterGroup = ({ product, onOptionChange }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {product.options.map((option) => (
        <div key={option.id} className="flex flex-col gap-3 mt-3.5">
          <div className="flex items-center font-bold gap-2">
            <p className="bold text-xl">{option.name}.</p>
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {option.values.map((item) => (
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
                  name={option.name}
                  value={item.value}
                  className="sr-only"
                  onChange={() => onOptionChange(option.name, item.price)}
                  defaultChecked={item.price === 0}
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
    </div>
  );
};
