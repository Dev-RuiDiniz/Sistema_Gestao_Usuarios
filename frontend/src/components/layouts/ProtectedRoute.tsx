import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // 1. Enquanto o contexto verifica o localStorage, mostramos um loading
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-surface-50">
        <div className="h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Se não estiver autenticado, redireciona para o login
  // O "replace" impede que o usuário volte para a rota protegida ao clicar no botão "Voltar"
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3. Se estiver logado, renderiza o conteúdo da rota (Outlet)
  return <Outlet />;
}