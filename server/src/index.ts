import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';

const appOptions = {
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
};

function createApp(options = {}) {
  const app = fastify(options);

  app.register(cors);
  app.register(formbody);
  app.register(multipart);

  return app;
}

const app = createApp(appOptions);

app.post('/api/txt', async (req, res) => {
  res.status(200).send({ content: '' });
});

app.post('/api/pdf', async (req, res) => {
  res.status(200).send({ content: '' });
});

app.post('/api/docx', async (req, res) => {
  const data = await req.file();
  const buffer = await data!.toBuffer();
  const result = await mammoth.extractRawText({ buffer });

  res.status(200).send({ content: result.value ?? '' });
});

app.post('/api/ocr', async (req, res) => {
  const data = await req.file();
  const buffer = await data!.toBuffer();
  const worker = await createWorker();

  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const result = await worker.recognize(buffer);

  await worker.terminate();

  res.status(200).send({ content: result.data.text, confidence: result.data.confidence });
});

interface ResolveRequest {
  content: string;
}

app.post('/api/resolve', async (req: FastifyRequest<{ Body: ResolveRequest }>, res) => {
  const { content } = req.body;
  // TODO: request to OpenAI API;
  res.status(200).send({ content });
});

const startSever = async (app: FastifyInstance) => {
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startSever(app);
