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

  const port = process.env.PORT || 3001;
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
  try {
    await server.listen({ port: Number(port), host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
