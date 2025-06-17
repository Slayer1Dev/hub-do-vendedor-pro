import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/clerkAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller para buscar os grupos
export const getStockGroups = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  if (!userId) return res.status(401).json({ error: 'Não autorizado' });

  try {
    const stockGroups = await prisma.stockGroup.findMany({
      where: { userId },
      include: {
        _count: { // Inclui a contagem de anúncios no grupo
          select: { groupedAnnouncements: true }
        }
      }
    });

    // Formata os dados para o frontend
    const formattedGroups = stockGroups.map(group => ({
      id: group.id,
      nome: group.name,
      estoque: group.stock,
      anuncios: group._count.groupedAnnouncements
    }));

    res.status(200).json(formattedGroups);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar grupos de estoque.' });
  }
};

// Controller para criar um novo grupo
export const createStockGroup = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  const { groupName, announcementIds } = req.body;

  if (!userId) return res.status(401).json({ error: 'Não autorizado' });
  if (!groupName || !announcementIds || announcementIds.length === 0) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  try {
    // Usamos uma transação para garantir que ambas as operações (criar grupo e adicionar anúncios)
    // aconteçam com sucesso ou falhem juntas.
    const newGroup = await prisma.$transaction(async (tx) => {
      const createdGroup = await tx.stockGroup.create({
        data: {
          userId,
          name: groupName,
          // Vamos assumir o estoque do primeiro anúncio como o estoque inicial do grupo
          stock: 0, // O estoque será gerenciado por webhooks futuramente
        }
      });

      await tx.groupedAnnouncement.createMany({
        data: announcementIds.map((announcementId: string) => ({
          stockGroupId: createdGroup.id,
          mlAnnouncementId: announcementId,
        }))
      });

      return createdGroup;
    });

    res.status(201).json(newGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar grupo de estoque.' });
  }
};