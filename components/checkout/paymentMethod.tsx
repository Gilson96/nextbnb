"use client";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PaymentMethodProps = {
  hostName: string;
  roomPrice: number;
  totalPrice: number;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const PaymentMethod = ({
  hostName,
  roomPrice,
  totalPrice,
  setShowSuccessModal
}: PaymentMethodProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const bookingDays = useStore((state) => state.bookingDates);
  const daysQuantity = Math.abs(
    bookingDays.endDate?.getDate()! - bookingDays.startDate?.getDate()!,
  );

  const cartItems = { hostName, roomPrice, totalPrice, daysQuantity };

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
      console.log(data);
    };

    createPaymentIntent();
  }, []);

  if (!clientSecret) return <p className="my-[2%]">Loading...</p>;

  return (
    <section className="flex w-full flex-col p-[2%]">
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <p className="my-[3%] w-full place-self-start text-2xl font-bold">
        Payement method
      </p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          roomPrice={roomPrice}
          daysQuantity={daysQuantity}
          totalPrice={totalPrice}
          setShowSuccessModal={setShowSuccessModal}
        />
      </Elements>
    </section>
  );
};

export default PaymentMethod;
