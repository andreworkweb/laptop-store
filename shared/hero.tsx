"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [currentColor, setCurrentColor] = useState(selectedColor);
  const [nextColor, setNextColor] = useState<LaptopColor | null>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);
  const nextImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (selectedColor === currentColor || nextColor === selectedColor) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setNextColor(selectedColor);
    });

    return () => cancelAnimationFrame(frame);
  }, [currentColor, nextColor, selectedColor]);


  
  useEffect(() => {
    if (!nextColor || !currentImageRef.current || !nextImageRef.current) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { duration: 0.7, ease: "power1.inOut" },
      onComplete: () => {
        gsap.set(currentImageRef.current, { autoAlpha: 1 });
        setCurrentColor(nextColor);
        setNextColor(null);
      },
    });

    timeline
      .fromTo(
        currentImageRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0 },
        0,
      )
      .fromTo(
        nextImageRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        0,
      );

    return () => {
      timeline.kill();
    };
  }, [nextColor]);

  const currentLaptop = laptops[currentColor];
  const nextLaptop = nextColor ? laptops[nextColor] : null;

  return (
    <section className="relative h-[750px] w-[750px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          ref={currentImageRef}
          src={currentLaptop.img}
          alt={currentLaptop.name}
          width={750}
          height={750}
          priority
        />
      </div>

      {nextLaptop && (
        <div className="absolute inset-0">
          <Image
            ref={nextImageRef}
            src={nextLaptop.img}
            alt={nextLaptop.name}
            width={750}
            height={750}
          />
        </div>
      )}
    </section>
  );
};
