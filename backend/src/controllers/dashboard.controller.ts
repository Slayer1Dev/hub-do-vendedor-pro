import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/clerkAuth';
import { makeMlApiRequest } from '../services/mercadolivre.service';
import axios from 'axios';

// --- Interfaces para o Backend ---
// Adicionamos as "formas" dos dados que esperamos da API do ML aqui também.
interface MLQuestion {
  id: number;
  date_created: string;
  item_id: string;
  seller_id: number;
  status: string;
  text: string;
  from: {
    id: number;
    nickname: string;
  };
}

interface MLQuestionsResponse {
  total: number;
  questions: MLQuestion[];
}

// ... (a função formatCurrency continua aqui)
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };


// --- Função getDashboardStats corrigida ---
export const getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
    // ... (o conteúdo desta função que corrigimos da primeira vez)
    // A única correção é no 'catch', como na função de perguntas abaixo.
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
        return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
    }

    try {
        const mlUserData = await makeMlApiRequest(clerkUserId, '/users/me');
        const mlSellerId = mlUserData?.id; // Acesso seguro para evitar erro se mlUserData for null/undefined

        if (!mlSellerId) {
            console.error(`Falha ao obter mlSellerId para o usuário Clerk ${clerkUserId}. mlUserData:`, JSON.stringify(mlUserData || {}));
            return res.status(500).json({ error: 'Não foi possível obter a identificação do vendedor no Mercado Livre. Verifique se sua conta ML é uma conta de vendedor ou se a conexão precisa ser refeita.' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateFrom = today.toISOString();
        const dateTo = new Date().toISOString();

        const [questionsData, ordersData, itemsData] = await Promise.all([
            makeMlApiRequest(clerkUserId, `/my/questions/search?date_created_from=${dateFrom}&date_created_to=${dateTo}`),
            makeMlApiRequest(clerkUserId, `/orders/search?seller=${mlSellerId}&order.date_created.from=${dateFrom}&order.date_created.to=${dateTo}`),
            makeMlApiRequest(clerkUserId, `/users/${mlSellerId}/items/search?status=active&limit=50`)
        ]);

        let totalViews = 0;
        // Verifica se itemsData e itemsData.results existem e se há itens
        if (itemsData && itemsData.results && itemsData.results.length > 0) {
            const itemIds = itemsData.results.map((item: any) => item.id).join(',');
            // Supondo que makeMlApiRequest retorna a resposta da API do ML para /visits/items
            // que é um array de objetos: [ { code: 200, body: { ITEM_ID: count } }, ... ]
            const visitsData = await makeMlApiRequest(clerkUserId, `/visits/items?ids=${itemIds}`);

            if (Array.isArray(visitsData)) {
                visitsData.forEach(itemVisitEntry => {
                    // Verifica se itemVisitEntry e itemVisitEntry.body existem e se o código é 200
                    if (itemVisitEntry && itemVisitEntry.code === 200 && itemVisitEntry.body && typeof itemVisitEntry.body === 'object') {
                        // O body é um objeto como { "MLA123": 100 }
                        // Pegamos todos os valores deste objeto (deve haver apenas um, a contagem)
                        const countsInBody = Object.values(itemVisitEntry.body);
                        countsInBody.forEach(count => {
                            if (typeof count === 'number') {
                                totalViews += count;
                            }
                        });
                    }
                });
            } else if (visitsData && typeof visitsData === 'object' && !Array.isArray(visitsData)) {
                // Fallback: se a API ou makeMlApiRequest retornar um único objeto consolidado
                Object.values(visitsData).forEach(count => {
                    if (typeof count === 'number') {
                        totalViews += count;
                    }
                });
            }
        }

        const totalSalesValue = ordersData.results.reduce((sum: number, order: any) => sum + order.total_amount, 0);

        res.status(200).json({
            message: `Bem-vindo(a), ${mlUserData.nickname}!`,
            stats: {
                perguntasHoje: questionsData.total,
                estoqueTotal: mlUserData.seller_reputation?.transactions.completed || 0,
                lucroEstimado: formatCurrency(totalSalesValue),
                visualizacoes: totalViews,
            },
        });
    } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        // CORREÇÃO: Tratamento de erro que faltava
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            return res.status(500).json({ error: 'Erro ao buscar dados do dashboard: ' + errorMessage });
        }
        res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
    }
};


// --- Função getUnansweredQuestions corrigida ---
export const getUnansweredQuestions = async (req: AuthenticatedRequest, res: Response) => {
  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
  }

  try {
    const mlUserData = await makeMlApiRequest(clerkUserId, '/users/me');
    const mlSellerId = mlUserData.id;

    // CORREÇÃO: Dizemos ao TypeScript qual a "forma" dos dados que esperamos da API.
    const questionsData = await makeMlApiRequest(
      clerkUserId,
      `/my/questions/search?seller_id=${mlSellerId}&status=UNANSWERED`
    ) as MLQuestionsResponse; // <--- Type Assertion

    res.status(200).json({
      // Agora o TypeScript não vai mais reclamar aqui.
      total: questionsData.total || 0,
      answered: 0,
      unanswered: questionsData.total || 0,
      questions: questionsData.questions || [],
    });

  } catch (error) {
    console.error("Erro ao buscar perguntas não respondidas:", error);
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        return res.status(500).json({ error: 'Erro ao buscar perguntas: ' + errorMessage });
    }
    res.status(500).json({ error: 'Ocorreu um erro inesperado ao buscar perguntas.' });
  }
};