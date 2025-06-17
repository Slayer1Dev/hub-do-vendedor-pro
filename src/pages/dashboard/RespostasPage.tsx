import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { api } from '@/lib/api';
import { RespostasAutomaticas } from '@/components/RespostasAutomaticas';
import { Skeleton } from '@/components/ui/skeleton';
// CORREÇÃO: Adicionando a linha de import que faltava
import { QuestionsApiResponse, Question } from '@/types';

export function RespostasPage() {
  const { getToken } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        // Agora o <QuestionsApiResponse> será encontrado, pois foi importado acima.
        const response = await api.get<QuestionsApiResponse>('/dashboard/questions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data.questions);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || "Não foi possível carregar as perguntas.";
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [getToken]);

  if (loading) {
    return <Skeleton className="w-full h-[400px] m-8" />;
  }

  if (error) {
    return <p className="text-red-500 p-8">Erro: {error}</p>;
  }

  return <RespostasAutomaticas questions={questions} />;
}