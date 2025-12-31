
export enum VideoGoal {
  EDUCATE_CONCEPT = 'Educar: explicar conceitos',
  EDUCATE_STEP_BY_STEP = 'Educar: passo a passo',
  EDUCATE_TUTORIAL = 'Educar: tutorial prático',
  EDUCATE_AWARENESS = 'Educar: gerar consciência',
  EDUCATE_PROBLEM_SOLUTION = 'Educar: resolver problemas',
  SELL_DIRECT = 'Vender: oferta direta',
  SELL_INDIRECT = 'Vender: oferta indireta',
  SELL_PRE_SALE = 'Vender: pré-venda',
  SELL_UPSELL = 'Vender: upsell / cross-sell',
  SELL_LEAD_CAPTURE = 'Vender: captura de leads',
  ENGAGE_INTERACTION = 'Engajar: gerar comentários',
  ENGAGE_RETENTION = 'Engajar: aumentar retenção',
  ENGAGE_COMMUNITY = 'Engajar: criar comunidade',
  ENGAGE_BELONGING = 'Engajar: senso de pertencimento',
  ENGAGE_VIRAL = 'Engajar: alcance e viralização',
  AUTHORITY_POSITIONING = 'Autoridade: posicionamento',
  AUTHORITY_PROOF = 'Autoridade: prova social',
  AUTHORITY_CASES = 'Autoridade: estudos de caso',
  AUTHORITY_TRUST = 'Autoridade: gerar confiança',
  AUTHORITY_BRAND = 'Autoridade: reforço de marca',
  ACQUISITION_DISCOVERY = 'Aquisição: atrair novos seguidores',
  ACQUISITION_TRAFFIC = 'Aquisição: gerar tráfego',
  ACQUISITION_SUBSCRIBE = 'Aquisição: inscrições no canal',
  RELATIONSHIP_HUMANIZE = 'Relacionamento: humanizar marca',
  RELATIONSHIP_DIALOGUE = 'Relacionamento: abrir diálogo',
  RELATIONSHIP_OBJECTION = 'Relacionamento: quebrar objeções',
  PERFORMANCE_TEST = 'Performance: testar formatos',
  PERFORMANCE_FEEDBACK = 'Performance: coletar feedback',
  PERFORMANCE_VALIDATION = 'Performance: validar ideias',
  STRATEGY_PORTFOLIO = 'Estratégia: construir portfólio',
  STRATEGY_DOCUMENT = 'Estratégia: documentar jornada',
  STRATEGY_ASSET = 'Estratégia: criar ativo de longo prazo'
}

export enum VideoNiche {
  EDUCATION_DIDACTIC = 'Educação e explicações didáticas',
  CURRENT_AFFAIRS = 'Opinião e comentários sobre atualidades',
  PODCASTS_DEBATE = 'Podcasts em vídeo / mesas de debate',
  PERSONAL_DEVELOPMENT = 'Desenvolvimento pessoal',
  PSYCHOLOGY_BEHAVIOR = 'Psicologia e comportamento humano',
  PERSONAL_FINANCE = 'Finanças pessoais e investimentos',
  ENTREPRENEURSHIP = 'Empreendedorismo e negócios digitais',
  DIGITAL_MARKETING = 'Marketing digital',
  STORYTELLING = 'Storytelling e narrativas pessoais',
  LIFESTYLE_VLOGS = 'Vlogs de rotina e lifestyle',
  PROFESSIONAL_EDUCATION = 'Conteúdo educativo para profissionais',
  HUMOR_STANDUP = 'Humor autoral e stand-up',
  ANALYSIS_REVIEWS = 'Análises e críticas aprofundadas',
  TECHNOLOGY_OPINION = 'Tecnologia com opinião e testes',
  TEACHERS_CLASSES = 'Aulas autorais e professores',
  CAREER_MARKET = 'Carreira e mercado de trabalho',
  RELATIONSHIPS_SOCIAL = 'Relacionamentos e vida social',
  SPIRITUALITY_PHILOSOPHY = 'Espiritualidade e filosofia de vida',
  PRODUCTIVITY_TIME = 'Produtividade e gestão do tempo',
  MENTAL_HEALTH = 'Saúde mental e bem-estar emocional',
  FINANCIAL_EDUCATION = 'Educação financeira para iniciantes',
  COMMUNICATION_SPEAKING = 'Comunicação e oratória',
  PRACTICAL_SKILLS = 'Ensino de habilidades práticas',
  LEGAL_CONTENT = 'Conteúdo jurídico e análises de casos',
  MENTORSHIP_COACHING = 'Mentoria e aconselhamento profissional',
  SALES_NEGOTIATION = 'Vendas e negociação',
  CREATOR_ECONOMY = 'Economia dos criadores de conteúdo'
}

