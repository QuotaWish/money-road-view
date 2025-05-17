import { PrismaClient } from '../../prisma/client';

const getPrisma = () => new PrismaClient();

const globalPrismaClient = global as unknown as {
  client: ReturnType<typeof getPrisma>;
};

export const prismaClient =
  globalPrismaClient.client || getPrisma();

if (process.env.NODE_ENV !== 'production')
  globalPrismaClient.client = prismaClient;
