import { FastifyReply, FastifyRequest } from 'fastify';
import pdf from 'pdf-parse';

export const parsePdf = async (req: FastifyRequest, res: FastifyReply) => {
  const data = await req.file();
  const buffer = await data!.toBuffer();
  const result = await pdf(buffer);

  res.status(200).send({ content: result.text });
};
