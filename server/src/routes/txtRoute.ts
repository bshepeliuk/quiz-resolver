import { FastifyInstance } from 'fastify';
import { parseTxt } from '../controllers/TXTController';

const txtRoute = async (fastify: FastifyInstance) => {
  fastify.post('/api/txt', { handler: parseTxt });
};

export default txtRoute;
