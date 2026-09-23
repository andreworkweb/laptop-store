import { Header } from "@/shared/components/header/header";
import { LaptopConfigurator } from "../shared/components/filters/laptop-configurator";

import { findProduct } from "@/lib/find-product";
import { findColorOption } from "@/lib/find-color-option";

export default async function Home() {
  const product = await findProduct();

  if (!product) {
    return <div>Product not found</div>;
  }

  const colorOptions = await findColorOption(product.id);

  return (
    <section className="w-full max-w-7xl mx-auto mt-7">
      <Header />
      <div className="mt-14 flex items-center justify-between">
        <LaptopConfigurator product={product} colorOptions={colorOptions} />
      </div>
    </section>
  );
}
