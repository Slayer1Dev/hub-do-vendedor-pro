import { Router } from 'express';
import { clerkAuthMiddleware } from '../middlewares/clerkAuth';
import { getDashboardStats } from '../controllers/dashboard.controller';

const router = Router();

// Aplica o middleware de autenticação a esta rota.
// Apenas requisições com um token válido passarão por ele.
router.get('/stats', clerkAuthMiddleware, getDashboardStats);

export default router;