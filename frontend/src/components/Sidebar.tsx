import { NavLink } from 'react-router-dom';
import { 
  Users, 
  ClipboardList, 
  UserCircle, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Sidebar() {
  const { signOut, user } = useContext(AuthContext);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Usuários', icon: Users, path: '/users' },
    { label: 'Logs de Atividade', icon: ClipboardList, path: '/logs' },
    { label: 'Meu Perfil', icon: UserCircle, path: '/profile' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-surface-200 flex flex-col h-full">
      {/* Logo Area */}
      <div className="p-6 border-b border-surface-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold text-surface-900 tracking-tight">
            UserSystem
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-brand-50 text-brand-700 font-semibold' 
                : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'}
            `}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout Area */}
      <div className="p-4 border-t border-surface-200 bg-surface-50/50">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold uppercase">
            {user?.name.charAt(0)}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-semibold text-surface-900 truncate">{user?.name}</span>
            <span className="text-xs text-surface-500 truncate">{user?.role}</span>
          </div>
        </div>
        
        <button 
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <LogOut size={18} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}