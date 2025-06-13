
import React, { useEffect, useState } from 'react';
import { MessageSquare, Package, Calculator, TrendingUp, Search, Zap } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Respostas Automáticas',
    description: 'IA responde perguntas dos compradores automaticamente, mantendo seu padrão de atendimento personalizado.',
    microcopy: 'Economize até 3 horas por dia respondendo dúvidas repetitivas automaticamente.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Package,
    title: 'Controle de Estoque',
    description: 'Sincronize estoque entre múltiplos anúncios e marketplaces em tempo real.',
    microcopy: 'Nunca mais venda produtos sem estoque disponível em sua loja.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Calculator,
    title: 'Calculadora de Lucro',
    description: 'Calcule preços ideais considerando custos, comissões e margem desejada.',
    microcopy: 'Defina preços competitivos que garantem sua margem de lucro ideal.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'Gerador de EAN',
    description: 'Gere códigos EAN-13 válidos para seus produtos de forma instantânea.',
    microcopy: 'Códigos únicos e válidos aceitos em todos os grandes marketplaces.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Search,
    title: 'Otimizador SEO',
    description: 'IA melhora títulos e descrições para maior visibilidade nos resultados.',
    microcopy: 'Apareça primeiro nas buscas com títulos otimizados automaticamente.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Zap,
    title: 'Dashboard Inteligente',
    description: 'Métricas em tempo real e insights para otimizar suas vendas.',
    microcopy: 'Visualize performance e tome decisões baseadas em dados concretos.',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const FeatureCards = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleCards(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 150); // Staggered animation delay
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="funcionalidades" className="py-20 md:py-28 bg-white" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Funcionalidades que fazem a diferença
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada ferramenta foi pensada para resolver problemas reais de vendedores em grandes marketplaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-index={index}
              className={`feature-card group p-8 md:p-10 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-700 transform ${
                visibleCards[index] 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 md:mb-8 transform transition-all duration-500 ${
                visibleCards[index] ? 'rotate-0 scale-100' : 'rotate-12 scale-90'
              } group-hover:scale-110 shadow-lg`}>
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-4 text-base md:text-lg">
                {feature.description}
              </p>

              <p className="text-gray-500 leading-relaxed text-sm md:text-base italic">
                {feature.microcopy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
