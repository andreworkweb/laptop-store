"use client";

import { Trash, X } from "lucide-react";
import { CartButton } from "./cart-button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useCart } from "@/shared/hooks/use-cart";

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

  const { cart, deleteCartItem } = useCart();
  
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={handleClose}
        ref={overlayRef}
      />

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-50 h-screen w-100 bg-white shadow-xl"
      >
        <div className="flex justify-between items-center p-9">
          <p className="text-2xl font-semibold">Cart</p>
          <button className="" onClick={handleClose}>
            <X />
          </button>
        </div>
        
        <div className="p-9">
    {cart?.items.map((item) => (
      <div key={item.id}>
        <p>{item.product.name}</p>
        <p>{item.product.basePrice}$</p>
        <p>Quantity: {item.quantity}</p>
        <button className="" onClick={() => deleteCartItem(item.id)}><Trash /></button>
      </div>
    ))}
  </div>

      </div>
    </>
  );
};
