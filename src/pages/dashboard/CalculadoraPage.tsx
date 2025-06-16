import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Check, ChevronsUpDown } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mercadoLivreData, outrasPlataformas, Subcategoria } from '@/lib/mercado-livre-data';

export default function CalculadoraLucroPage() {
  const [formData, setFormData] = useState({
    custo: '',
    frete: '',
    outrosCustos: '',
    lucroDesejado: '',
    tipoAnuncioML: 'premium',
  });
  
  const [selectedCategoria, setSelectedCategoria] = useState<Subcategoria | null>(null);
  const [open, setOpen] = useState(false);
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const calcularPreco = () => {
    const { custo, frete, outrosCustos, lucroDesejado, tipoAnuncioML } = formData;
    const custoNum = parseFloat(custo) || 0;
    const freteNum = parseFloat(frete) || 0;
    const outrosCustosNum = parseFloat(outrosCustos) || 0;
    const lucroDesejadoNum = parseFloat(lucroDesejado) || 0;

    const custoTotal = custoNum + freteNum + outrosCustosNum;
    const margemLucro = lucroDesejadoNum / 100;
    const novosResultados = [];

    // Cálculo Mercado Livre
    if (selectedCategoria) {
        const taxaAnuncio = selectedCategoria.taxas[tipoAnuncioML];
        const taxaFixaML = 6.00;
        // A lógica de precificação considera que o frete é um custo fixo no cálculo inicial
        let precoBase = (custoTotal + taxaFixaML) / (1 - margemLucro - taxaAnuncio);
        // Aplica o custo de frete (50%) apenas se o preço final for maior ou igual a R$79
        const precoFinalML = precoBase >= 79 ? precoBase + (freteNum * 0.5) : precoBase;
        
        const comissaoValorML = (precoFinalML * taxaAnuncio) + (precoFinalML < 79 ? taxaFixaML : 0);
        const lucroFinalML = precoFinalML - custoTotal - comissaoValorML - (precoFinalML >= 79 ? freteNum * 0.5 : 0);
        const margemFinalML = (lucroFinalML / precoFinalML) * 100;
        novosResultados.push({ nome: 'Mercado Livre', logo: 'https://placehold.co/40x40/FFE600/000000?text=ML', precoFinal: precoFinalML.toFixed(2), comissaoValor: comissaoValorML.toFixed(2), lucroFinal: lucroFinalML.toFixed(2), margemFinal: margemFinalML.toFixed(1) });
    }
    
    // Cálculo Outras Plataformas
    Object.values(outrasPlataformas).forEach(plat => {
      const precoFinal = (custoTotal + plat.taxa_fixa) / (1 - margemLucro - plat.comissao);
      const comissaoValor = (precoFinal * plat.comissao) + plat.taxa_fixa;
      const lucroFinal = precoFinal - custoTotal - comissaoValor;
      const margemFinal = (lucroFinal / precoFinal) * 100;
      novosResultados.push({ ...plat, precoFinal: precoFinal.toFixed(2), comissaoValor: comissaoValor.toFixed(2), lucroFinal: lucroFinal.toFixed(2), margemFinal: margemFinal.toFixed(1) });
    });
    setResultados(novosResultados);
  };

  const isFormValid = formData.custo && formData.lucroDesejado && selectedCategoria;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Custos e Meta</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label htmlFor="custo">Custo de Compra (R$)</Label><Input id="custo" type="number" placeholder="Ex: 85.50" value={formData.custo} onChange={handleChange} /></div>
              <div className="space-y-2"><Label htmlFor="frete">Custo do Frete (R$)</Label><Input id="frete" type="number" placeholder="Ex: 22.00" value={formData.frete} onChange={handleChange} /></div>
              <div className="space-y-2"><Label htmlFor="outrosCustos">Outros Custos (R$)</Label><Input id="outrosCustos" type="number" placeholder="Embalagem, impostos, etc." value={formData.outrosCustos} onChange={handleChange} /></div>
              <div className="space-y-2"><Label htmlFor="lucroDesejado">Margem de Lucro Desejada (%)</Label><Input id="lucroDesejado" type="number" placeholder="Ex: 25" value={formData.lucroDesejado} onChange={handleChange} /></div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle>Configurações Mercado Livre</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Categoria do Produto</Label>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                      <span className="truncate">{selectedCategoria ? selectedCategoria.nome : "Selecione uma categoria..."}</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Pesquisar categoria..." />
                      <CommandList>
                        <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                        {mercadoLivreData.map((categoria) => (
                          <CommandGroup key={categoria.id} heading={categoria.nome}>
                            {categoria.subcategorias.map((subcat) => (
                              <CommandItem
                                key={subcat.nome}
                                value={`${categoria.nome} > ${subcat.nome}`}
                                onSelect={() => {
                                  setSelectedCategoria(subcat);
                                  setOpen(false);
                                }}
                              >
                                <Check className={`mr-2 h-4 w-4 ${selectedCategoria?.nome === subcat.nome ? "opacity-100" : "opacity-0"}`} />
                                {subcat.nome}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Anúncio</Label>
                <RadioGroup value={formData.tipoAnuncioML} onValueChange={(value) => setFormData(prev => ({ ...prev, tipoAnuncioML: value }))} className="flex gap-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="classico" id="classico" /><Label htmlFor="classico">Clássico</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="premium" id="premium" /><Label htmlFor="premium">Premium</Label></div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          <Button onClick={calcularPreco} className="w-full text-lg py-6" disabled={!isFormValid}><Calculator className="w-5 h-5 mr-2" />Calcular</Button>
        </div>
        <div className="lg:col-span-2">
           <Card>
            <CardHeader>
              <CardTitle>Resultados da Precificação</CardTitle>
              <CardDescription>O preço de venda ideal para atingir sua meta em cada plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              {resultados.length > 0 ? (
                <div className="space-y-4">
                  {resultados.map(res => (
                    <Card key={res.nome} className="bg-muted/30">
                       <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center gap-3">
                          <img src={res.logo} alt={`Logo ${res.nome}`} className="w-8 h-8 rounded-full border-2 border-background" />
                          {res.nome}
                        </CardTitle>
                        <div className="text-3xl font-bold text-primary">R$ {res.precoFinal}</div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-4 text-center pt-2">
                          <div className="flex flex-col"><span className="text-sm text-muted-foreground">Lucro Líquido</span><span className="font-semibold text-green-600">R$ {res.lucroFinal}</span></div>
                          <div className="flex flex-col"><span className="text-sm text-muted-foreground">Taxas Totais</span><span className="font-semibold text-red-600">R$ {res.comissaoValor}</span></div>
                          <div className="flex flex-col"><span className="text-sm text-muted-foreground">Margem Real</span><span className="font-semibold text-primary">{res.margemFinal}%</span></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground"><Calculator className="mx-auto h-12 w-12 mb-4" /><p>Preencha todos os campos para ver os resultados.</p></div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
