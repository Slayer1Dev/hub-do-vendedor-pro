import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/clerkAuth';
import { makeMlApiRequest } from '../services/mercadolivre.service'; // Importamos o serviço

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
  }

  try {
    // Busca os dados do usuário do Mercado Livre
    const mlUserData = await makeMlApiRequest(userId, '/users/me');

    // Monta o payload de resposta com os dados reais e mocados
    res.status(200).json({
      message: `Bem-vindo(a), ${mlUserData.nickname}!`, // Usando o apelido real!
      stats: {
        perguntasHoje: 23, // Dado de exemplo
        estoqueTotal: mlUserData.seller_reputation?.transactions.total || 0, // Exemplo de uso de dado real
        lucroEstimado: 'R$ 8.430,00', // Dado de exemplo
        visualizacoes: '15.2k', // Dado de exemplo
      },
    });

  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard: ' + error.message });
  }
};