import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";

// Layouts
import DashboardLayout from "./pages/dashboard/Layout";
import PublicLayout from './components/PublicLayout';
import AuthLayout from "./pages/auth/AuthLayout"; // <-- Importa o novo layout de autenticação

// Páginas
import IndexPage from "./pages/Index";
import PrecosPage from "./pages/PrecosPage";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RespostasPage from "./pages/dashboard/RespostasPage";
import CalculadoraPage from "./pages/dashboard/CalculadoraPage";
import ControleEstoquePage from "./pages/dashboard/ControleEstoquePage";
import ConfiguracoesPage from "./pages/dashboard/ConfiguracoesPage";
import AjudaPage from "./pages/dashboard/AjudaPage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Adicione este console.log para depuração
console.log('--- DEBUG FRONTEND ---');
console.log('Chave Publicável em uso:', PUBLISHABLE_KEY);
console.log('----------------------');

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/precos" element={<PrecosPage />} />
      </Route>

      {/* Rotas de Autenticação, agora dentro do AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login/*"
          element={<SignIn routing="path" path="/login" signUpUrl="/register" afterSignInUrl="/dashboard" />}
        />
        <Route
          path="/register/*"
          element={<SignUp routing="path" path="/register" signInUrl="/login" afterSignUpUrl="/dashboard" />}
        />
      </Route>

      {/* Rotas Protegidas */}
      <Route
        path="/dashboard/*"
        element={
          <SignedIn>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="respostas" element={<RespostasPage />} />
                <Route path="calculadora" element={<CalculadoraPage />} />
                <Route path="estoque" element={<ControleEstoquePage />} />
                <Route path="configuracoes" element={<ConfiguracoesPage />} />
                <Route path="ajuda" element={<AjudaPage />} />
              </Route>
            </Routes>
          </SignedIn>
        }
      />

      {/* Fallback para redirecionar usuários não logados */}
      <Route
        path="/*"
        element={
          <SignedOut>
            <Navigate to="/" />
          </SignedOut>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
              <AppRoutes />
            </ClerkProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;