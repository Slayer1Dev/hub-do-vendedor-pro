import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Package, Search } from "lucide-react";

// Dados de exemplo para simular os anúncios do Mercado Livre
const mockAnuncios = [
  { id: 'MLB123', title: 'iPhone 14 Pro 256GB Roxo-profundo (Premium)', stock: 5 },
  { id: 'MLB124', title: 'iPhone 14 Pro 256GB Roxo (Clássico) - Usado', stock: 5 },
  { id: 'MLB125', title: 'Celular Apple iPhone 14 Pro 256gb Lacrado Anatel', stock: 5 },
  { id: 'MLB126', title: 'Kit 2x iPhone 14 Pro 256GB - Oferta Casal', stock: 5 },
  { id: 'MLB201', title: 'Samsung Galaxy S23 Ultra 512GB Preto', stock: 12 },
  { id: 'MLB202', title: 'Samsung S23 Ultra 5G - Novo na Caixa', stock: 12 },
];

// Dados de exemplo para simular os grupos já criados
const mockGrupos = [
  { id: 1, nome: 'iPhone 14 Pro 256GB - Roxo', anuncios: 4, estoque: 5 },
  { id: 2, nome: 'Samsung S23 Ultra 512GB', anuncios: 2, estoque: 12 },
];


export default function ControleEstoquePage() {
  const [grupos, setGrupos] = useState(mockGrupos);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnuncios, setSelectedAnuncios] = useState({});

  const filteredAnuncios = mockAnuncios.filter(anuncio => 
    anuncio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    // Lógica para criar o grupo (será implementada com o backend)
    console.log("Criar grupo com os anúncios selecionados:", selectedAnuncios);
    // Aqui, adicionaríamos o novo grupo ao estado `grupos`
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Grupo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Grupo de Estoque</DialogTitle>
              <DialogDescription>
                Agrupe anúncios do mesmo produto para que o estoque seja sincronizado automaticamente.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Nome do Grupo</Label>
                <Input id="group-name" placeholder="Ex: iPhone 14 Pro 256GB - Roxo" />
              </div>
              <div className="space-y-2">
                <Label>Selecione os Anúncios</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por título ou ID..." 
                    className="pl-10" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Card className="max-h-[200px] overflow-y-auto">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead>Título do Anúncio</TableHead>
                          <TableHead className="text-right">Estoque Atual</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAnuncios.map(anuncio => (
                          <TableRow key={anuncio.id}>
                            <TableCell>
                              <Checkbox 
                                id={anuncio.id}
                                onCheckedChange={(checked) => {
                                  setSelectedAnuncios(prev => ({...prev, [anuncio.id]: checked}));
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{anuncio.title}</TableCell>
                            <TableCell className="text-right">{anuncio.stock}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateGroup}>Criar Grupo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Grupos de Estoque</CardTitle>
          <CardDescription>
            Abaixo estão os seus grupos de estoque sincronizado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {grupos.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Grupo</TableHead>
                  <TableHead>Anúncios Sincronizados</TableHead>
                  <TableHead className="text-right">Estoque Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grupos.map((grupo) => (
                  <TableRow key={grupo.id}>
                    <TableCell className="font-semibold">{grupo.nome}</TableCell>
                    <TableCell>{grupo.anuncios}</TableCell>
                    <TableCell className="text-right font-bold">{grupo.estoque}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum grupo de estoque encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Crie seu primeiro grupo para começar a sincronizar o estoque.
              </p>
              {/* O botão de Criar Grupo já está no cabeçalho, não precisa repetir aqui */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
