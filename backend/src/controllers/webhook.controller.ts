import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handleMercadoLivreNotification = async (req: Request, res: Response) => {
  const notification = req.body;

  console.log('--- NOTIFICAÇÃO DO MERCADO LIVRE RECEBIDA ---');
  console.log(JSON.stringify(notification, null, 2));
  console.log('-------------------------------------------');

  res.status(200).send('OK');

  if (notification && notification.topic === 'questions') {
    try {
      const mlUserId = notification.user_id;
      const questionId = notification.resource.split('/').pop();

      const mlAccount = await prisma.mercadoLivreAccount.findFirst({
        where: { mlUserId: String(mlUserId) },
      });

      if (mlAccount) {
        await prisma.question.create({
          data: {
            mlAccountId: mlAccount.id,
            mlQuestionId: String(questionId),
            question: `Pergunta recebida via webhook: ${questionId}`,
            status: 'pending',
            askedAt: new Date(),
          },
        });
        console.log(`Placeholder para a pergunta ${questionId} salvo no banco de dados.`);
      }
    } catch (error) {
      console.error('Erro ao processar a notificação de pergunta:', error);
    }
  }
};