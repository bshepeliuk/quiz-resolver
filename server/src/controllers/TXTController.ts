import { FastifyReply, FastifyRequest } from 'fastify';

export const parseTxt = async (req: FastifyRequest, res: FastifyReply) => {
  const data = await req.file();
  const buffer = await data?.toBuffer();
  const content = buffer ? buffer.toString() : '';

  res.status(200).send({ content });
};
