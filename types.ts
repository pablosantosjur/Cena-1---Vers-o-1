
export enum VideoGoal {
// EDUCAÇÃO E CONSCIÊNCIA
EDUCATE_TUTORIAL = 'Educar: Tutorial prático ou Passo a passo',
EDUCATE_CONCEPT = 'Educar: Explicar conceitos técnicos (O que é?)',
EDUCATE_PROBLEM_SOLUTION = 'Educar: Consciência de problema e solução',
NEWS_TRENDS = 'Educar: Análise de Notícia ou Tendência (Newsjacking)',

// VENDA E CONVERSÃO
SELL_DIRECT = 'Vender: Oferta Direta (Hard Sell)',
SELL_INDIRECT = 'Vender: Oferta Indireta / Soft Sell',
SELL_LAUNCH = 'Vender: Aquecimento e Pré-venda (Lançamento)',
SELL_LEAD_CAPTURE = 'Vender: Captura de Leads (Isca Digital)',
RELATIONSHIP_OBJECTION = 'Vender: Quebra de Objeções',
PRODUCT_SHOWCASE = 'Vender: Demonstração de Produto / Unboxing',

// ENGAJAMENTO E EMOÇÃO
ENGAGE_VIRAL = 'Engajar: Viralização e Topo de Funil',
ENGAGE_INTERACTION = 'Engajar: Gerar comentários e polêmica',
ENGAGE_COMMUNITY = 'Engajar: Senso de comunidade e tribo',
INSPIRE_MOTIVATION = 'Engajar: Inspirar, Motivar e Reflexão',

// EVENTOS E CONVITES
EVENT_INVITE = 'Convite: Live, Webinar ou Evento',

// AUTORIDADE E BRANDING
AUTHORITY_STORY = 'Autoridade: História de origem e Jornada',
AUTHORITY_PROOF = 'Autoridade: Estudos de caso e Prova social',
BRAND_MANIFESTO = 'Branding: Manifesto da Marca (Nossos Valores)',
RELATIONSHIP_HUMANIZE = 'Conexão: Humanizar a marca / Bastidores',

// ESTRATÉGIA E LONGO PRAZO
ACQUISITION_TRAFFIC = 'Tráfego: Levar pessoas para outro canal',
STRATEGY_DOCUMENT = 'Estratégia: Documentar a jornada (Vlog/Diário)',
STRATEGY_ASSET = 'Estratégia: Criar ativo de longo prazo (Evergreen/SEO)',

}

export enum VideoNiche {
// NEGÓCIOS, CARREIRA E FINANÇAS
MARKETING_DIGITAL = 'Marketing Digital e Branding',
ENTREPRENEURSHIP = 'Empreendedorismo e Gestão de Negócios',
FINANCE_INVESTMENTS = 'Finanças Pessoais e Investimentos',
CAREER_CORPORATE = 'Carreira, Liderança e Mundo Corporativo',
SALES_NEGOTIATION = 'Vendas, Persuasão e Negociação',
LEGAL_LAW = 'Direito, Legislação e Casos Jurídicos',
REAL_ESTATE = 'Mercado Imobiliário e Corretagem',
AGRO_BUSINESS = 'Agronegócio, Vida no Campo e Pecuária',

// DESENVOLVIMENTO, MENTE E ESPÍRITO
PERSONAL_DEVELOPMENT = 'Desenvolvimento Pessoal e Produtividade',
PSYCHOLOGY_MENTAL_HEALTH = 'Psicologia, Comportamento e Saúde Mental',
RELATIONSHIPS = 'Relacionamentos, Namoro e Vida Social',
SPIRITUALITY = 'Espiritualidade, Religião e Filosofia',
COMMUNICATION = 'Comunicação, Oratória e Carisma',

// SAÚDE, ESTILO DE VIDA E LAZER
HEALTH_FITNESS = 'Saúde, Nutrição, Treino e Bem-estar',
LIFESTYLE_TRAVEL = 'Lifestyle, Viagens, Turismo e Rotina',
BEAUTY_FASHION = 'Beleza, Moda, Estilo e Maquiagem',
GASTRONOMY = 'Gastronomia, Culinária e Receitas',
PARENTING_FAMILY = 'Maternidade, Paternidade e Família',
PETS_ANIMALS = 'Pets, Veterinária e Mundo Animal',
HOME_DECOR_DIY = 'Casa, Decoração, Reformas e DIY',

// TECNOLOGIA, CIÊNCIAS E MOTORES
TECHNOLOGY_GAMES = 'Tecnologia, Gadgets, Inovação e Games',
AUTOMOTIVE = 'Automotivo, Carros e Mecânica',
SCIENCE_CURIOSITIES = 'Ciência, Curiosidades e Fatos Interessantes',
PROGRAMMING_DEV = 'Programação, Desenvolvimento e TI',

// EDUCAÇÃO, CULTURA E ENTRETENIMENTO
KIDS_CONTENT = 'Conteúdo Infantil, Lúdico e Educativo',
EDUCATION_LANGUAGES = 'Educação Acadêmica, Escolar e Idiomas',
NEWS_POLITICS = 'Notícias, Política, Economia e Atualidades',
ARTS_CULTURE = 'Artes, Música, Cinema, Livros e Séries',
SPORTS_COMMENTARY = 'Esportes, Notícias Esportivas e Comentários',

}

