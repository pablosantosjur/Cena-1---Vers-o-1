
import React from 'react';
import { KeywordSearchParams, KeywordAnalysisResponse, KeywordMetric, KeywordHistoryItem } from '../../types';
import { analyzeKeywords } from '../../services/geminiService';
import { notify } from '../Shared/Toast';
import { authStore } from '../../store';

interface KeywordResearchProps {
  onPAAPlay?: (topic: string) => void;
}

export const KeywordResearch: React.FC<KeywordResearchProps> = ({ onPAAPlay }) => {
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [result, setResult] = React.useState<KeywordAnalysisResponse | null>(null);
  const [params, setParams] = React.useState<KeywordSearchParams>({
    seed: '',
    region: 'BR',
    platform: 'Both'
  });

  const [showHistory, setShowHistory] = React.useState(false);
  const [historyItems, setHistoryItems] = React.useState<KeywordHistoryItem[]>([]);

  const currentUser = authStore.getState().currentUser;

  // Simulated progress logic
  React.useEffect(() => {
    let interval: any;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 99) {
            clearInterval(interval);
            return 99;
          }
          const increment = prev < 50 ? 5 : prev < 80 ? 2 : 0.5;
          return prev + increment;
        });
      }, 200);
    } else {
      setProgress(0);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.seed.trim() || !currentUser) return;

    // 1. Verificar Cache
    const cached = authStore.getCachedKeyword(currentUser.id, params.seed);
    if (cached) {
      setResult(cached.content);
      notify("Dados recuperados instantaneamente do histórico!", "info");
      return;
    }

    // 2. Fluxo Normal se não houver cache
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeKeywords(params);
      setResult(data);
      authStore.consumeCredit(`Keyword Analysis: ${params.seed}`);
      
      // 3. Salvar no Cache
      authStore.saveKeywordToCache(currentUser.id, params, data);
      
      notify('Análise estratégica de funil concluída!');
    } catch (err: any) {
      notify(err.message || 'Erro ao processar busca.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = () => {
    if (!currentUser) return;
    const items = authStore.getAllUserKeywords(currentUser.id);
    setHistoryItems(items);
    setShowHistory(!showHistory);
  };

  const selectFromHistory = (item: KeywordHistoryItem) => {
    setResult(item.content);
    setParams(item.params);
    setShowHistory(false);
    notify("Busca recuperada do histórico.");
  };

  const exportarParaTXT = () => {
    if (!result) return;

    let text = `[RELATÓRIO DE PALAVRAS-CHAVE - CENA1]
Semente: ${params.seed}
Região: ${params.region}
Plataforma: ${params.platform}
--------------------------------------------------

RESUMO ESTRATÉGICO:
${result.summary}

--------------------------------------------------
FUNIL DE CONTEÚDO:

[TOPO DE FUNIL]
${result.funnel.topo.map(kw => `- ${kw.keyword} (Vol: ${kw.volume} | CPC: ${kw.cpc} | KD: ${kw.difficulty})`).join('\n')}

[MEIO DE FUNIL]
${result.funnel.meio.map(kw => `- ${kw.keyword} (Vol: ${kw.volume} | CPC: ${kw.cpc} | KD: ${kw.difficulty})`).join('\n')}

[FUNDO DE FUNIL]
${result.funnel.fundo.map(kw => `- ${kw.keyword} (Vol: ${kw.volume} | CPC: ${kw.cpc} | KD: ${kw.difficulty})`).join('\n')}

[COMPARAÇÕES]
${result.funnel.comparacoes.map(kw => `- ${kw.keyword} (Vol: ${kw.volume} | CPC: ${kw.cpc} | KD: ${kw.difficulty})`).join('\n')}

--------------------------------------------------
LACUNAS DE CONTEÚDO (PAA):
${result.paa.map(p => `\n[${p.category.toUpperCase()}]\n${p.questions.map(q => `• ${q}`).join('\n')}`).join('\n')}

--------------------------------------------------
YOUTUBE WINS:
${result.youtubeWins.map(win => `- ${win.keyword} (${win.potential} | Comp: ${win.competition} | RPM: ${win.estimatedRPM})`).join('\n')}
`;

    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "palavras-chave-cena1.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    notify('Relatório exportado com sucesso!', 'success');
  };

  const getDifficultyColor = (score: number) => {
    if (score < 30) return 'text-emerald-500';
    if (score < 60) return 'text-amber-500';
    return 'text-[#FF0000]';
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-500">
      <div className="bg-[#272727] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-[#3F3F3F] shadow-sm">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-[#F1F1F1] tracking-tighter mb-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF0000] flex items-center justify-center text-white shadow-lg shadow-[#FF0000]/20 shrink-0">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <span>Planejador <span className="text-[#FF0000] uppercase">PRO</span></span>
            </h2>
            <p className="text-[#AAAAAA] text-sm font-medium leading-relaxed max-w-3xl">
              Descubra os termos que dominam as buscas orgânicas.
            </p>
          </div>
          <button 
            onClick={loadHistory}
            className="bg-[#0F0F0F] border border-[#3F3F3F] text-[#F1F1F1] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[#FF0000] transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Histórico de Buscas
          </button>
        </div>

        {showHistory && (
          <div className="bg-[#0F0F0F] border border-[#FF0000]/30 rounded-2xl p-6 mb-8 animate-in slide-in-from-top-2 duration-300">
             <h3 className="text-[10px] font-black text-[#FF0000] uppercase tracking-widest border-b border-[#3F3F3F] pb-3 mb-4">Buscas Anteriores</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto pr-2">
                {historyItems.length > 0 ? historyItems.map((h, idx) => (
                  <button 
                    key={idx}
                    onClick={() => selectFromHistory(h)}
                    className="text-left bg-[#272727] border border-[#3F3F3F] hover:border-[#FF0000] p-4 rounded-xl transition-all group"
                  >
                     <p className="text-[#F1F1F1] font-bold text-sm truncate uppercase tracking-tight">{h.params.seed}</p>
                     <p className="text-[8px] font-black text-[#AAAAAA] mt-2 uppercase tracking-widest">{h.params.region} • {h.params.platform}</p>
                  </button>
                )) : (
                  <p className="text-[#AAAAAA] text-xs font-bold col-span-full py-8 text-center uppercase tracking-widest">Nenhuma busca encontrada.</p>
                )}
             </div>
          </div>
        )}

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1 mb-2 block">Semente</label>
            <input 
              type="text"
              value={params.seed}
              onChange={e => setParams({...params, seed: e.target.value})}
              placeholder="Ex: Marketing Digital"
              className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-4 text-sm md:text-lg outline-none focus:ring-4 focus:ring-[#FF0000]/5 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-black placeholder:text-[#3F3F3F]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-3 md:grid-cols-2">
            <div>
              <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1 mb-2 block">Região</label>
              <select 
                value={params.region}
                onChange={e => setParams({...params, region: e.target.value as any})}
                className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-4 text-xs font-bold outline-none text-[#F1F1F1]"
              >
                <option value="BR">Brasil</option>
                <option value="US">EUA/USA</option>
                <option value="Global">Global</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1 mb-2 block">Foco</label>
              <select 
                value={params.platform}
                onChange={e => setParams({...params, platform: e.target.value as any})}
                className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-4 text-xs font-bold outline-none text-[#F1F1F1]"
              >
                <option value="YouTube">YouTube</option>
                <option value="Google">Google</option>
                <option value="Both">Ambos</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-4 flex items-end gap-2">
            <button 
              disabled={loading}
              className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-white font-black h-[56px] md:h-[60px] rounded-xl text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#FF0000]/10 active:scale-95 disabled:opacity-50"
            >
              {loading ? '...' : 'Analisar'}
            </button>
            {result && !loading && (
              <button 
                type="button"
                onClick={exportarParaTXT}
                className="flex-1 bg-[#0F0F0F] border border-[#3F3F3F] hover:border-[#FF0000] text-[#F1F1F1] h-[56px] md:h-[60px] rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span>BAIXAR .TXT</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {loading && (
        <div className="py-12 md:py-20 flex flex-col items-center justify-center bg-[#272727] border border-[#3F3F3F] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl animate-in fade-in duration-500">
          <div className="w-full max-w-lg">
             <div className="flex justify-between items-end mb-4 px-2">
                <span className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest">ANALISANDO_</span>
                <span className="text-sm md:text-lg font-black text-[#F1F1F1]">{Math.floor(progress)}%</span>
             </div>
             
             <div className="w-full h-10 md:h-12 bg-[#0F0F0F] rounded-full p-1 relative overflow-hidden border border-[#3F3F3F]">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#FF0000] via-[#CC0000] to-[#990000] transition-all duration-300 relative flex items-center justify-end pr-2 md:pr-4"
                  style={{ width: `${progress}%` }}
                >
                   <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-[#FF0000] shadow-lg shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-1 mt-6">
                <div className={`text-[8px] md:text-[10px] font-black uppercase text-center transition-colors ${progress > 10 ? 'text-[#FF0000]' : 'text-[#3F3F3F]'}`}>CLUSTERS</div>
                <div className={`text-[8px] md:text-[10px] font-black uppercase text-center transition-colors ${progress > 40 ? 'text-[#FF0000]' : 'text-[#3F3F3F]'}`}>VOLUME</div>
                <div className={`text-[8px] md:text-[10px] font-black uppercase text-center transition-colors ${progress > 80 ? 'text-[#FF0000]' : 'text-[#3F3F3F]'}`}>ESTRATEGIA</div>
             </div>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6 md:space-y-10">
          <div className="bg-[#272727] text-[#F1F1F1] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-[#3F3F3F] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#FF0000]/5 blur-[80px] -mr-24 -mt-24"></div>
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-4">
                   <span className="text-[8px] font-black uppercase tracking-widest bg-[#FF0000] text-white px-3 py-1 rounded-full">Inteligência</span>
                 </div>
                 <p className="text-lg md:text-2xl font-bold leading-relaxed italic text-[#F1F1F1]">"{result.summary}"</p>
               </div>
               <button 
                onClick={exportarParaTXT}
                className="shrink-0 bg-[#0F0F0F] border border-[#3F3F3F] hover:border-[#FF0000] text-[#F1F1F1] p-4 rounded-2xl flex items-center gap-3 transition-all active:scale-95 group shadow-xl"
               >
                 <svg className="w-5 h-5 text-[#AAAAAA] group-hover:text-[#FF0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 <span className="text-[10px] font-black uppercase tracking-widest">Salvar .TXT</span>
               </button>
             </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
               <h3 className="text-xl md:text-2xl font-black text-[#F1F1F1] tracking-tighter shrink-0">Funil de Conteúdo</h3>
               <div className="h-px bg-[#3F3F3F] flex-1"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
               <FunnelColumn 
                  title="Topo" 
                  subtitle="Educação" 
                  color="blue"
                  keywords={result.funnel.topo} 
                  getDifficultyColor={getDifficultyColor}
               />
               <FunnelColumn 
                  title="Meio" 
                  subtitle="Avaliação" 
                  color="amber"
                  keywords={result.funnel.meio} 
                  getDifficultyColor={getDifficultyColor}
               />
               <FunnelColumn 
                  title="Fundo" 
                  subtitle="Conversão" 
                  color="emerald"
                  keywords={result.funnel.fundo} 
                  getDifficultyColor={getDifficultyColor}
               />
               <FunnelColumn 
                  title="Versus" 
                  subtitle="Decisão" 
                  color="purple"
                  keywords={result.funnel.comparacoes} 
                  getDifficultyColor={getDifficultyColor}
               />
            </div>
          </div>

          <div className="bg-[#0F0F0F] border border-[#3F3F3F] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000]/10 blur-[100px] -mr-32 -mt-32"></div>
             <div className="relative z-10">
                <h3 className="text-xl md:text-3xl font-black tracking-tighter mb-8 flex items-center gap-4 flex-wrap">
                  <span className="bg-[#FF0000] text-white px-3 py-1 rounded-xl text-lg md:text-xl">YouTube Wins</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#AAAAAA]">Seleções Premium</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                   {result.youtubeWins.slice(0, 6).map((win, idx) => (
                     <div key={idx} className="bg-[#272727] border border-[#3F3F3F] p-5 rounded-2xl transition-all hover:border-[#FF0000]/50 group">
                        <div className="mb-3 flex justify-between items-start">
                           <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${win.potential === 'Viral' ? 'bg-[#FF0000]/10 text-[#FF0000]' : 'bg-emerald-500/10 text-emerald-400'}`}>
                             {win.potential}
                           </span>
                        </div>
                        <h4 className="font-black text-[#F1F1F1] text-base mb-4 leading-tight">{win.keyword}</h4>
                        <div className="space-y-1.5 border-t border-[#3F3F3F] pt-3">
                           <div className="flex justify-between items-center text-[9px]">
                              <span className="text-[#AAAAAA] font-black uppercase tracking-widest">Comp.</span>
                              <span className="text-[#F1F1F1] font-black">{win.competition}</span>
                           </div>
                           <div className="flex justify-between items-center text-[9px]">
                              <span className="text-[#AAAAAA] font-black uppercase tracking-widest">RPM</span>
                              <span className="text-[#FF0000] font-black">{win.estimatedRPM}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="bg-[#272727] rounded-[2rem] md:rounded-[2.5rem] border border-[#3F3F3F] p-6 md:p-10 shadow-sm">
             <h3 className="text-xl md:text-2xl font-black text-[#F1F1F1] tracking-tighter mb-6 md:mb-8">Lacunas de Conteúdo (PAA)</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {result.paa.map((p, idx) => (
                  <div key={idx} className="space-y-4">
                     <h4 className="text-[9px] font-black text-[#FF0000] uppercase tracking-widest flex items-center gap-2">
                        <span className="w-3 h-px bg-[#FF0000]/30"></span>
                        {p.category}
                     </h4>
                     <ul className="space-y-2">
                        {p.questions.map((q, qidx) => (
                          <li key={qidx} className="bg-[#0F0F0F] p-4 rounded-xl text-sm font-bold text-[#AAAAAA] border border-[#3F3F3F] flex items-center justify-between gap-3 hover:text-[#F1F1F1] transition-colors group/paa">
                             <div className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000] mt-1.5 shrink-0"></div>
                                <span className="leading-snug">{q}</span>
                             </div>
                             {onPAAPlay && (
                                <button 
                                  onClick={() => onPAAPlay(q)}
                                  className="w-8 h-8 rounded-lg bg-[#FF0000] flex items-center justify-center text-white opacity-0 group-hover/paa:opacity-100 transition-all active:scale-90 shrink-0"
                                  title="Criar roteiro a partir desta pergunta"
                                >
                                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </button>
                             )}
                          </li>
                        ))}
                     </ul>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FunnelColumn = ({ title, subtitle, color, keywords, getDifficultyColor }: any) => {
  const borderMap: any = {
    blue: 'border-blue-900/30',
    amber: 'border-amber-900/30',
    emerald: 'border-emerald-900/30',
    purple: 'border-purple-900/30',
  };

  return (
    <div className={`flex flex-col rounded-2xl border overflow-hidden shadow-sm bg-[#272727] ${borderMap[color] || 'border-[#3F3F3F]'}`}>
      <div className={`p-3 md:p-4 bg-[#0F0F0F] text-white border-b border-[#3F3F3F] flex justify-between items-center`}>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-[#F1F1F1]">{title}</h4>
          <span className="text-[7px] md:text-[8px] font-black uppercase text-[#AAAAAA]">{subtitle}</span>
        </div>
        <div className="bg-[#3F3F3F] text-[#F1F1F1] px-2 py-0.5 rounded text-[10px] font-black">{keywords.length}</div>
      </div>
      
      <div className="divide-y divide-[#3F3F3F]">
        <div className="grid grid-cols-12 px-3 py-2 bg-[#0F0F0F]/30 text-[7px] md:text-[8px] font-black uppercase tracking-widest text-[#AAAAAA]">
          <div className="col-span-7">Keyword</div>
          <div className="col-span-2 text-center">KD</div>
          <div className="col-span-3 text-right">Vol</div>
        </div>
        
        {keywords.length > 0 ? keywords.map((kw: KeywordMetric, idx: number) => (
          <div key={idx} className="grid grid-cols-12 px-3 py-3 items-start hover:bg-[#3F3F3F]/30 transition-colors">
            <div className="col-span-7 pr-1">
              <p className="font-bold text-[#F1F1F1] text-[10px] md:text-[11px] leading-tight block whitespace-normal break-words" title={kw.keyword}>
                {kw.keyword}
              </p>
              <p className="text-[8px] font-black text-emerald-500 mt-0.5">{kw.cpc}</p>
            </div>
            <div className={`col-span-2 text-center text-[9px] md:text-[10px] font-black ${getDifficultyColor(kw.difficulty)}`}>
              {kw.difficulty}
            </div>
            <div className="col-span-3 text-right text-[9px] md:text-[10px] font-black text-[#AAAAAA]">
              {kw.volume}
            </div>
          </div>
        )) : (
          <div className="p-6 text-center text-[#3F3F3F] font-bold text-[9px] italic">Vazio</div>
        )}
      </div>
    </div>
  );
};
