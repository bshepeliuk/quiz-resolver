import { FastifyReply, FastifyRequest } from 'fastify';
import mammoth from 'mammoth';

export const parseDocx = async (req: FastifyRequest, res: FastifyReply) => {
  const data = await req.file();
  const buffer = await data!.toBuffer();
  const result = await mammoth.extractRawText({ buffer });

  res.status(200).send({ content: result.value ?? '' });
};
