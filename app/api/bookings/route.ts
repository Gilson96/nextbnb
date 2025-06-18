import { prisma } from "@/db/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { userId, roomId, startDate, endDate } = req.body;

    if (!userId || !roomId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const booking = await prisma.booking.create({
        data: {
          userId,
          roomId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create booking" });
    }
  }

  if (req.method === "GET") {
    try {
      const bookings = await prisma.booking.findMany({
        include: { room: true },
      });
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
