import { PrismaClient } from '@prisma/client';

// The solution in this case is to instantiate a single instance PrismaClient and save it on the globalThis object.
// Then we keep a check to only instantiate PrismaClient if it's not on the global.
// This object otherwise use the same instance again if already present to prevent instantiating extra PrismaClient instances.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prismadb = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismadb;
