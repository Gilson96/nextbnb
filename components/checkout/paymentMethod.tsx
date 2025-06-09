import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

type PaymentMethodProps = {
  hostName: string;
  roomPrice: number;
};

const PaymentMethod = ({ hostName, roomPrice }: PaymentMethodProps) => {
  return (
    <section className="flex flex-col p-[2%]">
      <div className="flex flex-col items-center justify-center rounded-2xl border p-[2%] shadow">
        Stripe
      </div>
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <div className="flex flex-col ">
        <p className="text-base">Write a message to the host</p>
        <p>
          Before you can continue, let {hostName} know a little about your trip
          and why their place is a good fit.
        </p>
        <Textarea placeholder="Type your message here." />
      </div>
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <div className="flex flex-col">
        <p className="font-bold">Price details</p>
        <div className="flex w-full items-center justify-between">
          <p>{roomPrice} x 2 nights</p>
          <p>£66.00</p>
        </div>
        <div className="flex w-full items-center justify-between font-bold">
          <p>Total</p>
          <p>£66.00</p>
        </div>
      </div>
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      <Button className="border py-[7%] rounded-2xl text-base">Request to book</Button>
    </section>
  );
};

export default PaymentMethod;
