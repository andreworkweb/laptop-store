"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { useCart } from "@/shared/hooks/use-cart";
import { useCartStore } from "@/shared/store/cart";

export const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  useCart();
  const itemCount = useCartStore((state) =>
    state.cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0,
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpenDrawer(true)}
        className="relative"
        aria-label={`Open cart, ${itemCount} items`}
      >
        <ShoppingCart />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
            <p className="font-bold">{itemCount}</p>
          </span>
        )}
      </button>

      {openDrawer && <CartDrawer onClose={() => setOpenDrawer(false)} />}
    </div>
  );
};
