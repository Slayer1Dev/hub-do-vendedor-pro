import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { checkConnectionStatus, connectMercadoLivreAccount } from '@/lib/api';
import { createPkceChallenge } from '@/lib/pkce';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Loader2 } from "lucide-react";

// Componente para o Card de Conexões
const ConnectionsCard = () => {
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['connectionStatus'],
    queryFn: () => checkConnectionStatus(getToken),
  });

  const mutation = useMutation({
    mutationFn: (data: { code: string, verifier: string }) => connectMercadoLivreAccount(data, getToken),
    onSuccess: () => {
      toast.success('Conta do Mercado Livre conectada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['connectionStatus'] });
      navigate(location.pathname, { replace: true }); 
    },
    onError: (error) => {
      toast.error(`Falha na conexão: ${error.message}`);
      navigate(location.pathname, { replace: true });
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const verifier = sessionStorage.getItem('pkce_verifier');

    if (code && verifier) {
      mutation.mutate({ code, verifier });
      sessionStorage.removeItem('pkce_verifier');
    }
  }, []);

  const handleConnect = async () => {
    const { verifier, challenge } = await createPkceChallenge();
    sessionStorage.setItem('pkce_verifier', verifier);

    const appId = import.meta.env.VITE_MERCADOLIVRE_APP_ID;
    const redirectUri = import.meta.env.VITE_MERCADOLIVRE_REDIRECT_URI;
    
    // Adicionando os escopos 'read' e 'offline_access' (espaço codificado como %20)
    const authUrl = `https://auth.mercadolibre.com/authorization?response_type=code&client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read%20offline_access&code_challenge=${challenge}&code_challenge_method=S256`;
    
    window.location.href = authUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conexões</CardTitle>
        <CardDescription>Conecte sua conta do Mercado Livre para usar as ferramentas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
          <div>
            <h3 className="font-semibold">Mercado Livre</h3>
            {isLoading || mutation.isPending ? (<p className="text-sm text-muted-foreground">Conectando...</p>)
            : data?.isConnected ? (<p className="text-sm text-green-600 font-medium">Conectado</p>)
            : (<p className="text-sm text-muted-foreground">Não conectado</p>)}
          </div>
          <Button 
            className="bg-yellow-400 text-black hover:bg-yellow-500" 
            onClick={handleConnect}
            disabled={isLoading || data?.isConnected || mutation.isPending}
          >
            {(isLoading || mutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {data?.isConnected ? 'Conectado' : 'Conectar com Mercado Livre'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente principal da página permanece o mesmo
export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Aparência</CardTitle><CardDescription>Personalize a aparência.</CardDescription></CardHeader><CardContent><div className="flex items-center justify-between"><Label className="text-base">Tema</Label><div className="flex items-center gap-2"><Button variant={theme === 'light' ? 'default' : 'outline'} size="icon" onClick={() => setTheme("light")}><Sun className="h-5 w-5" /></Button><Button variant={theme === 'dark' ? 'default' : 'outline'} size="icon" onClick={() => setTheme("dark")}><Moon className="h-5 w-5" /></Button></div></div></CardContent></Card>
      <ConnectionsCard />
    </div>
  );
}
