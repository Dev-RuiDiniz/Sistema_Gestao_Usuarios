import axios from 'axios';

// 1. Criamos a instância base
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
});

// 2. Interceptor de Requisição: Injeta o token antes da chamada sair
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@SistemaUsuarios:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Interceptor de Resposta: Lida com erros globais (ex: token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se recebermos 401 (Não autorizado), limpamos o login
    if (error.response?.status === 401) {
      localStorage.removeItem('@SistemaUsuarios:token');
      localStorage.removeItem('@SistemaUsuarios:user');
      
      // Opcional: Redirecionar para login se estiver em ambiente browser
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);