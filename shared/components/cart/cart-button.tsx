"use client";

import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CartDrawer } from "./cart-drawer";

export const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDrawer(false);
      }
    };

    window.addEventListener("keydown", handleKeyEsc);

    return () => window.removeEventListener("keydown", handleKeyEsc);
  }, []);

  return (
    <div>
      <button onClick={() => setOpenDrawer(true)}>
        <ShoppingCart />
      </button>

      {openDrawer && <CartDrawer onClose={() => setOpenDrawer(false)}/>}
    </div>
  );
};
