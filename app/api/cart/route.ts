import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cart = await prisma.cart.findFirst({
    include: {
      items: {
        include: {
          product: true,
          options: {
            include: {
              optionValue: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { productId, optionValueIds = [] } = body;

  let cart = await prisma.cart.findFirst();

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        token: crypto.randomUUID(),
      },
    });
  }

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,

      options: {
        create: optionValueIds.map((optionValueId: number) => ({
          optionValueId,
        })),
      },
    },
  });

  const updatedCart = await prisma.cart.findUnique({
    where: {
      id: cart.id,
    },
    include: {
      items: {
        include: {
          product: true,
          options: {
            include: {
              optionValue: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(updatedCart);
}

export async function DELETE(req: NextRequest) {
  const itemId = Number(req.nextUrl.searchParams.get("itemId"));

  if (!Number.isInteger(itemId) || itemId <= 0) {
    return NextResponse.json({ error: "Invalid cart item id" }, { status: 400 });
  }

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    select: { cartId: true },
  });

  if (!item) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  const updatedCart = await prisma.cart.findUnique({
    where: { id: item.cartId },
    include: {
      items: {
        include: {
          product: true,
          options: {
            include: {
              optionValue: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(updatedCart);
}
