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
      optionValue: {
        price: number;
      };
    }[];
  }[];
};
