import { Router } from 'express';
import { handleMercadoLivreNotification } from '../controllers/webhook.controller';

const router = Router();

// Endpoint que será configurado no painel do Mercado Livre
router.post('/mercadolivre', handleMercadoLivreNotification);

export default router;