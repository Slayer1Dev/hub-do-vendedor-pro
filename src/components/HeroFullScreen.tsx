import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroFullScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const scrollNudgeTimeout = setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo({
          top: 100,
          behavior: 'smooth',
        });
      }
    }, 3000);

    return () => clearTimeout(scrollNudgeTimeout);
  }, []);

  const scrollToContent = () => {
    const featureCardsElement = document.getElementById('funcionalidades-cards');
    if (featureCardsElement) {
      featureCardsElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: 'smooth',
      });
    }
  };

  return (
    // 1. A section agora usa flexbox para centralizar um único container filho
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 dark:from-slate-900/30 dark:via-background dark:to-slate-800/20 px-4 pt-16 md:pt-20">
      
      {/* Elementos decorativos de fundo (sem alterações) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 dark:bg-blue-900/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-100/50 dark:bg-indigo-900/40 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-100/40 dark:bg-purple-900/30 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      {/* Container principal para todo o conteúdo de texto e botões */}
      <div className="text-center">
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-50 mb-8 leading-tight">
            <span className="block">Gerencie seus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> anúncios</span>
            </span>
            <span className="block">com inteligência e
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> automação real</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Ganhe tempo e aumente sua eficiência com respostas automáticas, análise de lucro e SEO otimizado
          </p>
        </div>

        {/* 2. Container para o CTA e o botão "Descubra", agora em fluxo normal */}
        <div className={`mt-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-semibold rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <Link to="/register">Ativar meu painel agora</Link>
          </Button>

          {/* 3. Botão "Descubra" agora tem margem superior (mt-16) para criar espaço */}
          <div className="mt-16 animate-bounce">
            <button
              onClick={scrollToContent}
              className="group flex flex-col items-center gap-2 mx-auto"
              aria-label="Rolar para o conteúdo"
            >
              <span className="text-primary/70 font-medium text-sm tracking-wide">
                Descubra
              </span>
              <div className="w-8 h-8 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                <ArrowDown className="w-5 h-5 text-primary/70" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFullScreen;