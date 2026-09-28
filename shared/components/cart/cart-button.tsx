"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./cart-drawer";

export const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOpenDrawer(true)}>
        <ShoppingCart />
      </button>

      {openDrawer && <CartDrawer onClose={() => setOpenDrawer(false)} />}
    </div>
  );
};
