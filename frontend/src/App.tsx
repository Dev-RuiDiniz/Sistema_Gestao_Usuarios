import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';

// Importação das Páginas Reais
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Users } from './pages/Users';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ROTAS PÚBLICAS: Acessíveis sem login */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ROTAS PROTEGIDAS: Exigem Token JWT */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* Página inicial interna */}
              <Route path="/dashboard" element={
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-surface-900">Painel de Controle</h1>
                  <p className="text-surface-600">Bem-vindo ao sistema de gestão. Selecione uma opção no menu lateral.</p>
                </div>
              } />
              
              {/* Listagem de Usuários (Task 06) */}
              <Route path="/users" element={<Users />} />
              
              {/* Espaços reservados para futuras implementações */}
              <Route path="/logs" element={<div>Histórico de Atividades (Em breve)</div>} />
              <Route path="/profile" element={<div>Meu Perfil (Em breve)</div>} />
            </Route>
          </Route>
          
          {/* FALLBACK: Qualquer rota desconhecida manda para o Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}