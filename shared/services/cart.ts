



export async function getCart() {
  const res = await fetch("/api/cart");

  if (!res.ok) {
    throw new Error("Error loading cart");
  }

  return res.json();
}

export async function addToCart(productId: number, optionValueIds: number[] = [],) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      optionValueIds,
    }),
  });

  if (!res.ok) {
    throw new Error("Add item error");
  }

  return res.json()
}