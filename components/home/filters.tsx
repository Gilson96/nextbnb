"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FiltersSetup from "./filtersSetup";

type FiltersProps = {
  places: { id: string; placeName: string }[];
};

const Filters = ({ places }: FiltersProps) => {
  return (
    <div className="flex items-center justify-end gap-1 p-[2%]">
      <FiltersSetup places={places} />
    </div>
  );
};

export default Filters;
