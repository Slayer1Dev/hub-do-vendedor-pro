import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/clerkAuth';
import { calculatePricingLogic } from '../services/pricing.service';

export const calculatePrice = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  const formData = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  // Validação básica dos dados recebidos
  if (!formData.custo || !formData.lucroDesejado || !formData.categoria) {
    return res.status(400).json({ error: 'Dados insuficientes para o cálculo.' });
  }

  try {
    // A lógica complexa do cálculo é delegada para um "serviço"
    const results = calculatePricingLogic(formData);
    res.status(200).json(results);
  } catch (error) {
    console.error("Erro no cálculo de preço:", error);
    res.status(500).json({ error: 'Erro interno ao calcular preço.' });
  }
};