import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '@/lib/api';
import { TrendingUp, MessageSquare, Package, DollarSign, Eye, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

// Componente para o esqueleto de carregamento (sem alterações)
const StatCardSkeleton = () => (
  <div className="p-6 rounded-2xl border bg-card">
    <div className="flex items-center justify-between mb-4"><Skeleton className="w-10 h-10 rounded-xl" /><Skeleton className="h-4 w-12" /></div>
    <div><Skeleton className="h-8 w-24 mb-1" /><Skeleton className="h-4 w-32" /></div>
  </div>
);

// Componente do card de estatísticas (sem alterações)
const StatCard = ({ icon: Icon, label, value, change, color }) => (
  <div className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center justify-between mb-4"><div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${color}-500`} /></div><span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{change}</span></div>
    <div><p className="text-2xl font-bold text-foreground mb-1">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
  </div>
);

export default function DashboardPage() {
  const { getToken } = useAuth();
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => fetchDashboardStats(getToken),
  });

  // --- LÓGICA DE RENDERIZAÇÃO ATUALIZADA ---

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton />
        </div>
      );
    }

    if (isError) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Dados</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }
    
    if (data) {
        const stats = [
            { label: 'Perguntas hoje', value: data.stats.perguntasHoje, change: '+12%', icon: MessageSquare, color: 'blue' },
            { label: 'Total de Vendas', value: data.stats.estoqueTotal, change: '+3%', icon: Package, color: 'green' },
            { label: 'Lucro estimado', value: data.stats.lucroEstimado, change: '+18%', icon: DollarSign, color: 'purple' },
            { label: 'Visualizações', value: data.stats.visualizacoes, change: '+25%', icon: Eye, color: 'orange' },
        ];

      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{data.message}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      );
    }
    
    return null; // Caso não haja dados e não esteja carregando ou com erro
  };

  return (
    <div className="space-y-8">
      {renderContent()}
      {/* Aqui você pode adicionar outras seções do dashboard que não dependem desses dados */}
    </div>
  );
};
