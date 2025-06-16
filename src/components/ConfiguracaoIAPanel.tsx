import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Info, Save, PlusCircle, Trash2, Pencil } from "lucide-react";

// Estado de exemplo para a base de conhecimento dinâmica
const initialKnowledgeItems = [
    { id: 1, title: 'Política de Garantia', content: 'Oferecemos 90 dias de garantia contra defeitos de fabricação em todos os produtos.' },
    { id: 2, title: 'Política de Envio', content: 'Pedidos confirmados até 14h são enviados no mesmo dia. O prazo de entrega é de 3-7 dias úteis.' },
    { id: 3, title: 'Condição dos iPhones', content: 'Nossos iPhones são seminovos, modelo vitrine, com saúde da bateria acima de 90% e vêm com cabo e carregador.' },
];

export default function ConfiguracaoIAPanel() {
    const [knowledgeItems, setKnowledgeItems] = useState(initialKnowledgeItems);

    // Futuramente, aqui teremos a lógica para adicionar, editar e remover itens no backend.
    const handleAddItem = () => console.log("Adicionar item");
    const handleEditItem = (id: number) => console.log("Editar item:", id);
    const handleDeleteItem = (id: number) => console.log("Deletar item:", id);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Personalidade e Tom de Voz</CardTitle>
          <CardDescription>
            Defina como a IA deve se comunicar com seus clientes. Isso será usado como base para todas as respostas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tone">Tom de Voz Principal</Label>
            <Select defaultValue="amigavel">
              <SelectTrigger id="tone"><SelectValue placeholder="Selecione um tom" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="amigavel">Amigável e informal</SelectItem>
                <SelectItem value="profissional">Profissional e direto</SelectItem>
                <SelectItem value="entusiasta">Entusiasta e vendedor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signature">Assinatura Padrão</Label>
            <Input id="signature" placeholder="Ex: Atenciosamente, Equipe de Vendas" defaultValue="Qualquer dúvida, estou à disposição!"/>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Base de Conhecimento</CardTitle>
                    <CardDescription>
                        Adicione informações sobre sua loja para que a IA possa responder perguntas específicas com precisão.
                    </CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Informação</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar Novo Item de Conhecimento</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="kb-title">Título</Label>
                                <Input id="kb-title" placeholder="Ex: Política de Trocas"/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="kb-content">Conteúdo</Label>
                                <Textarea id="kb-content" placeholder="Descreva a informação aqui..."/>
                            </div>
                        </div>
                         <Button onClick={handleAddItem}>Salvar Item</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
            {knowledgeItems.map(item => (
                <div key={item.id} className="border p-4 rounded-lg flex justify-between items-start bg-muted/20">
                    <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditItem(item.id)}><Pencil className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteItem(item.id)}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                </div>
            ))}
             {knowledgeItems.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum item de conhecimento adicionado ainda.</p>
                </div>
            )}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Modo de Operação</CardTitle>
          <CardDescription>
            Escolha como a IA deve operar. Você pode aprovar cada resposta ou deixar a IA trabalhar de forma autônoma.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="auto-mode-switch">Modo Automático</Label>
                    <p className="text-sm text-muted-foreground">
                        Permitir que a IA envie respostas sem sua aprovação prévia.
                    </p>
                </div>
                <Switch id="auto-mode-switch" defaultChecked/>
            </div>
             <div className="flex items-start space-x-3 rounded-lg border bg-muted/40 p-4 text-muted-foreground">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-xs">
                    No modo automático, a IA só responderá perguntas quando tiver um alto nível de confiança na resposta. Perguntas complexas serão sempre direcionadas para sua aprovação.
                </p>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">
            <Save className="mr-2 h-4 w-4" />
            Salvar Todas as Configurações
        </Button>
      </div>
    </div>
  );
}
