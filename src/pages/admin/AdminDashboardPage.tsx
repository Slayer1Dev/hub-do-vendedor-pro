import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Users, Wifi, DollarSign, Gem } from "lucide-react"
import { cn } from "@/lib/utils"

// --- DADOS MOCKADOS ---
// Estes dados serão substituídos por chamadas de API reais.
const totalUsers = 1329;
const onlineUsers = 42;
const activeSubscriptions = 874;
const monthlyRecurringRevenue = 45231.89;

const newUsersChartData = [
  { month: "Jan", users: 186 },
  { month: "Fev", users: 305 },
  { month: "Mar", users: 237 },
  { month: "Abr", users: 173 },
  { month: "Mai", users: 209 },
  { month: "Jun", users: 280 },
];

const planDistributionData = [
    { name: 'Plano Grátis', value: totalUsers - activeSubscriptions },
    { name: 'Plano Pro', value: activeSubscriptions },
];

const apiUsageData = [
    { date: "10/06", gemini: 2400, database: 5000 },
    { date: "11/06", gemini: 1398, database: 4500 },
    { date: "12/06", gemini: 9800, database: 8900 },
    { date: "13/06", gemini: 3908, database: 6200 },
    { date: "14/06", gemini: 4800, database: 7100 },
    { date: "15/06", gemini: 3800, database: 6500 },
    { date: "16/06", gemini: 4300, database: 7000 },
];

// --- CONFIGURAÇÕES DE CORES PARA OS GRÁFICOS ---
const chartConfig = {
    users: { label: "Novos Usuários" },
    gemini: { label: "Chamadas Gemini API", color: "#8b5cf6" }, // Roxo Vibrante
    database: { label: "Operações no Banco", color: "#f97316" }, // Laranja Vibrante
    free: { label: "Plano Grátis" },
    pro: { label: "Plano Pro" },
};

const COLORS = ["#d1d5db", "#3b82f6"]; // Cinza para Grátis, Azul para Pro

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard do Administrador</h1>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-80"></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2 text-white">
                <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
                <Users className="h-5 w-5" />
            </CardHeader>
            <CardContent className="relative text-white">
                <div className="text-3xl font-bold">{totalUsers.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-blue-100">+20.1% desde o último mês</p>
            </CardContent>
        </Card>
        <Card className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 opacity-80"></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2 text-white">
                <CardTitle className="text-sm font-medium">Receita Mensal (MRR)</CardTitle>
                <DollarSign className="h-5 w-5" />
            </CardHeader>
            <CardContent className="relative text-white">
                <div className="text-3xl font-bold">R$ {monthlyRecurringRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <p className="text-xs text-green-100">+12.5% desde o último mês</p>
            </CardContent>
        </Card>
        <Card className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 opacity-80"></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2 text-white">
                <CardTitle className="text-sm font-medium">Usuários Online</CardTitle>
                <Wifi className="h-5 w-5" />
            </CardHeader>
            <CardContent className="relative text-white">
                <div className="text-3xl font-bold">{onlineUsers}</div>
                <p className="text-xs text-amber-100">Ativos na última hora</p>
            </CardContent>
        </Card>
        <Card className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-violet-600 opacity-80"></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2 text-white">
                <CardTitle className="text-sm font-medium">Assinaturas Ativas</CardTitle>
                <Gem className="h-5 w-5" />
            </CardHeader>
            <CardContent className="relative text-white">
                <div className="text-3xl font-bold">{activeSubscriptions}</div>
                <p className="text-xs text-purple-100">{((activeSubscriptions / totalUsers) * 100).toFixed(1)}% de conversão</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crescimento de Novos Usuários</CardTitle>
            <CardDescription>Acompanhe a aquisição de usuários nos últimos 6 meses.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <BarChart data={newUsersChartData}>
                <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="users" fill="url(#colorUsers)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Distribuição de Planos</CardTitle>
            <CardDescription>Divisão de usuários entre os planos Grátis e Pro.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[250px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={planDistributionData} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="80%" paddingAngle={5}>
                    {planDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Consumo de Recursos</CardTitle>
            <CardDescription>Uso da API do Gemini e operações no banco de dados nos últimos 7 dias.</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={chartConfig} className="w-full h-[300px]">
                <LineChart data={apiUsageData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="gemini" strokeWidth={3} {...chartConfig.gemini} />
                    <Line type="monotone" dataKey="database" strokeWidth={3} {...chartConfig.database} />
                </LineChart>
            </ChartContainer>
        </CardContent>
       </Card>
    </div>
  );
}
