
import React from 'react';
import { AIResponse } from '../types';
import { notify } from './Shared/Toast';

interface ResultDisplayProps {
  data: AIResponse;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = React.useState<'script' | 'seo'>('script');

  const copyToClipboard = (text: string, label: string = 'Conteúdo') => {
    navigator.clipboard.writeText(text);
    notify(`${label} copiado com sucesso!`);
  };

  const generateFullText = () => {
    return `[ROTEIRO - CENA1]
--------------------------------------------------
HOOK (15s): ${data.script.hook}

INTRODUÇÃO: ${data.script.intro}

BLOCO 1 (${data.script.block1.title}): 
${data.script.block1.content}

BLOCO 2 (${data.script.block2.title}): 
${data.script.block2.content}

BLOCO 3 (${data.script.block3.title}): 
${data.script.block3.content}

CTA / ENCERRAMENTO: 
${data.script.cta}

[SEO & METADADOS]
--------------------------------------------------
TÍTULOS SUGERIDOS:
${data.seo.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}

DESCRIÇÃO:
${data.seo.description}

TAGS / HASHTAGS:
${data.seo.tags.join(', ')}

CAPÍTULOS DO VÍDEO:
${data.seo.chapters.map(c => `${c.timestamp} ${c.label}`).join('\n')}

[DADOS DE MERCADO]
--------------------------------------------------
RPM Estimado: ${data.marketData.rpm}
CPC Médio: ${data.marketData.cpc}
Volume de Busca: ${data.marketData.searchVolume}
`;
  };

  const copyFullPackage = () => {
    copyToClipboard(generateFullText(), 'Pacote Completo');
  };

