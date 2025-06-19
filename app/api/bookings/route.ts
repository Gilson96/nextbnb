import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

// POST: Create a booking
export async function POST(request: Request) {
  try {
    const { userId, roomId, startDate, endDate, paymentAmount, paymentMethod } = await request.json();

    if (!userId || !roomId || !startDate || !endDate || !paymentAmount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        payementAmount: paymentAmount, // Your original typo was "payementAmount" in the DB.
        payementMethod: paymentMethod,
      },
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

// GET: Fetch all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
