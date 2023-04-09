import { FastifyReply, FastifyRequest } from 'fastify';

interface ResolveRequest {
  content: string;
}

export const resolveQuiz = async (req: FastifyRequest<{ Body: ResolveRequest }>, res: FastifyReply) => {
  const { content } = req.body;
  // TODO: request to OpenAI API;
  res.status(200).send({ content });
};
