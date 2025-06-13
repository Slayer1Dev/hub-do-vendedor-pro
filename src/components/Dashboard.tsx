
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';
import RespostasAutomaticas from './RespostasAutomaticas';
import GeradorEAN from './GeradorEAN';
import CalculadoraLucro from './CalculadoraLucro';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardMain />;
      case 'respostas':
        return <RespostasAutomaticas />;
      case 'ean':
        return <GeradorEAN />;
      case 'lucro':
        return <CalculadoraLucro />;
      case 'estoque':
        return <div className="text-center py-12"><p className="text-gray-500">Estoque em desenvolvimento</p></div>;
      case 'seo':
        return <div className="text-center py-12"><p className="text-gray-500">SEO em desenvolvimento</p></div>;
      default:
        return <DashboardMain />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
