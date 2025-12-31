
import React from 'react';
import { 
  CopywriterParams, 
  CopyNiche, 
  AwarenessLevel, 
  CopyObjective,
  HumanizationLevel,
  CopyTone,
  PersonalityDegree,
  LanguageComplexity,
  CopyStructure,
  CopyFramework,
  DominantEmotion,
  OriginalityDegree,
  PersuasionDegree,
  CopyLanguage,
  CopyLength,
  CopyResponse
} from '../../types';
import { generateCopy } from '../../services/geminiService';
import { authStore } from '../../store';
import { notify } from '../Shared/Toast';

const PLATFORM_FORMATS = {
  LINKEDIN: [
    'LinkedIn – Post educativo', 'LinkedIn – Post de autoridade profissional', 'LinkedIn – Post de posicionamento',
    'LinkedIn – Post de opinião', 'LinkedIn – Post de storytelling profissional', 'LinkedIn – Post de aprendizado pessoal',
    'LinkedIn – Post de bastidores profissionais', 'LinkedIn – Post de dica prática', 'LinkedIn – Post provocativo',
    'LinkedIn – Post de networking', 'LinkedIn – Post de social selling', 'LinkedIn – Post de case / resultado',
    'LinkedIn – Post institucional', 'LinkedIn – Post de recrutamento', 'LinkedIn – Post com CTA estratégico'
  ],
  BLOG: [
    'Blog – Artigo informativo', 'Blog – Artigo educativo', 'Blog – Artigo de autoridade', 'Blog – Artigo opinativo',
    'Blog – Artigo de storytelling', 'Blog – Artigo técnico', 'Blog – Guia prático', 'Blog – Tutorial passo a passo',
    'Blog – Artigo evergreen', 'Blog – Estudo de caso'
  ],
  REDDIT: [
    'Reddit – Post explicativo / educativo', 'Reddit – Post de pergunta para comunidade', 'Reddit – Post de opinião argumentativa',
    'Reddit – Post de desabafo / experiência pessoal', 'Reddit – Post de storytelling real', 'Reddit – Post de estudo de caso',
    'Reddit – Post técnico / aprofundado', 'Reddit – Post de guia prático', 'Reddit – Resposta longa (comentário)',
    'Reddit – Resposta curta (comentário direto)'
  ],
  MEDIUM: [
    'Medium – Artigo educativo', 'Medium – Artigo de autoridade', 'Medium – Artigo de opinião', 'Medium – Artigo de storytelling',
    'Medium – Ensaio reflexivo', 'Medium – Artigo técnico', 'Medium – Artigo explicativo', 
    'Medium – Artigo baseado em experiência pessoal', 'Medium – Artigo de posicionamento'
  ],
  SUBSTACK: [
    'Substack – Artigo autoral', 'Substack – Ensaio opinativo', 'Substack – Conteúdo educativo aprofundado',
    'Substack – Conteúdo de bastidores', 'Substack – Reflexão pessoal', 'Substack – Conteúdo de autoridade',
    'Substack – Conteúdo exclusivo para assinantes', 'Substack – Texto de relacionamento com audiência'
  ],
  QUORA: [
    'Quora – Resposta educativa', 'Quora – Resposta técnica', 'Quora – Resposta baseada em experiência pessoal',
    'Quora – Resposta de autoridade', 'Quora – Resposta opinativa', 'Quora – Resposta curta e direta',
    'Quora – Resposta longa e aprofundada', 'Quora – Resposta comparativa'
  ]
};

interface CopyFormProps {
  onGenerated: (data: CopyResponse) => void;
}

