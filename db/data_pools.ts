import { hashSync } from "bcrypt-ts-edge";

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
export const galleryPool = [
  {
    singleRoom: [
      "https://i.postimg.cc/W109r1t5/single-bed-room-1.jpg",
      "https://i.postimg.cc/ZR5PtRV5/apartement-bathroom-1.jpg",
      "https://i.postimg.cc/7Y23yjM0/one-bedroom-apartement-3.jpg",
    ],
  },
  {
    doubleRoom: [
       "https://i.postimg.cc/BbPXdhwM/double-bed-room.jpg",
       "https://i.postimg.cc/8P1CdzTZ/double-living-room.jpg",
       "https://i.postimg.cc/sfJj2C57/apartement-bathroom-2.jpg",
    ],
  },
  {
    oneBedroomFlat: [
       "https://i.postimg.cc/jSHvpcpx/studio-flat-kitchen.jpg",
       "https://i.postimg.cc/GmKgBzqM/studio-flat-1.jpg",
       "https://i.postimg.cc/ZqDfHnkp/apartement-bathroom-3.jpg",
    ],
  },
  {
    studio: [
       "https://i.postimg.cc/wM5cCTrW/studio-flat-with-kitchen-and-living-room.jpgS",
       "https://i.postimg.cc/FsZVGz3z/apartement-bedroom-1.jpg",
       "https://i.postimg.cc/g2b7H0p0/apartement-bathroom-6.jpg",
    ],
  },
  {
    entirePlace: [
       "https://i.postimg.cc/kG9tbrJz/apartement-bathroom-5.jpg",
       "https://i.postimg.cc/tCBVYmLv/studio-flat-kitchen-1.jpg",
       "https://i.postimg.cc/JzB4M6mk/double-bed-room-4.jpg",
    ],
  },
];
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
export const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: hashSync("abc123456", 10),
    role: "admin",
  },
  {
    name: "User",
    email: "user@user.com",
    password: hashSync("abc123456", 10),
    role: "user",
  },
];
