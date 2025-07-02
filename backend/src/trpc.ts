import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CODE_CHAR_MAX, CODE_CHAR_MIN } from '../../common';
import dotenv from 'dotenv';
import { createContext } from './context';

dotenv.config();
const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
  getSubmissions: t.procedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { userId } = input;
      return await prisma.submission.findMany({
        where: { userId },
      });
    }),
  createSubmission: t.procedure
    .input(
      z.object({
        userId: z.string().uuid(),
        code: z.string().max(CODE_CHAR_MAX).min(CODE_CHAR_MIN),
        language: z.string(),
        feedback: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, code, language, feedback } = input;
      return await prisma.submission.create({
        data: {
          userId,
          code,
          language,
          feedback,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
