import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

interface Props {}

export const Header = ({}: Props) => {
  return (
    <section className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <Image src="/images/icon.png" alt="Logo" width={60} height={60} />
        <h1 className="text-xl font-bold">TechStore</h1>
      </div>

      <div>
        <div className="flex gap-6">
          <Search />
          <ShoppingCart />
          <User />
        </div>
      </div>
    </section>
  );
};
