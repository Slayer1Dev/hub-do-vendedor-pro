
import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Eduardo',
    role: 'Vendedor Premium',
    content: 'Desde que comecei a usar o Hub, minhas vendas aumentaram 200%. A automação de respostas me economiza 3 horas por dia!',
    rating: 5,
    sales: '+R$ 50k/mês',
    avatar: 'C'
  },
  {
    name: 'Ana Paula Silva',
    role: 'Loja de Eletrônicos',
    content: 'A calculadora de lucro é perfeita! Agora sei exatamente quanto preciso cobrar em cada marketplace.',
    rating: 5,
    sales: '+140% lucro',
    avatar: 'A'
  },
  {
    name: 'Roberto Santos',
    role: 'Multi-marketplace',
    content: 'O controle de estoque sincronizado mudou minha vida. Nunca mais vendi produto sem estoque.',
    rating: 5,
    sales: '0 problemas',
    avatar: 'R'
  }
];

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O que dizem nossos vendedores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 5.000 vendedores já transformaram seus negócios com nossas ferramentas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              data-index={index}
              className={`testimonial-card bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-500 relative transform ${
                visibleCards[index] 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              
              <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{testimonial.sales}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-3">+5.000 vendedores confiam em nós</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
