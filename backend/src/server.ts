import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboardRoutes from './api/dashboard.routes';
import settingsRoutes from './api/settings.routes';
import pricingRoutes from './api/pricing.routes';
import stockRoutes from './api/stock.routes';
import webhookRoutes from './api/webhook.routes';
import connectionsRoutes from './api/connections.routes'; // Importa as rotas de conexão

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Hub do Vendedor Pro API is running!' });
});

// --- CORREÇÃO AQUI ---
// Removemos o prefixo '/api' para que as rotas correspondam
// ao que o proxy do Vite está encaminhando.
app.use('/dashboard', dashboardRoutes);
app.use('/settings', settingsRoutes);
app.use('/pricing', pricingRoutes);
app.use('/stock', stockRoutes);
app.use('/webhooks', webhookRoutes);
app.use('/connections', connectionsRoutes); // Registra as rotas de conexão

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});