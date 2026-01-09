import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Users } from './pages/Users';

function AppRoutes() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-surface-50">
        <div className="h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Se estiver logado e tentar acessar "/", ele vai para o dashboard */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />} />
      </Route>

      {/* Rotas Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={
            <div className="p-6 bg-white rounded-xl border border-surface-200">
              <h1 className="text-2xl font-bold">Resumo do Sistema</h1>
              <p className="text-surface-600">Selecione uma opção no menu lateral.</p>
            </div>
          } />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors closeButton />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}