export enum VideoFormat {
  VERTICAL = '9:16',
  SQUARE = '1:1',
  HORIZONTAL = '16:9'
}

export enum VideoStyle {
  FORMAL = 'Formal',
  CASUAL = 'Casual',
  FUNNY = 'Divertido',
  DYNAMIC = 'Dinâmico',
  INFORMATIVE = 'Informativo',
  CREATIVE = 'Criativo',
  FRIENDLY = 'Amigável',
  DIPLOMATIC = 'Diplomático',
  CONFIDENT = 'Confiante',
  ACADEMIC = 'Acadêmico',
  CHILDREN = 'Infantil',
  INSPIRATIONAL = 'Inspirador',
  MOTIVATIONAL = 'Motivacional',
  EMOTIONAL = 'Emocional',
  EMPATHETIC = 'Empático',
  SERIOUS = 'Sério',
  CONTROVERSIAL = 'Provocativo',
  PERSUASIVE = 'Persuasivo',
  ASSERTIVE = 'Assertivo',
  EDUCATIONAL = 'Educacional',
  DIDACTIC = 'Didático',
  STRATEGIC = 'Estratégico',
  PROFESSIONAL = 'Profissional',
  STORYTELLING = 'Narrativo / Storytelling',
  DOCUMENTARY = 'Documental',
  CONVERSATIONAL = 'Conversacional',
  INTERVIEW = 'Entrevista',
  MONOLOGUE = 'Monólogo',
  FAST_PACED = 'Rápido e direto',
  SLOW_PACED = 'Calmo e reflexivo',
  MINIMALIST = 'Minimalista',
  RAW = 'Espontâneo / Sem edição pesada',
  OPINIONATED = 'Opinativo',
  NEUTRAL = 'Neutro',
  ANALYTICAL = 'Analítico',
  TECHNICAL = 'Técnico',
  INSTITUTIONAL = 'Institucional',
  YOUTH = 'Jovem',
  CORPORATE = 'Corporativo',
  EDUCATOR = 'Professoral',
  MENTOR = 'Mentoria'
}

export enum AwarenessLevel {
  UNAWARE = 'Inconsciente',
  PROBLEM_AWARE = 'Consciente do problema',
  SOLUTION_AWARE = 'Consciente da solução',
  PRODUCT_AWARE = 'Consciente do produto',
  TOTALLY_AWARE = 'Totalmente consciente e comprando'
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
  BEGINNERS = 'Público amplo',
  INTERMEDIATE = 'Intermediários',
  ADVANCED = 'Avançados',
  PROFESSIONALS = 'Profissionais',
  ENTREPRENEURS = 'Empreendedores',
  STUDENTS = 'Estudantes',
  CREATORS = 'Criadores de conteúdo',
  EXECUTIVES = 'Executivos',
  FREELANCERS = 'Freelancers',
  SMALL_BIZ = 'Pequenos empresários'
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
  EDUCATION_DIDACTIC = 'Educação e explicações didáticas',
  CURRENT_AFFAIRS = 'Opinião e comentários sobre atualidades',
  PODCASTS_DEBATE = 'Podcasts em vídeo / mesas de debate',
  PERSONAL_DEVELOPMENT = 'Desenvolvimento pessoal',
  PSYCHOLOGY_BEHAVIOR = 'Psicologia e comportamento humano',
  PERSONAL_FINANCE = 'Finanças pessoais e investimentos',
  ENTREPRENEURSHIP = 'Empreendedorismo e negócios digitais',
  DIGITAL_MARKETING = 'Marketing digital',
  STORYTELLING = 'Storytelling e narrativas pessoais',
  LIFESTYLE_VLOGS = 'Vlogs de rotina e lifestyle',
  PROFESSIONAL_EDUCATION = 'Conteúdo educativo para profissionais',
  HUMOR_STANDUP = 'Humor autoral e stand-up',
  ANALYSIS_REVIEWS = 'Análises e críticas aprofundadas',
  TECHNOLOGY_OPINION = 'Tecnologia com opinião e testes',
  TEACHERS_CLASSES = 'Aulas autorais e professores',
  CAREER_MARKET = 'Carreira e mercado de trabalho',
  RELATIONSHIPS_SOCIAL = 'Relacionamentos e vida social',
  SPIRITUALITY_PHILOSOPHY = 'Espiritualidade e filosofia de vida',
  PRODUCTIVITY_TIME = 'Produtividade e gestão do tempo',
  MENTAL_HEALTH = 'Saúde mental e bem-estar emocional',
  FINANCIAL_EDUCATION = 'Educação financeira para iniciantes',
  COMMUNICATION_SPEAKING = 'Comunicação e oratória',
  PRACTICAL_SKILLS = 'Ensino de habilidades práticas',
  LEGAL_CONTENT = 'Conteúdo jurídico e análises de casos',
  MENTORSHIP_COACHING = 'Mentoria e aconselhamento profissional',
  SALES_NEGOTIATION = 'Vendas e negociação',
  CREATOR_ECONOMY = 'Economia dos criadores de conteúdo'
}

