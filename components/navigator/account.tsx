import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

const HeaderAccount = () => {
  return (
    <>
    <Link href={'/sign-in'}><RxAvatar size={40} /></Link>
    </>
    // <DropdownMenu >
    //   <DropdownMenuTrigger>
    //     <RxAvatar size={40} />
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent  className="mr-[0.7rem] md:mr-[3rem]">
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>Whichlist</DropdownMenuItem>
    //     <DropdownMenuItem>Bookings</DropdownMenuItem>
    //     <DropdownMenuItem>Profile</DropdownMenuItem>
    //     <DropdownMenuItem>Logout</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

export default HeaderAccount;