export const CopyForm: React.FC<CopyFormProps> = ({ onGenerated }) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<CopywriterParams>({
    subject: '',
    targetAudience: '',
    niche: CopyNiche.EDUCATION_DIDACTIC,
    awareness: AwarenessLevel.PROBLEM_AWARE,
    objective: CopyObjective.EDUCATE_CONCEPT,
    platformFormat: PLATFORM_FORMATS.LINKEDIN[0],
    humanization: HumanizationLevel.BALANCED,
    tone: CopyTone.EDUCATIVE,
    personality: PersonalityDegree.SEMI_PERSONAL,
    complexity: LanguageComplexity.ACCESSIBLE,
    structure: CopyStructure.SCANNABLE,
    framework: CopyFramework.AIDA,
    emotion: DominantEmotion.TRUST,
    originality: OriginalityDegree.CREATIVE,
    persuasion: PersuasionDegree.PERSUASIVE,
    language: CopyLanguage.PORTUGUESE,
    length: CopyLength.W300
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = authStore.getState().currentUser;
    if (!user || user.credits <= 0) {
      notify('Créditos insuficientes para geração de Copy.', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await generateCopy(formData);
      authStore.consumeCredit(`Copy: ${formData.subject.substring(0, 20)}`);
      
      // Salvar no histórico limitado a 10
      authStore.saveCopyToCache(user.id, formData, data);
      
      onGenerated(data);
      notify('Conteúdo estratégico gerado com sucesso!');
    } catch (err: any) {
      notify(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const sectionLabel = "text-[10px] font-black text-[#FF0000] uppercase tracking-[0.2em] border-l-2 border-[#FF0000] pl-3 mb-6 block";
  const inputClasses = "w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-4 text-sm md:text-base outline-none focus:ring-2 focus:ring-[#FF0000]/30 focus:border-[#FF0000] text-[#F1F1F1] transition-all placeholder:text-[#333]";
  const labelClasses = "block text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="bg-[#272727] p-6 md:p-12 rounded-[2.5rem] border border-[#3F3F3F] shadow-2xl animate-in fade-in duration-700">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-black text-[#F1F1F1] tracking-tighter mb-4">Novo Conteúdo</h2>
        <p className="text-[#AAAAAA] text-sm md:text-base font-medium max-w-3xl">Gere textos humanizados, persuasivos e 100% otimizados para SEO em segundos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* SECTION 1 */}
        <div className="animate-in slide-in-from-left duration-500">
          <span className={sectionLabel}>1. Detalhes do Conteúdo</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClasses}>Assunto do Texto</label>
              <textarea 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                placeholder="Sobre o que vamos escrever hoje?"
                className={`${inputClasses} h-32 resize-none`}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Público-alvo</label>
              <textarea 
                value={formData.targetAudience}
                onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                placeholder="Quem é o leitor ideal? (Dores, desejos, nível de conhecimento)"
                className={`${inputClasses} h-32 resize-none`}
                required
              />
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="animate-in slide-in-from-left duration-700">
          <span className={sectionLabel}>2. Seletores Estratégicos</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className={labelClasses}>Nicho</label>
              <select value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value as CopyNiche})} className={inputClasses}>
                {Object.values(CopyNiche).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Nível de Consciência</label>
              <select value={formData.awareness} onChange={e => setFormData({...formData, awareness: e.target.value as AwarenessLevel})} className={inputClasses}>
                {Object.values(AwarenessLevel).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Objetivo</label>
              <select value={formData.objective} onChange={e => setFormData({...formData, objective: e.target.value as CopyObjective})} className={inputClasses}>
                {Object.values(CopyObjective).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="animate-in slide-in-from-left duration-1000">
          <span className={sectionLabel}>3. Plataforma e Tipo de Conteúdo</span>
          <div className="space-y-1">
            <label className={labelClasses}>Rede Social / Formato</label>
            <select 
              value={formData.platformFormat} 
              onChange={e => setFormData({...formData, platformFormat: e.target.value})} 
              className={inputClasses}
            >
              {Object.entries(PLATFORM_FORMATS).map(([platform, formats]) => (
                <optgroup key={platform} label={platform} className="bg-[#1A1A1A] text-[#FF0000] font-black">
                  {formats.map(f => <option key={f} value={f} className="bg-[#0F0F0F] text-[#F1F1F1] font-medium">{f}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION 4 */}
        <div>
          <span className={sectionLabel}>4. Ajustes de Escrita</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className={labelClasses}>Nível de Humanização</label>
              <select value={formData.humanization} onChange={e => setFormData({...formData, humanization: e.target.value as HumanizationLevel})} className={inputClasses}>
                {Object.values(HumanizationLevel).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Tom de Voz</label>
              <select value={formData.tone} onChange={e => setFormData({...formData, tone: e.target.value as CopyTone})} className={inputClasses}>
                {Object.values(CopyTone).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Grau de Pessoalidade</label>
              <select value={formData.personality} onChange={e => setFormData({...formData, personality: e.target.value as PersonalityDegree})} className={inputClasses}>
                {Object.values(PersonalityDegree).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Complexidade da Linguagem</label>
              <select value={formData.complexity} onChange={e => setFormData({...formData, complexity: e.target.value as LanguageComplexity})} className={inputClasses}>
                {Object.values(LanguageComplexity).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Estrutura do Texto</label>
              <select value={formData.structure} onChange={e => setFormData({...formData, structure: e.target.value as CopyStructure})} className={inputClasses}>
                {Object.values(CopyStructure).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Framework</label>
              <select value={formData.framework} onChange={e => setFormData({...formData, framework: e.target.value as CopyFramework})} className={inputClasses}>
                {Object.values(CopyFramework).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Emoção Dominante</label>
              <select value={formData.emotion} onChange={e => setFormData({...formData, emotion: e.target.value as DominantEmotion})} className={inputClasses}>
                {Object.values(DominantEmotion).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Grau de Originalidade</label>
              <select value={formData.originality} onChange={e => setFormData({...formData, originality: e.target.value as OriginalityDegree})} className={inputClasses}>
                {Object.values(OriginalityDegree).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Grau de Persuasão</label>
              <select value={formData.persuasion} onChange={e => setFormData({...formData, persuasion: e.target.value as PersuasionDegree})} className={inputClasses}>
                {Object.values(PersuasionDegree).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 5 */}
        <div className="bg-[#0F0F0F] p-8 rounded-3xl border border-[#3F3F3F]">
          <span className={sectionLabel}>5. Configurações Finais</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClasses}>Idioma</label>
              <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value as CopyLanguage})} className={inputClasses}>
                {Object.values(CopyLanguage).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Tamanho do Texto</label>
              <select value={formData.length} onChange={e => setFormData({...formData, length: e.target.value as CopyLength})} className={inputClasses}>
                {Object.values(CopyLength).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn-primary text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-[#FF0000]/20 uppercase tracking-[0.2em] text-xs md:text-sm"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Esculpindo Palavras de Alto Impacto...</span>
            </>
          ) : (
            <>
              <span>Gerar Conteúdo Irresistível</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
