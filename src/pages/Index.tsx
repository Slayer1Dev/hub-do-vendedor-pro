
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroFullScreen from '../components/HeroFullScreen';
import ToolSection from '../components/ToolSection';
import FeatureCards from '../components/FeatureCards';
import Footer from '../components/Footer';

const tools = [
  {
    id: 'respostas',
    title: 'Respostas Automáticas Inteligentes',
    description: 'IA responde perguntas dos compradores automaticamente, mantendo seu padrão de atendimento personalizado.',
    details: 'Analisa o histórico das suas respostas e gera replies inteligentes que convertem mais vendas.',
    icon: 'chat',
    color: 'blue',
    mockup: 'chat-simulation'
  },
  {
    id: 'ean',
    title: 'Gerador de Códigos EAN',
    description: 'Gere códigos EAN-13 válidos instantaneamente para seus produtos.',
    details: 'Códigos únicos e válidos que passam em todas as verificações de marketplaces.',
    icon: 'barcode',
    color: 'green',
    mockup: 'barcode-generation'
  },
  {
    id: 'lucro',
    title: 'Calculadora de Lucro Multi-Marketplace',
    description: 'Calcule preços ideais considerando custos, comissões e margem desejada.',
    details: 'Otimize seus preços para maximizar lucros em cada plataforma de vendas.',
    icon: 'calculator',
    color: 'purple',
    mockup: 'profit-calculation'
  },
  {
    id: 'seo',
    title: 'Otimizador de Anúncios SEO',
    description: 'IA melhora títulos e descrições para maior visibilidade nos resultados.',
    details: 'Aumente suas vendas com títulos otimizados que aparecem primeiro nas buscas.',
    icon: 'search',
    color: 'orange',
    mockup: 'seo-optimization'
  },
  {
    id: 'estoque',
    title: 'Estoque Compartilhado',
    description: 'Sincronize estoque entre múltiplos anúncios e marketplaces em tempo real.',
    details: 'Nunca mais venda o que não tem. Controle total do seu inventário.',
    icon: 'package',
    color: 'indigo',
    mockup: 'inventory-sync'
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navigation />
      
      {/* Hero Full Screen */}
      <HeroFullScreen />
      
      {/* Feature Cards Section */}
      <FeatureCards />
      
      {/* Tool Sections */}
      <div className="relative">
        {tools.map((tool, index) => (
          <ToolSection 
            key={tool.id}
            tool={tool}
            index={index}
            scrollY={scrollY}
          />
        ))}
      </div>

      {/* CTA Final */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/20"></div>
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="mb-8 transform transition-all duration-1000">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pronto para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> revolucionar</span>
              <br />suas vendas?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Junte-se a milhares de vendedores que já aumentaram seus lucros com nossas ferramentas inteligentes
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 text-xl font-semibold rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Ativar meu painel agora
            </button>
            <button className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-12 py-5 text-xl font-semibold rounded-3xl transition-all duration-300">
              Ver Demonstração
            </button>
          </div>
          
          <p className="text-blue-600/70 text-sm">
            Teste grátis por 7 dias • Sem cartão de crédito • Suporte 24/7
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
