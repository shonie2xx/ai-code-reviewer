import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createContext() {
  return { prisma };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
