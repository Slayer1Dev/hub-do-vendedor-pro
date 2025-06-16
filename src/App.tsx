import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// Importação do novo Wrapper
import LandingPageWrapper from "@/components/LandingPageWrapper";

// Páginas Públicas
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Layout e Páginas do Dashboard do Usuário
import DashboardLayout from "@/pages/dashboard/Layout";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import RespostasPage from "@/pages/dashboard/RespostasPage";
import CalculadoraPage from "@/pages/dashboard/CalculadoraPage";
import ControleEstoquePage from "@/pages/dashboard/ControleEstoquePage";
import ConfiguracoesPage from "@/pages/dashboard/ConfiguracoesPage";
import AjudaPage from "@/pages/dashboard/AjudaPage";

// Layout e Páginas do Dashboard do Administrador
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";


const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  return children;
};

const AdminRoute = ({ children }) => {
    return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route element={<LandingPageWrapper />}>
              <Route path="/" element={<Index />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rotas do Dashboard do Usuário */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardPage />} />
              <Route path="respostas" element={<RespostasPage />} />
              <Route path="calculadora" element={<CalculadoraPage />} />
              <Route path="estoque" element={<ControleEstoquePage />} />
              <Route path="configuracoes" element={<ConfiguracoesPage />} />
              <Route path="ajuda" element={<AjudaPage />} />
            </Route>

            {/* Rotas do Dashboard do Administrador */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Rota não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