  const exportAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generateFullText()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `roteiro_cena1_${data.seo.titles[0].substring(0, 20).replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    notify('Arquivo TXT exportado!', 'success');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      {/* Tab Switcher - Visual Improvement */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between glass-panel p-2 rounded-2xl shadow-xl gap-3">
        <div className="flex bg-[#0F0F0F] p-1 rounded-xl w-full md:w-auto">
          <TabButton active={activeTab === 'script'} onClick={() => setActiveTab('script')}>Roteiro</TabButton>
          <TabButton active={activeTab === 'seo'} onClick={() => setActiveTab('seo')}>SEO & Meta</TabButton>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportAsTxt}
            className="flex-1 md:flex-none text-[10px] font-black text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 px-4 py-3 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            TXT
          </button>
          <button 
            onClick={copyFullPackage}
            className="flex-1 md:flex-none btn-primary text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            Copiar Tudo
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'script' ? (
          <div className="space-y-6">
            <ResultCard title="Gancho Estratégico (Hook)" content={data.script.hook} onCopy={() => copyToClipboard(data.script.hook, 'Hook')} highlight icon="🔥" />
            <ResultCard title="Introdução" content={data.script.intro} onCopy={() => copyToClipboard(data.script.intro, 'Introdução')} icon="🎬" />

            <div className="space-y-4">
              {[data.script.block1, data.script.block2, data.script.block3].map((block, i) => (
                <div key={i} className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 shadow-inner group hover:border-white/10 transition-all">
                   <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-black">{i + 1}</span>
                        <span className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">{block.title}</span>
                     </div>
                     <button onClick={() => copyToClipboard(block.content, `Bloco ${i+1}`)} className="text-[#AAAAAA] hover:text-[#FF0000] transition-all p-2 bg-[#0F0F0F] rounded-lg border border-white/5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                     </button>
                   </div>
                   <p className="text-[#F1F1F1] text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">{block.content}</p>
                </div>
              ))}
            </div>

            <ResultCard title="Chamada para Ação (CTA)" content={data.script.cta} onCopy={() => copyToClipboard(data.script.cta, 'CTA')} highlight icon="⚡" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
               <h4 className="text-[#AAAAAA] text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
                  Títulos Gerados
               </h4>
               <div className="space-y-3">
                {data.seo.titles.map((t, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-[#0F0F0F] rounded-xl group border border-white/5 hover:border-[#FF0000]/30 transition-all cursor-pointer" onClick={() => copyToClipboard(t, 'Título')}>
                    <span className="text-[#F1F1F1] text-sm font-bold line-clamp-2 pr-4">{t}</span>
                    <button className="text-[#AAAAAA] group-hover:text-[#FF0000] transition-all shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1" /></svg>
                    </button>
                  </div>
                ))}
               </div>
            </div>
            
            <ResultCard title="Descrição SEO" content={data.seo.description} onCopy={() => copyToClipboard(data.seo.description, 'Descrição')} icon="📝" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-[#AAAAAA] text-[10px] font-black uppercase tracking-widest">Keywords / Tags</h4>
                  <button onClick={() => copyToClipboard(data.seo.tags.join(', '), 'Tags')} className="text-[#AAAAAA] hover:text-[#FF0000] p-2 bg-[#0F0F0F] rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1" /></svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.seo.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#0F0F0F] text-[#F1F1F1] px-3 py-1.5 rounded-lg text-xs font-bold border border-white/5">#{tag.replace(/\s+/g, '')}</span>
                  ))}
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-[#AAAAAA] text-[10px] font-black uppercase tracking-widest">Capítulos (Timestamps)</h4>
                  <button onClick={() => copyToClipboard(data.seo.chapters.map(c => `${c.timestamp} ${c.label}`).join('\n'), 'Capítulos')} className="text-[#AAAAAA] hover:text-[#FF0000] p-2 bg-[#0F0F0F] rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1" /></svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {data.seo.chapters.map((chapter, idx) => (
                    <div key={idx} className="flex items-center text-xs bg-[#0F0F0F] p-3 rounded-lg border border-white/5">
                      <span className="text-[#FF0000] font-black w-14">{chapter.timestamp}</span>
                      <span className="text-[#F1F1F1] font-medium truncate">{chapter.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
              <h4 className="text-[#AAAAAA] text-[10px] font-black uppercase tracking-widest mb-6">Previsão de Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MarketMetric label="RPM Est." value={data.marketData.rpm} />
                <MarketMetric label="CPC Médio" value={data.marketData.cpc} />
                <MarketMetric label="Vol. Busca" value={data.marketData.searchVolume} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children }: any) => (
  <button 
    onClick={onClick} 
    className={`px-6 py-3 text-[10px] font-black transition-all rounded-xl uppercase tracking-widest flex-1 ${
      active 
        ? 'bg-[#FF0000] text-white shadow-lg shadow-red-600/10' 
        : 'text-[#AAAAAA] hover:text-[#F1F1F1] hover:bg-white/5'
    }`}
  >
    {children}
  </button>
);

const ResultCard = ({ title, content, onCopy, highlight, icon }: any) => (
  <div className={`p-6 rounded-2xl border-2 transition-all ${
    highlight 
      ? 'bg-[#FF0000]/5 border-[#FF0000]/20 ai-glow' 
      : 'bg-[#1A1A1A] border-white/5'
  } shadow-sm group`}>
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h4 className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-[#FF0000]' : 'text-[#AAAAAA]'}`}>{title}</h4>
      </div>
      <button onClick={onCopy} className="text-[#AAAAAA] hover:text-[#FF0000] transition-all p-2 bg-[#0F0F0F] rounded-lg border border-white/5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
      </button>
    </div>
    <p className="text-[#F1F1F1] text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">{content}</p>
  </div>
);

const MarketMetric = ({ label, value }: any) => (
  <div className="text-center p-5 bg-[#0F0F0F] rounded-2xl border border-white/5 flex flex-col items-center">
    <p className="text-[9px] font-black text-[#AAAAAA] uppercase mb-2 tracking-widest">{label}</p>
    <p className="text-[#F1F1F1] font-black text-lg tracking-tighter">{value}</p>
  </div>
);
