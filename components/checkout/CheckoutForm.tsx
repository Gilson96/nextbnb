"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle } from "lucide-react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";

type CheckoutFormProps = {
  roomPrice: number;
  daysQuantity: number;
  totalPrice: number;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
};

export default function CheckoutForm({
  roomPrice,
  daysQuantity,
  totalPrice,
  setShowSuccessModal,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const clearCart = useStore((state) => state.clearCart);
  const router = useRouter();

  // Fetch Payment Intent when component mounts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.error(error.message);
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
      </Alert>;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setShowSuccessModal(true);
      clearCart();
      // Redirect after a delay
      setTimeout(() => {
        router.push("/");
      }, 4000); // 3 seconds delay
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payement-form">
      <PaymentElement id="payment-element" />
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <div className="my-[5%] flex flex-col gap-2">
        <p className="font-bold">Price details</p>
        <div className="flex w-full items-center justify-between">
          <p>
            £{roomPrice.toFixed(2)} x {daysQuantity} nights
          </p>
          <p>£{totalPrice.toFixed(2)}</p>{" "}
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">Total Price</p>
          <p className="font-bold">£{totalPrice.toFixed(2)}</p>{" "}
        </div>
      </div>
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <Button
        type="submit"
        className="w-full rounded-2xl border py-[7%] text-base lg:py-[5%] cursor-pointer"
      >
        Request to book
      </Button>
    </form>
  );
}
