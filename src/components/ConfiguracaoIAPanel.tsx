import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Info, Save, PlusCircle, Trash2, Loader2 } from "lucide-react";

// Schemas de validação permanecem os mesmos
const knowledgeItemSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  content: z.string().min(1, "O conteúdo é obrigatório."),
});
const formSchema = z.object({
  tone: z.enum(["amigavel", "profissional", "entusiasta"]),
  signature: z.string().optional(),
  autoMode: z.boolean(),
  knowledgeItems: z.array(knowledgeItemSchema),
});
type FormValues = z.infer<typeof formSchema>;

// O componente agora recebe props
export default function ConfiguracaoIAPanel({ initialData, onSave, isSaving }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // O formulário começa vazio, será preenchido pelo useEffect
    defaultValues: {
      tone: "amigavel",
      signature: "",
      autoMode: true,
      knowledgeItems: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "knowledgeItems",
  });

  // 1. useEffect para popular o formulário quando os dados da API chegam
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  // 2. A função onSubmit agora chama a "mutação" que veio via props
  function handleFormSubmit(data: FormValues) {
    onSave(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8 max-w-4xl mx-auto">
        {/* O restante do JSX do formulário permanece exatamente o mesmo */}
        <Card>
          <CardHeader>
            <CardTitle>Personalidade e Tom de Voz</CardTitle>
            <CardDescription>Defina como a IA deve se comunicar com seus clientes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="tone" render={({ field }) => ( <FormItem><FormLabel>Tom de Voz Principal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione um tom" /></SelectTrigger></FormControl><SelectContent><SelectItem value="amigavel">Amigável e informal</SelectItem><SelectItem value="profissional">Profissional e direto</SelectItem><SelectItem value="entusiasta">Entusiasta e vendedor</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="signature" render={({ field }) => ( <FormItem><FormLabel>Assinatura Padrão</FormLabel><FormControl><Input placeholder="Ex: Atenciosamente, Equipe de Vendas" {...field} /></FormControl><FormMessage /></FormItem> )} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Base de Conhecimento</CardTitle>
                <CardDescription>Adicione informações para que a IA possa responder perguntas com precisão.</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={() => append({ title: "", content: "" })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Informação
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg flex items-start gap-4 bg-muted/20">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`knowledgeItems.${index}.title`} render={({ field }) => ( <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name={`knowledgeItems.${index}.content`} render={({ field }) => ( <FormItem><FormLabel>Conteúdo</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <Button variant="ghost" size="icon" type="button" className="text-destructive hover:text-destructive mt-8" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {fields.length === 0 && ( <div className="text-center py-8 text-muted-foreground"><p>Nenhum item de conhecimento adicionado ainda.</p></div> )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modo de Operação</CardTitle>
            <CardDescription>Escolha como a IA deve operar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="autoMode" render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Modo Automático</FormLabel>
                  <p className="text-sm text-muted-foreground">Permitir que a IA envie respostas sem sua aprovação prévia.</p>
                </div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )} />
             <div className="flex items-start space-x-3 rounded-lg border bg-muted/40 p-4 text-muted-foreground">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-xs">No modo automático, a IA só responderá perguntas quando tiver um alto nível de confiança. Perguntas complexas serão sempre direcionadas para sua aprovação.</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving}>
            {isSaving ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : ( <Save className="mr-2 h-4 w-4" /> )}
            {isSaving ? "Salvando..." : "Salvar Todas as Configurações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}