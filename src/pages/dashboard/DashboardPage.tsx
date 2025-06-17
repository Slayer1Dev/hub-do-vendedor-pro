import React, { useEffect, useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { api } from '@/lib/api';
import { DashboardMain } from '@/components/DashboardMain';
import { Skeleton } from '@/components/ui/skeleton';

// A interface dos dados do dashboard
interface DashboardData {
  message: string;
  stats: {
    perguntasHoje: number;
    estoqueTotal: number;
    lucroEstimado: string;
    visualizacoes: number;
  };
}

export function DashboardPage() {
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        // Na nossa nova 'api', o getToken vai como segundo argumento
        const response = await api.get<DashboardData>('/api/dashboard/stats', getToken);
        setDashboardData(response); // A resposta já é o objeto de dados
      } catch (err: any) {
        setError(err.message || "Não foi possível carregar os dados do dashboard.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  // --- LÓGICA DE RENDERIZAÇÃO CORRIGIDA ---

  // 1. Enquanto estiver carregando, mostre o Skeleton
  if (isLoading) {
    return <Skeleton className="w-full h-[200px] m-8" />;
  }

  // 2. Se deu erro, mostre a mensagem de erro
  if (error) {
    return <p className="text-red-500 p-8">Erro: {error}</p>;
  }

  // 3. (A MÁGICA ESTÁ AQUI) Se não está carregando e não deu erro,
  //    só renderize o DashboardMain SE dashboardData NÃO FOR NULO.
  return (
    <>
      {dashboardData && <DashboardMain data={dashboardData} />}
    </>
  );
}