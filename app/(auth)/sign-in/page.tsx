import { auth } from "@/auth";
import Form from "@/components/signUser/form";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Form />
    </div>
  );
};

export default SignIn;
