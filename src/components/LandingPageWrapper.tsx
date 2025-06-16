import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Este componente wrapper garante que a landing page e suas seções filhas
 * sempre utilizem o tema claro (fundo branco), independentemente da
 * preferência de tema (claro/escuro) do usuário no resto do site.
 */
const LandingPageWrapper = () => {
  useEffect(() => {
    // Seleciona o elemento <html> da página
    const root = document.documentElement;
    
    // Guarda as classes CSS originais do elemento <html> para poder restaurá-las depois.
    // Isso é importante para não interferir com outras classes que possam existir.
    const originalClasses = root.className;

    // Força o tema claro removendo a classe 'dark' e garantindo que 'light' esteja presente.
    // A classe 'dark' é a que o ThemeProvider usa para aplicar o tema escuro.
    root.classList.remove('dark');
    root.classList.add('light');

    // A função de limpeza do useEffect é executada quando o componente é "desmontado",
    // ou seja, quando o usuário navega para fora da landing page.
    return () => {
      // Restaura as classes originais, permitindo que o ThemeProvider
      // volte a controlar o tema no resto da aplicação.
      root.className = originalClasses;
    };
  }, []); // O array de dependências vazio [] faz com que este efeito rode apenas uma vez (na montagem).

  // Renderiza as rotas filhas (neste caso, a página Index).
  return <Outlet />;
};

export default LandingPageWrapper;
    