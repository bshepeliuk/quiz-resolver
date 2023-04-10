import { FastifyReply, FastifyRequest } from 'fastify';
import { createWorker } from 'tesseract.js';
import crypto from 'crypto';
import { MultipartFile } from '@fastify/multipart';

export const parseImages = async (req: FastifyRequest<{ Body: { file: MultipartFile } }>, res: FastifyReply) => {
  const buffer = await req.body.file.toBuffer();
  const worker = await createWorker();

  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const result = await worker.recognize(buffer);

  await worker.terminate();

  res.status(200).send({
    id: crypto.randomUUID(),
    items: result.data.text.split('\n').filter(Boolean),
    confidence: result.data.confidence,
  });
};
