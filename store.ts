
import { User, AppState, PlatformLanguage, UserRole, CreditCard, BillingEntry, PaymentType, ScriptHistoryItem, KeywordHistoryItem, AIResponse, GeneratorParams, KeywordAnalysisResponse, KeywordSearchParams } from './types';

const DB_STORAGE_KEY = 'yt_engine_db';
const SCRIPTS_HISTORY_KEY = 'cena1_scripts_history';
const KEYWORDS_HISTORY_KEY = 'cena1_keywords_history';
const SESSION_PERSISTENT_KEY = 'yt_engine_session_p';
const SESSION_VOLATILE_KEY = 'yt_engine_session_v';

const seedUsers: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    fullName: 'Administrator',
    email: 'admin@engine.com',
    passwordHash: '123456', 
    role: 'admin',
    credits: 9999,
    language: 'pt-br',
    cards: [],
    subscriptionType: 'none',
    generationCount: 0,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'user-1',
    username: 'user',
    fullName: 'Usuário Padrão',
    email: 'user@engine.com',
    passwordHash: '123456',
    role: 'user',
    credits: 2,
    language: 'pt-br',
    cards: [],
    subscriptionType: 'none',
    generationCount: 0,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  }
];

const getInitialState = (): AppState => {
  const savedDb = localStorage.getItem(DB_STORAGE_KEY);
  let db: AppState = savedDb ? JSON.parse(savedDb) : { users: [...seedUsers], currentUser: null, globalLogs: [], billingHistory: [] };
  
  seedUsers.forEach(seed => {
    if (!db.users.find(u => u.username === seed.username)) {
      db.users.push(seed);
    }
  });

  const pUserId = localStorage.getItem(SESSION_PERSISTENT_KEY);
  const vUserId = sessionStorage.getItem(SESSION_VOLATILE_KEY);
  
  const userId = pUserId || vUserId;
  if (userId) {
    db.currentUser = db.users.find(u => u.id === userId) || null;
  } else {
    db.currentUser = null;
  }

  return db;
};

let state: AppState = getInitialState();

export const saveState = () => {
  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify({
    users: state.users,
    currentUser: null,
    globalLogs: state.globalLogs,
    billingHistory: state.billingHistory || []
  }));
};

const getHistory = <T>(key: string): Record<string, T> => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : {};
};

const saveHistory = <T>(key: string, data: Record<string, T>) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const createHistoryKey = (userId: string, target: string) => {
  return `${userId}_${target.toLowerCase().trim().replace(/\s+/g, '_')}`;
};

