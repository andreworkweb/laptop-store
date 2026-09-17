import Image from "next/image";

export type LaptopColor = "silver" | "black" | "blue" | "gold";

interface Props {
  selectedColor: LaptopColor;
}

const laptops = {
  silver: { name: "Silver laptop", img: "/images/laptops/v1-silver-laptop.png" },
  black: { name: "Black laptop", img: "/images/laptops/v2-black-laptop.png" },
  blue: { name: "Blue laptop", img: "/images/laptops/3-blue-laptop.png" },
  gold: { name: "Gold laptop", img: "/images/laptops/4-gold-laptop.png" },
} satisfies Record<LaptopColor, { name: string; img: string }>;

export const Hero = ({ selectedColor }: Props) => {
  const laptop = laptops[selectedColor];

  return (
    <section>
      <div>
        <Image
          src={laptop.img}
          alt={laptop.name}
          width={750}
          height={750}
        />
      </div>
    </section>
  );
};
