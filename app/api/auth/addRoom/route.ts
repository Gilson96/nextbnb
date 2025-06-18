import { getServerSession } from 'next-auth/next';
import {authConfig} from '@/auth';
import { prisma } from '@/db/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authConfig);
    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch the user from the database to get the user ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { roomDescription, roomType, roomLocation, roomPrice, hostId } = req.body;

    try {
      const newRoom = await prisma.room.create({
        data: {
          roomDescription,
          roomType,
          roomRating: 0,
          roomLatitude: 0,
          roomLongitude: 0,
          roomPrice,
          roomLocation,
          roomAbout: '',
          hostId,
          ownerId: user.id, // Assign the room to the logged-in user
        },
      });

      res.status(200).json(newRoom);
    } catch (error) {
      res.status(500).json({ error: 'Error creating room' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
