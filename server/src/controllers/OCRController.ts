import { FastifyReply, FastifyRequest } from 'fastify';
import { createWorker } from 'tesseract.js';
import crypto from 'crypto';
import { MultipartFile } from '@fastify/multipart';

export type LanguagesType = 'eng' | 'ukr';
type Request = FastifyRequest<{ Body: { file: MultipartFile; language: { value: LanguagesType } } }>;

export const parseImages = async (req: Request, res: FastifyReply) => {
  const buffer = await req.body.file.toBuffer();
  const worker = await createWorker();
  const language = req.body.language.value ?? 'eng';

  await worker.loadLanguage(language);
  await worker.initialize(language);

  const result = await worker.recognize(buffer);

  await worker.terminate();

  res.status(200).send({
    id: crypto.randomUUID(),
    items: result.data.text.split('\n').filter(Boolean),
    confidence: result.data.confidence,
  });
};
