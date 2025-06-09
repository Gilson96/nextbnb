import { neon, neonConfig } from '@neondatabase/serverless';
import { PrismaClient } from '@/lib/generated/prisma';
import ws from 'ws';

// Configure Neon to use ws for WebSocket connections
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL as string;

// You can use the neon client directly if needed, but Prisma can handle the connection itself.
export const prisma = new PrismaClient({
  datasourceUrl: connectionString,
});