export enum VideoFormat {

  RATIO_9_16 = 'Vertical (9:16) - Reels, TikTok, Shorts e Stories',
  RATIO_16_9 = 'Horizontal (16:9) - YouTube Padrão, Vídeo de Vendas e TV',
  RATIO_1_1 = 'Quadrado (1:1) - Feed Instagram, Facebook e LinkedIn',
  RATIO_4_5 = 'Retrato (4:5) - Feed Instagram (Ocupa mais tela que o quadrado)'

}

export enum VideoStyle {
// AUTORIDADE E PROFISSIONALISMO
PROFESSIONAL_FORMAL = 'Formal e Corporativo (Sério e Polido)',
TECHNICAL_ANALYTICAL = 'Técnico e Analítico (Baseado em dados)',
DIPLOMATIC_NEUTRAL = 'Diplomático e Neutro (Jornalístico)',
ASSERTIVE_PERSUASIVE = 'Assertivo e Persuasivo (Focado em convencer)',

// CONEXÃO E RELACIONAMENTO
CASUAL_CONVERSATIONAL = 'Casual e Conversacional (Papo de amigo)',
EMPATHETIC_WELCOMING = 'Empático e Acolhedor (Suave e compreensivo)',
AUTHENTIC_RAW = 'Espontâneo e Autêntico (Sem filtros)',
YOUTH_MODERN = 'Jovem, Gírias e Moderno (Gen Z/Alpha)',

// EDUCAÇÃO E ENSINO
DIDACTIC_TEACHER = 'Didático e Professoral (Explicação simples)',
MENTOR_GUIDE = 'Tom de Mentor (Sábio e Orientador)',
ACADEMIC_RESEARCHER = 'Acadêmico e Erudito (Vocabulário complexo)',

// EMOÇÃO E ENTRETENIMENTO
HUMOROUS_WITTY = 'Bem-humorado, Divertido e Sarcástico',
INSPIRATIONAL_MOTIVATIONAL = 'Inspirador e Motivacional (High Energy)',
CONTROVERSIAL_BOLD = 'Polêmico, Provocativo e Opinião Forte',
NARRATIVE_STORYTELLER = 'Narrativo e Envolvente (Estilo Contador de Histórias)',
PLAYFUL_CHILDREN = 'Lúdico e Infantil (Para crianças)',

// RITMO (Instrução de cadência para a IA)
FAST_DYNAMIC = 'Dinâmico e Rápido (Cortes rápidos/TikTok)',
SLOW_REFLECTIVE = 'Calmo, Lento e Reflexivo (ASMR/Relax)',

}

export enum AwarenessLevel {
UNAWARE = 'Nível 1: Inconsciente (Alheio ao problema)',
PROBLEM_AWARE = 'Nível 2: Consciente do Problema (Sente a dor)',
SOLUTION_AWARE = 'Nível 3: Consciente da Solução (Busca opções)',
PRODUCT_AWARE = 'Nível 4: Consciente do Produto (Consideração)',
MOST_AWARE = 'Nível 5: Totalmente Consciente (Decisão)',
}

export enum SocialPlatform {
  INSTAGRAM_REELS = 'Instagram Reels',
  INSTAGRAM_STORIES = 'Instagram Stories',
  TIKTOK = 'TikTok',
  KWAI = 'Kwai',
  YOUTUBE = 'YouTube',
  YOUTUBE_SHORTS = 'YouTube Shorts',
  LINKEDIN = 'LinkedIn',
  FACEBOOK_VIDEO = 'Facebook Vídeo',
  PINTEREST_VIDEO = 'Pinterest Vídeo'
}

