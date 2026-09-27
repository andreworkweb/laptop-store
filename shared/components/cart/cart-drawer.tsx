import { X } from "lucide-react";
import { CartButton } from "./cart-button";

interface CartDrawerProps {
  onClose: () => void;
}

export const CartDrawer = ({onClose}: CartDrawerProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose}/>

      <div className="fixed top-0 right-0 z-50 h-screen w-100 bg-white shadow-xl">
        <div className="flex justify-between items-center p-9">
          <p className="text-2xl font-semibold">Cart</p>
        <button className="" onClick={onClose}>
          <X />
        </button>
        </div>
      </div>
    </>
  );
};
