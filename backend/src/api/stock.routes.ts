import { Router } from 'express';
import { clerkAuthMiddleware } from '../middlewares/clerkAuth';
import { getStockGroups, createStockGroup } from '../controllers/stock.controller';

const router = Router();

// Rota para buscar os grupos de estoque do usuário
router.get('/groups', clerkAuthMiddleware, getStockGroups);

// Rota para criar um novo grupo de estoque
router.post('/groups', clerkAuthMiddleware, createStockGroup);

// Futuramente, adicionaremos rotas para deletar e editar grupos
// router.delete('/groups/:id', clerkAuthMiddleware, deleteStockGroup);

export default router;