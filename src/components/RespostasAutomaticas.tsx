import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// CORREÇÃO: Importando o tipo para uma única pergunta
import { Question } from "@/types";

// CORREÇÃO: Definindo o tipo das props que o componente espera
interface RespostasProps {
  questions: Question[];
}

export function RespostasAutomaticas({ questions }: RespostasProps) {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Não Respondidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* CORREÇÃO: Checando se a lista de perguntas está vazia */}
            {questions.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma pergunta para responder no momento. 🎉</p>
            ) : (
              // Agora o .map funciona sem erros, pois o TS sabe que 'questions' é uma lista
              questions.map((q) => (
                <div key={q.id} className="border p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Pergunta de: {q.from.nickname}
                  </p>
                  <p className="font-semibold my-2">{q.text}</p>
                  <div className="flex gap-2">
                    <Input placeholder="Digite sua resposta..." />
                    <Button>Responder</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}