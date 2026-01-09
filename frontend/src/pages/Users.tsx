import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { User, Mail, Shield, MoreVertical } from 'lucide-react';

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
      const response = await api.get('/users'); // O endpoint do back-end
      // Se seu back-end retorna { users, total }, use response.data.users
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
          <p className="text-surface-600">Gerencie os membros da sua plataforma.</p>
        </div>
        <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Novo Usuário
        </button>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-50 border-b border-surface-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900">Usuário</th>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900">Permissão</th>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900">Data de Cadastro</th>
              <th className="px-6 py-4 text-sm font-semibold text-surface-900 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-surface-500">
                  Carregando usuários...
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900">{user.name}</p>
                      <p className="text-xs text-surface-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-surface-600">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-surface-400 hover:text-surface-900 transition-colors">
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