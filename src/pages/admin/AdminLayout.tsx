import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Home,
  Users,
  Settings,
  Shield,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

const adminSidebarNav = [
  { title: 'Dashboard', icon: Home, to: '/admin/dashboard' },
  { title: 'Usuários', icon: Users, to: '/admin/users' },
  { title: 'Configurações', icon: Settings, to: '/admin/settings' },
];

const NavItem = ({ item }) => (
    <NavLink
      to={item.to}
      end={item.to === '/admin/dashboard'}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          isActive && "bg-muted text-primary"
        )
      }
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </NavLink>
  );

export default function AdminLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/admin" className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span className="">Hub Vendedor Pro</span>
              <Badge variant="destructive">Admin</Badge>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {adminSidebarNav.map(item => <NavItem key={item.to} item={item} />)}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <nav>
                <NavLink
                    to="/"
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Nav Trigger (a ser implementado se necessário) */}
          <div className="w-full flex-1" />
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notificações</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
                <Shield className="h-5 w-5" />
                <span className="sr-only">Menu do Administrador</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
            <Outlet />
        </main>
      </div>
    </div>
  );
}
