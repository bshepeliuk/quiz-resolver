import { MultipartFile } from '@fastify/multipart';
import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'crypto';

export const parseTxt = async (req: FastifyRequest<{ Body: { file: MultipartFile } }>, res: FastifyReply) => {
  const buffer = await req.body.file.toBuffer();
  const content = buffer ? buffer.toString() : '';

  res.status(200).send({ id: crypto.randomUUID(), items: content.split('\n').filter(Boolean) });
};
