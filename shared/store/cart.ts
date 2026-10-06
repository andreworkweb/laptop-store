import { create } from "zustand";
import type { Cart } from "@/shared/types/cart";

type CartState = {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
}));