export enum TargetLanguage {
  PT_BR = 'pt-br',
  PT_PT = 'pt-pt',
  EN_US = 'en-us',
  EN_UK = 'en-uk',
  ES_LATAM = 'es-latam',
  FR = 'fr',
  DE = 'de',
  IT = 'it'
}

export enum AudienceSegment {
// TRIBOS DIGITAIS E HOBBIES
AUDIENCE_GAMERS_GEEKS = 'Gamers, Geeks e Cultura Pop',
AUDIENCE_TECH_EARLY_ADOPTERS = 'Tech Enthusiasts e Early Adopters (Amantes de Tecnologia)',
AUDIENCE_DIY_MAKERS = 'Makers, DIY e Artesãos (Faça Você Mesmo)',
AUDIENCE_FITNESS_BIOHACKERS = 'Rat de Academia e Biohackers (Alta Performance Física)',
AUDIENCE_FOODIES = 'Foodies e Amantes da Gastronomia',

// ESTILO DE VIDA E COMPORTAMENTO
AUDIENCE_MINIMALISTS = 'Minimalistas e Essencialistas',
AUDIENCE_DIGITAL_NOMADS = 'Nômades Digitais e Viajantes',
AUDIENCE_SPIRITUAL_SEEKERS = 'Buscadores de Espiritualidade e Autoconhecimento',
AUDIENCE_ACTIVISTS = 'Ativistas Sociais e Sustentabilidade',

// PERFIL DE CONSUMO
AUDIENCE_LUXURY = 'Consumidores de Luxo e Alto Padrão (Premium)',
AUDIENCE_BARGAIN_HUNTERS = 'Caçadores de Ofertas e Custo-Benefício',

// ETAPAS DE VIDA E GERAÇÕES
AUDIENCE_GEN_Z = 'Geração Z (Nativos Digitais)',
AUDIENCE_SENIORS = 'Seniors e Terceira Idade (Digitais ou não)',
AUDIENCE_PARENTS = 'Pais e Mães (Maternidade/Paternidade)',
AUDIENCE_STUDENTS = 'Estudantes e Universitários',

// PROFISSIONAL
AUDIENCE_ENTREPRENEURS = 'Empreendedores e Donos de Negócio',
AUDIENCE_CORPORATE = 'Carreira Corporativa e Executivos',
AUDIENCE_CREATORS = 'Criadores de Conteúdo e Influencers',
AUDIENCE_INVESTORS = 'Investidores e Mercado Financeiro',

}

export interface ScriptBlock {
  title: string;
  content: string;
}

export interface Chapter {
  timestamp: string;
  label: string;
}

export interface GeneratorParams {
  topic: string;
  niche: VideoNiche;
  goal: VideoGoal;
  audienceSegment: AudienceSegment;
  awarenessLevel: AwarenessLevel;
  platform: SocialPlatform;
  targetLanguage: TargetLanguage;
  format: VideoFormat;
  style: VideoStyle;
  targetDurationSeconds: number;
}

// --- COPYWRITER TYPES ---

