import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { createContext } from './context';

const t = initTRPC.context<typeof createContext>().create();

export const appRouter = t.router({
  getSubmissions: t.procedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      const submissions = await ctx.prisma.submission.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return submissions;
    }),
});

export type AppRouter = typeof appRouter;
