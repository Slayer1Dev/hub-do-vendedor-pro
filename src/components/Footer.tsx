import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToSection = (sectionId: string) => {
    // Tenta encontrar a seção na página atual primeiro
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Se não encontrar, navega para a home e depois tenta rolar
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-full md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Hub do Vendedor</span>
            </Link>
            <p className="text-muted-foreground text-sm">Automação e inteligência para otimizar suas vendas online.</p>
          </div>
          <div className="md:col-start-3">
            <h3 className="text-md font-semibold text-foreground tracking-wider uppercase mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('funcionalidades-cards')} className="text-sm text-muted-foreground hover:text-primary">Funcionalidades</button></li>
              <li><Link to="/precos" className="text-sm text-muted-foreground hover:text-primary">Preços</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground tracking-wider uppercase mb-4">Suporte</h3>
            <ul className="space-y-2">
              {/* Todos os links de ajuda agora apontam para a página de ajuda do dashboard */}
              <li><Link to="/dashboard/ajuda" className="text-sm text-muted-foreground hover:text-primary">Central de Ajuda</Link></li>
              <li><a href="mailto:suporte@hubvendedorpro.com" className="text-sm text-muted-foreground hover:text-primary">Contato por E-mail</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Hub do Vendedor Pro. Todos os direitos reservados.</p>
          <div className="relative mt-6 sm:mt-0">
            <Button onClick={scrollToTop} variant="secondary" size="icon" className="rounded-full shadow-lg">
              <ChevronUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;