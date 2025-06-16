import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User, Settings, LifeBuoy, LogOut, Home, MessageSquare, Calculator, Package } from 'lucide-react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const mainSidebarNav = [
  { title: 'Painel', icon: Home, to: '/dashboard' },
  { title: 'Respostas Automáticas', icon: MessageSquare, to: '/dashboard/respostas' },
  { title: 'Calculadora de Lucro', icon: Calculator, to: '/dashboard/calculadora' },
  { title: 'Controle de Estoque', icon: Package, to: '/dashboard/estoque' }, 
];

const footerSidebarNav = [
  { title: 'Ajuda', icon: LifeBuoy, to: '/dashboard/ajuda' },
  { title: 'Configurações', icon: Settings, to: '/dashboard/configuracoes' },
];

const NavItem = ({ item }) => {
    const location = useLocation();
    const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to) && location.pathname.split('/')[2] === item.to.split('/')[2]);
    
    return (
        <NavLink
            to={item.to}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary font-semibold"
            )}
        >
            <item.icon className="h-4 w-4" />
            {item.title}
        </NavLink>
    );
};

export default function DashboardLayout() {
  const location = useLocation();
  const getHeaderTitle = () => {
    const allNavItems = [...mainSidebarNav, ...footerSidebarNav];
    const currentNavItem = allNavItems.find(item => location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to)));
    return currentNavItem?.title || 'Painel';
  };

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-background md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="">Hub Vendedor Pro</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {mainSidebarNav.map(item => <NavItem key={item.to} item={item} />)}
              </nav>
            </div>
            <div className="mt-auto p-4">
               <nav className="grid items-start text-sm font-medium">
                {footerSidebarNav.map(item => <NavItem key={item.to} item={item} />)}
                 <NavLink
                    to="/login"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
            <div className="w-full flex-1">
              <h1 className="text-xl font-semibold">{getHeaderTitle()}</h1>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
              <User className="w-4 h-4" />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 bg-muted/40 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
  );
}
