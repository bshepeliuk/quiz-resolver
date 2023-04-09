import { FastifyInstance } from 'fastify';
import { parseDocx } from '../controllers/DOCXController';

const docxRoute = async (fastify: FastifyInstance) => {
  fastify.post('/api/docx', { handler: parseDocx });
};

export default docxRoute;
