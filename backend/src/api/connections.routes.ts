import { Router } from 'express';
import { clerkAuthMiddleware } from '../middlewares/clerkAuth';
import { connectMercadoLivre, getConnectionStatus } from '../controllers/connections.controller';

const router = Router();

// Rota para verificar o status da conexão
router.get('/', clerkAuthMiddleware, getConnectionStatus);

// Rota para receber o código de autorização e criar a conexão
router.post('/mercadolivre', clerkAuthMiddleware, connectMercadoLivre);

export default router;