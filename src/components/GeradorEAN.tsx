
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Plus, RefreshCw, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GeradorEAN = () => {
  const [generatedCodes, setGeneratedCodes] = useState([
    { code: '7891234567890', createdAt: '2024-01-15 14:30', copied: false },
    { code: '7891234567891', createdAt: '2024-01-15 14:25', copied: false },
    { code: '7891234567892', createdAt: '2024-01-15 14:20', copied: false },
  ]);

  const generateNewEAN = () => {
    // Generate a valid EAN-13 code
    const generateEAN13 = () => {
      const prefix = '789'; // Brazil prefix
      const company = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const product = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
      const base = prefix + company + product;
      
      // Calculate check digit
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(base[i]) * (i % 2 === 0 ? 1 : 3);
      }
      const checkDigit = (10 - (sum % 10)) % 10;
      
      return base + checkDigit;
    };

    const newCode = {
      code: generateEAN13(),
      createdAt: new Date().toLocaleString('pt-BR'),
      copied: false
    };

    setGeneratedCodes([newCode, ...generatedCodes]);
    toast({
      title: "EAN gerado com sucesso!",
      description: `Código ${newCode.code} adicionado à lista.`,
    });
  };

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      
      // Update copied state
      const updatedCodes = [...generatedCodes];
      updatedCodes[index] = { ...updatedCodes[index], copied: true };
      setGeneratedCodes(updatedCodes);
      
      toast({
        title: "Código copiado!",
        description: `EAN ${code} copiado para a área de transferência.`,
      });

      // Reset copied state after 2 seconds
      setTimeout(() => {
        const resetCodes = [...generatedCodes];
        resetCodes[index] = { ...resetCodes[index], copied: false };
        setGeneratedCodes(resetCodes);
      }, 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerador de EAN</h1>
          <p className="text-gray-600">Gere códigos EAN-13 válidos para seus produtos</p>
        </div>
        
        <Button 
          onClick={generateNewEAN}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Gerar Novo EAN
        </Button>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Sobre códigos EAN-13</h3>
        <p className="text-blue-700 mb-4">
          Os códigos EAN-13 são identificadores únicos necessários para produtos no Mercado Livre e outros marketplaces. 
          Nosso gerador cria códigos válidos seguindo o padrão internacional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800">13 dígitos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800">Válido internacionalmente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800">Prefixo brasileiro (789)</span>
          </div>
        </div>
      </div>

      {/* Generated Codes List */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Códigos Gerados</h3>
          <p className="text-gray-600 text-sm">Clique para copiar qualquer código</p>
        </div>

        <div className="divide-y divide-gray-100">
          {generatedCodes.map((item, index) => (
            <div 
              key={index}
              className="p-6 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="font-mono text-xl font-bold text-gray-900 tracking-wider">
                      {item.code}
                    </div>
                    {item.copied && (
                      <div className="flex items-center space-x-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Copiado!</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Gerado em {item.createdAt}
                  </p>
                </div>
                
                <Button
                  onClick={() => copyToClipboard(item.code, index)}
                  variant="outline"
                  className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl"
                  disabled={item.copied}
                >
                  {item.copied ? (
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {item.copied ? 'Copiado' : 'Copiar'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 Dicas de uso</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Use um código EAN único para cada variação do produto</li>
          <li>• Guarde os códigos gerados para controle interno</li>
          <li>• Alguns marketplaces verificam a validade do código</li>
        </ul>
      </div>
    </div>
  );
};

export default GeradorEAN;
