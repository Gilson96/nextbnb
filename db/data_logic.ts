import { reviewTemplates } from "./data_pools";

// It returns a random selection of count elements from the input array arr
// Creates a shallow copy of the input array to avoid mutating the original
// Shuffles the array randomly
// Takes the first count items from the shuffled array.
export function getRandomElements(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function randomCoord() {
  return parseFloat((53.48 + Math.random() * 0.1).toFixed(6));
}

export function randomPrice() {
  return Math.floor(40 + Math.random() * 100);
}

export function generateReviewDescription(roomType:string, placeName: string, hostName:string) {
  const template =
    reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
  return template(roomType, placeName, hostName);
}

export function randomDateWithinPastYear() {
  const now = new Date();
  const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const date = new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime()),
  );
  return date.toISOString().split("T")[0];
}