
// Always use GoogleGenAI with a named parameter for apiKey.
import { GoogleGenAI, Type } from "@google/genai";
import { 
  GeneratorParams, 
  AIResponse, 
  KeywordSearchParams, 
  KeywordAnalysisResponse,
  CopywriterParams,
  CopyResponse 
} from "../types";

// Always obtain API key directly from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (params: GeneratorParams): Promise<AIResponse> => {
  const durationMin = Math.floor(params.targetDurationSeconds / 60);
  const durationSec = params.targetDurationSeconds % 60;
  const durationText = `${durationMin}m ${durationSec}s`;

  const prompt = `
    Você é um estrategista sênior de conteúdo digital e arquiteto de crescimento (Growth Architect).
    Seu objetivo é gerar um pacote completo de roteiro e SEO otimizado para máxima retenção e conversão.

    DADOS ESTRATÉGICOS DO PROJETO:
    - Tópico Principal: "${params.topic}"
    - Nicho do Canal: ${params.niche}
    - Objetivo de Conversão: ${params.goal}
    - Rede Social Destino: ${params.platform}
    - Público-Alvo: ${params.audienceSegment}
    - Nível de Consciência do Público: ${params.awarenessLevel}
    - Idioma Nativo do Público e do Roteiro: ${params.targetLanguage}
    - Formato Visual: ${params.format}
    - Estilo da Comunicação: ${params.style}
    - Duração Alvo: ${durationText}

    DIRETRIZES DE ROTEIRIZAÇÃO (OBRIGATÓRIAS):
    1) IDIOMA DO ROTEIRO: Escreva o roteiro INTEIRAMENTE no idioma nativo definido por '${params.targetLanguage}'.
    2) ADAPTAÇÃO DE CONSCIÊNCIA: Se for 'Inconsciente', foque em sintomas e curiosidade. Se for 'Totalmente consciente', foque em benefícios diretos.
    3) ADAPTAÇÃO DE REDE SOCIAL: Para '${params.platform}', ajuste o dinamismo e hooks específicos.
    4) LOCALIZAÇÃO LINGUÍSTICA: Utilize gírias e expressões naturais da cultura definida por '${params.targetLanguage}'.
    5) ESTRUTURA: Hook Magnético, Intro Contextual, 3 Blocos de Valor Progressivo e CTA Estratégico.
    6) SEO: Gere títulos de alto CTR e descrição otimizada no mesmo idioma do roteiro.

    RETORNO: JSON estruturado.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          script: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              intro: { type: Type.STRING },
              block1: { 
                type: Type.OBJECT, 
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING } },
                required: ["title", "content"]
              },
              block2: { 
                type: Type.OBJECT, 
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING } },
                required: ["title", "content"]
              },
              block3: { 
                type: Type.OBJECT, 
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING } },
                required: ["title", "content"]
              },
              cta: { type: Type.STRING }
            },
            required: ["hook", "intro", "block1", "block2", "block3", "cta"]
          },
          seo: {
            type: Type.OBJECT,
            properties: {
              titles: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              chapters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timestamp: { type: Type.STRING },
                    label: { type: Type.STRING }
                  },
                  required: ["timestamp", "label"]
                }
              }
            },
            required: ["titles", "description", "tags", "chapters"]
          },
          marketData: {
            type: Type.OBJECT,
            properties: {
              rpm: { type: Type.STRING },
              cpc: { type: Type.STRING },
              searchVolume: { type: Type.STRING }
            },
            required: ["rpm", "cpc", "searchVolume"]
          }
        },
        required: ["script", "seo", "marketData"]
      }
    }
  });

  if (!response.text) throw new Error("Erro crítico na geração de inteligência.");
  return JSON.parse(response.text) as AIResponse;
};

export const generateCopy = async (params: CopywriterParams): Promise<CopyResponse> => {
  const prompt = `
    Você é um Copywriter Sênior e Estrategista de SEO de classe mundial.
    Seu objetivo é gerar um texto altamente persuasivo, humanizado e otimizado para buscadores.

    ESTRUTURA E REGRAS OBRIGATÓRIAS:
    - Assunto: "${params.subject}"
    - Público-alvo: "${params.targetAudience}"
    - Nicho: ${params.niche}
    - Nível de Consciência: ${params.awareness}
    - Objetivo: ${params.objective}
    - Plataforma/Formato: ${params.platformFormat}
    - Nível de Humanização: ${params.humanization}
    - Tom de Voz: ${params.tone}
    - Grau de Pessoalidade: ${params.personality}
    - Complexidade: ${params.complexity}
    - Estrutura: ${params.structure}
    - Framework de Copy: ${params.framework}
    - Emoção Dominante: ${params.emotion}
    - Originalidade: ${params.originality}
    - Persuasão: ${params.persuasion}
    - Idioma: ${params.language}
    - Tamanho Alvo: ${params.length}

    RESTRIÇÕES DE CONTEÚDO (CRÍTICO):
    1. PROIBIÇÃO ABSOLUTA: Não utilize emoticons ou emojis em nenhuma parte do texto.
    2. FORMATAÇÃO: Não utilize asteriscos (*** ou **) para negrito ou qualquer outra finalidade de formatação visual. O texto deve ser limpo.

    DIRETRIZES DE SEO:
    1. Utilize a intenção de busca correta para o formato '${params.platformFormat}'.
    2. Aplique palavras-chave de forma natural (LSI keywords).
    3. Foque em escaneabilidade e clareza semântica.
    4. Crie um título magnético (H1) e meta-descrição focada em CTR.

    IMPORTANTE: O texto deve ser indistinguível de um texto escrito por um humano experiente.
    RETORNO: JSON rigoroso.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.STRING, description: "O texto completo gerado seguindo todas as regras." },
          seoAnalysis: {
            type: Type.OBJECT,
            properties: {
              suggestedTitle: { type: Type.STRING },
              metaDescription: { type: Type.STRING },
              keywordsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
              readabilityScore: { type: Type.STRING }
            },
            required: ["suggestedTitle", "metaDescription", "keywordsUsed", "readabilityScore"]
          }
        },
        required: ["content", "seoAnalysis"]
      }
    }
  });

  if (!response.text) throw new Error("Falha na geração do Copywriter.");
  return JSON.parse(response.text) as CopyResponse;
};

