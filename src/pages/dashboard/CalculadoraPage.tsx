import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { calculatePricing } from "@/lib/api"; // Importa a nova função da API
import { mercadoLivreData, Subcategoria } from '@/lib/mercado-livre-data';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Check, ChevronsUpDown, Loader2 } from "lucide-react";


const formSchema = z.object({
  custo: z.string().min(1, "O custo é obrigatório.").transform(Number),
  frete: z.string().optional().transform(v => v ? Number(v) : 0),
  outrosCustos: z.string().optional().transform(v => v ? Number(v) : 0),
  lucroDesejado: z.string().min(1, "A margem de lucro é obrigatória.").transform(Number),
  tipoAnuncioML: z.enum(["classico", "premium"]),
  categoria: z.custom<Subcategoria>((val) => val !== null, "Selecione uma categoria."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CalculadoraLucroPage() {
  const { getToken } = useAuth();
  const [resultados, setResultados] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      custo: 0,
      frete: 0,
      outrosCustos: 0,
      lucroDesejado: 0,
      tipoAnuncioML: "premium",
      categoria: null,
    },
  });

  // 2. Usando useMutation para lidar com a chamada da API
  const mutation = useMutation({
    mutationFn: (formData: FormValues) => calculatePricing(formData, getToken),
    onSuccess: (data) => {
      setResultados(data);
      toast.success("Cálculo realizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro no cálculo: ${error.message}`);
    },
  });

  // 3. A função de submissão agora apenas chama a mutação
  function onCalculate(data: FormValues) {
    mutation.mutate(data);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader><CardTitle>Custos e Meta</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="custo" render={({ field }) => ( <FormItem><FormLabel>Custo de Compra (R$)</FormLabel><FormControl><Input type="number" placeholder="Ex: 85.50" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="frete" render={({ field }) => ( <FormItem><FormLabel>Custo do Frete (R$)</FormLabel><FormControl><Input type="number" placeholder="Ex: 22.00" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="outrosCustos" render={({ field }) => ( <FormItem><FormLabel>Outros Custos (R$)</FormLabel><FormControl><Input type="number" placeholder="Embalagem, impostos, etc." {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="lucroDesejado" render={({ field }) => ( <FormItem><FormLabel>Margem de Lucro Desejada (%)</FormLabel><FormControl><Input type="number" placeholder="Ex: 25" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Configurações Mercado Livre</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="categoria" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria do Produto</FormLabel>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <FormControl>
                           <Button variant="outline" role="combobox" className="w-full justify-between">
                            <span className="truncate">{field.value ? field.value.nome : "Selecione uma categoria..."}</span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </DialogTrigger>
                      <DialogContent className="p-0"><Command><CommandInput placeholder="Pesquisar categoria..." /><CommandList><CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                        {mercadoLivreData.map((categoria) => (
                          <CommandGroup key={categoria.id} heading={categoria.nome}>
                            {categoria.subcategorias.map((subcat) => (
                              <CommandItem key={subcat.nome} value={`${categoria.nome} > ${subcat.nome}`} onSelect={() => { form.setValue("categoria", subcat); setIsDialogOpen(false); }}>
                                <Check className={`mr-2 h-4 w-4 ${field.value?.nome === subcat.nome ? "opacity-100" : "opacity-0"}`} />
                                {subcat.nome}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))}
                      </CommandList></Command></DialogContent>
                    </Dialog>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="tipoAnuncioML" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de Anúncio</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="classico" id="classico" /></FormControl><FormLabel htmlFor="classico" className="font-normal">Clássico</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="premium" id="premium" /></FormControl><FormLabel htmlFor="premium" className="font-normal">Premium</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            {/* 4. O estado de carregamento agora vem do `mutation.isPending` */}
            <Button type="submit" className="w-full text-lg py-6" disabled={mutation.isPending}>
              {mutation.isPending ? ( <Loader2 className="w-5 h-5 mr-2 animate-spin" /> ) : ( <Calculator className="w-5 h-5 mr-2" /> )}
              {mutation.isPending ? "Calculando..." : "Calcular"}
            </Button>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Resultados da Precificação</CardTitle>
                <CardDescription>O preço de venda ideal para atingir sua meta em cada plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 5. A exibição de resultados agora é preenchida pelos dados da API */}
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
        </form>
      </Form>
    </div>
  );
}