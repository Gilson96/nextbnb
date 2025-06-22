import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";

type HeaderAccountProps = {
  session: Session | null;
};
const HeaderAccount = ({ session }: HeaderAccountProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <RxAvatar size={40} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-[0.7rem] md:mr-[3rem]">
          <DropdownMenuLabel className="font-bold">{session?.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/profile`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeaderAccount;
