
import React from 'react';
import { authStore } from '../../store';
import { notify } from '../Shared/Toast';

interface LoginProps {
  onToggle: () => void;
  onLogged: () => void;
}

export const Login: React.FC<LoginProps> = ({ onToggle, onLogged }) => {
  const [view, setView] = React.useState<'login' | 'forgot'>('login');
  const [identity, setIdentity] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authStore.login(identity, password, rememberMe);
    if (success) {
      onLogged();
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    const result = authStore.recoverPassword(forgotEmail);
    if (result.success) {
      notify(result.message, 'success');
      console.log(`[SIMULAÇÃO] Senha recuperada para ${forgotEmail}: ${result.pass}`);
      setView('login');
      setForgotEmail('');
    } else {
      notify(result.message, 'error');
    }
  };

  if (view === 'forgot') {
    return (
      <div className="w-full max-w-sm bg-[#272727] p-10 rounded-2xl border border-[#3F3F3F] shadow-lg animate-in zoom-in duration-300">
        <div className="text-center mb-10">
          <span className="text-[#FF0000] font-black text-3xl tracking-tighter">Cena<span className="text-[#F1F1F1]">1</span></span>
          <h2 className="text-xl font-bold text-[#F1F1F1] mt-4">Recuperar Senha</h2>
          <p className="text-[#AAAAAA] text-sm mt-1">Informe seu e-mail cadastrado</p>
        </div>
        
        <form onSubmit={handleRecover} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider ml-1">E-mail</label>
            <input
              type="email"
              className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-lg p-3.5 text-sm focus:ring-2 focus:ring-[#FF0000]/20 focus:border-[#FF0000] outline-none transition-all text-[#F1F1F1]"
              placeholder="seu@email.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white py-5 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95">
            Enviar Instruções
          </button>
          
          <div className="text-center pt-2">
            <button type="button" onClick={() => setView('login')} className="text-xs font-bold text-[#AAAAAA] hover:text-[#FF0000] transition-colors">
              Voltar para o login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-[#272727] p-10 rounded-2xl border border-[#3F3F3F] shadow-lg animate-in zoom-in duration-300">
      <div className="text-center mb-10">
        <span className="text-[#FF0000] font-black text-3xl tracking-tighter">Cena<span className="text-[#F1F1F1]">1</span></span>
        <h2 className="text-xl font-bold text-[#F1F1F1] mt-4">Bem-vindo de volta</h2>
        <p className="text-[#AAAAAA] text-sm mt-1">Acesse sua central de roteiros</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider ml-1">Identidade</label>
          <input
            type="text"
            className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-lg p-3.5 text-sm focus:ring-2 focus:ring-[#FF0000]/20 focus:border-[#FF0000] outline-none transition-all text-[#F1F1F1]"
            placeholder="Username ou e-mail"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider">Senha</label>
            <button type="button" onClick={() => setView('forgot')} className="text-[9px] font-bold text-[#FF0000] hover:underline uppercase">Esqueci a senha</button>
          </div>
          <input
            type="password"
            className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-lg p-3.5 text-sm focus:ring-2 focus:ring-[#FF0000]/20 focus:border-[#FF0000] outline-none transition-all text-[#F1F1F1]"
            placeholder="Sua senha secreta"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center ml-1">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 text-[#FF0000] border-[#3F3F3F] rounded focus:ring-[#FF0000] cursor-pointer bg-[#0F0F0F]"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 text-xs font-medium text-[#AAAAAA] cursor-pointer select-none">
            Manter conectado
          </label>
        </div>

        {error && <p className="text-[#FF0000] text-xs font-bold text-center">{error}</p>}

        <button type="submit" className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white py-5 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95">
          Entrar no Escritório
        </button>
        
        <div className="text-center pt-4">
          <button type="button" onClick={onToggle} className="text-xs font-bold text-[#FF0000] hover:underline">
            Não tem uma conta? Crie agora
          </button>
        </div>
      </form>
    </div>
  );
};
