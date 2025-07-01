import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
  getSubmissions: t.procedure
    .input(
      z.object({ userId: z.string().uuid() }) // checks if string is a valid UUID
    )
    .query(async ({ input }) => {
      const { userId } = input;
      return await prisma.submission.findMany({
        where: { userId },
      });
    }),
});

export type AppRouter = typeof appRouter;
