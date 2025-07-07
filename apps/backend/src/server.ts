import 'dotenv/config'; // Initialize dotenv
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createContext } from './context';
import { appRouter } from './trpc';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { liveFeedbackHandler } from './liveFeedbackHandler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function startServer() {
  const fastify = Fastify({
    logger: true,
  });

  try {
    await prisma.$connect();
    fastify.log.info('Database connected successfully');
  } catch (error) {
    fastify.log.error('Database connection failed:', error);
    process.exit(1);
  }

  await fastify.register(cors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  fastify.post('/getLiveFeedback', liveFeedbackHandler);

  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext: () => createContext(prisma),
    },
  });

  const port = process.env.PORT || 3001;
  try {
    fastify.log.info(`Server is starting on port ${process.env.PORT}`);
    await fastify.listen({ port: Number(port), host: process.env.HOST || '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
