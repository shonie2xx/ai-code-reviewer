import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
  getSubmissions: t.procedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const submissions = await prisma.submission.findMany({
        where: { userId },
      });
      return submissions;
    }),
});

export type AppRouter = typeof appRouter;
