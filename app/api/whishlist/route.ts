import { prisma } from "@/db/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { userId, roomId } = req.body;

    if (!userId || !roomId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const wishlist = await prisma.wishlist.create({
        data: { userId, roomId },
      });
      return res.status(200).json(wishlist);
    } catch (error) {
      return res.status(500).json({ error: "Failed to add to wishlist" });
    }
  }

  if (req.method === "GET") {
    try {
      const wishlist = await prisma.wishlist.findMany({
        include: { room: true },
      });
      return res.status(200).json(wishlist);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Missing or invalid wishlist ID" });
    }

    try {
      await prisma.wishlist.delete({ where: { id } });
      return res.status(200).json({ message: "Wishlist item removed" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to remove wishlist item" });
    }
  }

  res.setHeader("Allow", ["POST", "GET", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
