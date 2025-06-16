import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
  
  export default function AjudaPage() {
    const faqs = [
      {
        question: "Como conecto a minha conta do Mercado Livre?",
        answer: "Vá para a página de Configurações, encontre a secção 'Conexões' e clique no botão 'Conectar com Mercado Livre'. Você será redirecionado para autorizar a nossa aplicação de forma segura."
      },
      {
        question: "As respostas automáticas são enviadas imediatamente?",
        answer: "Sim, assim que uma nova pergunta é recebida e a nossa IA gera uma resposta com alta confiança, ela é enviada. Você pode rever todas as respostas enviadas no painel de Respostas Automáticas."
      },
      {
        question: "A calculadora de lucro considera todas as taxas?",
        answer: "A nossa calculadora considera a comissão padrão da plataforma selecionada, taxas fixas por venda e o custo de frete que você informar. Custos adicionais como impostos e embalagem devem ser inseridos no campo 'Outros Custos' para um cálculo preciso."
      },
      {
        question: "Como funciona o controle de estoque sincronizado?",
        answer: "Você cria um 'grupo' para um produto específico e seleciona todos os anúncios (clássico, premium, kits, etc.) que correspondem a esse produto. Ao vender uma unidade em qualquer um dos anúncios, o estoque de todos os outros anúncios do grupo é atualizado automaticamente."
      }
    ];
  
    return (
      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <Card>
          <CardHeader>
            <CardTitle>Não encontrou o que procurava?</CardTitle>
             <CardDescription>
              Nossa equipe de suporte está pronta para ajudar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Contacte o nosso suporte através do email: <a href="mailto:suporte@hubvendedorpro.com" className="text-primary font-semibold hover:underline">suporte@hubvendedorpro.com</a>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
