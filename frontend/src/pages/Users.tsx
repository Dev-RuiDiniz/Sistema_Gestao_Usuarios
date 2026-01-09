import { useEffect, useState, useContext } from 'react';
import { api } from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Mail, 
  Shield, 
  Calendar, 
  UserPlus, 
  Search,
  Trash2,
  Edit
} from 'lucide-react';
import { Pagination } from '../components/Pagination';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// Componente de Skeleton para evitar o uso do Loader2
function UserTableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-200" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-surface-200 rounded" />
                <div className="h-3 w-48 bg-surface-100 rounded" />
              </div>
            </div>
          </td>
          <td className="px-6 py-4"><div className="h-6 w-20 bg-surface-200 rounded-full" /></td>
          <td className="px-6 py-4"><div className="h-4 w-24 bg-surface-100 rounded" /></td>
          <td className="px-6 py-4 text-right"><div className="h-8 w-8 bg-surface-100 rounded-lg ml-auto" /></td>
        </tr>
      ))}
    </>
  );
}

export function Users() {
  const { user: loggedUser } = useContext(AuthContext);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  const isAdmin = loggedUser?.role === 'ADMIN';

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await api.get('/users', {
        params: { page: currentPage, limit: itemsPerPage }
      });
      const data = response.data.users || response.data;
      const total = response.data.total || data.length;
      setUsers(data);
      setTotalItems(total);
    } catch (error) {
      toast.error('Erro ao carregar lista de usuários.');
    } finally {
      setLoading(false);
    }
  }

  // Função para deletar usuário (Lógica da Tarefa 11)
  async function handleDeleteUser(id: string, name: string) {
    if (!window.confirm(`Tem certeza que deseja excluir o usuário ${name}?`)) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success('Usuário removido com sucesso!');
      fetchUsers(); // Recarrega a lista
    } catch (error) {
      toast.error('Erro ao excluir usuário.');
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Usuários</h1>
          <p className="text-surface-600 text-sm">Gerenciamento de acessos do sistema.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
             <input type="text" placeholder="Filtrar..." className="pl-10 pr-4 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm w-48 md:w-64" />
          </div>
          
          {isAdmin && (
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shadow-sm active:scale-95">
              <UserPlus size={18} /> 
              <span>Novo Usuário</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-50 border-b border-surface-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-surface-500 tracking-wider">Usuário</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-surface-500 tracking-wider">Permissão</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-surface-500 tracking-wider">Cadastro</th>
                {isAdmin && <th className="px-6 py-4 text-xs font-bold uppercase text-surface-500 tracking-wider text-right">Ações</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {loading ? (
                <UserTableSkeleton />
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-surface-900 leading-none">{u.name}</p>
                          <span className="text-xs text-surface-500 flex items-center gap-1 mt-1"><Mail size={12} /> {u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border w-fit ${
                        u.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        <Shield size={10} /> {u.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600">
                      <div className="flex items-center gap-1.5"><Calendar size={14} className="text-surface-400" /> {new Date(u.createdAt).toLocaleDateString('pt-BR')}</div>
                    </td>
                    
                    {isAdmin && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 hover:bg-blue-50 text-surface-400 hover:text-blue-600 rounded-lg transition-all">
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="p-2 hover:bg-red-50 text-surface-400 hover:text-red-600 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}