export enum CopyObjective {
  EDUCATE_CONCEPT = 'Educar: explicar conceitos',
  EDUCATE_STEP_BY_STEP = 'Educar: passo a passo',
  EDUCATE_TUTORIAL = 'Educar: tutorial prático',
  EDUCATE_AWARENESS = 'Educar: gerar consciência',
  EDUCATE_PROBLEM_SOLUTION = 'Educar: resolver problemas',
  SELL_DIRECT = 'Vender: oferta direta',
  SELL_INDIRECT = 'Vender: oferta indireta',
  SELL_PRE_SALE = 'Vender: pré-venda',
  SELL_UPSELL = 'Vender: upsell / cross-sell',
  SELL_LEAD_CAPTURE = 'Vender: captura de leads',
  ENGAGE_INTERACTION = 'Engajar: gerar comentários',
  ENGAGE_RETENTION = 'Engajar: aumentar retenção',
  ENGAGE_COMMUNITY = 'Engajar: criar comunidade',
  ENGAGE_BELONGING = 'Engajar: senso de pertencimento',
  ENGAGE_VIRAL = 'Engajar: alcance e viralização',
  AUTHORITY_POSITIONING = 'Autoridade: posicionamento',
  AUTHORITY_PROOF = 'Autoridade: prova social',
  AUTHORITY_CASES = 'Autoridade: estudos de caso',
  AUTHORITY_TRUST = 'Autoridade: gerar confiança',
  AUTHORITY_BRAND = 'Autoridade: reforço de marca',
  ACQUISITION_DISCOVERY = 'Aquisição: atrair novos seguidores',
  ACQUISITION_TRAFFIC = 'Aquisição: gerar tráfego',
  ACQUISITION_SUBSCRIBE = 'Aquisição: inscrições no canal',
  RELATIONSHIP_HUMANIZE = 'Relacionamento: humanizar marca',
  RELATIONSHIP_DIALOGUE = 'Relacionamento: abrir diálogo',
  RELATIONSHIP_OBJECTION = 'Relacionamento: quebrar objeções',
  PERFORMANCE_TEST = 'Performance: testar formatos',
  PERFORMANCE_FEEDBACK = 'Performance: coletar feedback',
  PERFORMANCE_VALIDATION = 'Performance: validar ideias',
  STRATEGY_PORTFOLIO = 'Estratégia: construir portfólio',
  STRATEGY_DOCUMENT = 'Estratégia: documentar jornada',
  STRATEGY_ASSET = 'Estratégia: criar ativo de longo prazo'
}

export enum HumanizationLevel {
  VERY_NATURAL = 'Muito natural (conversacional)',
  BALANCED = 'Natural equilibrado',
  FORMAL = 'Formal humanizado',
  DIRECT = 'Objetivo e direto'
}

