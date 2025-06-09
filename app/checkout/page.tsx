"use client";
import PaymentMethod from "@/components/checkout/paymentMethod";
import RequestBook from "@/components/checkout/requestBook";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <main className="flex w-full flex-col text-base items-center justify-start p-[3%]">
      <Button
        onClick={() => router.back()}
        className="place-self-start rounded-full bg-neutral-300 text-base px-[7%] py-[6%] text-black"
      >
        Exit
      </Button>
      <p className="my-[3%] w-full place-self-start text-2xl font-bold">
        Request to book
      </p>
      <RequestBook
        hostName="Anna"
        roomDescription={"roomDescription"}
        roomRating={Number(3)}
      />
      <PaymentMethod hostName={"hostName"} roomPrice={3} />
    </main>
  );
};

export default page;
