import { FastifyInstance } from 'fastify';
import { parseImages } from '../controllers/OCRController';

const ocrRoute = async (fastify: FastifyInstance) => {
  fastify.post('/api/ocr', { handler: parseImages });
};

export default ocrRoute;
