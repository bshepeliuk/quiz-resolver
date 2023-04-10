import { FastifyReply, FastifyRequest } from 'fastify';
import mammoth from 'mammoth';
import crypto from 'crypto';
import { MultipartFile } from '@fastify/multipart';

export const parseDocx = async (req: FastifyRequest<{ Body: { file: MultipartFile } }>, res: FastifyReply) => {
  const buffer = await req.body.file.toBuffer();
  const result = await mammoth.extractRawText({ buffer });

  res.status(200).send({ id: crypto.randomUUID(), items: result.value.split('\n').filter(Boolean) });
};
