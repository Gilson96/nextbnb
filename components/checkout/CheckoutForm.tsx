"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

type CheckoutFormProps = {
  roomPrice: number;
  daysQuantity: number;
  totalPrice: number;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  onSuccessfulPayment: (paymentData: {
    paymentAmount: number;
    paymentMethod: string;
  }) => Promise<void>;
};

export default function CheckoutForm({
  roomPrice,
  daysQuantity,
  totalPrice,
  setShowSuccessModal,
  onSuccessfulPayment,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const clearCart = useStore((state) => state.clearCart);
  const router = useRouter();

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
        await onSuccessfulPayment({
          paymentAmount: paymentIntent.amount,
          paymentMethod: String(paymentIntent.payment_method),
        });
        setShowSuccessModal(true);
        clearCart();
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Booking failed:", error);
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
