"use client";
import { useState } from "react";
import "react-day-picker/style.css";
import { Calendar } from "@/components/ui/calendar";

type BookingCalendarProps = {
  placeName: string;
};

const BookingCalendar = ({ placeName }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="my-[5%] flex w-full flex-col gap-1">
      <div>
        <p className="text-xl font-bold">2 nights in {placeName}</p>
        <p className="text-neutral-500">
          {date ? date.toLocaleDateString() : "pick a day"} - 12 Apr 2026
        </p>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full my-[5%] rounded-lg border flex justify-center items-center"
      />
    </div>
  );
};

export default BookingCalendar;
