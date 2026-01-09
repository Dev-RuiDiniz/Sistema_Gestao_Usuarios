import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter 6+ caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  async function handleLogin(data: LoginFormData) {
    try {
      await signIn(data);
      toast.success('Login realizado!', { description: 'Seja bem-vindo ao painel.' });
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Erro de acesso', { description: 'Verifique suas credenciais.' });
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-surface-900">Login</h2>
        <p className="text-surface-600 mt-2">Acesse sua conta administrativa.</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">E-mail</label>
          <input 
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
            placeholder="seu@email.com"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">Senha</label>
          <input 
            {...register('password')}
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
            placeholder="••••••"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="text-center text-sm text-surface-600">
        Não tem conta? <Link to="/register" className="text-brand-600 font-semibold hover:underline">Cadastre-se</Link>
      </p>
    </div>
  );
}