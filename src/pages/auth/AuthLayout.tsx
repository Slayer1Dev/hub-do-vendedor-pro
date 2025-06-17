import { Outlet } from "react-router-dom";

/**
 * Este componente de layout serve como um container para as páginas de
 * autenticação do Clerk, garantindo que elas fiquem centralizadas
 * na tela e com um fundo consistente.
 */
export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Outlet />
    </div>
  );
}