import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

// 1. Definição do Schema de Validação
const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      alert('Conta criada com sucesso!');
      navigate('/'); // Redireciona para o login
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao criar conta');
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-surface-900">Criar conta</h2>
        <p className="text-surface-600 mt-2">Preencha os dados para acessar a plataforma.</p>
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">Nome Completo</label>
          <input 
            {...register('name')}
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
            placeholder="João Silva"
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">E-mail</label>
          <input 
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
            placeholder="exemplo@email.com"
          />
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">Senha</label>
          <input 
            {...register('password')}
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
            placeholder="••••••"
          />
          {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-900 mb-1">Confirmar Senha</label>
          <input 
            {...register('confirmPassword')}
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500 outline-hidden transition-all"
            placeholder="••••••"
          />
          {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p className="text-center text-sm text-surface-600">
        Já tem uma conta? <Link to="/" className="text-brand-600 font-semibold hover:underline">Faça login</Link>
      </p>
    </div>
  );
}