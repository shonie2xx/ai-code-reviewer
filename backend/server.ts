import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

fastify.get('/submissions', async (request, reply) => {});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
