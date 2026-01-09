import { Outlet, Link } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-surface-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 hidden md:flex flex-col">
        <div className="p-6">
          <span className="text-2xl font-bold text-brand-600">AdminPanel</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/dashboard" className="flex items-center px-4 py-2 text-brand-900 bg-brand-50 rounded-lg font-medium">
            🏠 Dashboard
          </Link>
          <Link to="/users" className="flex items-center px-4 py-2 text-surface-900 hover:bg-surface-50 rounded-lg">
            👥 Usuários
          </Link>
        </nav>

        <div className="p-4 border-t border-surface-200">
          <button className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            🚪 Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-8 sticky top-0">
          <h2 className="text-xl font-semibold text-surface-900">Visão Geral</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-surface-900 font-medium">Admin</span>
            <div className="h-8 w-8 rounded-full bg-brand-500" />
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}