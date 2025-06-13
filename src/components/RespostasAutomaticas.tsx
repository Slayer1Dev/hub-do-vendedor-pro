
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Edit3, Send, Filter, Clock, CheckCircle } from 'lucide-react';

const RespostasAutomaticas = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const questions = [
    {
      id: 1,
      product: 'iPhone 13 Pro Max 256GB',
      question: 'Vocês fazem entrega para o interior de SP?',
      buyer: 'João Silva',
      time: '5 min atrás',
      status: 'pending',
      aiResponse: 'Olá! Sim, fazemos entregas para todo o estado de São Paulo através dos Correios. O prazo varia de 3 a 7 dias úteis dependendo da cidade. Qualquer dúvida, estou à disposição!'
    },
    {
      id: 2,
      product: 'Samsung Galaxy S23 Ultra',
      question: 'O produto vem com nota fiscal?',
      buyer: 'Maria Santos',
      time: '12 min atrás',
      status: 'answered',
      aiResponse: 'Sim! Todos os nossos produtos vêm com nota fiscal e garantia de 1 ano. Você receberá a nota fiscal por e-mail após a confirmação da compra.'
    },
    {
      id: 3,
      product: 'MacBook Air M2',
      question: 'Aceita cartão de crédito em quantas vezes?',
      buyer: 'Pedro Costa',
      time: '25 min atrás',
      status: 'pending',
      aiResponse: 'Aceitamos cartão de crédito em até 12x sem juros! Também temos outras opções como PIX (com 5% de desconto) e boleto bancário.'
    }
  ];

  const filteredQuestions = questions.filter(q => 
    filter === 'all' || q.status === filter
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Respostas Automáticas</h1>
          <p className="text-gray-600">IA responde perguntas automaticamente mantendo seu padrão</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="answered">Respondidas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Questions List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Perguntas Recentes</h3>
          
          {filteredQuestions.map((q) => (
            <div 
              key={q.id}
              onClick={() => setSelectedQuestion(q.id)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 ${
                selectedQuestion === q.id 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">{q.buyer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {q.status === 'answered' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                  <span className="text-xs text-gray-500">{q.time}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{q.product}</p>
              <p className="text-gray-900 font-medium">{q.question}</p>
            </div>
          ))}
        </div>

        {/* AI Response Preview */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resposta Gerada por IA</h3>
          
          {selectedQuestion ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-900">
                  {questions.find(q => q.id === selectedQuestion)?.aiResponse}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Resposta
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-200 rounded-2xl"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-2xl">
                💡 Esta resposta foi gerada automaticamente baseada no seu histórico de atendimento
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Selecione uma pergunta para ver a resposta gerada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RespostasAutomaticas;
