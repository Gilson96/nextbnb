import stripe from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // If amount is expected in pounds (decimal), convert to pence (integer)
    const amountInPence = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: amountInPence,
      currency: "gbp",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