export enum CopyNiche {
MARKETING_DIGITAL = 'Marketing Digital e Branding',
ENTREPRENEURSHIP = 'Empreendedorismo e Gestão de Negcios',
FINANCE_INVESTMENTS = 'Finanças Pessoais e Investimentos',
CAREER_CORPORATE = 'Carreira, Liderança e Mundo Corporativo',
SALES_NEGOTIATION = 'Vendas, Persuasão e Negociação',
LEGAL_LAW = 'Direito, Legislação e Casos Jurídicos',
REAL_ESTATE = 'Mercado Imobiliário e Corretagem',
AGRO_BUSINESS = 'Agronegócio, Vida no Campo e Pecuária',
PERSONAL_DEVELOPMENT = 'Desenvolvimento Pessoal e Produtividade',
PSYCHOLOGY_MENTAL_HEALTH = 'Psicologia, Comportamento e Saúde Mental',
RELATIONSHIPS = 'Relacionamentos, Namoro e Vida Social',
SPIRITUALITY = 'Espiritualidade, Religião e Filosofia',
COMMUNICATION = 'Comunicação, Oratória e Carisma',
HEALTH_FITNESS = 'Saúde, Nutrição, Treino e Bem-estar',
LIFESTYLE_TRAVEL = 'Lifestyle, Viagens, Turismo e Rotina',
BEAUTY_FASHION = 'Beleza, Moda, Estilo e Maquiagem',
GASTRONOMY = 'Gastronomia, Culinária e Receitas',
PARENTING_FAMILY = 'Maternidade, Paternidade e Família',
PETS_ANIMALS = 'Pets, Veterinária e Mundo Animal',
HOME_DECOR_DIY = 'Casa, Decoração, Reformas e DIY',
TECHNOLOGY_GAMES = 'Tecnologia, Gadgets, Inovação e Games',
AUTOMOTIVE = 'Automotivo, Carros e Mecânica',
SCIENCE_CURIOSITIES = 'Ciência, Curiosidades e Fatos Interessantes',
PROGRAMMING_DEV = 'Programação, Desenvolvimento e TI',
KIDS_CONTENT = 'Conteúdo Infantil, Lúdico e Educativo',
EDUCATION_LANGUAGES = 'Educação Acadêmica, Escolar e Idiomas',
NEWS_POLITICS = 'Notícias, Política, Economia e Atualidades',
ARTS_CULTURE = 'Artes, Música, Cinema, Livros e Séries',
SPORTS_COMMENTARY = 'Esportes, Notícias Esportivas e Comentários',
}

export enum CopyObjective {
EDUCATE_TUTORIAL = 'Educar: Tutorial prático ou Passo a passo',
EDUCATE_CONCEPT = 'Educar: Explicar conceitos técnicos (O que é?)',
EDUCATE_PROBLEM_SOLUTION = 'Educar: Consciência de problema e solução',
NEWS_TRENDS = 'Educar: Análise de Notícia ou Tendência (Newsjacking)',
SELL_DIRECT = 'Vender: Oferta Direta (Hard Sell)',
SELL_INDIRECT = 'Vender: Oferta Indireta / Soft Sell',
SELL_LAUNCH = 'Vender: Aquecimento e Pré-venda (Lançamento)',
SELL_LEAD_CAPTURE = 'Vender: Captura de Leads (Isca Digital)',
RELATIONSHIP_OBJECTION = 'Vender: Quebra de Objeções',
PRODUCT_SHOWCASE = 'Vender: Demonstração de Produto / Unboxing',
ENGAGE_VIRAL = 'Engajar: Viralização e Topo de Funil',
ENGAGE_INTERACTION = 'Engajar: Gerar comentários e polêmica',
ENGAGE_COMMUNITY = 'Engajar: Senso de comunidade e tribo',
INSPIRE_MOTIVATION = 'Engajar: Inspirar, Motivar e Reflexão',
EVENT_INVITE = 'Convite: Live, Webinar ou Evento',
AUTHORITY_STORY = 'Autoridade: História de origem e Jornada',
AUTHORITY_PROOF = 'Autoridade: Estudos de caso e Prova social',
BRAND_MANIFESTO = 'Branding: Manifesto da Marca (Nossos Valores)',
RELATIONSHIP_HUMANIZE = 'Conexão: Humanizar a marca / Bastidores',
ACQUISITION_TRAFFIC = 'Tráfego: Levar pessoas para outro canal',
STRATEGY_DOCUMENT = 'Estratégia: Documentar a jornada (Vlog/Diário)',
STRATEGY_ASSET = 'Estratégia: Criar ativo de longo prazo (Evergreen/SEO)',
}

