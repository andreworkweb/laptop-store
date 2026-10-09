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
        className="fixed top-0 right-0 z-50 h-screen w-100 bg-white shadow-xl flex flex-col"
      >
        <div className="flex justify-between items-center p-9">
          <p className="text-2xl font-semibold">Cart</p>
          <button className="" onClick={handleClose}>
            <X />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-9">
          {cart?.items.map((item) => {
            const optionsPrice = item.options.reduce((sum, option) => {
              return sum + option.optionValue.price;
            }, 0);

            const itemTotal =
              (item.product.basePrice + optionsPrice) * item.quantity;

            return (
              <div key={item.id}>
                <p>{item.product.name}</p>
                <Image
                  src={laptop.silver.img}
                  alt={laptop.silver.name}
                  width={750}
                  height={750}
                />
                <div>
                  {item.options.map((option) => (
                    <p key={option.id}>
                      {option.optionValue.option.name}:{" "}
                      {option.optionValue.label}
                    </p>
                  ))}
                </div>
                <p>{itemTotal}$</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={item.quantity <= 1}
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    className="disabled:opacity-40"
                  >
                    -
                  </button>

                  <p>Quantity: {item.quantity}</p>

                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => deleteCartItem(item.id)}>
                  <Trash />
                </button>
              </div>
            );
          })}
        </div>

        <div className="shrink-0 p-5 shadow-xl">
          <div className="flex justify-between">
            <p>Total:</p>
            <p>${total}</p>
          </div>
        </div>
      </div>
    </>
  );
};
