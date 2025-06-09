export const places = ["Oldham", "Bolton", "Salford", "Stockport"];
export const roomTypes = [
  "Single room",
  "Double room",
  "1-bedroom apartment",
  "Entire place",
  "Studio",
];
export const amenitiesPool = [
  "Wi-Fi",
  "Heating",
  "Air Conditioning",
  "Kitchen",
  "Washing Machine",
  "Towels",
  "TV",
  "Coffee Machine",
  "Iron",
  "Hair Dryer",
];
export const imageBase = "https://example.com/images";
export const reviewNames = [
  "Alice Johnson",
  "Mark Robinson",
  "Sandra Lee",
  "Tom Clark",
  "Emily Watson",
  "Ben Harris",
  "Natalie Brooks",
  "John Walker",
  "Laura Knight",
  "Chris Owen",
  "Sophie Green",
  "Daniel Adams",
  "Rachel Moore",
  "Luke Reed",
  "Hannah Bell",
  "Megan Wood",
  "Oliver Fox",
  "Grace Palmer",
  "Jacob Young",
  "Ella Grant",
];
export const ukHostNames = [
  "James Smith",
  "Olivia Brown",
  "William Taylor",
  "Sophie Davies",
  "Thomas Wilson",
  "Emily Evans",
  "George Thomas",
  "Jessica Johnson",
  "Harry White",
  "Lucy Hall",
  "Jack Harris",
  "Isla Lewis",
  "Charlie Young",
  "Amelia King",
  "Oscar Wright",
  "Freddie Scott",
  "Chloe Green",
  "Archie Baker",
  "Evie Carter",
  "Leo Turner",
];
export const reviewTemplates = [
  (room: string, place: string, host: string) =>
    `Had a lovely stay in this ${room.toLowerCase()} in ${place}. ${host} made everything easy and pleasant.`,
  (room: string, place: string, host: string) =>
    `The ${room.toLowerCase()} was spotless and cozy. Loved the neighborhood in ${place}, and ${host} was an excellent host.`,
  (room: string, place: string, host: string) =>
    `${host} was welcoming and responsive. The ${room.toLowerCase()} in ${place} had everything I needed.`,
  (room: string, place: string, host: string) =>
    `Highly recommend this ${room.toLowerCase()} in ${place}. ${host} ensured we were comfortable throughout the stay.`,
  (room: string, place: string, host: string) =>
    `Fantastic experience at ${place}. The ${room.toLowerCase()} exceeded expectations and ${host} was amazing!`,
];