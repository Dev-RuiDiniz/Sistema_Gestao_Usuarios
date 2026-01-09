import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api/api';

// Definição do tipo do usuário
interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

// Definição dos dados que o contexto vai exportar
interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // 1. Efeito para carregar dados do LocalStorage ao iniciar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('@SistemaUsuarios:token');
    const storagedUser = localStorage.getItem('@SistemaUsuarios:user');

    if (token && storagedUser) {
      // Injeta o token na instância do Axios caso o app seja reiniciado
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(storagedUser));
    }
    
    setIsLoading(false);
  }, []);

  // 2. Função de Login
  async function signIn({ email, password }: any) {
    try {
      const response = await api.post('/sessions', { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('@SistemaUsuarios:token', token);
      localStorage.setItem('@SistemaUsuarios:user', JSON.stringify(userData));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error; // Repassa o erro para ser tratado no componente (ex: mostrar alerta)
    }
  }

  // 3. Função de Logout
  function signOut() {
    localStorage.removeItem('@SistemaUsuarios:token');
    localStorage.removeItem('@SistemaUsuarios:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}