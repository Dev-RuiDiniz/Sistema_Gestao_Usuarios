import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar'; // Verifique se o caminho está correto conforme sua pasta

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-surface-100">
      {/* Sidebar Componentizada (Substitui o <aside> estático) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header fixo no topo */}
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-surface-900">Painel Administrativo</h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-surface-900 leading-none">Status do Sistema</p>
              <p className="text-xs text-green-600">Conectado</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Área onde as páginas (Dashboard, Usuários, etc) serão renderizadas */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}