export const analyzeKeywords = async (params: KeywordSearchParams): Promise<KeywordAnalysisResponse> => {
  const prompt = `
    Você é um arquiteto de software e especialista em crescimento de canais no YouTube.
    Seu objetivo é analisar a palavra-chave semente: "${params.seed}" e organizar o funil de conteúdo.

    REGRAS DE CLASSIFICAÇÃO (OBRIGATÓRIO):
    1. TOPO DE FUNIL (Informacional): Termos de descoberta. Ex: "o que é", "como funciona", "guia".
    2. MEIO DE FUNIL (Comercial): Termos de avaliação. Ex: "melhor", "vale a pena", "review".
    3. FUNDO DE FUNIL (Transacional): Termos de conversão. Ex: "comprar", "preço", "inscrição".
    4. COMPARAÇÕES: Termos de decisão direta. Ex: "X vs Y", "diferença entre".

    DADOS NECESSÁRIOS:
    - Métricas: Volume mensal, CPC (BRL), Dificuldade (0-100).
    - YouTube Wins: EXATAMENTE 6 Melhores termos para vídeos de alta performance e títulos virais.
    - PAA: Perguntas que o público faz.

    RETORNO: JSON organizado por estas categorias de funil.
  `;

  const keywordItemSchema = {
    type: Type.OBJECT,
    properties: {
      keyword: { type: Type.STRING },
      volume: { type: Type.STRING },
      cpc: { type: Type.STRING },
      difficulty: { type: Type.INTEGER },
      intent: { type: Type.STRING }
    },
    required: ["keyword", "volume", "cpc", "difficulty", "intent"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          funnel: {
            type: Type.OBJECT,
            properties: {
              topo: { type: Type.ARRAY, items: keywordItemSchema },
              meio: { type: Type.ARRAY, items: keywordItemSchema },
              fundo: { type: Type.ARRAY, items: keywordItemSchema },
              comparacoes: { type: Type.ARRAY, items: keywordItemSchema }
            },
            required: ["topo", "meio", "fundo", "comparacoes"]
          },
          youtubeWins: {
            type: Type.ARRAY,
            minItems: 6,
            maxItems: 6,
            items: {
              type: Type.OBJECT,
              properties: {
                keyword: { type: Type.STRING },
                potential: { type: Type.STRING },
                competition: { type: Type.STRING },
                estimatedRPM: { type: Type.STRING }
              },
              required: ["keyword", "potential", "competition", "estimatedRPM"]
            }
          },
          paa: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                questions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["category", "questions"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["funnel", "youtubeWins", "paa", "summary"]
      }
    }
  });

  if (!response.text) throw new Error("Falha ao analisar palavras-chave.");
  return JSON.parse(response.text) as KeywordAnalysisResponse;
};
