"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { BookingDates, useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { createBooking } from "@/lib/actions/users.actions";
import { Session } from "next-auth";
import { toast } from "sonner";

type CheckoutFormProps = {
  session: Session | null;
  roomPrice: number;
  daysQuantity: number;
  totalPrice: number;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  bookingsDays: BookingDates;
};

export default function CheckoutForm({
  roomPrice,
  daysQuantity,
  totalPrice,
  session,
  roomId,
  bookingsDays,
  hostName,
  setShowSuccessModal,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const clearCart = useStore((state) => state.clearCart);
  const router = useRouter();

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.error(error.message);
      toast(error.message);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await createBooking({
          userId: session?.user.id!,
          roomId,
          startDate: bookingsDays?.startDate?.toISOString()!,
          endDate: bookingsDays?.endDate?.toISOString()!,
        });

        setShowSuccessModal(true);
        clearCart();

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Booking failed:", error);
        setPaymentError("Booking failed. Please contact support.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" />
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <div className="my-[5%] flex flex-col gap-2">
        <p className="font-bold">Price details</p>
        <div className="flex w-full items-center justify-between">
          <p>
            £{roomPrice.toFixed(2)} x {daysQuantity} nights
          </p>
          <p>£{totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">Total Price</p>
          <p className="font-bold">£{totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <Button
        type="submit"
        className="w-full cursor-pointer rounded-2xl border py-[7%] text-base lg:py-[5%]"
        disabled={!stripe || !elements}
      >
        Request to book
      </Button>
    </form>
  );
}
