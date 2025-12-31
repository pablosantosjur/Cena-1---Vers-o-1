
import React from 'react';
import { authStore } from '../../store';

interface RegisterProps {
  onToggle: () => void;
  onRegistered: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onToggle, onRegistered }) => {
  const [username, setUsername] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 4 || password.length > 12) {
      setError('A senha deve ter entre 4 e 12 caracteres.');
      return;
    }
    
    const result = authStore.register(username, fullName, email, password);
    if (result.success) {
      onRegistered();
    } else {
      setError(result.message || 'Erro ao registrar.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[440px] bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-zinc-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 mb-6">
             <span className="text-blue-600 font-black text-2xl tracking-tighter">C1</span>
          </div>
          <h2 className="text-3xl font-black text-zinc-900 tracking-tighter mb-2">Criar sua conta</h2>
          <p className="text-zinc-500 text-sm font-medium">Junte-se à nova geração de criadores</p>
        </div>
        
        {error && (
          <div className="mb-6 text-red-600 text-[11px] font-bold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Username único</label>
            <input
              type="text"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-zinc-900 placeholder-zinc-400 outline-none transition-all"
              placeholder="ex: pedro_creator"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Nome Completo</label>
            <input
              type="text"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-zinc-900 placeholder-zinc-400 outline-none transition-all"
              placeholder="Seu nome e sobrenome"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
            <input
              type="email"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-zinc-900 placeholder-zinc-400 outline-none transition-all"
              placeholder="contato@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Senha</label>
              <input
                type="password"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Confirmar</label>
              <input
                type="password"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                placeholder="••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] mt-4">
            Finalizar Cadastro
          </button>
          
          <p className="text-center text-zinc-400 text-xs font-medium pt-6">
            Já possui acesso? <button type="button" onClick={onToggle} className="text-blue-600 font-black hover:text-blue-700 transition-colors uppercase text-[10px] tracking-widest ml-1">Acessar Agora</button>
          </p>
        </form>
      </div>
    </div>
  );
};