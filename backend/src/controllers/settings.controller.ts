import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/clerkAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller para buscar as configurações
export const getAiSettings = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    // Busca os itens da base de conhecimento para este usuário
    const knowledgeItems = await prisma.knowledgeBaseItem.findMany({
      where: { userId },
      select: { title: true, content: true } // Seleciona apenas os campos necessários
    });

    // Futuramente, buscaremos outras configs (tom de voz, etc.) do perfil do usuário
    // Por enquanto, retornamos dados de exemplo para o resto
    const settings = {
      tone: "amigavel",
      signature: "Qualquer dúvida, estou à disposição!",
      autoMode: true,
      knowledgeItems,
    };

    res.status(200).json(settings);
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Controller para atualizar as configurações
export const updateAiSettings = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  const { tone, signature, autoMode, knowledgeItems } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    // O Prisma permite uma transação para atualizar tudo de uma vez
    await prisma.$transaction(async (tx) => {
      // 1. Apaga os itens antigos da base de conhecimento
      await tx.knowledgeBaseItem.deleteMany({
        where: { userId },
      });

      // 2. Insere os novos itens
      if (knowledgeItems && knowledgeItems.length > 0) {
        await tx.knowledgeBaseItem.createMany({
          data: knowledgeItems.map(item => ({
            userId,
            title: item.title,
            content: item.content,
          })),
        });
      }

      // 3. Futuramente, aqui atualizaremos os outros campos (tone, etc.)
      // na tabela 'User' ou em uma tabela de perfis.
    });

    res.status(200).json({ message: 'Configurações salvas com sucesso!' });
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};