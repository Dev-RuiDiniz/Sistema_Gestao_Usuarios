import { useEffect, useState } from 'react';
import { api } from '../api/api';
// Usando os ícones importados para resolver o aviso 6133
import { User, Mail, Shield, MoreVertical, Calendar } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data); 
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Usuários</h1>
          <p className="text-surface-600">Gerencie os membros e suas permissões.</p>
        </div>
        <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <User size={18} /> Novo Usuário
        </button>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-50 border-b border-surface-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900">Usuário</th>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900">Permissão</th>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900">Cadastro</th>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-surface-500">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                    Carregando...
                  </div>
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900">{user.name}</p>
                      <div className="flex items-center gap-1 text-xs text-surface-500">
                        <Mail size={12} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium w-fit bg-surface-100 text-surface-700 border border-surface-200">
                    <Shield size={12} className={user.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'} />
                    {user.role}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-surface-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-surface-400" />
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-surface-100 rounded-full text-surface-400 hover:text-surface-900 transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}