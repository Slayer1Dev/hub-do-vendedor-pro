
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Revolucione suas vendas no Mercado Livre
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              O hub definitivo para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> vendedores inteligentes</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automatize respostas, gerencie estoque, calcule lucros e otimize anúncios. 
              Tudo em uma plataforma moderna e intuitiva.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Comece agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-200 text-gray-700 px-8 py-4 text-lg rounded-2xl hover:bg-gray-50"
            >
              Ver demonstração
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>+340% de eficiência</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Setup em 2 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
