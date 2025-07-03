import z from 'zod';
import { CODE_CHAR_MAX, CODE_CHAR_MIN } from '../../common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const schema = z.object({
  userId: z.string().uuid(),
  code: z.string().max(CODE_CHAR_MAX).min(CODE_CHAR_MIN),
  language: z.string(),
  specialty: z.string(),
});

export async function liveFeedbackHandler(request: FastifyRequest, reply: FastifyReply) {
  const parseResult = schema.safeParse(request.body);
  if (!parseResult.success) {
    console.error('Validation error:', parseResult.error);
    reply.status(400).send({ error: 'Invalid input' });
    return;
  }

  const { code, language, specialty, userId } = parseResult.data;
  reply.raw.setHeader('Content-Type', 'text/plain; charset=utf-8');
  reply.raw.setHeader('Transfer-Encoding', 'chunked');
  reply.raw.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  reply.raw.setHeader('Access-Control-Allow-Credentials', 'true');
  reply.raw.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const result = streamText({
    model: openai('gpt-3.5-turbo'),
    system: `Act as a senior ${specialty} engineer. Analyze this ${language} code for ${specialty} issues. Format response as: 
    1. Brief summary (1 sentence) 
    2. Key findings (bulleted list)
    3. Most critical recommendation Avoid markdown. Be technical but concise.`,
    prompt: code,
    maxTokens: 450,
  });

  let feedback = '';
  const textDecoder = new TextDecoder('utf-8');
  for await (const chunk of result.toDataStream()) {
    feedback += textDecoder.decode(chunk);
    reply.raw.write(chunk);
  }
  reply.raw.end();

  try {
    await prisma.submission.create({
      data: {
        userId,
        code,
        language,
        feedback,
        specialty,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    reply.status(500).send({ error: 'Failed to save submission' });
    return;
  }
}
