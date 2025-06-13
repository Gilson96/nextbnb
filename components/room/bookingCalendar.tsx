"use client";
import { useState } from "react";
import "react-day-picker/style.css";
import { Calendar } from "@/components/ui/calendar";
import { useStore } from "@/store";

type BookingCalendarProps = {
  placeName: string;
  roomPrice: number;
};

const BookingCalendar = ({ placeName, roomPrice }: BookingCalendarProps) => {
  const bookingDates = useStore((state) => state.bookingDates);
  const setBookingPrice = useStore((state) => state.setBookingPrice);

  const onDateChange = (dateRange: { from?: Date; to?: Date }) => {
    setBookingPrice(
      { startDate: dateRange.from, endDate: dateRange.to },
      roomPrice,
    );
  };

  return (
    <div className="my-[5%] flex w-full flex-col gap-1 md:p-[2%] md:my-0">
      <div>
        <p className="text-xl font-bold">2 nights in {placeName}</p>
        <p className="text-neutral-500">
          {bookingDates?.startDate?.toLocaleDateString() || "pick a date"} -{" "}
          {bookingDates?.endDate?.toLocaleDateString() || "pick a date"}
        </p>
      </div>
      <Calendar
        required
        mode="range"
        selected={{ from: bookingDates.startDate, to: bookingDates.endDate }}
        onSelect={onDateChange}
        className="my-[5%] flex w-full md:w-[23rem] items-center justify-center rounded-lg border"
      />
    </div>
  );
};

export default BookingCalendar;
