import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

server.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

server.get('/submissions', async (request, reply) => {});

// server.register(fastifyTRPCPlugin, {
//   prefix: '/trpc',
//   trpcOptions: {
//     router: appRouter,
//     createContext,
//     onError({ path, error }) {
//       // report to error monitoring
//       console.error(`Error in tRPC handler on path '${path}':`, error);
//     },
//   } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
// });

(async function () {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
