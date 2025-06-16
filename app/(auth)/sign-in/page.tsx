import { authConfig } from "@/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Form from "@/components/signUser/form";

const SignIn = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Form />
    </div>
  );
};

export default SignIn;
