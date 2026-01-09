import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Schema de validação
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { signIn } = useContext(AuthContext); // Consumindo a lógica global
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  async function handleLogin(data: LoginFormData) {
    try {
      // 1. Tenta realizar o login via API através do Contexto
      await signIn(data);
      
      // 2. Se tiver sucesso, navega para a área interna
      navigate('/dashboard');
    } catch (error: any) {
      // 3. Tratamento de erro (ex: credenciais inválidas)
      const message = error.response?.data?.message || 'Falha ao entrar. Verifique suas credenciais.';
      alert(message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-surface-900">Login</h1>
        <p className="text-surface-600 mt-2">Bem-vindo de volta! Acesse sua conta.</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">E-mail</label>
          <input 
            {...register('email')}
            type="email"
            placeholder="seu@email.com"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">Senha</label>
          <input 
            {...register('password')}
            type="password"
            placeholder="••••••"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : 'Entrar'}
        </button>
      </form>

      <p className="text-center text-sm text-surface-600">
        Não possui conta? <Link to="/register" className="text-brand-600 font-semibold hover:underline">Cadastre-se aqui</Link>
      </p>
    </div>
  );
}