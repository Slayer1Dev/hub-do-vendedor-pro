
import React from 'react';
import { MessageSquare, Package, Calculator, TrendingUp, Search, BarChart3, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'respostas', label: 'Respostas', icon: MessageSquare },
  { id: 'ean', label: 'Gerador EAN', icon: TrendingUp },
  { id: 'estoque', label: 'Estoque', icon: Package },
  { id: 'lucro', label: 'Lucro', icon: Calculator },
  { id: 'seo', label: 'SEO', icon: Search },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-gray-900">Hub Tools</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all duration-200",
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-blue-600" : "text-gray-400")} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
