import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Users } from './pages/Users';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Configuração global de notificações */}
        <Toaster position="top-right" richColors closeButton />
        
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ROTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={
                <div className="p-6 bg-white rounded-xl border border-surface-200 shadow-sm">
                  <h1 className="text-2xl font-bold text-surface-900">Bem-vindo ao Dashboard</h1>
                  <p className="text-surface-600 mt-2">Utilize o menu lateral para gerenciar o sistema.</p>
                </div>
              } />
              <Route path="/users" element={<Users />} />
              <Route path="/logs" element={<div className="p-6">Histórico de Atividades (Em breve)</div>} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}