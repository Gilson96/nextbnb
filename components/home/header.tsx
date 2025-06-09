import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Header() {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-[3rem] items-center justify-center gap-2 rounded-full border py-[2%] px-[10%] shadow">
          <FaMagnifyingGlass />
          <p>Start your search</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
