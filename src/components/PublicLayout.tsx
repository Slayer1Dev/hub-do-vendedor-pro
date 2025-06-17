import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./theme-provider"; // 1. Importa o hook useTheme
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function PublicLayout() {
  // 2. Pega a função setTheme e o tema atual do nosso provedor
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // 3. Guarda o tema original do usuário (ex: 'dark' ou 'system')
    const originalTheme = theme;

    // 4. Força o tema para 'light' assim que o layout público é montado
    setTheme('light');

    // 5. Função de limpeza: é executada quando o usuário sai das páginas públicas
    return () => {
      // Restaura o tema que o usuário tinha antes
      setTheme(originalTheme);
    };
  }, [setTheme]); // A dependência garante que o efeito não rode desnecessariamente

  return (
    // A classe 'light' aqui serve como um fallback visual extra
    <div className="light flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}