export enum CopyTone {
PROFESSIONAL_FORMAL = 'Formal e Corporativo (Sério e Polido)',
TECHNICAL_ANALYTICAL = 'Técnico e Analítico (Baseado em dados)',
DIPLOMATIC_NEUTRAL = 'Diplomático e Neutro (Jornalístico)',
ASSERTIVE_PERSUASIVE = 'Assertivo e Persuasivo (Focado em convencer)',
CASUAL_CONVERSATIONAL = 'Casual e Conversacional (Papo de amigo)',
EMPATHETIC_WELCOMING = 'Empático e Acolhedor (Suave e compreensivo)',
AUTHENTIC_RAW = 'Espontâneo e Autêntico (Sem filtros)',
YOUTH_MODERN = 'Jovem, Gírias e Moderno (Gen Z/Alpha)',
DIDACTIC_TEACHER = 'Didático e Professoral (Explicação simples)',
MENTOR_GUIDE = 'Tom de Mentor (Sábio e Orientador)',
ACADEMIC_RESEARCHER = 'Acadêmico e Erudito (Vocabulário complexo)',
HUMOROUS_WITTY = 'Bem-humorado, Divertido e Sarcástico',
INSPIRATIONAL_MOTIVATIONAL = 'Inspirador e Motivacional (High Energy)',
CONTROVERSIAL_BOLD = 'Polêmico, Provocativo e Opinião Forte',
NARRATIVE_STORYTELLER = 'Narrativo e Envolvente (Estilo Contador de Histórias)',
PLAYFUL_CHILDREN = 'Lúdico e Infantil (Para crianças)',
FAST_DYNAMIC = 'Dinâmico e Rápido (Cortes rápidos/TikTok)',
SLOW_REFLECTIVE = 'Calmo, Lento e Reflexivo (ASMR/Relax)',
}

export enum PersonalityDegree {
  FIRST_PERSON = '1ª Pessoa (Eu/Nós) - Opinião e Vivência',
  SECOND_PERSON = '2ª Pessoa (Você) - Instrucional e Conversa Direta',
  THIRD_PERSON = '3ª Pessoa (Ele/Eles/Fatos) - Jornalístico e Neutro'
}

export enum LanguageComplexity {
  ELI5 = 'ELI5: Explique como se eu tivesse 5 anos (Linguagem Universal)',
  CONVERSATIONAL = 'Conversacional: Nível de blog/jornal (Médio)',
  PROFESSIONAL = 'Corporativo/Técnico: Uso de jargões permitidos',
  ACADEMIC = 'Acadêmico/Denso: Estrutura complexa e vocabulário rico'
}

export enum CopyStructure {

  // Leitura Profunda e Imersiva
  CONTINUOUS = 'Texto Corrido / Ensaio: Parágrafos completos e narrativa fluida (Ideal para Medium/Blog)',
  
  // Leitura Rápida e Dinâmica
  SCANNABLE = 'Escaneável: Frases curtas, espaçamento duplo e uso de tópicos (Ideal para LinkedIn/Redes)',
  
  // Conexão Pessoal
  DIRECT_CONVERSATION = 'Conversa Direta: Estilo "Carta Aberta" ou E-mail (Foco no "Eu" e "Tu/Você")',
  
  // Narrativa
  STORYTELLING = 'Storytelling: Narrativa cronológica com conflito e resolução',
  
  // Autoridade Lógica
  OPINION_ARTICLE = 'Artigo de Opinião: Estrutura lógica de Tese > Argumentos > Conclusão'

}

export enum CopyFramework {
  AIDA_TEXT = 'AIDA: Atenção > Interesse > Desejo > Ação (Vendas)',
  PAS_TEXT = 'PAS: Problema > Agitação > Solução (Dor)',
  HERO_JOURNEY_MICRO = 'Jornada do Herói Simplificada (Storytelling)',
  BEFORE_AFTER_BRIDGE = 'BAB: Antes > Depois > A Ponte (Transformação)',
  LISTICLE = 'Lista Numerada ou Bullets (Alta escaneabilidade)',
  TLDR_SUMMARY = 'TL;DR: Resumo no topo + Explicação detalhada (Estilo Reddit/Tech)',
  CONTRARIAN_TAKE = 'Opinião Impopular: Crença comum > Por que está errada > Minha visão',
  HACK_REVEAL = 'O Segredo: Promessa > O "Pulo do Gato" > Como aplicar',
  THESIS_ANTITHESIS = 'Dialética: Tese > Antítese > Síntese (Argumentativo)',
  STEP_BY_STEP_GUIDE = 'Guia Passo a Passo Lógico'
}

export enum DominantEmotion {
  LOGIC_RATIONAL = 'Racional: Focado em lógica, dados e fatos (Sem emoção)',
  URGENCY_FOMO = 'Urgência/FOMO: Medo de perder, oportunidade (Venda)',
  EMPATHY_SUPPORT = 'Empatia: Acolhimento, validação e vulnerabilidade',
  ANGER_INDIGNATION = 'Indignação: "Isso precisa mudar" (Gera debate)',
  NOSTALGIA = 'Nostalgia: "Bons tempos", memórias e conexão',
  INSPIRATION = 'Inspiração: Otimismo e Motivação'
}

