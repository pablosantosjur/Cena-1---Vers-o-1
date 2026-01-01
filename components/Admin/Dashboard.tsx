import React from 'react';
import { authStore } from '../../store';
import { User, UserRole, UserStatus, BillingEntry } from '../../types';
import { notify } from '../Shared/Toast';

export const AdminDashboard: React.FC = () => {
  const [state, setState] = React.useState(authStore.getState());
  const [activeTab, setActiveTab] = React.useState<'users' | 'reports'>('users');
  const [search, setSearch] = React.useState('');
  const [displayLimit, setDisplayLimit] = React.useState(15);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  // Form states for Create/Edit
  const [formData, setFormData] = React.useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'user' as UserRole,
    credits: 0,
    status: 'active' as UserStatus
  });

  const refreshLocalState = () => {
    setState({ ...authStore.getState() });
  };

  React.useEffect(() => {
    const interval = setInterval(refreshLocalState, 1000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: '',
        phone: user.phone || '',
        role: user.role,
        credits: user.credits,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'user',
        credits: 5,
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      authStore.adminEditUser(editingUser.id, {
        fullName: formData.fullName,
        phone: formData.phone.replace(/\D/g, ''),
        role: formData.role,
        credits: formData.credits,
        password: formData.password || undefined
      });
      if (formData.status !== editingUser.status) {
        authStore.toggleUserStatus(editingUser.id);
      }
      notify('Usuário atualizado com sucesso!');
    } else {
      const result = authStore.adminCreateUser({
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        pass: formData.password || '123456',
        phone: formData.phone.replace(/\D/g, ''),
        role: formData.role,
        credits: formData.credits
      });
      if (result.success) {
        notify('Novo cineasta cadastrado!');
      } else {
        notify(result.message || 'Erro ao cadastrar', 'error');
        return;
      }
    }
    refreshLocalState();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const currentAdminId = authStore.getState().currentUser?.id;
    
    if (id === currentAdminId) {
      notify('Segurança: Você não pode excluir sua própria conta enquanto estiver logado.', 'error');
      return;
    }

    if (confirm('Atenção: Esta ação removerá este usuário permanentemente. Deseja continuar?')) {
      authStore.deleteUser(id);
      refreshLocalState();
      notify('Usuário removido com sucesso.', 'info');
      setIsModalOpen(false);
      setEditingUser(null);
    }
  };

  const filteredUsers = state.users
    .filter(u => 
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const displayedUsers = filteredUsers.slice(0, displayLimit);

  const last15Days = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  const billingHistory = state.billingHistory || [];
  
  const recentHistory = billingHistory.filter(b => new Date(b.timestamp) > last15Days);
  const recentMonthlyPlans = recentHistory.filter(b => b.type === 'monthly');
  const recentExtraCredits = recentHistory.filter(b => b.type === 'extra');

  const extraCreditsTotal = recentExtraCredits.reduce((acc, curr) => acc + curr.credits, 0);
  const extraRevenueTotal = recentExtraCredits.reduce((acc, curr) => acc + curr.amount, 0);

  // Fix: Explicitly type the accumulator and add missing 'yearly' property to handle all PaymentType values.
  const userRevenueMap = billingHistory.reduce((acc: Record<string, any>, b) => {
    if (!acc[b.userId]) {
      acc[b.userId] = { total: 0, count: 0, types: { monthly: 0, extra: 0, yearly: 0 } };
    }
    acc[b.userId].total += b.amount;
    acc[b.userId].count += 1;
    acc[b.userId].types[b.type] += 1;
    return acc;
  }, {} as Record<string, any>);

  const topUsers = Object.entries(userRevenueMap)
    .map(([userId, stats]: [string, any]) => {
      const user = state.users.find(u => u.id === userId);
      return {
        id: userId,
        username: user?.username || 'Deletado',
        email: user?.email || 'N/A',
        totalSpent: stats.total,
        purchaseCount: stats.count,
        predominant: stats.types.monthly + (stats.types.yearly || 0) >= stats.types.extra ? 'Plano' : 'Avulso'
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 20);

  const isEditingSelf = editingUser?.id === state.currentUser?.id;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#F1F1F1] tracking-tighter">Administração</h2>
          <div className="flex mt-3 space-x-6">
             <button 
              onClick={() => setActiveTab('users')}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'users' ? 'border-[#FF0000] text-[#FF0000]' : 'border-transparent text-[#AAAAAA]'}`}
             >
               Cineastas
             </button>
             <button 
              onClick={() => setActiveTab('reports')}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'reports' ? 'border-[#FF0000] text-[#FF0000]' : 'border-transparent text-[#AAAAAA]'}`}
             >
               Relatórios
             </button>
          </div>
        </div>
        {activeTab === 'users' && (
          <button 
            onClick={() => openModal()}
            className="w-full md:w-auto bg-[#FF0000] hover:bg-[#CC0000] text-white font-black px-6 py-4 md:py-5 rounded-xl text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#FF0000]/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            Novo Usuário
          </button>
        )}
      </div>

      {activeTab === 'users' ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <AdminStatCard label="Total" value={state.users.length.toString()} color="text-[#F1F1F1]" />
            <AdminStatCard label="Planos (15d)" value={recentMonthlyPlans.length.toString()} color="text-[#FF0000]" />
            <AdminStatCard label="Recargas" value={recentExtraCredits.length.toString()} color="text-emerald-500" />
            <AdminStatCard label="Receita" value={`R$ ${recentHistory.reduce((a, b) => a + b.amount, 0).toFixed(0)}`} color="text-emerald-400" />
          </div>

          <div className="bg-[#272727] rounded-2xl md:rounded-3xl border border-[#3F3F3F] shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-[#3F3F3F] flex flex-col md:flex-row justify-between items-center bg-[#0F0F0F]/30 gap-4">
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Buscar cineasta..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all"
                />
                <svg className="w-4 h-4 text-[#AAAAAA] absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest whitespace-nowrap hidden sm:inline">Exibir:</span>
                <select 
                  value={displayLimit} 
                  onChange={(e) => setDisplayLimit(Number(e.target.value))}
                  className="w-full md:w-auto bg-[#0F0F0F] border border-[#3F3F3F] rounded-lg px-3 py-2 text-[10px] md:text-xs font-bold outline-none text-[#AAAAAA]"
                >
                  <option value={15}>15 Cineastas</option>
                  <option value={25}>25 Cineastas</option>
                  <option value={50}>50 Cineastas</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[700px] md:min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#3F3F3F] bg-[#0F0F0F]/50">
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Cineasta</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Contato</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Acesso</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest text-center">Créditos</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest text-center">Status</th>
                    <th className="px-4 md:px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3F3F3F]">
                  {displayedUsers.map(u => (
                    <tr key={u.id} className="hover:bg-[#3F3F3F]/50 transition-colors group">
                      <td className="px-4 md:px-6 py-4">
                        <div className="font-bold text-[#F1F1F1] text-sm">{u.fullName}</div>
                        <div className="text-[10px] text-[#AAAAAA] font-medium lowercase truncate max-w-[150px]">@{u.username} • {u.email}</div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="text-[10px] text-[#AAAAAA] font-bold uppercase tracking-tight whitespace-nowrap">{u.phone || '—'}</div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className={`text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full border ${u.role === 'admin' ? 'bg-purple-900/30 text-purple-400 border-purple-800' : 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20'} uppercase tracking-widest`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center">
                        <span className="font-black text-emerald-500 text-sm">{u.credits}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center">
                        <span className={`text-[8px] md:text-[9px] font-black uppercase ${u.status === 'active' ? 'text-emerald-500' : 'text-[#FF0000]'}`}>
                          {u.status === 'active' ? 'Ativo' : 'Bloqueado'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right">
                        <button 
                          onClick={() => openModal(u)}
                          className="text-[9px] md:text-[10px] font-black text-[#F1F1F1] uppercase hover:bg-[#FF0000] px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all border border-[#3F3F3F] hover:border-[#FF0000] whitespace-nowrap"
                        >
                          Configurar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6 md:space-y-8 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
             <div className="bg-[#272727] p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-[#3F3F3F] shadow-sm">
                <h3 className="text-[10px] md:text-xs font-black text-[#F1F1F1] uppercase tracking-widest mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></div>
                   Planos Ativados (15 dias)
                </h3>
                <div className="flex items-center justify-between p-4 md:p-6 bg-[#0F0F0F] rounded-2xl border border-[#3F3F3F] mb-4">
                   <span className="text-[9px] md:text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Assinaturas</span>
                   <span className="text-2xl md:text-3xl font-black text-[#FF0000]">{recentMonthlyPlans.length}</span>
                </div>
                <p className="text-[9px] text-[#AAAAAA] font-medium">Processados via PIX ou Cartão.</p>
             </div>

             <div className="bg-[#272727] p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-[#3F3F3F] shadow-sm">
                <h3 className="text-[10px] md:text-xs font-black text-[#F1F1F1] uppercase tracking-widest mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   Créditos Avulsos (15 dias)
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                   <div className="p-4 bg-emerald-900/20 rounded-2xl border border-emerald-800/30">
                      <p className="text-[8px] font-black text-emerald-400 uppercase mb-1">Créditos</p>
                      <p className="text-xl md:text-2xl font-black text-emerald-500">{extraCreditsTotal}</p>
                   </div>
                   <div className="p-4 bg-[#0F0F0F] rounded-2xl border border-[#3F3F3F]">
                      <p className="text-[8px] font-black text-[#AAAAAA] uppercase mb-1">R$ Faturado</p>
                      <p className="text-xl md:text-2xl font-black text-[#F1F1F1]">{extraRevenueTotal.toFixed(0)}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-[#272727] rounded-2xl md:rounded-[2.5rem] border border-[#3F3F3F] shadow-sm overflow-hidden">
             <div className="p-6 md:p-8 border-b border-[#3F3F3F]">
                <h3 className="text-[10px] md:text-xs font-black text-[#F1F1F1] uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                   Top 20 Faturamento
                </h3>
             </div>
             <div className="overflow-x-auto w-full">
               <table className="w-full text-left border-collapse min-w-[600px]">
                 <thead>
                    <tr className="bg-[#0F0F0F]/50 border-b border-[#3F3F3F]">
                       <th className="px-6 md:px-8 py-4 text-[9px] md:text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Rank</th>
                       <th className="px-6 md:px-8 py-4 text-[9px] md:text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Cineasta</th>
                       <th className="px-6 md:px-8 py-4 text-[9px] md:text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest text-right">Total R$</th>
                       <th className="px-6 md:px-8 py-4 text-[9px] md:text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest text-center">Perfil</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#3F3F3F]">
                    {topUsers.map((u, idx) => (
                      <tr key={u.id} className="hover:bg-[#0F0F0F]/50 transition-all">
                         <td className="px-6 md:px-8 py-4 text-center">
                           <div className="w-6 h-6 rounded-full bg-[#0F0F0F] border border-[#3F3F3F] flex items-center justify-center text-[9px] font-black text-[#AAAAAA]">{idx + 1}</div>
                         </td>
                         <td className="px-6 md:px-8 py-4">
                            <div className="font-black text-[#F1F1F1] text-xs md:text-sm lowercase">@{u.username}</div>
                            <div className="text-[9px] text-[#AAAAAA] font-medium truncate max-w-[120px]">{u.email}</div>
                         </td>
                         <td className="px-6 md:px-8 py-4 font-black text-[#F1F1F1] text-xs md:text-sm text-right">R$ {u.totalSpent.toFixed(2)}</td>
                         <td className="px-6 md:px-8 py-4 text-center">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase ${u.predominant === 'Plano' ? 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20' : 'bg-emerald-900/30 text-emerald-400 border-emerald-800'}`}>
                               {u.predominant}
                            </span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {/* MODAL DE USUÁRIO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-zinc-950/70 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-[#272727] border border-[#3F3F3F] w-full max-w-lg rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl my-auto animate-in zoom-in duration-300 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-lg sm:text-2xl font-black text-[#F1F1F1] tracking-tighter uppercase leading-none">
                {editingUser ? 'Configurar' : 'Novo'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#AAAAAA] hover:text-[#FF0000] transition-colors p-2 hover:bg-[#3F3F3F] rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Nome</label>
                  <input 
                    type="text" 
                    value={formData.fullName} 
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm focus:ring-4 focus:ring-[#FF0000]/5 focus:border-[#FF0000] outline-none text-[#F1F1F1] transition-all"
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Username</label>
                  <input 
                    type="text" 
                    value={formData.username} 
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm focus:ring-4 focus:ring-[#FF0000]/5 focus:border-[#FF0000] outline-none text-[#AAAAAA] transition-all disabled:opacity-50"
                    disabled={!!editingUser}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">E-mail</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm focus:ring-4 focus:ring-[#FF0000]/5 focus:border-[#FF0000] outline-none text-[#AAAAAA] transition-all disabled:opacity-50"
                    disabled={!!editingUser}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">WhatsApp</label>
                  <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="55119..."
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm focus:ring-4 focus:ring-[#FF0000]/5 focus:border-[#FF0000] outline-none text-[#F1F1F1] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">
                  {editingUser ? 'Nova Senha (Opcional)' : 'Senha'}
                </label>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm focus:ring-4 focus:ring-[#FF0000]/5 focus:border-[#FF0000] outline-none text-[#F1F1F1] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Nível</label>
                  <select 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm outline-none text-[#F1F1F1] transition-all"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Créditos</label>
                  <input 
                    type="number" 
                    value={formData.credits} 
                    onChange={e => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm outline-none text-[#F1F1F1] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value as UserStatus})}
                    className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3 md:p-4 text-sm outline-none text-[#F1F1F1] transition-all"
                  >
                    <option value="active">Ativo</option>
                    <option value="blocked">Bloqueado</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                {editingUser && !isEditingSelf && (
                  <button 
                    type="button" 
                    onClick={() => handleDelete(editingUser.id)}
                    className="flex-1 border-2 border-[#FF0000]/20 text-[#FF0000] hover:bg-[#FF0000]/10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                  >
                    Remover
                  </button>
                )}
                <button 
                  type="submit" 
                  className={`flex-[2] bg-[#FF0000] text-white hover:bg-[#CC0000] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#FF0000]/20 active:scale-[0.98] ${isEditingSelf ? 'w-full' : ''}`}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminStatCard = ({ label, value, color }: any) => (
  <div className="bg-[#272727] p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-[#3F3F3F] shadow-sm flex flex-col justify-between">
    <p className="text-[8px] md:text-[9px] font-black text-[#AAAAAA] uppercase mb-1 tracking-[0.1em]">{label}</p>
    <p className={`text-xl md:text-2xl font-black tracking-tighter truncate ${color || 'text-[#F1F1F1]'}`}>{value}</p>
  </div>
);