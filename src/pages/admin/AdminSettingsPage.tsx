import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Trash } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações Gerais do SaaS</h1>
        <p className="text-muted-foreground">
          Gerencie chaves de API, planos, preços e funcionalidades globais.
        </p>
      </div>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Chaves de API</CardTitle>
          <CardDescription>
            Gerencie as chaves de API para serviços externos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-key">Chave da API Gemini</Label>
            <Input id="gemini-key" type="password" defaultValue="••••••••••••••••••••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clerk-key">Chave Secreta do Clerk</Label>
            <Input id="clerk-key" type="password" defaultValue="••••••••••••••••••••••••••" />
          </div>
           <Button>Salvar Chaves</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Planos</CardTitle>
          <CardDescription>
            Defina os preços e as características de cada plano de assinatura.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Plano Pro */}
            <div className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Plano Pro</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="pro-price">Preço Mensal (BRL)</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="pro-price" type="number" defaultValue="49.90" className="pl-10" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pro-features">Funcionalidades (separadas por vírgula)</Label>
                        <Input id="pro-features" defaultValue="Respostas ilimitadas, Otimizador SEO, Suporte prioritário" />
                    </div>
                 </div>
            </div>
             {/* Plano Enterprise */}
            <div className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Plano Enterprise</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="enterprise-price">Preço Mensal (BRL)</Label>
                         <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="enterprise-price" type="number" defaultValue="199.90" className="pl-10" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="enterprise-features">Funcionalidades</Label>
                        <Input id="enterprise-features" defaultValue="Tudo do Pro, Acesso API, Gerente de conta dedicado" />
                    </div>
                 </div>
            </div>
        </CardContent>
         <CardFooter>
            <Button>Salvar Planos</Button>
        </CardFooter>
      </Card>

        <Card>
            <CardHeader>
                <CardTitle>Configurações de Risco</CardTitle>
                <CardDescription>Ações perigosas que afetam todos os usuários.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div>
                        <h3 className="font-semibold text-destructive">Modo Manutenção</h3>
                        <p className="text-sm text-destructive/80">Desativa o acesso de todos os usuários ao dashboard.</p>
                    </div>
                    <Switch id="maintenance-mode" className="data-[state=checked]:bg-destructive" />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
