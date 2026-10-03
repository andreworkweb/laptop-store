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

  const { productId, optionValueIds = []} = body;

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