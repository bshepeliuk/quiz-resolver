import { FastifyReply, FastifyRequest } from 'fastify';
import { createWorker } from 'tesseract.js';

export const parseImages = async (req: FastifyRequest, res: FastifyReply) => {
  const data = await req.file();
  const buffer = await data!.toBuffer();
  const worker = await createWorker();

  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const result = await worker.recognize(buffer);

  await worker.terminate();

  res.status(200).send({ content: result.data.text, confidence: result.data.confidence });
};
