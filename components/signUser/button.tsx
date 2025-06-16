import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="w-full cursor-pointer bg-linear-to-r from-cyan-500 to-blue-500 font-bold shadow"
      variant="default"
    >
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
};

export default SignInButton;
