"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "../ui/input";
import { House, User, Lock } from "lucide-react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      window.location.href = "/";
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative flex w-full max-w-sm items-center">
          <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <Input
            type="password"
            placeholder="Password"
            className="pl-10 shadow"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
      >
        Sign In
      </button>
      {error && <div className="text-destructive text-center">{error}</div>}
    </form>
  );
};

export default Form;
