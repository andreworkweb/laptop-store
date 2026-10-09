import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("cartToken")?.value;

  if (!token) {
    return NextResponse.json({ items: [], totalAmount: 0 });
  }

  const cart = await prisma.cart.findUnique({
    where: { token },
    include: {
      items: {
        include: {
          product: true,
          options: {
            include: {
              optionValue: {
                include: {
                  option: true,
                },
              },
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
  const token = req.cookies.get("cartToken")?.value;

  let cart = token ? await prisma.cart.findUnique({ where: { token } }) : null;

  if (!cart) {
    const newToken = crypto.randomUUID();

    cart = await prisma.cart.create({
      data: { token: newToken },
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
              optionValue: {
                include: {
                  option: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const response = NextResponse.json(updatedCart);

  response.cookies.set("cartToken", cart.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

export async function DELETE(req: NextRequest) {
  const itemId = Number(req.nextUrl.searchParams.get("itemId"));

  if (!Number.isInteger(itemId) || itemId <= 0) {
    return NextResponse.json(
      { error: "Invalid cart item id" },
      { status: 400 },
    );
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
              optionValue: {
                include: {
                  option: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(updatedCart);
}

export async function PATCH(req: NextRequest) {
  const { itemId, quantity } = await req.json();

  if (
    !Number.isInteger(itemId) ||
    itemId <= 0 ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    return NextResponse.json(
      { error: "Invalid cart item id or quantity" },
      { status: 400 },
    );
  }

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    select: { cartId: true },
  });

  if (!item) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  const updatedCart = await prisma.cart.findUnique({
    where: { id: item.cartId },
    include: {
      items: {
        include: {
          product: true,
          options: {
            include: {
              optionValue: {
                include: {
                  option: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(updatedCart);
}
