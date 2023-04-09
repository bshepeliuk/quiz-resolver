import fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import txtRoute from './routes/txtRoute';
import pdfRoute from './routes/pdfRoute';
import ocrRoute from './routes/ocrRoute';
import docxRoute from './routes/docxRoute';
import resolveQuizRoute from './routes/resolveQuizRoute';

function createApp(options = {}) {
  const app = fastify(options);

  app.register(cors);
  app.register(formbody);
  app.register(multipart);

  app.register(txtRoute);
  app.register(pdfRoute);
  app.register(ocrRoute);
  app.register(docxRoute);
  app.register(resolveQuizRoute);

  return app;
}

export default createApp;
