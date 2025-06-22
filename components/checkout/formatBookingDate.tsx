export const formatBookingDate = (start: Date, end: Date) => {
  if (!start || !end) return "";
  const startDate = start.toDateString().slice(8, 10);
  const endDate = end.toDateString().slice(8, 10);
  const month = end.toDateString().slice(4, 7);
  const year = end.toDateString().slice(10, 15);
  return `${startDate}-${endDate} ${month} ${year}`;
};
