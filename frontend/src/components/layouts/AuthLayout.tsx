import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-50">
      {/* Lado Esquerdo: Branding/Banner (Oculto em mobile) */}
      <div className="hidden lg:flex bg-brand-900 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6">
            Gestão Inteligente de Usuários
          </h1>
          <p className="text-brand-100 text-lg">
            Controle acessos, gerencie permissões e monitore sua plataforma em um único lugar.
          </p>
        </div>
      </div>

      {/* Lado Direito: Onde o formulário de login/cadastro aparece */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}