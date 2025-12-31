
import React from 'react';
import { 
  VideoNiche, 
  VideoGoal, 
  VideoFormat, 
  VideoStyle, 
  GeneratorParams, 
  AudienceSegment, 
  AwarenessLevel, 
  SocialPlatform, 
  TargetLanguage 
} from '../types';

interface InputFormProps {
  onSubmit: (params: GeneratorParams) => void;
  isLoading: boolean;
  preFilledTopic?: string | null;
  onTopicHandled?: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, preFilledTopic, onTopicHandled }) => {
  const [formData, setFormData] = React.useState<GeneratorParams>({
    topic: '',
    niche: VideoNiche.EDUCATION_DIDACTIC,
    goal: VideoGoal.EDUCATE_CONCEPT,
    audienceSegment: AudienceSegment.BEGINNERS,
    awarenessLevel: AwarenessLevel.PROBLEM_AWARE,
    platform: SocialPlatform.YOUTUBE,
    targetLanguage: TargetLanguage.PT_BR,
    format: VideoFormat.HORIZONTAL,
    style: VideoStyle.DYNAMIC,
    targetDurationSeconds: 480,
  });

  const durationOptions = [
    { label: '30 segundos', value: 30 },
    { label: '1 minuto', value: 60 },
    { label: '3 minutos', value: 180 },
    { label: '5 minutos', value: 300 },
    { label: '8 minutos', value: 480 },
    { label: '10 minutos', value: 600 },
    { label: '12 minutos', value: 720 },
    { label: '15 minutos', value: 900 },
    { label: '20 minutos', value: 1200 },
  ];

  React.useEffect(() => {
    if (preFilledTopic) {
      setFormData(prev => ({ ...prev, topic: preFilledTopic }));
      if (onTopicHandled) onTopicHandled();
    }
  }, [preFilledTopic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic.trim()) {
      onSubmit(formData);
    }
  };

  const inputClasses = "w-full bg-[#0F0F0F] border border-white/10 rounded-xl p-4 text-[#F1F1F1] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#FF0000]/30 focus:border-[#FF0000] transition-all placeholder:text-[#333] font-medium hover:border-white/20 cursor-pointer";
  const labelClasses = "block text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label className={labelClasses}>Tópico do Vídeo</label>
        <textarea
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          rows={3}
          className={`${inputClasses} resize-none shadow-inner cursor-text`}
          placeholder="O que vamos criar hoje?"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className={labelClasses}>Nicho</label>
          <select
            value={formData.niche}
            onChange={(e) => setFormData({ ...formData, niche: e.target.value as VideoNiche })}
            className={inputClasses}
          >
            {Object.values(VideoNiche).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClasses}>Objetivo</label>
          <select
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value as VideoGoal })}
            className={inputClasses}
          >
            {Object.values(VideoGoal).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className={labelClasses}>Público Alvo (Segmento)</label>
          <select
            value={formData.audienceSegment}
            onChange={(e) => setFormData({ ...formData, audienceSegment: e.target.value as AudienceSegment })}
            className={inputClasses}
          >
            {Object.values(AudienceSegment).map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClasses}>Nível de Consciência</label>
          <select
            value={formData.awarenessLevel}
            onChange={(e) => setFormData({ ...formData, awarenessLevel: e.target.value as AwarenessLevel })}
            className={inputClasses}
          >
            {Object.values(AwarenessLevel).map((al) => (
              <option key={al} value={al}>{al}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className={labelClasses}>Rede Social</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as SocialPlatform })}
            className={inputClasses}
          >
            {Object.values(SocialPlatform).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClasses}>Idioma Nativo do Público</label>
          <select
            value={formData.targetLanguage}
            onChange={(e) => setFormData({ ...formData, targetLanguage: e.target.value as TargetLanguage })}
            className={inputClasses}
          >
            <option value={TargetLanguage.PT_BR}>Português (Brasil) 🇧🇷</option>
            <option value={TargetLanguage.PT_PT}>Português (Portugal) 🇵🇹</option>
            <option value={TargetLanguage.EN_US}>Inglês (USA) 🇺🇸</option>
            <option value={TargetLanguage.EN_UK}>Inglês (UK) 🇬🇧</option>
            <option value={TargetLanguage.ES_LATAM}>Espanhol (LatAm) 🇲🇽</option>
            <option value={TargetLanguage.FR}>Francês 🇫🇷</option>
            <option value={TargetLanguage.DE}>Alemão 🇩🇪</option>
            <option value={TargetLanguage.IT}>Italiano 🇮🇹</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className={labelClasses}>Duração Alvo</label>
          <select
            value={formData.targetDurationSeconds}
            onChange={(e) => setFormData({ ...formData, targetDurationSeconds: parseInt(e.target.value) })}
            className={inputClasses}
          >
            {durationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClasses}>Formato Visual</label>
          <select
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as VideoFormat })}
            className={inputClasses}
          >
            {Object.values(VideoFormat).map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClasses}>Estilo de Fala</label>
        <select
          value={formData.style}
          onChange={(e) => setFormData({ ...formData, style: e.target.value as VideoStyle })}
          className={inputClasses}
        >
          {Object.values(VideoStyle).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary text-white font-black py-5 px-6 rounded-2xl flex items-center justify-center space-x-3 disabled:opacity-50 shadow-xl shadow-red-600/20 uppercase tracking-widest text-xs"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Gerando Inteligência...</span>
          </>
        ) : (
          <>
            <span>Gerar Roteiro Profissional</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </>
        )}
      </button>
    </form>
  );
};
