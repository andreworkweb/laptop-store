import { ReactNode } from "react";


export type Cart = {
  items: {
    id: number;
    quantity: number;
    product: {
      name: string;
      basePrice: number;
      imageUrl: string;
    };
    options: {
      id: number;
      optionValue: {
        price: number;
        label: string;
        option: {
          name: string;
        };
      };
    }[];
  }[];
};
