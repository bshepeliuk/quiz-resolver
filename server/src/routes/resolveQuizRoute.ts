import { FastifyInstance } from 'fastify';
import { resolveQuiz } from '../controllers/ResolveController';

const resolveQuizRoute = async (fastify: FastifyInstance) => {
  fastify.post('/api/resolve', { handler: resolveQuiz });
};

export default resolveQuizRoute;
