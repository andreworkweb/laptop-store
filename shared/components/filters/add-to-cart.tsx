"use client";

import { useState } from "react";
import { useCart } from "@/shared/hooks/use-cart";

type Props = {
  productId: number;
};

export const AddToCart = ({ productId }: Props) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    setLoading(true);
    setMessage("");

    try {
      await addToCart(productId);
      setMessage("Product added to cart");
    } catch {
      setMessage("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={loading}
        className="mt-5 mb-5 w-full rounded-xl bg-[#100E09] px-6 py-4 font-semibold text-white transition hover:bg-[#202020] disabled:opacity-50"
      >
        {loading ? "ADDING..." : "ADD TO CART"}
      </button>
      <p>{message}</p>
    </div>
  );
};
