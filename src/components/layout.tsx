import React from 'react';

// Definimos as propriedades que o nosso componente de Layout vai aceitar.
// 'children' representa qualquer conteúdo que for colocado dentro do <Layout>.
interface LayoutProps {
  children: React.ReactNode;
}

// Criamos o componente
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Este é o 'invólucro' principal da nossa aplicação.
    // As classes do Tailwind garantem que ele ocupe 100% da largura
    // e no mínimo 100% da altura da tela, criando a base adaptativa.
    <div className="w-full min-h-screen flex flex-col">
      {children}
    </div>
  );
};

// Exportamos o componente para que possamos usá-lo em outros arquivos.
export default Layout;