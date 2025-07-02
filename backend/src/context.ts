import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/dist/adapters/fastify/index.cjs';

const prisma = new PrismaClient();

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, prisma };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
