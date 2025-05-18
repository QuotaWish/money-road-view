import { PrismaClient } from '../../prisma/client';

const URL = process.env.END_DATABASE_URL

console.log("Database URL: " + URL)

const getPrisma = () => new PrismaClient({
  datasourceUrl: URL
});

const globalPrismaClient = global as unknown as {
  client: ReturnType<typeof getPrisma>;
};

export const prismaClient =
  globalPrismaClient.client || getPrisma();

if (process.env.NODE_ENV !== 'production')
  globalPrismaClient.client = prismaClient;
