import { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, Calculator, Search, Package, CheckCircle, BarChart2, Zap } from 'lucide-react';

const iconMap = {
  chat: MessageSquare,
  calculator: Calculator,
  search: Search,
  package: Package
};

const detailedContent = {
    respostas: {
        title: "Respostas Automáticas Inteligentes",
        description: "Nossa IA é treinada para entender as intenções dos compradores e responder de forma precisa e personalizada, 24/7.",
        features: [
            { icon: Zap, text: "Responda em segundos, aumentando a chance de conversão." },
            { icon: CheckCircle, text: "Personalize o tom de voz para manter a identidade da sua marca." },
            { icon: BarChart2, text: "Acesse um dashboard com métricas de tempo de resposta e satisfação." }
        ],
        howItWorks: "A IA se conecta à sua conta, analisa seu histórico de perguntas e respostas para aprender seu estilo, e utiliza uma base de conhecimento sobre seus produtos para responder novas perguntas de forma autônoma."
    },
    lucro: {
        title: "Calculadora de Lucro Multi-Marketplace",
        description: "Chega de planilhas complexas. Saiba exatamente qual preço praticar para garantir sua lucratividade em qualquer plataforma.",
        features: [
            { icon: CheckCircle, text: "Taxas e comissões do Mercado Livre, Amazon, Shopee e outros sempre atualizadas." },
            { icon: BarChart2, text: "Visualize o lucro líquido e a margem de contribuição de cada venda." },
            { icon: Zap, text: "Simule cenários com diferentes custos e tipos de anúncio (Clássico/Premium)." }
        ],
        howItWorks: "Você insere o custo do produto, a margem de lucro desejada e outros custos (como frete e impostos). A ferramenta calcula o preço de venda final para cada marketplace, já descontando as taxas específicas."
    },
    seo: {
        title: "Otimizador de Anúncios (SEO)",
        description: "Posicione seus anúncios no topo das buscas e atraia mais compradores qualificados de forma orgânica.",
        features: [
            { icon: Zap, text: "Análise de palavras-chave para encontrar os termos mais buscados." },
            { icon: CheckCircle, text: "Geração automática de títulos e descrições otimizados para os algoritmos." },
            { icon: BarChart2, text: "Acompanhe o ganho de posições e o aumento de visualizações dos seus anúncios." }
        ],
        howItWorks: "A IA analisa seu produto, compara com os anúncios concorrentes de melhor performance e as tendências de busca para sugerir melhorias ou reescrever completamente seus títulos e descrições, maximizando a visibilidade."
    },
    estoque: {
        title: "Gestão de Estoque Sincronizado",
        description: "Controle o estoque de produtos idênticos anunciados de formas diferentes e evite vender o que você não tem.",
        features: [
            { icon: CheckCircle, text: "Crie grupos de anúncios para um mesmo produto." },
            { icon: Zap, text: "Baixa automática no estoque de todos os anúncios do grupo quando uma venda ocorre." },
            { icon: BarChart2, text: "Relatórios de giro de estoque para otimizar suas compras." }
        ],
        howItWorks: "Selecione todos os anúncios que correspondem a um único produto (Ex: 'iPhone 14 Preto' e 'Celular Apple iPhone 14 128GB'). Agrupe-os e defina o estoque total. A cada venda em qualquer um deles, o sistema atualiza o estoque em todos os outros."
    },
};

const ToolDetailModal = ({ tool, isDemoVideo = false }) => {
    const [isRendered, setIsRendered] = useState(false);
    const content = detailedContent[tool.id];
    const Icon = iconMap[tool.icon];

    useEffect(() => {
        const timer = setTimeout(() => setIsRendered(true), 100);
        return () => clearTimeout(timer);
    }, []);
    
    // Fallback para conteúdo de vídeo de demonstração
    if (isDemoVideo) {
        return (
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Demonstração: {content.title}</DialogTitle>
                    <DialogDescription>
                        O vídeo desta funcionalidade estará disponível em breve.
                    </DialogDescription>
                </DialogHeader>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Em breve...</p>
                </div>
            </DialogContent>
        )
    }

    if (!content) return null;

    return (
        <DialogContent className="sm:max-w-[625px] p-0">
             <div className="p-8">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${tool.color}-500 to-${tool.color}-600 flex items-center justify-center shadow-lg transform transition-all duration-500 ${isRendered ? 'scale-100 rotate-0' : 'scale-90 -rotate-6'}`}>
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className={`text-2xl transition-all duration-500 delay-100 ${isRendered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                {content.title}
                            </DialogTitle>
                            <DialogDescription className={`transition-all duration-500 delay-200 ${isRendered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                {content.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="my-6">
                    <h4 className={`text-lg font-semibold mb-4 transition-all duration-500 delay-300 ${isRendered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        Principais Benefícios
                    </h4>
                    <ul className="space-y-3">
                        {content.features.map((feature, index) => (
                            <li key={index} className={`flex items-start gap-3 transition-all duration-500 ${isRendered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${400 + index * 100}ms`}}>
                                <feature.icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                     <h4 className={`text-lg font-semibold mb-3 transition-all duration-500 delay-[700ms] ${isRendered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        Como funciona?
                    </h4>
                    <p className={`text-muted-foreground transition-all duration-500 delay-[800ms] ${isRendered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        {content.howItWorks}
                    </p>
                </div>
            </div>
             <div className="bg-muted px-8 py-4 text-center text-sm">
                <p>Esta funcionalidade está disponível em todos os nossos planos.</p>
            </div>
        </DialogContent>
    );
};

export default ToolDetailModal;