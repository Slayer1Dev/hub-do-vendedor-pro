// CORREÇÃO: Trocamos 'class' por 'interface'.
// Interfaces são usadas para definir a estrutura dos objetos, que é o que precisamos.

export interface Question {
  id: number;
  date_created: string;
  item_id: string;
  seller_id: number;
  status: string;
  text: string;
  from: {
    id: number;
    nickname: string;
  };
  // Adicione outros campos que você precisar aqui
}

export interface QuestionsApiResponse {
  total: number;
  answered: number;
  unanswered: number;
  questions: Question[];
}