export enum CopyTone {
  EDUCATIVE = 'Educativo',
  CONSULTATIVE = 'Consultivo',
  AUTHORITY = 'Autoridade',
  INSPIRATIONAL = 'Inspirador',
  PROVOCATIVE = 'Provocativo',
  EMPATHETIC = 'Empático',
  COMMERCIAL_SUBTLE = 'Comercial sutil',
  COMMERCIAL_DIRECT = 'Comercial direto',
  FORMAL = 'Formal',
  CASUAL = 'Casual',
  FUNNY = 'Divertido',
  DYNAMIC = 'Dinâmico',
  INFORMATIVE = 'Informativo',
  CREATIVE = 'Criativo',
  FRIENDLY = 'Amigável',
  DIPLOMATIC = 'Diplomático',
  CONFIDENT = 'Confiante',
  ACADEMIC = 'Acadêmico',
  CHILDREN = 'Infantil',
  INSPIRATIONAL = 'Inspirador',
  MOTIVATIONAL = 'Motivacional',
  EMOTIONAL = 'Emocional',
  EMPATHETIC = 'Empático',
  SERIOUS = 'Sério',
  CONTROVERSIAL = 'Provocativo',
  PERSUASIVE = 'Persuasivo',
  ASSERTIVE = 'Assertivo',
  EDUCATIONAL = 'Educacional',
  DIDACTIC = 'Didático',
  STRATEGIC = 'Estratégico',
  PROFESSIONAL = 'Profissional',
  STORYTELLING = 'Narrativo / Storytelling',
  DOCUMENTARY = 'Documental',
  CONVERSATIONAL = 'Conversacional',
  INTERVIEW = 'Entrevista',
  MONOLOGUE = 'Monólogo',
  FAST_PACED = 'Rápido e direto',
  SLOW_PACED = 'Calmo e reflexivo',
  MINIMALIST = 'Minimalista',
  RAW = 'Espontâneo / Sem edição pesada',
  OPINIONATED = 'Opinativo',
  NEUTRAL = 'Neutro',
  ANALYTICAL = 'Analítico',
  TECHNICAL = 'Técnico',
  INSTITUTIONAL = 'Institucional',
  YOUTH = 'Jovem',
  CORPORATE = 'Corporativo',
  EDUCATOR = 'Professoral',
  MENTOR = 'Mentoria'
}

export enum PersonalityDegree {
  IMPERSOAL = 'Impessoal',
  SEMI_PERSONAL = 'Semi-pessoal',
  PERSONAL = 'Pessoal',
  VERY_PERSONAL = 'Muito pessoal'
}

export enum LanguageComplexity {
  SIMPLE = 'Simples',
  ACCESSIBLE = 'Acessível',
  TECHNICAL_MODERATE = 'Técnico moderado',
  TECHNICAL_ADVANCED = 'Técnico avançado'
}

export enum CopyStructure {
  CONTINUOUS = 'Texto corrido',
  SCANNABLE = 'Escaneável',
  DIRECT_CONVERSATION = 'Conversa direta',
  STORYTELLING = 'Storytelling',
  OPINION_ARTICLE = 'Artigo de opinião'
}

export enum CopyFramework {
  AIDA = 'AIDA (Atenção, Interesse, Desejo, Ação)',
  PAS = 'PAS (Problema, Agitação, Solução)',
  BAB = 'BAB (Antes, Depois, Ponte)',
  FAB = 'FAB (Características, Vantagens, Benefícios)',
  FOUR_PS = "4P's (Picture, Promise, Proof, Push)"
}

export enum DominantEmotion {
  TRUST = 'Confiança',
  CURIOSITY = 'Curiosidade',
  URGENCY = 'Urgência',
  EMPATHY = 'Empatia',
  AUTHORITY = 'Autoridade',
  ENTHUSIASM = 'Entusiasmo',
  SOBRIETY = 'Sobriedade'
}

export enum OriginalityDegree {
  SAFE = 'Seguro',
  MODERATELY_CREATIVE = 'Moderadamente criativo',
  CREATIVE = 'Criativo',
  BOLD = 'Ousado'
}

export enum PersuasionDegree {
  INFORMATIVE = 'Informativo',
  LIGHTLY_PERSUASIVE = 'Levemente persuasivo',
  PERSUASIVE = 'Persuasivo',
  HIGHLY_PERSUASIVE = 'Altamente persuasivo'
}

export enum CopyLanguage {
  PORTUGUESE = 'Português',
  ENGLISH = 'Inglês',
  SPANISH = 'Espanhol'
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
  humanization: HumanizationLevel;
  tone: CopyTone;
  personality: PersonalityDegree;
  complexity: LanguageComplexity;
  structure: CopyStructure;
  framework: CopyFramework;
  emotion: DominantEmotion;
  originality: OriginalityDegree;
  persuasion: PersuasionDegree;
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
