import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Link removido para evitar erro de variável não lida

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook para mudar de página

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Impede o refresh da página
    
    if (!email || !password) return;

    try {
      setIsSubmitting(true);
      
      // 1. Faz o login no backend
      await signIn({ 
        email: email.trim(), 
        password: password 
      });

      // 2. SE CHEGOU AQUI, O LOGIN FOI SUCESSO!
      // Forçamos a ida para o dashboard
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      // Erro já tratado no Context (Toast)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 text-white shadow-lg mb-4">
          <LogIn size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Login</h2>
        <p className="mt-2 text-surface-600">Acesse sua conta para gerenciar usuários.</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-surface-400" size={20} />
            <input
              type="email"
              required
              className="block w-full pl-10 pr-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="Seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-surface-400" size={20} />
            <input
              type="password"
              required
              className="block w-full pl-10 pr-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="Sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white bg-brand-600 hover:bg-brand-700 font-bold transition-all shadow-lg disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Entrar no sistema'}
        </button>
      </form>
    </div>
  );
}