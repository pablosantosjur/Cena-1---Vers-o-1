
import React from 'react';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { GeneratorParams, AIResponse, User, ScriptHistoryItem, CopyResponse, CopyHistoryItem } from './types';
import { generateContent } from './services/geminiService';
import { authStore } from './store';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Profile } from './components/User/Profile';
import { AdminDashboard } from './components/Admin/Dashboard';
import { KeywordResearch } from './components/SEO/KeywordResearch';
import { CopyForm } from './components/Copywriter/CopyForm';
import { CopyResult } from './components/Copywriter/CopyResult';
import { Toast, ToastType, notify } from './components/Shared/Toast';
import { LoadingVideo } from './components/Shared/LoadingVideo';

const App: React.FC = () => {
  const [view, setView] = React.useState<'main' | 'login' | 'register' | 'profile' | 'admin' | 'keywords' | 'copywriter'>('main');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AIResponse | null>(null);
  const [copyResult, setCopyResult] = React.useState<CopyResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [currentUser, setCurrentUser] = React.useState<User | null>(authStore.getState().currentUser);
  const [toast, setToast] = React.useState<{ message: string; type: ToastType } | null>(null);
  
  // Estado para histórico e preenchimento automático
  const [draftTopic, setDraftTopic] = React.useState<string | null>(null);
  const [showScriptHistory, setShowScriptHistory] = React.useState(false);
  const [userScripts, setUserScripts] = React.useState<ScriptHistoryItem[]>([]);

  // Estado para histórico de Copywriter
  const [showCopyHistory, setShowCopyHistory] = React.useState(false);
  const [userCopies, setUserCopies] = React.useState<CopyHistoryItem[]>([]);

  React.useEffect(() => {
    const handleToast = (e: any) => {
      setToast({ message: e.detail.message, type: e.detail.type });
    };
    window.addEventListener('app-toast', handleToast);

    const interval = setInterval(() => {
      setCurrentUser(authStore.getState().currentUser);
    }, 500);

    document.body.className = "bg-[#0F0F0F] text-[#F1F1F1] antialiased";
    
    return () => {
      window.removeEventListener('app-toast', handleToast);
      clearInterval(interval);
    };
  }, []);

  const handleGenerate = async (params: GeneratorParams) => {
    if (!currentUser) return;

    const cached = authStore.getCachedScript(currentUser.id, params.topic);
    if (cached) {
      setResult(cached.content);
      notify("Resultado carregado do histórico!", "info");
      setTimeout(() => {
        document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (currentUser.credits <= 0) {
      setError("Seus créditos acabaram. Adquira um novo pacote na área financeira para continuar gerando roteiros.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await generateContent(params);
      setResult(data);
      authStore.consumeCredit(params.topic);
      authStore.saveScriptToCache(currentUser.id, params, data);
      
      setTimeout(() => {
        document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Falha ao gerar o conteúdo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySuccess = (data: CopyResponse) => {
    setCopyResult(data);
    setTimeout(() => {
      document.getElementById('copy-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const loadHistory = () => {
    if (!currentUser) return;
    const scripts = authStore.getAllUserScripts(currentUser.id);
    setUserScripts(scripts);
    setShowScriptHistory(!showScriptHistory);
  };

  const loadCopyHistory = () => {
    if (!currentUser) return;
    const copies = authStore.getAllUserCopies(currentUser.id);
    setUserCopies(copies);
    setShowCopyHistory(!showCopyHistory);
  };

  const selectFromHistory = (item: ScriptHistoryItem) => {
    setResult(item.content);
    setShowScriptHistory(false);
    notify("Roteiro recuperado do histórico.");
    setTimeout(() => {
      document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const selectCopyFromHistory = (item: CopyHistoryItem) => {
    setCopyResult(item.content);
    setShowCopyHistory(false);
    notify("Copy recuperado do histórico.");
    setTimeout(() => {
      document.getElementById('copy-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePAAShortcut = (topic: string) => {
    setDraftTopic(topic);
    setView('main');
    notify("Tópico selecionado! Prossiga com a configuração do roteiro.");
  };

  if (!currentUser) {
    return (
      <div className="bg-[#0F0F0F] min-h-screen flex items-center justify-center p-4">
        {view === 'register' ? (
          <Register onToggle={() => setView('login')} onRegistered={() => setView('main')} />
        ) : (
          <Login onToggle={() => setView('register')} onLogged={() => setView('main')} />
        )}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F]">
      <nav className="bg-[#0F0F0F] border-b border-[#3F3F3F] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-auto min-h-20 flex flex-col md:flex-row items-center justify-between py-4 md:py-0 gap-4">
          <div className="flex items-center space-x-2 cursor-pointer shrink-0" onClick={() => setView('main')}>
            <span className="text-[#FF0000] font-black text-2xl tracking-tighter">Cena<span className="text-[#F1F1F1]">1</span></span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
            <div className="flex items-center px-4 py-2 bg-[#272727] border border-[#3F3F3F] rounded-xl md:flex shrink-0">
              <span className="text-[10px] md:text-[11px] font-black text-[#AAAAAA] uppercase mr-3 tracking-widest">Créditos</span>
              <span className="text-[#FF0000] font-black text-base">{currentUser.credits}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <NavButton active={view === 'main'} onClick={() => setView('main')}>Escritório</NavButton>
              <NavButton active={view === 'copywriter'} onClick={() => setView('copywriter')}>Copywriter</NavButton>
              <NavButton active={view === 'keywords'} onClick={() => setView('keywords')}>Palavras-Chave</NavButton>
              <NavButton active={view === 'profile'} onClick={() => setView('profile')}>Financeiro</NavButton>
              {currentUser.role === 'admin' && (
                <NavButton active={view === 'admin'} onClick={() => setView('admin')}>Admin</NavButton>
              )}
            </div>
            
            <button 
              onClick={() => authStore.logout()} 
              className="text-[10px] md:text-xs font-black text-[#AAAAAA] hover:text-[#FF0000] transition-colors uppercase tracking-widest px-4 md:px-0 md:pl-6 md:border-l border-[#3F3F3F]"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 w-full">
        {view === 'profile' ? (
          <Profile user={currentUser} />
        ) : view === 'admin' ? (
          <AdminDashboard />
        ) : view === 'keywords' ? (
          <KeywordResearch onPAAPlay={handlePAAShortcut} />
        ) : view === 'copywriter' ? (
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
               <div>
                  <h1 className="text-3xl md:text-4xl font-black text-[#F1F1F1] tracking-tighter">Laboratório de Copy</h1>
                  <p className="text-[#AAAAAA] text-sm font-medium">Textos otimizados para blogs e redes sociais.</p>
               </div>
               <button 
                  onClick={loadCopyHistory}
                  className="bg-[#272727] border border-[#3F3F3F] text-[#F1F1F1] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[#FF0000] transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Histórico (Últimos 10)
                </button>
            </div>

            {showCopyHistory && (
              <div className="bg-[#272727] border border-[#FF0000]/30 rounded-2xl p-6 mb-8 animate-in slide-in-from-top-2 duration-300">
                <h3 className="text-[10px] font-black text-[#FF0000] uppercase tracking-widest border-b border-[#3F3F3F] pb-3 mb-4">Suas Últimas Cópias</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userCopies.length > 0 ? userCopies.map((c, idx) => (
                    <button 
                      key={idx}
                      onClick={() => selectCopyFromHistory(c)}
                      className="text-left bg-[#0F0F0F] border border-[#3F3F3F] hover:border-[#FF0000] p-4 rounded-xl transition-all group"
                    >
                       <p className="text-[#F1F1F1] font-bold text-sm truncate uppercase tracking-tight">{c.params.subject}</p>
                       <p className="text-[8px] font-black text-[#AAAAAA] mt-2 uppercase tracking-widest">{new Date(c.timestamp).toLocaleDateString()} • {c.params.platformFormat}</p>
                    </button>
                  )) : (
                    <p className="text-[#AAAAAA] text-xs font-bold col-span-full py-8 text-center uppercase tracking-widest">Nenhuma copy encontrada no histórico.</p>
                  )}
                </div>
              </div>
            )}

            <CopyForm onGenerated={handleCopySuccess} />
            <div id="copy-results">
              {copyResult && <CopyResult data={copyResult} />}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-5 space-y-8 md:space-y-10">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl md:text-4xl font-black text-[#F1F1F1] mb-2 tracking-tighter leading-tight">
                    Novo Roteiro Estratégico
                  </h1>
                  <p className="text-[#AAAAAA] leading-relaxed text-sm font-medium px-2 md:px-0">
                    Preencha o assunto para criar um roteiro de alta performance.
                  </p>
                </div>
                <button 
                  onClick={loadHistory}
                  className="bg-[#272727] border border-[#3F3F3F] text-[#F1F1F1] px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[#FF0000] transition-all flex items-center gap-2 shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Histórico
                </button>
              </div>

              {showScriptHistory && (
                <div className="bg-[#272727] border border-[#FF0000]/30 rounded-2xl p-4 md:p-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <h3 className="text-[10px] font-black text-[#FF0000] uppercase tracking-widest border-b border-[#3F3F3F] pb-2">Seus Roteiros Gerados</h3>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                    {userScripts.length > 0 ? userScripts.map((s, idx) => (
                      <button 
                        key={idx}
                        onClick={() => selectFromHistory(s)}
                        className="w-full text-left bg-[#0F0F0F] border border-[#3F3F3F] hover:border-[#FF0000] p-4 rounded-xl transition-all group"
                      >
                        <p className="text-[#F1F1F1] font-bold text-sm truncate">{s.params.topic}</p>
                        <div className="flex justify-between items-center mt-2">
                           <span className="text-[8px] font-black text-[#AAAAAA] uppercase tracking-widest">{new Date(s.timestamp).toLocaleDateString()}</span>
                           <span className="text-[8px] font-black text-[#FF0000] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Visualizar →</span>
                        </div>
                      </button>
                    )) : (
                      <p className="text-[#AAAAAA] text-xs font-bold text-center py-8">Nenhum roteiro encontrado no histórico.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-[#272727] p-6 sm:p-10 rounded-3xl md:rounded-[2.5rem] border border-[#3F3F3F] shadow-sm">
                <InputForm 
                  onSubmit={handleGenerate} 
                  isLoading={loading} 
                  preFilledTopic={draftTopic} 
                  onTopicHandled={() => setDraftTopic(null)}
                />
                {error && (
                  <div className="mt-8 p-6 bg-[#FF0000]/10 border-2 border-[#FF0000]/20 text-[#FF0000] rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Atenção
                    </div>
                    <p className="text-sm leading-relaxed font-bold opacity-90">{error}</p>
                    {currentUser.credits <= 0 && (
                      <button 
                        onClick={() => setView('profile')}
                        className="bg-[#FF0000] text-[#F1F1F1] text-xs font-black uppercase tracking-widest py-3 rounded-xl hover:bg-[#CC0000] transition-all active:scale-95 mt-2"
                      >
                        Ir para Financeiro
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div id="results-view" className="lg:col-span-7 h-full">
              {!result && !loading && (
                <div className="h-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center p-8 md:p-14 bg-[#272727] border-2 border-[#3F3F3F] border-dashed rounded-[2rem] md:rounded-[3rem]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-[#0F0F0F] flex items-center justify-center mb-6 md:mb-8 text-[#3F3F3F]">
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#F1F1F1] mb-2 tracking-tight">Aguardando definição estratégica</h3>
                  <p className="text-[#AAAAAA] text-sm md:text-base font-medium max-w-xs">
                    Complete o formulário ou consulte seu histórico para visualizar roteiros.
                  </p>
                </div>
              )}
              
              {loading && (
                <div className="bg-[#272727] p-6 sm:p-10 rounded-[2rem] md:rounded-[3rem] border border-[#3F3F3F] shadow-sm flex items-center justify-center min-h-[500px] md:min-h-[600px]">
                  <LoadingVideo />
                </div>
              )}

              {result && !loading && <ResultDisplay data={result} />}
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 md:py-12 text-center border-t border-[#3F3F3F] bg-[#0F0F0F]">
        <p className="text-[10px] md:text-xs font-black text-[#AAAAAA] uppercase tracking-[0.2em] md:tracking-[0.4em] px-4">
          © 2025 Cena1 AI • Professional YouTube Content Engine
        </p>
      </footer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

const NavButton = ({ active, onClick, children }: any) => (
  <button 
    onClick={onClick} 
    className={`px-3 sm:px-5 py-2 text-[10px] md:text-sm font-black transition-all rounded-xl uppercase tracking-widest whitespace-nowrap ${
      active ? 'text-[#F1F1F1] bg-[#FF0000]' : 'text-[#AAAAAA] hover:text-[#F1F1F1] hover:bg-[#3F3F3F]'
    }`}
  >
    {children}
  </button>
);

export default App;
