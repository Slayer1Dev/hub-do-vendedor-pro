import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/clerkAuth';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { clerk } from '../middlewares/clerkAuth'; // Esta importação agora funciona!

const prisma = new PrismaClient();

export const connectMercadoLivre = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  const { code, verifier } = req.body;

  if (!userId || !code || !verifier) {
    return res.status(400).json({ error: 'Dados insuficientes.' });
  }

  try {
    // 1. Sincroniza o usuário do Clerk com nosso banco
    const clerkUser = await clerk.users.getUser(userId);
    const primaryEmail = (clerkUser.emailAddresses || []).find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress;

    if (!primaryEmail) {
        return res.status(400).json({ error: "Email primário não encontrado para o usuário no Clerk." });
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: primaryEmail,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        avatarUrl: clerkUser.imageUrl,
      },
      create: {
        id: userId,
        email: primaryEmail,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        avatarUrl: clerkUser.imageUrl,
      },
    });
    
    // 2. Troca o código de autorização pelo token de acesso
    const tokenResponse = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.MERCADOLIVRE_APP_ID,
      client_secret: process.env.MERCADOLIVRE_SECRET_KEY,
      code: code,
      redirect_uri: process.env.MERCADOLIVRE_REDIRECT_URI,
      code_verifier: verifier,
    });

    const { access_token, refresh_token, user_id: mlUserId, expires_in } = tokenResponse.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // 3. Salva os tokens no banco de dados de forma segura
    await prisma.mercadoLivreAccount.upsert({
      where: { userId },
      update: {
        accessToken: access_token,
        mlUserId: String(mlUserId),
        expiresAt: expiresAt,
        ...(refresh_token && { refreshToken: refresh_token }),
      },
      create: {
        userId,
        accessToken: access_token,
        mlUserId: String(mlUserId),
        expiresAt: expiresAt,
        refreshToken: refresh_token,
      },
    });

    res.status(200).json({ message: 'Conta do Mercado Livre conectada com sucesso!' });
  } catch (error) {
    console.error("Erro detalhado ao conectar conta do Mercado Livre:", error.response?.data || error);
    res.status(500).json({ error: 'Falha ao conectar conta do Mercado Livre.' });
  }
};

export const getConnectionStatus = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Não autorizado' });

    try {
        const mlAccount = await prisma.mercadoLivreAccount.findUnique({
            where: { userId },
        });
        res.status(200).json({ isConnected: !!mlAccount });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar status da conexão.' });
    }
};
