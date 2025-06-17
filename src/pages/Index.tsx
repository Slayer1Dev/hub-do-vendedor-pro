import HeroFullScreen from '../components/HeroFullScreen';
import ToolSection from '../components/ToolSection'; // Ensure this path is correct and the component exists
import FeatureCards from '../components/FeatureCards';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    title: 'Gestão de Estoque para Mercado Livre',
    description: 'Sincronize o estoque de múltiplos anúncios criando grupos.',
    details: 'Vendeu em um anúncio? O Hub atualiza o estoque de todos os outros anúncios do grupo em tempo real. Nunca mais venda o que não tem.',
    icon: 'package',
    color: 'indigo',
    mockup: 'inventory-sync'
  }
];

const Index = () => {
  return (
    <>
      <HeroFullScreen />
      <FeatureCards />
      <div className="relative">
        {tools.map((tool, index) => (
          <ToolSection 
            key={`${tool.id}-${index}`}
            tool={tool}
            index={index}
            scrollY={window.scrollY} // Pass the scrollY value
          />
        ))}
      </div>
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
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 text-xl font-semibold rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link to="/register">Ativar meu painel agora</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;