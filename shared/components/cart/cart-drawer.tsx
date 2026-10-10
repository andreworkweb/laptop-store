"use client";

import { Trash, X } from "lucide-react";
import { CartButton } from "./cart-button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useCart } from "@/shared/hooks/use-cart";
import Image from "next/image";

interface CartDrawerProps {
  onClose: () => void;
}

export const CartDrawer = ({ onClose }: CartDrawerProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        overlayRef.current,
        {
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
        },
        {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(4px)",
          duration: 0.3,
        },
        0,
      )
      .fromTo(
        drawerRef.current,
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        0,
      );
  }, []);

  const handleClose = () => {
    const timeline = gsap.timeline({
      onComplete: onClose,
    });

    timeline
      .to(
        drawerRef.current,
        {
          xPercent: 100,
          duration: 0.3,
          ease: "power3.in",
        },
        0,
      )
      .to(
        overlayRef.current,
        {
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
        },
        0,
      );
  };

  useEffect(() => {
    const handleKeyEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyEsc);

    return () => {
      window.removeEventListener("keydown", handleKeyEsc);
    };
  }, []);

  const { cart, deleteCartItem, changeQuantity } = useCart();

  const laptop = {
    silver: {
      name: "Silver laptop",
      img: "/images/laptops/v1-silver-laptop.png",
    },
  };

  const total =
    cart?.items.reduce((sum, item) => {
      const optionsPrice = item.options.reduce(
        (sum, option) => sum + option.optionValue.price,
        0,
      );

      const itemTotal = (item.product.basePrice + optionsPrice) * item.quantity;

      return sum + itemTotal;
    }, 0) ?? 0;

  return (
  <>
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
      onClick={handleClose}
      ref={overlayRef}
    />

    <div
      ref={drawerRef}
      className="fixed top-0 right-0 z-50 flex h-screen w-110 max-w-full flex-col bg-white"
    >
      <div className="flex items-center justify-between px-8 pt-10 pb-6">
        <p className="text-3xl font-semibold tracking-tight">Cart</p>
        <button
          className="transition-opacity hover:opacity-50"
          onClick={handleClose}
        >
          <X />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-8 pt-12">
        {cart?.items.map((item) => {
          const optionsPrice = item.options.reduce((sum, option) => {
            return sum + option.optionValue.price;
          }, 0);

          const itemTotal =
            (item.product.basePrice + optionsPrice) * item.quantity;

          return (
            <div
              key={item.id}
              className="group flex items-start gap-4 pb-10"
            >
              <div className="w-26 shrink-0">
                <Image
                  src={laptop.silver.img}
                  alt={laptop.silver.name}
                  width={150}
                  height={150}
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-2 text-base font-semibold tracking-tight">
                  {item.product.name}
                </p>

                {item.options.map((option) => (
                  <p
                    key={option.id}
                    className="text-sm leading-6 text-black/60"
                  >
                    {option.optionValue.option.name}:{" "}
                    {option.optionValue.label}
                  </p>
                ))}
              </div>

              <div className="flex shrink-0 flex-col items-end gap-4">
                <button
                  onClick={() => deleteCartItem(item.id)}
                  className="opacity-40 transition-opacity hover:opacity-100"
                >
                  <Trash className="h-4 w-4" />
                </button>

                <p className="text-base font-semibold whitespace-nowrap">
                  {itemTotal}$
                </p>

                <div className="flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    disabled={item.quantity <= 1}
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    className="px-1 py-2 text-lg font-light transition-opacity hover:opacity-50 disabled:opacity-20"
                  >
                    -
                  </button>

                  <p className="min-w-3 text-center font-medium">
                    {item.quantity}
                  </p>

                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    className="px-1 py-2 text-lg font-light transition-opacity hover:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shrink-0 px-8 pt-6 pb-10">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium">Total</p>
          <p className="text-2xl font-semibold tracking-tight">${total}</p>
        </div>
      </div>
    </div>
  </>
);
};
