// Estrutura inicial com base no seu projeto atual (Vite + Tailwind + TS)
// Criação das páginas e layout base

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Perguntas from './pages/Perguntas';
import Config from './pages/Config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perguntas" element={<Perguntas />} />
        <Route path="/config" element={<Config />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
