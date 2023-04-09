import { FastifyInstance } from 'fastify';
import { parsePdf } from '../controllers/PDFController';

const pdfRoute = async (fastify: FastifyInstance) => {
  fastify.post('/api/pdf', { handler: parsePdf });
};

export default pdfRoute;
