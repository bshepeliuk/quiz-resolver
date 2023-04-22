import { Configuration, OpenAIApi } from 'openai';
import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'crypto';

interface ResolveRequest {
  quiz: string;
}

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const resolveQuiz = async (req: FastifyRequest<{ Body: ResolveRequest }>, res: FastifyReply) => {
  const { quiz } = req.body;

  const message = `
    ${quiz}
    \n --- \n
    Please find the resolved quiz below, with the correct answers marked as [correct] at the end of each option.
  `;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  });

  res.status(200).send({
    id: crypto.randomUUID(),
    items: completion.data.choices[0].message?.content.split('\n'),
  });
};
