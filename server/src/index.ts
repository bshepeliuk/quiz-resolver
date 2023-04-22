import 'dotenv/config';
import { FastifyInstance } from 'fastify';
import createApp from './app';

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

const app = createApp(appOptions);

startSever(app);
