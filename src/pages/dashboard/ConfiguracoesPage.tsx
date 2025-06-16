import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider"; // Importe o hook
import { Moon, Sun } from "lucide-react";

export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme(); // Use o hook

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Personalize a aparência da aplicação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme" className="text-base">Tema</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-5 w-5" />
              </Button>
               <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Estas são as suas informações públicas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" defaultValue="Seu Nome" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="seu-email@exemplo.com" disabled />
          </div>
           <Button disabled>Salvar Alterações</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conexões</CardTitle>
          <CardDescription>
            Conecte a sua conta do Mercado Livre para começar a usar as ferramentas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
            <div>
              <h3 className="font-semibold">Mercado Livre</h3>
              <p className="text-sm text-muted-foreground">Não conectado</p>
            </div>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              Conectar com Mercado Livre
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
