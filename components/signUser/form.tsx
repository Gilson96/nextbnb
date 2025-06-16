"use client";
import { signWithCredentials } from "@/lib/actions/users.actions";
import { House, User, Lock } from "lucide-react";
import { useActionState } from "react";
import { Input } from "../ui/input";
import SignInButton from "./button";

const Form = () => {
  const [data, action] = useActionState(signWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <form
      action={action}
      className="flex h-[17rem] w-[17rem] flex-col items-center justify-between rounded-2xl border p-[2%] shadow"
    >
      <div className="flex items-start gap-0.5">
        <div className="flex text-2xl">
          <p className="font-bold">Next</p>
          <p className="font-bold text-cyan-500">bnb</p>
        </div>
        <House size={30} className="text-cyan-500" />
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="relative w-full max-w-sm">
          <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <Input
            type="email"
            placeholder="Email address"
            className="pl-10 shadow"
          />
        </div>
        <div className="relative flex w-full max-w-sm items-center">
          <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <Input
            type="password"
            placeholder="Password"
            className="pl-10 shadow"
          />
        </div>
      </div>
      <SignInButton />
      {data && !data.success && (
        <div className="text-destructive text-center">{data.message}</div>
      )}
    </form>
  );
};

export default Form;