export const authStore = {
  getState: () => state,
  
  // Cache de Escritório
  getCachedScript: (userId: string, topic: string): ScriptHistoryItem | null => {
    const history = getHistory<ScriptHistoryItem>(SCRIPTS_HISTORY_KEY);
    return history[createHistoryKey(userId, topic)] || null;
  },

  getAllUserScripts: (userId: string): ScriptHistoryItem[] => {
    const history = getHistory<ScriptHistoryItem>(SCRIPTS_HISTORY_KEY);
    return Object.values(history)
      .filter(item => item.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  saveScriptToCache: (userId: string, params: GeneratorParams, content: AIResponse) => {
    const history = getHistory<ScriptHistoryItem>(SCRIPTS_HISTORY_KEY);
    const item: ScriptHistoryItem = {
      userId,
      timestamp: new Date().toISOString(),
      params,
      content,
      origin: 'ESCRITÓRIO'
    };
    history[createHistoryKey(userId, params.topic)] = item;
    saveHistory(SCRIPTS_HISTORY_KEY, history);
  },

  // Cache de Palavras-Chave
  getCachedKeyword: (userId: string, seed: string): KeywordHistoryItem | null => {
    const history = getHistory<KeywordHistoryItem>(KEYWORDS_HISTORY_KEY);
    return history[createHistoryKey(userId, seed)] || null;
  },

  getAllUserKeywords: (userId: string): KeywordHistoryItem[] => {
    const history = getHistory<KeywordHistoryItem>(KEYWORDS_HISTORY_KEY);
    return Object.values(history)
      .filter(item => item.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  saveKeywordToCache: (userId: string, params: KeywordSearchParams, content: KeywordAnalysisResponse) => {
    const history = getHistory<KeywordHistoryItem>(KEYWORDS_HISTORY_KEY);
    const item: KeywordHistoryItem = {
      userId,
      timestamp: new Date().toISOString(),
      params,
      content,
      origin: 'PALAVRAS-CHAVE'
    };
    history[createHistoryKey(userId, params.seed)] = item;
    saveHistory(KEYWORDS_HISTORY_KEY, history);
  },

  register: (username: string, fullName: string, email: string, pass: string): { success: boolean, message?: string } => {
    if (state.users.find(u => u.username === username || u.email === email)) {
      return { success: false, message: 'Username ou e-mail já existe.' };
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      fullName,
      email,
      passwordHash: pass,
      role: 'user',
      credits: 2, 
      language: 'pt-br',
      cards: [],
      subscriptionType: 'none',
      generationCount: 0,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    state.users.push(newUser);
    state.currentUser = newUser;
    sessionStorage.setItem(SESSION_VOLATILE_KEY, newUser.id);
    saveState();
    return { success: true };
  },

  recoverPassword: (email: string): { success: boolean; message: string; pass?: string } => {
    const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      return { 
        success: true, 
        message: 'Um e-mail de recuperação foi enviado para ' + email,
        pass: user.passwordHash 
      };
    }
    return { success: false, message: 'E-mail não encontrado em nossa base.' };
  },

  adminCreateUser: (data: { username: string, fullName: string, email: string, pass: string, role: UserRole, credits: number, phone?: string }): { success: boolean, message?: string } => {
    if (state.users.find(u => u.username === data.username || u.email === data.email)) {
      return { success: false, message: 'Username ou e-mail já existe.' };
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.pass,
      role: data.role,
      credits: data.credits || 2,
      phone: data.phone,
      language: 'pt-br',
      cards: [],
      subscriptionType: 'none',
      generationCount: 0,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    state.users.push(newUser);
    saveState();
    return { success: true };
  },

  adminEditUser: (userId: string, data: { fullName: string, phone?: string, role: UserRole, credits: number, password?: string }) => {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      user.fullName = data.fullName;
      user.phone = data.phone;
      user.role = data.role;
      user.credits = data.credits;
      if (data.password) {
        user.passwordHash = data.password;
      }
      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
      }
      saveState();
    }
  },

  login: (identity: string, pass: string, rememberMe: boolean = false): boolean => {
    const user = state.users.find(u => (u.username === identity || u.email === identity) && u.passwordHash === pass);
    if (user) {
      if (user.status === 'blocked') {
         return false;
      }
      state.currentUser = user;
      if (rememberMe) {
        localStorage.setItem(SESSION_PERSISTENT_KEY, user.id);
        sessionStorage.removeItem(SESSION_VOLATILE_KEY);
      } else {
        sessionStorage.setItem(SESSION_VOLATILE_KEY, user.id);
        localStorage.removeItem(SESSION_PERSISTENT_KEY);
      }
      saveState();
      return true;
    }
    return false;
  },

  logout: () => {
    state.currentUser = null;
    localStorage.removeItem(SESSION_PERSISTENT_KEY);
    sessionStorage.removeItem(SESSION_VOLATILE_KEY);
    saveState();
  },

  updateProfile: (fullName: string, phone?: string, newPass?: string) => {
    if (!state.currentUser) return;
    const user = state.users.find(u => u.id === state.currentUser?.id);
    if (user) {
      user.fullName = fullName;
      if (phone !== undefined) user.phone = phone;
      if (newPass) {
        user.passwordHash = newPass;
        localStorage.removeItem(SESSION_PERSISTENT_KEY);
        sessionStorage.removeItem(SESSION_VOLATILE_KEY);
        state.currentUser = null;
      } else {
        state.currentUser = { ...user };
      }
      saveState();
    }
  },

  toggleUserStatus: (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'active' ? 'blocked' : 'active';
      if (state.currentUser?.id === userId && user.status === 'blocked') {
        authStore.logout();
      }
      saveState();
    }
  },

  updateLanguage: (lang: PlatformLanguage) => {
    if (!state.currentUser) return;
    const user = state.users.find(u => u.id === state.currentUser?.id);
    if (user) {
      user.language = lang;
      state.currentUser = { ...user };
      saveState();
    }
  },

  consumeCredit: (topic: string) => {
    if (!state.currentUser) return;
    const user = state.users.find(u => u.id === state.currentUser?.id);
    if (user && user.credits > 0) {
      user.credits -= 1;
      user.generationCount += 1;
      state.globalLogs.push({ userId: user.id, timestamp: new Date().toISOString(), topic });
      state.currentUser = { ...user };
      saveState();
    }
  },

  addCredits: (userId: string, amount: number, amountPaid: number, type: PaymentType, method: 'pix' | 'card') => {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      user.credits += amount;
      if (type === 'monthly') user.subscriptionType = 'monthly';
      if (type === 'yearly') user.subscriptionType = 'yearly';
      
      const entry: BillingEntry = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        timestamp: new Date().toISOString(),
        amount: amountPaid,
        credits: amount,
        type,
        method
      };
      if (!state.billingHistory) state.billingHistory = [];
      state.billingHistory.push(entry);

      if (state.currentUser?.id === userId) state.currentUser = { ...user };
      saveState();
    }
  },

  setRole: (userId: string, role: UserRole) => {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      user.role = role;
      if (state.currentUser?.id === userId) state.currentUser = { ...user };
      saveState();
    }
  },

  deleteUser: (userId: string) => {
    state.users = state.users.filter(u => u.id !== userId);
    if (state.currentUser?.id === userId) {
      state.currentUser = null;
      localStorage.removeItem(SESSION_PERSISTENT_KEY);
      sessionStorage.removeItem(SESSION_VOLATILE_KEY);
    }
    saveState();
  },

  addCard: (card: Omit<CreditCard, 'id' | 'isDefault'>) => {
    if (!state.currentUser) return;
    const user = state.users.find(u => u.id === state.currentUser?.id);
    if (user) {
      const newCard = { ...card, id: Math.random().toString(36).substr(2, 9), isDefault: user.cards.length === 0 };
      user.cards.push(newCard);
      state.currentUser = { ...user };
      saveState();
    }
  },

  removeCard: (cardId: string) => {
    if (!state.currentUser) return;
    const user = state.users.find(u => u.id === state.currentUser?.id);
    if (user) {
      const wasDefault = user.cards.find(c => c.id === cardId)?.isDefault;
      user.cards = user.cards.filter(c => c.id !== cardId);
      if (wasDefault && user.cards.length > 0) {
        user.cards[0].isDefault = true;
      }
      state.currentUser = { ...user };
      saveState();
    }
  },

  setDefaultCard: (cardId: string) => {
    if (!state.currentUser) return;
    const user = state.users.find(u => u.id === state.currentUser?.id);
    if (user) {
      user.cards.forEach(c => c.isDefault = c.id === cardId);
      state.currentUser = { ...user };
      saveState();
    }
  }
};
