"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Form from "./form";

const AuthRedirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (session) {
        router.replace("/home");
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return <Form />;
};

export default AuthRedirect;
