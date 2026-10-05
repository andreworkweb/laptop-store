import { useEffect, useState } from "react";
import {
  getCart,
  addToCart as addCartItem,
  deleteCartItem as deleteItem,
} from "../services/cart";

type Cart = {
  items: {
    id: number;
    quantity: number;
    product: {
      name: string;
      basePrice: number;
      imageUrl: string;
    };
  }[];
};

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  async function addToCart(productId: number) {
    const updatedCart = await addCartItem(productId, []);
    setCart(updatedCart);
  }

  async function deleteCartItem(itemId: number) {
    const updatedCart = await deleteItem(itemId);
    setCart(updatedCart);
  }

  return {
    cart,
    setCart,
    addToCart,
    deleteCartItem,
  };
}
