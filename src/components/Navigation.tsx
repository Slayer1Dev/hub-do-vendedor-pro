import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Zap } from 'lucide-react';

const Navigation = () => {
  // Função para rolar suavemente para uma seção da página
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    {
      title: 'Funcionalidades',
      isScroll: true,
      href: 'funcionalidades-cards',
    },
    {
      title: 'Preços',
      isScroll: false,
      href: '/precos',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Hub do Vendedor</span>
        </Link>
        
        {/* Navegação para Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => 
            link.isScroll ? (
              <button key={link.title} onClick={() => scrollToSection(link.href)} className="text-md font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.title}
              </button>
            ) : (
              <Link key={link.title} to={link.href} className="text-md font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.title}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <Link to="/register">Criar Conta</Link>
          </Button>
        </div>

        {/* Navegação para Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu /></Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => 
                  link.isScroll ? (
                    <button key={link.title} onClick={() => scrollToSection(link.href)} className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left">
                      {link.title}
                    </button>
                  ) : (
                    <Link key={link.title} to={link.href} className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      {link.title}
                    </Link>
                  )
                )}
                <hr />
                <Button variant="outline" asChild><Link to="/login">Entrar</Link></Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"><Link to="/register">Criar Conta</Link></Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;