"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "../ui/input";
import { House, User, Lock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/home"); // Add this to navigate after successful sign-in
    } else {
      setError("Invalid email or password.");
      setLoading(false);
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
            className={`${error ? "border-red-400" : ""} pl-10 shadow`}
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              error && setError("");
            }}
          />
        </div>
        <div className="relative flex w-full max-w-sm items-center">
          <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <Input
            type="password"
            placeholder="password"
            className={`${error ? "border-red-400" : ""} pl-10 shadow`}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              error && setError("");
            }}
          />
        </div>
      </div>
      <Button
        disabled={loading}
        className="flex w-full cursor-pointer items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 font-bold shadow"
        variant="default"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
      {error && <div className="text-destructive text-center">{error}</div>}
    </form>
  );
};

export default Form;
