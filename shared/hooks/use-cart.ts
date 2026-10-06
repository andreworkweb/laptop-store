"use client";

import { useEffect } from "react";
import {
  getCart,
  addToCart as addCartItem,
  deleteCartItem as deleteItem,
  updateCartItemQuantity,
} from "../services/cart";
import { useCartStore } from "@/shared/store/cart";

export function useCart() {
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    getCart().then(setCart);
  }, [setCart]);

  async function addToCart(productId: number, optionValueIds: number[]) {
    const updatedCart = await addCartItem(productId, optionValueIds);
    setCart(updatedCart);
  }

  async function deleteCartItem(itemId: number) {
    const updatedCart = await deleteItem(itemId);
    setCart(updatedCart);
  }

  async function changeQuantity(itemId: number, quantity: number) {
    const updatedCart = await updateCartItemQuantity(itemId, quantity);
    setCart(updatedCart);
  }

  return {
    cart,
    setCart,
    addToCart,
    deleteCartItem,
    changeQuantity,
  };
}
