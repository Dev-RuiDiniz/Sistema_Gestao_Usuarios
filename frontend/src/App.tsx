import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

// IMPORTAÇÕES DAS PÁGINAS (Certifique-se de que os arquivos existem)
import { Register } from './pages/Register';
import { Login } from './pages/Login'; // Criaremos este na Task 03

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas Públicas */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rotas Privadas (Dashboard) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<div>Bem-vindo ao Dashboard</div>} />
            <Route path="/users" element={<div>Lista de Usuários</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}