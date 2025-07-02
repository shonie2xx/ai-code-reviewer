import Fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './trpc';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

const server = Fastify({
  logger: true,
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

(async function () {
  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
