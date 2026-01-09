import { createContext, type ReactNode, useEffect, useState } from 'react';
import { api } from '../api/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: any) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem('@SistemaUsuarios:token');
    const userData = localStorage.getItem('@SistemaUsuarios:user');

    if (token && userData) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  async function signIn({ email, password }: any) {
    const response = await api.post('/login', { email, password });
    const { token, user: userResponse } = response.data;

    localStorage.setItem('@SistemaUsuarios:token', token);
    localStorage.setItem('@SistemaUsuarios:user', JSON.stringify(userResponse));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userResponse);
  }

  function signOut() {
    localStorage.removeItem('@SistemaUsuarios:token');
    localStorage.removeItem('@SistemaUsuarios:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}