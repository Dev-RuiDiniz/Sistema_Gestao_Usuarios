import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<p>Formulário de Login Aqui</p>} />
          <Route path="/register" element={<p>Formulário de Cadastro Aqui</p>} />
        </Route>

        {/* Rotas Privadas */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<p>Conteúdo do Dashboard Aqui</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}