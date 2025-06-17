import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getStockGroups, createStockGroup } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Package, Search, Loader2 } from "lucide-react";


// Dados de exemplo para seleção de anúncios
const mockAnuncios = [
  { id: 'MLB123', title: 'iPhone 14 Pro 256GB Roxo-profundo (Premium)', stock: 5 },
  { id: 'MLB124', title: 'iPhone 14 Pro 256GB Roxo (Clássico) - Usado', stock: 5 },
  { id: 'MLB125', title: 'Celular Apple iPhone 14 Pro 256gb Lacrado Anatel', stock: 5 },
  { id: 'MLB201', title: 'Samsung Galaxy S23 Ultra 512GB Preto', stock: 12 },
  { id: 'MLB202', title: 'Samsung S23 Ultra 5G - Novo na Caixa', stock: 12 },
];

const formSchema = z.object({
  groupName: z.string().min(3, { message: "O nome do grupo deve ter pelo menos 3 caracteres." }),
  announcementIds: z.array(z.string()).min(1, { message: "Selecione pelo menos um anúncio para o grupo." }),
});
type FormValues = z.infer<typeof formSchema>;

function CreateGroupDialog({ onGroupCreated }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { getToken } = useAuth();
  
  const mutation = useMutation({
    mutationFn: (newGroup: FormValues) => createStockGroup(newGroup, getToken),
    onSuccess: () => {
      toast.success("Grupo criado com sucesso!");
      onGroupCreated(); // Chama a função do pai para fechar o dialog e atualizar a lista
    },
    onError: (error) => {
      toast.error(`Erro ao criar grupo: ${error.message}`);
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { groupName: "", announcementIds: [] },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  const filteredAnuncios = mockAnuncios.filter(anuncio =>
    anuncio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DialogContent className="sm:max-w-[625px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader><DialogTitle>Criar Novo Grupo de Estoque</DialogTitle><DialogDescription>Agrupe anúncios para sincronizar o estoque.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <FormField control={form.control} name="groupName" render={({ field }) => ( <FormItem><FormLabel>Nome do Grupo</FormLabel><FormControl><Input placeholder="Ex: iPhone 14 Pro 256GB" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="announcementIds" render={({ field }) => (
              <FormItem>
                <FormLabel>Selecione os Anúncios</FormLabel>
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Buscar por título ou ID..." className="pl-10" onChange={(e) => setSearchTerm(e.target.value)} /></div>
                <Card className="max-h-[200px] overflow-y-auto"><CardContent className="p-0"><Table>
                  <TableHeader><TableRow><TableHead className="w-[50px]"></TableHead><TableHead>Título</TableHead><TableHead className="text-right">Estoque</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {filteredAnuncios.map(anuncio => (
                      <TableRow key={anuncio.id}>
                        <TableCell><Checkbox checked={field.value?.includes(anuncio.id)} onCheckedChange={(checked) => { return checked ? field.onChange([...field.value, anuncio.id]) : field.onChange(field.value?.filter((id) => id !== anuncio.id)); }} /></TableCell>
                        <TableCell className="font-medium">{anuncio.title}</TableCell><TableCell className="text-right">{anuncio.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table></CardContent></Card>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <DialogFooter><Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mutation.isPending ? "Criando..." : "Criar Grupo"}
          </Button></DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default function ControleEstoquePage() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: grupos, isLoading, isError, error } = useQuery({
    queryKey: ['stockGroups'],
    queryFn: () => getStockGroups(getToken),
  });

  const handleGroupCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['stockGroups'] });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Grupo</Button></DialogTrigger>
          <CreateGroupDialog onGroupCreated={handleGroupCreated} />
        </Dialog>
      </div>
      
      <Card>
        <CardHeader><CardTitle>Grupos de Estoque</CardTitle><CardDescription>Abaixo estão os seus grupos de estoque sincronizado.</CardDescription></CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <p className="text-destructive">Erro ao carregar grupos: {error.message}</p>
          ) : grupos && grupos.length > 0 ? (
            <Table>
              <TableHeader><TableRow><TableHead>Nome do Grupo</TableHead><TableHead>Anúncios Sincronizados</TableHead><TableHead className="text-right">Estoque Total</TableHead></TableRow></TableHeader>
              <TableBody>{grupos.map((grupo) => (
                <TableRow key={grupo.id}><TableCell className="font-semibold">{grupo.nome}</TableCell><TableCell>{grupo.anuncios}</TableCell><TableCell className="text-right font-bold">{grupo.estoque}</TableCell></TableRow>
              ))}</TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum grupo de estoque encontrado</h3>
              <p className="text-muted-foreground mb-4">Crie seu primeiro grupo para começar a sincronizar o estoque.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}