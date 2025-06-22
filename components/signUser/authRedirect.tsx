"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Form from "./form";

const AuthRedirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // wait for session to load
    if (session) {
      router.replace("/home");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return <Form />;
};

export default AuthRedirect;
