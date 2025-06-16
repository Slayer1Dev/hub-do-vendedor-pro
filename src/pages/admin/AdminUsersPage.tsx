import { useState } from 'react';
import { MoreHorizontal, PlusCircle, File, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';

// --- DADOS MOCKADOS ---
// Estrutura de dados pensada para ser compatível com o Clerk.
const mockUsers = [
  {
    id: 'user_2hA3B4c5D6e7F8g9H0i',
    name: 'Carlos Eduardo',
    email: 'carlos.edu@exemplo.com',
    avatarUrl: 'https://placehold.co/40x40/E2D9FF/6558C0?text=CE',
    plan: 'Pro',
    status: 'Ativo',
    planExpiresAt: '2025-07-15T00:00:00Z',
    joinedAt: '2024-01-10T10:00:00Z',
    lastSignInAt: '2024-06-15T09:15:00Z',
  },
  {
    id: 'user_1jK2l3M4n5o6P7q8R9s',
    name: 'Ana Paula Silva',
    email: 'anapaula.s@exemplo.com',
    avatarUrl: 'https://placehold.co/40x40/D1F2EB/20856A?text=AS',
    plan: 'Pro',
    status: 'Ativo',
    planExpiresAt: '2025-08-01T00:00:00Z',
    joinedAt: '2024-02-20T14:30:00Z',
    lastSignInAt: '2024-06-16T12:05:00Z',
  },
  {
    id: 'user_tUvWxYzAbCdEfGhIjK',
    name: 'Roberto Santos',
    email: 'roberto.santos@exemplo.com',
    avatarUrl: 'https://placehold.co/40x40/FFE9D6/D97706?text=RS',
    plan: 'Free',
    status: 'Ativo',
    planExpiresAt: null,
    joinedAt: '2024-03-05T08:00:00Z',
    lastSignInAt: '2024-06-14T18:45:00Z',
  },
  {
    id: 'user_lMnOpQrStUvWxYzAbC',
    name: 'Mariana Costa',
    email: 'mari.costa@exemplo.com',
    avatarUrl: '', // Sem avatar para testar fallback
    plan: 'Pro',
    status: 'Inativo',
    planExpiresAt: '2024-05-30T00:00:00Z',
    joinedAt: '2024-04-12T11:20:00Z',
    lastSignInAt: '2024-05-28T10:00:00Z',
  },
];

function EditPlanDialog({ user }) {
    const [selectedPlan, setSelectedPlan] = useState(user.plan);
    const [expiryDate, setExpiryDate] = useState(user.planExpiresAt ? new Date(user.planExpiresAt) : null);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editar Plano de {user.name}</DialogTitle>
                <DialogDescription>
                    Altere o plano de assinatura e a data de expiração do usuário.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="plan-select">Plano</Label>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                        <SelectTrigger id="plan-select">
                            <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Free">Gratuito</SelectItem>
                                <SelectItem value="Pro">Pro</SelectItem>
                                <SelectItem value="Enterprise">Enterprise</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Data de Expiração</Label>
                    <Calendar
                        mode="single"
                        selected={expiryDate}
                        onSelect={setExpiryDate}
                        className="rounded-md border"
                        disabled={selectedPlan === 'Free'}
                    />
                     <p className="text-xs text-muted-foreground">
                        Deixe em branco para acesso vitalício (enquanto ativo).
                    </p>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
        </DialogContent>
    );
}


export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Usuários</CardTitle>
        <CardDescription>
          Visualize, gerencie e configure as contas dos seus usuários.
        </CardDescription>
        <div className="pt-4 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por nome ou email..." className="pl-10" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar</span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Adicionar Usuário</span>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Expira em</TableHead>
              <TableHead className="hidden lg:table-cell">Membro desde</TableHead>
              <TableHead><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                        {user.name}
                        <div className="text-sm text-muted-foreground hidden md:inline">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.plan === 'Pro' ? 'default' : 'secondary'}>{user.plan}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <Badge variant={user.status === 'Ativo' ? 'default' : 'destructive'} className={user.status === 'Ativo' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>
                        {user.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.planExpiresAt ? new Date(user.planExpiresAt).toLocaleDateString('pt-BR') : 'N/A'}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(user.joinedAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Editar Plano</DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem>Configurar SaaS</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Suspender Usuário</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <EditPlanDialog user={user} />
                   </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Mostrando <strong>1-{filteredUsers.length}</strong> de <strong>{mockUsers.length}</strong> usuários
        </div>
      </CardFooter>
    </Card>
  );
}
