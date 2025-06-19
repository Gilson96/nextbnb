"use client";
import { useStore } from "@/store";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Session } from "next-auth";
import { createBooking } from "@/lib/actions/users.actions";
import { toast } from "sonner";

type PaymentMethodProps = {
  hostName: string;
  roomPrice: number;
  totalPrice: number;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  session: Session | null;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const PaymentMethod = ({
  roomPrice,
  totalPrice,
  setShowSuccessModal,
  roomId,
  session,
}: PaymentMethodProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const bookingDays = useStore((state) => state.bookingDates);
  const daysQuantity = Math.abs(
    bookingDays.endDate?.getDate()! - bookingDays.startDate?.getDate()!,
  );

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [totalPrice]);

  const handleSuccessfulPayment = async (paymentData: {
    paymentAmount: number;
    paymentMethod: string;
  }) => {
    if (!session?.user?.id) return;

    try {
      await createBooking({
        userId: session.user.id,
        roomId,
        startDate: bookingDays.startDate!,
        endDate: bookingDays.endDate!,
        payementAmount: paymentData.paymentAmount,
        payementMethod: paymentData.paymentMethod,
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Booking creation failed:", error);
      toast.error("Booking failed", { position: "top-center" });
    }
  };

  if (!clientSecret) return <p className="my-[2%]">Loading...</p>;

  return (
    <section className="flex w-full flex-col p-[2%]">
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300 lg:hidden" />
      <p className="my-[3%] w-full place-self-start text-2xl font-bold">
        Payement method
      </p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          roomPrice={roomPrice}
          daysQuantity={daysQuantity}
          totalPrice={totalPrice}
          setShowSuccessModal={setShowSuccessModal}
          onSuccessfulPayment={handleSuccessfulPayment}
        />
      </Elements>
    </section>
  );
};

export default PaymentMethod;
