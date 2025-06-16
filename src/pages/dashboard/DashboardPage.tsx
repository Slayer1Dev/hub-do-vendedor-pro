import React from 'react';
import { TrendingUp, MessageSquare, Package, DollarSign, Eye, Clock } from 'lucide-react';

const DashboardMain = () => {
  const stats = [
    { label: 'Perguntas hoje', value: '23', change: '+12%', icon: MessageSquare, color: 'blue' },
    { label: 'Estoque total', value: '1.247', change: '+3%', icon: Package, color: 'green' },
    { label: 'Lucro estimado', value: 'R$ 8.430', change: '+18%', icon: DollarSign, color: 'purple' },
    { label: 'Visualizações', value: '15.2k', change: '+25%', icon: Eye, color: 'orange' },
  ];

  const recentActivities = [
    { action: 'Pergunta respondida automaticamente', product: 'iPhone 13 Pro Max', time: '5 min atrás' },
    { action: 'Estoque atualizado', product: 'Samsung Galaxy S23', time: '12 min atrás' },
    { action: 'Anúncio otimizado', product: 'MacBook Air M2', time: '1h atrás' },
    { action: 'Nova avaliação recebida', product: 'Fone de Ouvido Bluetooth', time: '3h atrás' },
  ];

  return (
    <div className="space-y-8">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Atividade Recente e Produtos em Destaque */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.product}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Produtos em Destaque</h3>
          <div className="space-y-4">
            {[
              { name: 'iPhone 13 Pro Max 256GB', sales: 45, revenue: 'R$ 67.500' },
              { name: 'Samsung Galaxy S23 Ultra', sales: 32, revenue: 'R$ 38.400' },
              { name: 'MacBook Air M2', sales: 18, revenue: 'R$ 25.200' },
            ].map((product, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/20 transition-colors">
                <h4 className="font-medium text-foreground mb-2">{product.name}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{product.sales} vendas</span>
                  <span className="font-semibold text-green-600">{product.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
