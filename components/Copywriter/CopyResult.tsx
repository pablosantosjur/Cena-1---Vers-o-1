
import React from 'react';
import { CopyResponse } from '../../types';
import { notify } from '../Shared/Toast';

interface CopyResultProps {
  data: CopyResponse;
}

export const CopyResult: React.FC<CopyResultProps> = ({ data }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.content);
    notify('Conteúdo copiado para a área de transferência!');
  };

  const exportAsTxt = () => {
    const text = `[CENA1 - COPYWRITER STRATEGY]
TITLE: ${data.seoAnalysis.suggestedTitle}
META: ${data.seoAnalysis.metaDescription}
KEYWORDS: ${data.seoAnalysis.keywordsUsed.join(', ')}
LEGIBILIDADE: ${data.seoAnalysis.readabilityScore}
--------------------------------------------------
${data.content}`;

    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `copy_cena1_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    notify('Relatório de Copy exportado!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* TEXT CONTENT */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-[#272727] p-8 md:p-12 rounded-[2.5rem] border border-[#3F3F3F] shadow-2xl relative">
          <div className="absolute top-6 right-6 flex gap-3">
             <button onClick={exportAsTxt} className="p-3 bg-[#0F0F0F] rounded-xl border border-[#3F3F3F] text-[#AAAAAA] hover:text-[#F1F1F1] transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             </button>
             <button onClick={copyToClipboard} className="p-3 bg-[#FF0000] rounded-xl text-white shadow-lg shadow-[#FF0000]/20 hover:bg-[#CC0000] transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
             </button>
          </div>
          
          <h2 className="text-2xl font-black text-[#F1F1F1] mb-8 pr-16">{data.seoAnalysis.suggestedTitle}</h2>
          
          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base prose-strong:text-[#FF0000] prose-strong:font-black">
             <div className="text-[#F1F1F1] font-medium whitespace-pre-wrap leading-loose">
               {data.content}
             </div>
          </div>
        </div>
      </div>

      {/* SEO SIDEBAR */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#0F0F0F] border border-[#3F3F3F] p-8 rounded-[2rem] shadow-xl">
           <h3 className="text-[10px] font-black text-[#FF0000] uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></div>
              Inteligência SEO
           </h3>
           
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest">Meta Descrição (CTR Focus)</label>
                 <div className="bg-[#272727] p-4 rounded-xl border border-[#3F3F3F] text-xs font-bold text-[#F1F1F1] leading-relaxed italic">
                    "{data.seoAnalysis.metaDescription}"
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest">Legibilidade & SEO</label>
                 <div className="flex items-center justify-between bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Score de Escrita</span>
                    <span className="text-xl font-black text-emerald-500">{data.seoAnalysis.readabilityScore}</span>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest">Keywords Estratégicas</label>
                 <div className="flex flex-wrap gap-2">
                    {data.seoAnalysis.keywordsUsed.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#272727] rounded-lg text-[10px] font-black text-[#AAAAAA] border border-[#3F3F3F]">
                         {kw}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-[#272727] p-8 rounded-[2rem] border border-[#3F3F3F] text-center">
           <p className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest mb-4">O que fazer agora?</p>
           <ul className="text-[10px] text-left space-y-3 font-bold text-[#AAAAAA]">
              <li className="flex gap-2">
                 <span className="text-[#FF0000]">1.</span> Revise os CTAs estratégicos.
              </li>
              <li className="flex gap-2">
                 <span className="text-[#FF0000]">2.</span> Agende a publicação no melhor horário.
              </li>
              <li className="flex gap-2">
                 <span className="text-[#FF0000]">3.</span> Responda os primeiros comentários com a mesma linguagem humanizada.
              </li>
           </ul>
        </div>
      </div>
    </div>
  );
};
