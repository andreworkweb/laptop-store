
import { Filters } from "@/shared/components/filters/filters";
import { Header } from "@/shared/components/header/header";
import { Hero } from "@/shared/hero";

export default function Home() {
  return (
    <section className="w-full max-w-7xl mx-auto mt-7">
      <Header />
      <Filters />
      <Hero />
    </section>
  );
}
