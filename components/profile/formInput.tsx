import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FormInput = ({
  label,
  register,
  name,
  type = "text",
  error,
  placeholder,
  ...props
}: any) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input
      {...register(name)}
      {...props}
      type={type}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);
