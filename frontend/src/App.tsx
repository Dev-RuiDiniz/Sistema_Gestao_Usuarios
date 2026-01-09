import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

// Adicione "export" aqui para que o main.tsx consiga ler este componente
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas de Autenticação (Login/Cadastro) */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<div>Formulário de Login</div>} />
          <Route path="/register" element={<div>Formulário de Registro</div>} />
        </Route>

        {/* Rotas Protegidas (Dashboard) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<div>Bem-vindo ao Dashboard</div>} />
          <Route path="/users" element={<div>Lista de Usuários</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}