export enum CopyLanguage {
  PT_BR = 'pt-br',
  PT_PT = 'pt-pt',
  EN_US = 'en-us',
  EN_UK = 'en-uk',
  ES_LATAM = 'es-latam',
  FR = 'fr',
  DE = 'de',
  IT = 'it'
}

export enum CopyLength {
  W100 = '100 palavras',
  W200 = '200 palavras',
  W300 = '300 palavras',
  W500 = '500 palavras',
  W750 = '750 palavras'
}

export interface CopywriterParams {
  subject: string;
  targetAudience: string;
  niche: CopyNiche;
  awareness: AwarenessLevel;
  objective: CopyObjective;
  platformFormat: string;
  tone: CopyTone;
  personality: PersonalityDegree;
  complexity: LanguageComplexity;
  structure: CopyStructure;
  framework: CopyFramework;
  emotion: DominantEmotion;
  language: CopyLanguage;
  length: CopyLength;
}

export interface AIResponse {
  script: {
    hook: string;
    intro: string;
    block1: ScriptBlock;
    block2: ScriptBlock;
    block3: ScriptBlock;
    cta: string;
  };
  seo: {
    titles: string[];
    description: string;
    tags: string[];
    chapters: Chapter[];
  };
  marketData: {
    rpm: string;
    cpc: string;
    searchVolume: string;
  };
}

export interface CopyResponse {
  content: string;
  seoAnalysis: {
    suggestedTitle: string;
    metaDescription: string;
    keywordsUsed: string[];
    readabilityScore: string;
  };
}

// --- HISTÓRICO PERSISTENTE ---

export interface HistoryItem<T, P> {
  userId: string;
  timestamp: string;
  params: P;
  content: T;
  origin: 'ESCRITÓRIO' | 'PALAVRAS-CHAVE' | 'COPYWRITER';
}

export interface ScriptHistoryItem extends HistoryItem<AIResponse, GeneratorParams> {}
export interface KeywordHistoryItem extends HistoryItem<KeywordAnalysisResponse, KeywordSearchParams> {}
export interface CopyHistoryItem extends HistoryItem<CopyResponse, CopywriterParams> {}

// --- KEYWORD RESEARCH TYPES ---

export type SearchIntent = 'TOPO DE FUNIL' | 'MEIO DE FUNIL' | 'FUNDO DE FUNIL' | 'COMPARAÇÕES';

export interface KeywordMetric {
  keyword: string;
  volume: string;
  cpc: string;
  difficulty: number;
  intent: SearchIntent;
}

export interface YouTubeWin {
  keyword: string;
  potential: 'Viral' | 'Alto CPM' | 'Nicho Gold';
  competition: 'Baixa' | 'Média' | 'Alta';
  estimatedRPM: string;
}

export interface KeywordAnalysisResponse {
  funnel: {
    topo: KeywordMetric[];
    meio: KeywordMetric[];
    fundo: KeywordMetric[];
    comparacoes: KeywordMetric[];
  };
  youtubeWins: YouTubeWin[];
  paa: {
    category: string;
    questions: string[];
  }[];
  summary: string;
}

export interface KeywordSearchParams {
  seed: string;
  region: 'BR' | 'US' | 'Global';
  platform: 'Google' | 'YouTube' | 'Both';
}

// --- AUTH & FINANCE TYPES ---

export type UserRole = 'user' | 'admin';
export type PlatformLanguage = 'pt-br' | 'en-us' | 'es-es';
export type UserStatus = 'active' | 'blocked';
export type PaymentType = 'monthly' | 'yearly' | 'extra';

export interface CreditCard {
  id: string;
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  isDefault: boolean;
}

export interface BillingEntry {
  id: string;
  userId: string;
  timestamp: string;
  amount: number;
  credits: number;
  type: PaymentType;
  method: 'pix' | 'card';
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  credits: number;
  language: PlatformLanguage;
  cards: CreditCard[];
  subscriptionType: 'monthly' | 'yearly' | 'none';
  generationCount: number;
  phone?: string;
  createdAt: string;
  status: UserStatus;
}

export interface AppState {
  users: User[];
  currentUser: User | null;
  globalLogs: { userId: string; timestamp: string; topic: string }[];
  billingHistory: BillingEntry[];
}
