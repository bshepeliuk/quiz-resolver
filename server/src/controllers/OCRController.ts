import { FastifyReply, FastifyRequest } from 'fastify';
import { createWorker } from 'tesseract.js';
import crypto from 'crypto';
import { MultipartFile } from '@fastify/multipart';

export type LanguagesType = 'eng' | 'ukr';
type Request = FastifyRequest<{
  Body: { file: MultipartFile };
  Querystring: { language: string[] | string };
}>;

export const parseImages = async (req: Request, res: FastifyReply) => {
  const buffer = await req.body.file.toBuffer();
  const worker = await createWorker();

  const languageQuery = req.query.language;
  const language = Array.isArray(languageQuery) ? languageQuery.join('+') : languageQuery;

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
