import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CODE_CHAR_MAX, CODE_CHAR_MIN } from '../../common';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import dotenv from 'dotenv';
import { createContext } from './context';

dotenv.config();
const prisma = new PrismaClient();
const t = initTRPC.context<typeof createContext>().create();

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
  getLiveFeedback: t.procedure
    .input(
      z.object({
        userId: z.string().uuid(),
        code: z.string().max(CODE_CHAR_MAX).min(CODE_CHAR_MIN),
        language: z.string(),
        specialty: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { code, language, specialty } = input;

      const reply = ctx.res;
      // Set headers for streaming
      reply.raw.setHeader('Content-Type', 'text/plain; charset=utf-8');
      reply.raw.setHeader('Transfer-Encoding', 'chunked');

      const result = streamText({
        model: openai('gpt-3.5-turbo'),
        system: `Act as a senior ${specialty} engineer. Analyze this ${language} code for ${specialty} issues. Format response as: 1. Brief summary (1 sentence) 2. Key findings (bulleted list) 3. Most critical recommendation Avoid markdown. Be technical but concise.`,
        prompt: code,
      });

      for await (const chunk of result.toDataStream()) {
        console.log('Streaming chunk:', chunk);
        reply.raw.write(chunk);
      }
      reply.raw.end();

      return undefined;
    }),
});

export type AppRouter = typeof appRouter;
