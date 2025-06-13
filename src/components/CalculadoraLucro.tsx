
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const CalculadoraLucro = () => {
  const [formData, setFormData] = useState({
    custo: '',
    lucroDesejado: '',
    plataforma: 'mercado_livre'
  });

  const [resultado, setResultado] = useState<any>(null);

  const plataformas = {
    mercado_livre: { nome: 'Mercado Livre', comissao: 0.16, taxa_fixa: 0 },
    amazon: { nome: 'Amazon', comissao: 0.15, taxa_fixa: 2.5 },
    shopee: { nome: 'Shopee', comissao: 0.12, taxa_fixa: 0 },
    magazine_luiza: { nome: 'Magazine Luiza', comissao: 0.18, taxa_fixa: 0 }
  };

  const calcularPreco = () => {
    const custo = parseFloat(formData.custo) || 0;
    const lucroDesejado = parseFloat(formData.lucroDesejado) || 0;
    const plat = plataformas[formData.plataforma as keyof typeof plataformas];

    const custoTotal = custo;
    const margemLucro = lucroDesejado / 100;
    
    // Cálculo: Preço = (Custo + Lucro) / (1 - Comissão)
    const precoBase = custoTotal / (1 - margemLucro);
    const precoFinal = precoBase / (1 - plat.comissao) + plat.taxa_fixa;
    
    const comissaoValor = precoFinal * plat.comissao + plat.taxa_fixa;
    const lucroFinal = precoFinal - custoTotal - comissaoValor;
    const margemFinal = (lucroFinal / precoFinal) * 100;

    setResultado({
      precoFinal: precoFinal.toFixed(2),
      comissaoValor: comissaoValor.toFixed(2),
      lucroFinal: lucroFinal.toFixed(2),
      margemFinal: margemFinal.toFixed(1),
      plataforma: plat.nome
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculadora de Lucro</h1>
        <p className="text-gray-600">Calcule o preço ideal considerando custos e comissões</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Dados do Produto</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custo do Produto (R$)
              </label>
              <input
                type="number"
                placeholder="Ex: 150.00"
                value={formData.custo}
                onChange={(e) => setFormData({...formData, custo: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margem de Lucro Desejada (%)
              </label>
              <input
                type="number"
                placeholder="Ex: 30"
                value={formData.lucroDesejado}
                onChange={(e) => setFormData({...formData, lucroDesejado: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plataforma de Venda
              </label>
              <select
                value={formData.plataforma}
                onChange={(e) => setFormData({...formData, plataforma: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(plataformas).map(([key, plat]) => (
                  <option key={key} value={key}>
                    {plat.nome} ({(plat.comissao * 100).toFixed(1)}% comissão)
                  </option>
                ))}
              </select>
            </div>

            <Button 
              onClick={calcularPreco}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold"
              disabled={!formData.custo || !formData.lucroDesejado}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcular Preço Ideal
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Resultado</h3>
          
          {resultado ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Preço Final</span>
                </div>
                <p className="text-3xl font-bold text-green-900">R$ {resultado.precoFinal}</p>
                <p className="text-sm text-green-600">{resultado.plataforma}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  <p className="text-sm text-blue-600 mb-1">Comissão</p>
                  <p className="text-xl font-bold text-blue-900">R$ {resultado.comissaoValor}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-2xl">
                  <p className="text-sm text-purple-600 mb-1">Lucro Final</p>
                  <p className="text-xl font-bold text-purple-900">R$ {resultado.lucroFinal}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Margem de Lucro Real:</span>
                  <span className="font-bold text-gray-900">{resultado.margemFinal}%</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <h4 className="font-semibold text-gray-900">Detalhamento:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Custo do produto:</span>
                    <span>R$ {formData.custo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comissão da plataforma:</span>
                    <span>R$ {resultado.comissaoValor}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Lucro líquido:</span>
                    <span>R$ {resultado.lucroFinal}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Preencha os campos e clique em calcular</p>
            </div>
          )}
        </div>
      </div>

      {/* Platform Comparison */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparativo de Comissões</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(plataformas).map(([key, plat]) => (
            <div key={key} className="p-4 border border-gray-200 rounded-2xl hover:border-blue-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">{plat.nome}</h4>
              <p className="text-2xl font-bold text-blue-600">{(plat.comissao * 100).toFixed(1)}%</p>
              {plat.taxa_fixa > 0 && (
                <p className="text-sm text-gray-500">+ R$ {plat.taxa_fixa.toFixed(2)} fixo</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraLucro;
