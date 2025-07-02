import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createContext } from './context';
import { appRouter } from './trpc';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { liveFeedbackHandler } from './liveFeedbackHandler';

async function startServer() {
  const server = Fastify({
    logger: true,
  });

  await server.register(cors, {
    origin: true,
    credentials: true,
  });

  server.post('/getLiveFeedback', liveFeedbackHandler);

  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
