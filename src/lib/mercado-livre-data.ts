// Define a interface para uma subcategoria, incluindo as taxas para anúncios Clássico e Premium.
export interface Subcategoria {
    nome: string;
    taxas: {
      classico: number;
      premium: number;
    };
  }
  
// Define a interface para uma categoria principal, que contém um array de subcategorias.
export interface Categoria {
    id: string;
    nome: string;
    subcategorias: Subcategoria[];
}

// Define uma constante para taxas padrão, facilitando a reutilização.
const TAXA_PADRAO = { classico: 0.12, premium: 0.17 };

// Estrutura de dados principal com as categorias e taxas do Mercado Livre.
export const mercadoLivreData: Categoria[] = [
    {
      id: 'acessorios_veiculos',
      nome: 'Acessórios para Veículos',
      subcategorias: [
        { nome: 'Som Automotivo', taxas: { classico: 0.11, premium: 0.16 } },
        { nome: 'Peças de Carros e Caminhonetes', taxas: { classico: 0.12, premium: 0.17 } },
        { nome: 'Pneus', taxas: { classico: 0.10, premium: 0.15 } },
      ],
    },
    {
      id: 'alimentos_bebidas',
      nome: 'Alimentos e Bebidas',
      subcategorias: [
        { nome: 'Bebidas', taxas: TAXA_PADRAO },
        { nome: 'Comidas Preparadas', taxas: TAXA_PADRAO },
        { nome: 'Mercearia', taxas: { classico: 0.08, premium: 0.13 } },
      ],
    },
    {
      id: 'arte_papelaria',
      nome: 'Arte, Papelaria e Armarinho',
      subcategorias: [
          { nome: 'Materiais Escolares', taxas: { classico: 0.12, premium: 0.17 } },
          { nome: 'Artigos de Armarinho', taxas: { classico: 0.13, premium: 0.18 } },
      ]
    },
    {
      id: 'bebes',
      nome: 'Bebês',
      subcategorias: [
          { nome: 'Brinquedos para Bebês', taxas: { classico: 0.13, premium: 0.18 } },
          { nome: 'Roupas de Bebês', taxas: { classico: 0.13, premium: 0.18 } },
      ]
    },
    {
      id: 'beleza_cuidado',
      nome: 'Beleza e Cuidado Pessoal',
      subcategorias: [
        { nome: 'Maquiagem', taxas: { classico: 0.14, premium: 0.19 } },
        { nome: 'Perfumes', taxas: { classico: 0.14, premium: 0.19 } },
        { nome: 'Cuidados com o Cabelo', taxas: { classico: 0.13, premium: 0.18 } },
      ],
    },
    {
      id: 'celulares_telefones',
      nome: 'Celulares e Telefones',
      subcategorias: [
        { nome: 'Smartphones', taxas: { classico: 0.115, premium: 0.165 } },
        { nome: 'Acessórios (Capas, Cabos, etc.)', taxas: { classico: 0.13, premium: 0.18 } },
        { nome: 'Smartwatches', taxas: { classico: 0.12, premium: 0.17 } },
      ],
    },
    {
      id: 'eletronicos_audio_video',
      nome: 'Eletrônicos, Áudio e Vídeo',
      subcategorias: [
        { nome: 'TVs', taxas: { classico: 0.11, premium: 0.16 } },
        { nome: 'Fones de Ouvido', taxas: { classico: 0.12, premium: 0.17 } },
        { nome: 'Projetores', taxas: { classico: 0.11, premium: 0.16 } },
      ],
    },
    {
      id: 'informatica',
      nome: 'Informática',
      subcategorias: [
          { nome: 'Notebooks', taxas: { classico: 0.10, premium: 0.15 } },
          { nome: 'Componentes de PC', taxas: { classico: 0.11, premium: 0.16 } },
          { nome: 'Impressoras', taxas: { classico: 0.11, premium: 0.16 } },
      ]
    },
    { id: 'games', nome: 'Games', subcategorias: [{ nome: 'Consoles e Video Games', taxas: {classico: 0.10, premium: 0.15} }, { nome: 'Jogos', taxas: {classico: 0.12, premium: 0.17} }] },
];

// Estrutura de dados para outras plataformas, com suas respectivas taxas e logos.
export const outrasPlataformas = {
    amazon: { nome: 'Amazon', comissao: 0.15, taxa_fixa: 2.50, logo: 'https://placehold.co/40x40/FF9900/000000?text=A' },
    shopee: { nome: 'Shopee', comissao: 0.14, taxa_fixa: 3.00, logo: 'https://placehold.co/40x40/EE4D2D/FFFFFF?text=S' },
    magazine_luiza: { nome: 'Magazine Luiza', comissao: 0.18, taxa_fixa: 5.00, logo: 'https://placehold.co/40x40/0086FF/FFFFFF?text=M' }
};
