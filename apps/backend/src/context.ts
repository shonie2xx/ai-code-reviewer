import { PrismaClient } from '@prisma/client';

export async function createContext(prisma: PrismaClient) {
  return { prisma };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
