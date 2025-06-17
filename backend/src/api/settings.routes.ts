import { Router } from 'express';
import { clerkAuthMiddleware } from '../middlewares/clerkAuth';
import { getAiSettings, updateAiSettings } from '../controllers/settings.controller';

const router = Router();

// Rota para buscar as configurações de IA do usuário logado
router.get('/ai', clerkAuthMiddleware, getAiSettings);

// Rota para salvar/atualizar as configurações de IA do usuário logado
router.post('/ai', clerkAuthMiddleware, updateAiSettings);

export default router;