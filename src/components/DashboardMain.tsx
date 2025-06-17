import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, HelpCircle, Package, Eye } from "lucide-react"

// Interface para definir a ESTRUTURA dos dados que o componente espera receber.
// Isso garante que nosso componente e backend estão em sincronia.
interface DashboardData {
  message: string;
  stats: {
    perguntasHoje: number;
    estoqueTotal: number;
    lucroEstimado: string;
    visualizacoes: number;
  };
}

// Definimos o tipo das props do componente
interface DashboardMainProps {
  data: DashboardData | null;
}

export function DashboardMain({ data }: DashboardMainProps) {
  // Se os dados ainda não chegaram ou houve um erro, não renderiza nada.
  // A página principal (DashboardPage) já cuida de mostrar o loading/erro.
  if (!data) {
    return null;
  }

  // Agora acessamos os dados usando a nova estrutura: data.stats.propriedade
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Perguntas Hoje
            </CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Usando o dado real */}
            <div className="text-2xl font-bold">{data.stats.perguntasHoje}</div>
            <p className="text-xs text-muted-foreground">
              Total de perguntas recebidas hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Concluídas</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Usando o dado real */}
            <div className="text-2xl font-bold">{data.stats.estoqueTotal}</div>
            <p className="text-xs text-muted-foreground">
              Total de transações (reputação)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas de Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Usando o dado real */}
            <div className="text-2xl font-bold">{data.stats.lucroEstimado}</div>
            <p className="text-xs text-muted-foreground">
              Valor total das vendas de hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Usando o dado real */}
            <div className="text-2xl font-bold">{data.stats.visualizacoes}</div>
            <p className="text-xs text-muted-foreground">
              Visitas totais em seus anúncios
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Você pode adicionar aqui os outros componentes, como a lista de vendas recentes, etc. */}
    </main>
  )
}