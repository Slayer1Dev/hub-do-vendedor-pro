import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

/**
 * Garante que temos um token de acesso válido, renovando-o se necessário.
 * Esta função é o coração do nosso serviço.
 * @param userId O ID do usuário do nosso sistema (Clerk ID)
 * @returns Um access_token válido.
 */
async function getValidAccessToken(userId: string): Promise<string> {
  const account = await prisma.mercadoLivreAccount.findUnique({
    where: { userId },
  });

  if (!account || !account.refreshToken) {
    throw new Error('Conta do Mercado Livre não encontrada ou sem refresh token.');
  }

  // Verifica se o token está para expirar nos próximos 10 minutos
  const now = new Date();
  const tenMinutesBeforeExpiration = new Date(account.expiresAt.getTime() - 10 * 60 * 1000);

  if (now < tenMinutesBeforeExpiration) {
    // O token ainda é válido
    return account.accessToken;
  }

  // O token expirou ou está prestes a expirar, vamos renová-lo
  console.log(`Token para o usuário ${userId} expirado. Renovando...`);
  try {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'refresh_token',
      client_id: process.env.MERCADOLIVRE_APP_ID,
      client_secret: process.env.MERCADOLIVRE_SECRET_KEY,
      refresh_token: account.refreshToken,
    });

    const { access_token, expires_in, refresh_token: new_refresh_token } = response.data;
    const newExpiresAt = new Date(Date.now() + expires_in * 1000);

    // Atualiza o banco com os novos tokens
    await prisma.mercadoLivreAccount.update({
      where: { userId },
      data: {
        accessToken: access_token,
        expiresAt: newExpiresAt,
        // O ML pode ou não retornar um novo refresh token. Se retornar, atualizamos.
        ...(new_refresh_token && { refreshToken: new_refresh_token }),
      },
    });

    console.log(`Token para o usuário ${userId} renovado com sucesso.`);
    return access_token;

  } catch (error) {
    console.error("Erro ao renovar o token do Mercado Livre:", error.response?.data || error);
    throw new Error('Falha ao renovar a sessão com o Mercado Livre.');
  }
}

/**
 * Função genérica para fazer chamadas autenticadas à API do Mercado Livre.
 * @param userId O ID do nosso usuário
 * @param endpoint O endpoint da API do ML a ser chamado (ex: '/users/me')
 * @param options Opções do Axios (method, data, etc.)
 */
export async function makeMlApiRequest(userId: string, endpoint: string, options: any = {}) {
  const accessToken = await getValidAccessToken(userId);
  
  const defaultOptions = {
    method: 'GET',
    url: `https://api.mercadolibre.com${endpoint}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await axios(defaultOptions);
    return response.data;
  } catch (error) {
    console.error(`Erro na chamada à API do ML para o endpoint ${endpoint}:`, error.response?.data || error);
    throw new Error(`Falha na comunicação com a API do Mercado Livre.`);
  }
}
