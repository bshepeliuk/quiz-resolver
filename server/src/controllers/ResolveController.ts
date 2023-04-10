import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'crypto';

interface ResolveRequest {
  quiz: string;
}

export const resolveQuiz = async (req: FastifyRequest<{ Body: ResolveRequest }>, res: FastifyReply) => {
  const { quiz } = req.body;
  // TODO: request to OpenAI API;
  res.status(200).send({ id: crypto.randomUUID(), quiz });
};
