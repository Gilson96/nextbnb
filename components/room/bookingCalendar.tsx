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
  const daysQuantity = Math.abs(
    (bookingDates.endDate === undefined
      ? roomPrice
      : bookingDates.endDate.getDate()!) -
      (bookingDates.startDate === undefined
        ? roomPrice
        : bookingDates.startDate.getDate()!),
  );
  const onDateChange = (dateRange: { from?: Date; to?: Date }) => {
    setBookingPrice(
      { startDate: dateRange.from, endDate: dateRange.to },
      roomPrice,
    );
  };

  console.log(bookingDates.endDate);
  return (
    <div className="my-[5%] flex w-full flex-col gap-1 md:my-0 md:p-[2%]">
      <div>
        <p className="text-xl font-bold">
          {daysQuantity === 0
            ? "Pick a date"
            : `${daysQuantity} nights in ${placeName}`}{" "}
        </p>
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
        className="my-[5%] flex w-full items-center justify-center rounded-lg border md:w-[23rem]"
      />
    </div>
  );
};

export default BookingCalendar;
