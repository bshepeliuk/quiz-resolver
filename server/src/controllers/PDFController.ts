import { FastifyReply, FastifyRequest } from 'fastify';
import pdf from 'pdf-parse';
import crypto from 'crypto';
import { MultipartFile } from '@fastify/multipart';

export const parsePdf = async (req: FastifyRequest<{ Body: { file: MultipartFile } }>, res: FastifyReply) => {
  const buffer = await req.body.file.toBuffer();
  const result = await pdf(buffer);

  res.status(200).send({ id: crypto.randomUUID(), items: result.text.split('\n').filter(Boolean) });
};
