import React, { useEffect, useState } from 'react';
import { MessageSquare, Package, Calculator, Search, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mapeamento de cores para classes completas do Tailwind CSS para corrigir o bug visual.
const colorVariants = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  sky: 'from-sky-500 to-sky-600',
};

// Lista de funcionalidades FINAL, com 5 itens e sem o Gerador de EAN.
const features = [
  {
    icon: MessageSquare,
    title: 'Respostas Automáticas',
    description: 'IA responde perguntas dos compradores automaticamente, mantendo seu padrão de atendimento personalizado.',
    color: 'blue'
  },
  {
    icon: Package,
    title: 'Controle de Estoque',
    description: 'Sincronize estoque entre múltiplos anúncios e marketplaces em tempo real.',
    color: 'green'
  },
  {
    icon: Calculator,
    title: 'Calculadora de Lucro',
    description: 'Calcule preços ideais considerando custos, comissões e margem desejada.',
    color: 'purple'
  },
  {
    icon: Search,
    title: 'Otimizador SEO',
    description: 'IA melhora títulos e descrições para maior visibilidade nos resultados.',
    color: 'pink'
  },
  {
    icon: BarChart2,
    title: 'Dashboard Inteligente',
    description: 'Métricas em tempo real e insights para otimizar suas vendas.',
    color: 'sky'
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
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => cards.forEach(card => observer.unobserve(card));
  }, []);

  return (
    <section id="funcionalidades-cards" className="py-20 md:py-28 bg-white" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossas ferramentas são projetadas para automação e eficiência, liberando seu tempo para focar no que realmente importa: crescer seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-index={index}
              className={cn(
                `feature-card group p-8 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-700 transform`,
                visibleCards[index] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
                // Centraliza o último card se o número total for 5
                features.length === 5 && index === 4 && 'lg:col-start-2'
              )}
            >
              {/* Usa o mapeamento de cores para aplicar a classe de gradiente correta */}
              <div className={cn(
                  'w-16 h-16 rounded-3xl bg-gradient-to-br flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 shadow-lg',
                   colorVariants[feature.color]
              )}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
