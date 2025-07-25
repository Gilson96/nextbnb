import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

// POST: Add to wishlist
export async function POST(request: Request) {
  try {
    const { userId, roomId } = await request.json();

    if (
      !userId ||
      !roomId ||
      typeof userId !== "string" ||
      typeof roomId !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid or missing required fields" },
        { status: 400 },
      );
    }

    // Check if already in wishlist
    const existing = await prisma.wishlist.findFirst({
      where: { userId, roomId },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already in wishlist" },
        { status: 200 },
      );
    }

    const wishlist = await prisma.wishlist.create({
      data: { userId, roomId },
    });

    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 },
    );
  }
}

// GET: Get all wishlist items
export async function GET() {
  try {
    const wishlist = await prisma.wishlist.findMany({
      include: { room: true },
    });

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 },
    );
  }
}
