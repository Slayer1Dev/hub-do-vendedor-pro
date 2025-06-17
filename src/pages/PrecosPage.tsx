import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrecosPage() {
  // 1. Array de planos agora contém apenas um plano, como solicitado.
  const plano = {
    title: "Hub Vendedor Pro",
    price: "R$ 99,90",
    period: "/mês",
    description: "Acesso completo a todas as ferramentas para maximizar sua performance.",
    features: [
      "Respostas automáticas com IA",
      "Calculadora de Lucro e Precificação",
      "Controle de Estoque Sincronizado",
      "Otimizador de Anúncios (SEO)",
      "Dashboard com Métricas em Tempo Real",
      "Base de Conhecimento da IA",
      "Suporte Prioritário",
    ],
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-primary">Preço</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Acesso completo. Sem complicações.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Um único plano com todas as funcionalidades presentes e futuras. Cancele quando quiser.
        </p>

        {/* 2. Layout ajustado para centralizar um único card de plano */}
        <div className="mt-16 flex justify-center">
          <Card key={plano.title} className="flex flex-col max-w-md w-full ring-2 ring-primary">
            <CardHeader>
              <CardTitle>{plano.title}</CardTitle>
              <CardDescription>{plano.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">{plano.price}</span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">{plano.period}</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plano.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/register">Ativar meu painel</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}