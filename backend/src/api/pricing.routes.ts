import { Router } from 'express';
import { clerkAuthMiddleware } from '../middlewares/clerkAuth';
import { calculatePrice } from '../controllers/pricing.controller';

const router = Router();

// Rota para receber os dados do formulário e retornar o cálculo
router.post('/calculate', clerkAuthMiddleware, calculatePrice);

export default router;