"use client";
import PaymentMethod from "@/components/checkout/paymentMethod";
import RequestBook from "@/components/checkout/requestBook";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const cart = useStore((state) => state.cart);
  const router = useRouter();
  const clearCart = useStore((state) => state.clearCart);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  return (
    <main className="flex w-full flex-col items-center justify-start p-[3%] text-base">
      {showSuccessModal ? (
        <div className="bg-opacity-50 fixed inset-0 flex w-full items-center justify-center bg-black">
          <div className="flex flex-col items-center rounded-xl bg-white p-6 shadow-lg">
            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-xl font-semibold">Payment Successful!</h2>
            <p>Redirecting to homepage...</p>
          </div>
        </div>
      ) : (
        <>
          <Button
            onClick={() => {
              router.back();
              clearCart();
            }}
            className="place-self-start rounded-full bg-neutral-300 px-[7%] py-[6%] text-base text-black"
          >
            Exit
          </Button>
          {cart.map((c, index) => (
            <>
              <RequestBook
                hostName={c.host.hostName}
                roomDescription={c.room.roomDescription}
                roomRating={Number(c.room.roomRating)}
                roomImage={c.image}
              />
              <PaymentMethod
                hostName={c.host.hostName}
                totalPrice={c.totalPrice}
                roomPrice={c.room.roomPrice}
                setShowSuccessModal={setShowSuccessModal}
              />
            </>
          ))}
        </>
      )}
    </main>
  );
};

export default page;
