
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50 h-16 md:h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Hub do Vendedor Pro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#sobre" className="text-gray-600 hover:text-blue-600 transition-colors scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Sobre</a>
            <a href="#funcionalidades" className="text-gray-600 hover:text-blue-600 transition-colors scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Funcionalidades</a>
            <a href="#depoimentos" className="text-gray-600 hover:text-blue-600 transition-colors scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Depoimentos</a>
            <a href="#precos" className="text-gray-600 hover:text-blue-600 transition-colors scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Preços</a>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#sobre" className="text-gray-600 hover:text-blue-600 transition-colors px-4 scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Sobre</a>
              <a href="#funcionalidades" className="text-gray-600 hover:text-blue-600 transition-colors px-4 scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Funcionalidades</a>
              <a href="#depoimentos" className="text-gray-600 hover:text-blue-600 transition-colors px-4 scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Depoimentos</a>
              <a href="#precos" className="text-gray-600 hover:text-blue-600 transition-colors px-4 scroll-smooth" style={{ scrollMarginTop: '5rem' }}>Preços</a>
              <div className="px-4">
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
