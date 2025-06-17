import { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getAiSettings, updateAiSettings } from "@/lib/api";

import { Button } from '@/components/ui/button';
import { MessageSquare, Edit3, Send, Clock, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfiguracaoIAPanel from '@/components/ConfiguracaoIAPanel';
import { Skeleton } from '@/components/ui/skeleton';

const questions = [
    { id: 1, product: 'iPhone 13 Pro Max 256GB', question: 'Vocês fazem entrega para o interior de SP?', buyer: 'João Silva', time: '5 min atrás', status: 'pending', aiResponse: 'Olá! Sim, fazemos entregas para todo o estado de São Paulo através dos Correios. O prazo varia de 3 a 7 dias úteis dependendo da cidade. Qualquer dúvida, estou à disposição!' },
    { id: 2, product: 'Samsung Galaxy S23 Ultra', question: 'O produto vem com nota fiscal?', buyer: 'Maria Santos', time: '12 min atrás', status: 'answered', aiResponse: 'Sim! Todos os nossos produtos vêm com nota fiscal e garantia de 1 ano. Você receberá a nota fiscal por e-mail após a confirmação da compra.' },
    { id: 3, product: 'MacBook Air M2', question: 'Aceita cartão de crédito em quantas vezes?', buyer: 'Pedro Costa', time: '25 min atrás', status: 'pending', aiResponse: 'Aceitamos cartão de crédito em até 12x sem juros! Também temos outras opções como PIX (com 5% de desconto) e boleto bancário.' }
];

function InboxView() {
    const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Perguntas Recentes</h3>
                {questions.map((q) => (
                    <div 
                        key={q.id}
                        onClick={() => setSelectedQuestion(q)}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${selectedQuestion.id === q.id ? 'border-primary bg-muted' : 'border-border bg-card hover:bg-muted/50'}`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3"><MessageSquare className="w-5 h-5 text-primary" /><span className="text-sm font-medium text-foreground">{q.buyer}</span></div>
                            <div className="flex items-center space-x-2">{q.status === 'answered' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-amber-500" />}<span className="text-xs text-muted-foreground">{q.time}</span></div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 font-medium">{q.product}</p>
                        <p className="text-foreground">{q.question}</p>
                    </div>
                ))}
            </div>
            <div className="bg-card rounded-2xl border p-6 lg:sticky top-24 self-start">
                <h3 className="text-lg font-semibold text-foreground mb-4">Resposta Gerada por IA</h3>
                {selectedQuestion ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-xl"><p className="text-foreground leading-relaxed">{selectedQuestion.aiResponse}</p></div>
                        <div className="flex items-center space-x-3"><Button className="flex-1"><Send className="w-4 h-4 mr-2" />Enviar Resposta</Button><Button variant="outline"><Edit3 className="w-4 h-4 mr-2" />Editar</Button></div>
                        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-xl">💡 Esta resposta foi gerada automaticamente baseada nas suas configurações e histórico de atendimento.</div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground"><MessageSquare className="w-12 h-12 mx-auto mb-4" /><p>Selecione uma pergunta para ver a resposta gerada.</p></div>
                )}
            </div>
        </div>
    );
}

const SettingsSkeleton = () => (
  <div className="space-y-8 max-w-4xl mx-auto">
    <div className="space-y-4"><Skeleton className="h-8 w-1/3" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-10 w-full mt-4" /><Skeleton className="h-10 w-full mt-2" /></div>
    <div className="space-y-4"><Skeleton className="h-8 w-1/3" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-24 w-full mt-4" /></div>
  </div>
);

export default function RespostasPage() {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    const { data: settings, isLoading, isError, error } = useQuery({
      queryKey: ['aiSettings'],
      queryFn: () => getAiSettings(getToken),
    });

    const mutation = useMutation({
      mutationFn: (newSettings: any) => updateAiSettings(newSettings, getToken),
      onSuccess: () => {
        toast.success("Configurações da IA salvas com sucesso!");
        queryClient.invalidateQueries({ queryKey: ['aiSettings'] });
      },
      onError: (err) => {
        toast.error(`Erro ao salvar: ${err.message}`);
      },
    });

    return (
        <Tabs defaultValue="inbox" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="inbox">Caixa de Entrada</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações da IA</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="mt-6">
                <InboxView />
            </TabsContent>
            <TabsContent value="configuracoes" className="mt-6">
                {isLoading && <SettingsSkeleton />}
                {isError && <div className="text-destructive">Erro ao carregar configurações: {error.message}</div>}
                {settings && (
                  <ConfiguracaoIAPanel
                    initialData={settings}
                    onSave={mutation.mutate}
                    isSaving={mutation.isPending}
                  />
                )}
            </TabsContent>
        </Tabs>
    );
}