
import React from 'react';
import { User, PlatformLanguage, CreditCard as CreditCardType, PaymentType } from '../../types';
import { authStore } from '../../store';
import { notify } from '../Shared/Toast';

export const Profile: React.FC<{ user: User }> = ({ user }) => {
  const [fullName, setFullName] = React.useState(user.fullName);
  const [phone, setPhone] = React.useState(user.phone || '');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [lang, setLang] = React.useState<PlatformLanguage>(user.language);
  
  const [showBillingModal, setShowBillingModal] = React.useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = React.useState<'card' | 'pix' | null>(null);
  const [showCardModal, setShowCardModal] = React.useState(false);

  const [extraCredits, setExtraCredits] = React.useState(5); 
  const unitPrice = 5.00;
  const rawTotal = extraCredits * unitPrice;
  const hasVolumeDiscount = extraCredits > 10;
  const discountRate = hasVolumeDiscount ? 0.10 : 0;
  const extraTotal = rawTotal * (1 - discountRate);

  const [cardNumber, setCardNumber] = React.useState('');
  const [cardHolder, setCardHolder] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvv, setCardCvv] = React.useState('');

  const [pendingCredits, setPendingCredits] = React.useState(0);
  const [pendingPrice, setPendingPrice] = React.useState(0);
  const [paymentType, setPaymentType] = React.useState<PaymentType>('extra');

  // Subscription cycle toggle
  const [subCycle, setSubCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      notify('As senhas não coincidem.', 'error');
      return;
    }
    const isChangingPassword = !!newPassword;
    authStore.updateProfile(fullName, phone, newPassword || undefined);
    
    if (isChangingPassword) {
      notify('Senha alterada. Faça login novamente.', 'info');
    } else {
      notify('Perfil atualizado com sucesso!');
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.addCard({ number: cardNumber, holder: cardHolder, expiry: cardExpiry, cvv: cardCvv });
    setShowCardModal(false);
    resetCardForm();
    notify('Cartão adicionado com sucesso!');
  };

  const resetCardForm = () => {
    setCardNumber(''); setCardHolder(''); setCardExpiry(''); setCardCvv('');
  };

  const initiatePayment = (credits: number, price: number, type: PaymentType, method: 'card' | 'pix') => {
    setPendingCredits(credits);
    setPendingPrice(price);
    setPaymentType(type);
    setShowPaymentFlow(method);
  };

  const confirmPayment = () => {
    setTimeout(() => {
      authStore.addCredits(user.id, pendingCredits, pendingPrice, paymentType, showPaymentFlow!);
      notify(`Sucesso! ${pendingCredits} créditos adicionados.`, 'success');
      setShowPaymentFlow(null);
      setShowBillingModal(false);
    }, 1500);
  };

  const handleDeleteCard = (id: string) => {
    if (confirm('Deseja realmente remover este cartão?')) {
      authStore.removeCard(id);
      notify('Cartão removido com sucesso.', 'info');
    }
  };

  const handleSetDefault = (id: string) => {
    authStore.setDefaultCard(id);
    notify('Cartão principal atualizado.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#272727] border border-[#3F3F3F] p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center text-[#FF0000]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Seu Perfil Cena1
          </h3>
          <form onSubmit={handleUpdate} className="space-y-4">
             <div className="space-y-1">
              <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Username</label>
              <input type="text" value={user.username} disabled className="w-full bg-[#0F0F0F] border border-[#3F3F3F] text-[#AAAAAA] rounded-xl p-3.5 text-sm cursor-not-allowed" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">E-mail</label>
              <input type="text" value={user.email} disabled className="w-full bg-[#0F0F0F] border border-[#3F3F3F] text-[#AAAAAA] rounded-xl p-3.5 text-sm cursor-not-allowed" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Nome Completo</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3.5 text-sm focus:ring-1 focus:ring-[#FF0000] outline-none text-[#F1F1F1]" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">WhatsApp (Opcional)</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="Ex: 5511999999999" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3.5 text-sm focus:ring-1 focus:ring-[#FF0000] outline-none text-[#F1F1F1]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Nova Senha</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3.5 text-sm focus:ring-1 focus:ring-[#FF0000] outline-none text-[#F1F1F1]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">Confirmar</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl p-3.5 text-sm focus:ring-1 focus:ring-[#FF0000] outline-none text-[#F1F1F1]" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition-all mt-4">Atualizar Perfil</button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-[#272727] border border-[#3F3F3F] p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm">
           <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4 sm:gap-0">
             <div>
               <h3 className="text-xl font-bold mb-1 text-[#F1F1F1]">Central Financeira</h3>
               <p className="text-[#AAAAAA] text-xs uppercase font-black tracking-widest">Seu Saldo Atual</p>
             </div>
             <div className="text-left sm:text-right">
                <span className="text-3xl md:text-4xl font-black text-[#FF0000]">{user.credits} <small className="text-xs text-[#AAAAAA] uppercase">créditos</small></span>
             </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#FF0000]/5 p-6 rounded-2xl border border-[#FF0000]/10">
                <h4 className="text-[#FF0000] font-bold text-sm mb-4 uppercase tracking-widest text-[10px]">Créditos & Ofertas</h4>
                <button onClick={() => setShowBillingModal(true)} className="w-full bg-[#FF0000] text-white font-black py-4 rounded-xl text-xs uppercase hover:bg-[#CC0000] transition-all shadow-lg shadow-[#FF0000]/10">Recarregar Agora</button>
              </div>
              <div className="bg-[#F1F1F1]/5 p-6 rounded-2xl border border-[#F1F1F1]/10">
                <h4 className="text-[#F1F1F1] font-bold text-sm mb-4 uppercase tracking-widest text-[10px]">Meios de Pagamento</h4>
                <button onClick={() => setShowCardModal(true)} className="w-full bg-[#F1F1F1]/10 text-[#F1F1F1] font-bold py-4 rounded-xl text-xs uppercase hover:bg-[#F1F1F1]/20 transition-all shadow-lg"> + Novo Cartão</button>
              </div>
           </div>

           {user.cards.length > 0 && (
             <div className="space-y-3">
               <h4 className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-[0.2em] mb-2">Cartões Salvos</h4>
               {user.cards.map(c => (
                 <div key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0F0F0F] p-4 rounded-xl border border-[#3F3F3F] group hover:border-[#FF0000]/20 transition-all gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-[#272727] rounded border border-[#3F3F3F] flex items-center justify-center text-[8px] font-black text-[#AAAAAA] uppercase">CARD</div>
                      <div>
                        <p className="text-sm font-bold text-[#F1F1F1]">**** **** **** {c.number.slice(-4)}</p>
                        <p className="text-[10px] text-[#AAAAAA] uppercase font-black">{c.holder}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                       {c.isDefault ? (
                         <span className="text-[8px] font-black bg-[#FF0000]/10 text-[#FF0000] px-2 py-0.5 rounded-full border border-[#FF0000]/20">PRINCIPAL</span>
                       ) : (
                         <button onClick={() => handleSetDefault(c.id)} className="text-[8px] font-black text-[#AAAAAA] hover:text-[#FF0000] uppercase transition-colors">Usar para Recorrência</button>
                       )}
                       <button onClick={() => handleDeleteCard(c.id)} className="p-1.5 text-[#3F3F3F] hover:text-[#FF0000] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                       </button>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

      {showBillingModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-[#272727] border border-[#3F3F3F] w-full max-w-4xl rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-14 my-4 sm:my-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative">
             <button onClick={() => setShowBillingModal(false)} className="absolute top-4 right-4 sm:top-8 sm:right-8 text-[#AAAAAA] hover:text-[#FF0000] transition-all z-20 p-2 hover:bg-[#3F3F3F] rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>

             <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block px-4 py-1.5 bg-[#FF0000]/10 text-[#FF0000] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Loja Cena1 • Performance YouTube</div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 text-[#F1F1F1] tracking-tighter leading-[1.1]">Turbine seu Canal Agora</h2>
                <p className="text-[#AAAAAA] text-sm md:text-base font-medium max-w-xl mx-auto px-4">Escolha a carga de roteiros ideal para sua frequência de postagem e domine os algoritmos.</p>
             </div>

             <div className="space-y-8 sm:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                   <div className="bg-[#0F0F0F] border-[3px] border-[#FF0000] p-6 sm:p-8 md:p-10 rounded-[2.5rem] relative group shadow-[0_20px_40px_rgba(255,0,0,0.1)] flex flex-col items-center text-center transition-all hover:scale-[1.01]">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF0000] text-[#F1F1F1] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest z-10 shadow-lg whitespace-nowrap">
                        Mais Procurado
                      </div>
                      <div className="mb-6 mt-4 sm:mt-0">
                        <span className="text-[#AAAAAA] text-[11px] font-black uppercase tracking-widest block mb-2">Carga Intensiva</span>
                        <h4 className="font-black text-2xl sm:text-3xl uppercase tracking-tighter text-[#F1F1F1] leading-none">10 CRÉDITOS</h4>
                      </div>
                      <div className="mb-6 sm:mb-8 space-y-1">
                        <div className="flex items-center justify-center gap-2">
                           <span className="text-[#AAAAAA] text-sm font-bold line-through">R$ 50,00</span>
                           <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F1F1F1] tracking-tighter">R$ 42,50</span>
                        </div>
                        <p className="text-[#FF0000] text-[10px] font-black uppercase tracking-widest">15% de Desconto • Único</p>
                      </div>
                      <ul className="text-xs sm:text-sm space-y-4 mb-8 sm:mb-10 text-[#AAAAAA] w-full text-left bg-[#272727] p-5 sm:p-8 rounded-[1.75rem] border border-[#3F3F3F]">
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#FF0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Use os créditos com roteiros e buscas de palavras-chave</li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#FF0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Economia imediata no pacote</li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#FF0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Saldo vitalício acumulativo</li>
                      </ul>
                      <div className="grid grid-cols-2 gap-3 w-full">
                        <button onClick={() => initiatePayment(10, 42.5, 'extra', 'card')} className="bg-[#FF0000] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#CC0000] transition-all active:scale-95 shadow-md">
                          Cartão
                        </button>
                        <button onClick={() => initiatePayment(10, 42.5, 'extra', 'pix')} className="bg-[#0F0F0F] border-2 border-[#FF0000] text-[#FF0000] py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#FF0000]/5 transition-all active:scale-95">
                          PIX
                        </button>
                      </div>
                   </div>

                   <div className="bg-[#0F0F0F] border-2 border-[#3F3F3F] p-6 sm:p-8 md:p-10 rounded-[2.5rem] flex flex-col items-center text-center relative shadow-inner transition-all hover:scale-[1.01]">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F1F1F1] text-[#0F0F0F] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest z-10 shadow-lg whitespace-nowrap">
                        Crescimento Contínuo
                      </div>
                      
                      <div className="flex bg-[#272727] p-1.5 rounded-full mb-8 mt-4 sm:mt-0">
                         <button 
                          onClick={() => setSubCycle('monthly')}
                          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${subCycle === 'monthly' ? 'bg-[#FF0000] text-[#F1F1F1] shadow-sm' : 'text-[#AAAAAA]'}`}
                         >
                           Mensal
                         </button>
                         <button 
                          onClick={() => setSubCycle('yearly')}
                          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${subCycle === 'yearly' ? 'bg-[#FF0000] text-[#F1F1F1] shadow-sm' : 'text-[#AAAAAA]'}`}
                         >
                           Anual (-15% OFF)
                         </button>
                      </div>

                      <div className="mb-6">
                        <span className="text-[#AAAAAA] text-[11px] font-black uppercase tracking-widest block mb-2">Plano Criador Pro</span>
                        <h4 className="font-black text-2xl sm:text-3xl uppercase tracking-tighter text-[#F1F1F1] leading-none">
                          {subCycle === 'monthly' ? 'ASSINATURA' : 'PLANO ANUAL'}
                        </h4>
                      </div>
                      <div className="mb-6 sm:mb-8 space-y-1">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F1F1F1] tracking-tighter">
                          {subCycle === 'monthly' ? 'R$ 37,00' : 'R$ 377,00'}
                        </span>
                        <p className="text-[#FF0000] text-[10px] font-black uppercase tracking-widest">
                          {subCycle === 'monthly' ? 'Cobrança Mensal' : 'Pagamento Único Anual'}
                        </p>
                      </div>
                      <ul className="text-xs sm:text-sm space-y-4 mb-8 sm:mb-10 text-[#AAAAAA] w-full text-left bg-[#272727] p-5 sm:p-8 rounded-[1.75rem] border border-[#3F3F3F]">
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#FF0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> 
                          {subCycle === 'monthly' ? '10 novos créditos mensais' : '120 créditos, sai menos de R$ 3,15/cada'}
                        </li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#FF0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Suporte prioritário</li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#FF0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Saldo vitalício acumulativo</li>
                      </ul>
                      
                      <div className={`grid ${subCycle === 'monthly' ? 'grid-cols-1' : 'grid-cols-2'} gap-3 w-full`}>
                        <button 
                          onClick={() => initiatePayment(subCycle === 'monthly' ? 10 : 120, subCycle === 'monthly' ? 37 : 377, subCycle, 'card')} 
                          className="bg-[#FF0000] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#CC0000] transition-all active:scale-[0.98] shadow-md"
                        >
                          Cartão
                        </button>
                        {subCycle === 'yearly' && (
                          <button 
                            onClick={() => initiatePayment(120, 377, 'yearly', 'pix')} 
                            className="bg-[#0F0F0F] border-2 border-[#F1F1F1]/20 text-[#F1F1F1] py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#F1F1F1]/5 transition-all active:scale-95"
                          >
                            PIX
                          </button>
                        )}
                      </div>
                   </div>
                </div>

                <div className="bg-[#0F0F0F] border border-[#3F3F3F] p-6 sm:p-10 md:p-14 rounded-[2.5rem] sm:rounded-[3.5rem] relative overflow-hidden">
                   <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
                      <div className="text-center md:text-left">
                        <h4 className="font-black text-2xl sm:text-3xl uppercase tracking-tighter text-[#F1F1F1]">Adicione mais créditos</h4>
                        <p className="text-[#AAAAAA] text-[11px] uppercase font-black tracking-widest mt-2">Ajuste conforme sua demanda de postagens</p>
                      </div>
                      <div className="text-center md:text-right flex flex-col items-center md:items-end w-full md:w-auto">
                        <div className="flex items-center gap-3 mb-1 justify-center md:justify-end">
                          {hasVolumeDiscount && <span className="text-[11px] font-black text-[#FF0000] uppercase bg-[#FF0000]/10 px-4 py-1.5 rounded-full border border-[#FF0000]/20">-10% OFF</span>}
                          <span className="text-4xl sm:text-5xl font-black text-[#F1F1F1] tracking-tighter">R$ {extraTotal.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <span className="text-[#AAAAAA] text-[10px] font-black uppercase tracking-widest">Valor total a investir</span>
                      </div>
                   </div>

                   <div className="relative mb-12 sm:mb-14 px-1 sm:px-2">
                     <input 
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={extraCredits}
                      onChange={(e) => setExtraCredits(parseInt(e.target.value))}
                      className="w-full h-4 bg-[#3F3F3F] rounded-full appearance-none cursor-pointer accent-[#FF0000] transition-all"
                     />
                     <div className="flex justify-between text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mt-6">
                        <span className="bg-[#272727] px-3 py-1.5 rounded-full border border-[#3F3F3F] shadow-sm">Min: 5</span>
                        <span className="hidden sm:inline bg-[#272727] px-3 py-1.5 rounded-full border border-[#3F3F3F] shadow-sm">Média: 25</span>
                        <span className="bg-[#272727] px-3 py-1.5 rounded-full border border-[#3F3F3F] shadow-sm">Máx: 50</span>
                     </div>
                   </div>

                   <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-[#272727] p-6 sm:p-8 rounded-[2rem] border border-[#3F3F3F] gap-8 shadow-sm">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0F0F0F] rounded-2xl flex items-center justify-center text-[#FF0000] shadow-inner">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </div>
                        <div className="text-left">
                           <p className="text-2xl sm:text-3xl font-black text-[#F1F1F1] leading-none">{extraCredits} Créditos</p>
                           <p className="text-[#AAAAAA] text-[10px] uppercase font-black tracking-widest mt-1.5">Quantidade selecionada</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right px-8 md:border-l border-[#3F3F3F] w-full md:w-auto">
                         <div className="text-[11px] text-[#AAAAAA] font-black uppercase tracking-widest mb-1">Preço Unitário</div>
                         <div className="text-xl font-black text-[#F1F1F1]">R$ {unitPrice.toFixed(2).replace('.', ',')}</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <button 
                        onClick={() => initiatePayment(extraCredits, extraTotal, 'extra', 'card')}
                        className="bg-[#F1F1F1] text-[#0F0F0F] py-5 sm:py-6 rounded-[1.5rem] text-[13px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-[0.98] shadow-2xl"
                      >
                        Pagar com Cartão
                      </button>
                      <button 
                        onClick={() => initiatePayment(extraCredits, extraTotal, 'extra', 'pix')}
                        className="bg-[#FF0000]/10 border-2 border-[#FF0000]/20 text-[#FF0000] py-5 sm:py-6 rounded-[1.5rem] text-[13px] font-black uppercase tracking-widest hover:bg-[#FF0000]/20 transition-all active:scale-[0.98]"
                      >
                        Pagar via PIX
                      </button>
                   </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 pb-4">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 sm:h-5 invert" alt="Visa" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 sm:h-8" alt="Mastercard" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix_Brasil.png" className="h-4 sm:h-5" alt="PIX" />
                   <div className="hidden sm:block h-8 w-px bg-[#3F3F3F]"></div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">
                      <svg className="w-5 h-5 text-[#FF0000]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.946-2.567 9.29-6.433 11.771a.497.497 0 01-.567 0C7.135 16.29 4.568 11.946 4.568 7c0-.68.056-1.35.166-2.001a.5.5 0 01.432-.415zM10 5a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                      Transação Segura
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {(showPaymentFlow === 'card' || showPaymentFlow === 'pix') && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-zinc-950/90 backdrop-blur-2xl animate-in zoom-in duration-300 overflow-y-auto">
           <div className="bg-[#272727] border border-[#3F3F3F] w-full max-w-[460px] rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 md:p-14 shadow-2xl relative my-auto">
              <button onClick={() => setShowPaymentFlow(null)} className="absolute top-6 right-6 text-[#AAAAAA] hover:text-[#FF0000] transition-all z-20 p-2 hover:bg-[#3F3F3F] rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-[#F1F1F1] leading-none">Checkout Seguro</h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                   <div className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse"></div>
                   <span className="text-[#FF0000] text-[10px] font-black uppercase tracking-widest">Processando sua Carga</span>
                </div>
              </div>

              {showPaymentFlow === 'card' ? (
                <form onSubmit={(e) => { e.preventDefault(); confirmPayment(); }} className="space-y-6">
                  <div className="space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Número do Cartão</label>
                       <input type="text" maxLength={16} value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))} placeholder="0000 0000 0000 0000" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold placeholder:font-normal" required />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Nome Completo</label>
                       <input type="text" value={cardHolder} onChange={e => setCardHolder(e.target.value)} placeholder="COMO NO CARTÃO" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none uppercase focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold placeholder:font-normal" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Validade</label>
                        <input type="text" maxLength={5} value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/AA" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">CVV</label>
                        <input type="password" maxLength={3} value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="***" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold" required />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#FF0000] text-white py-5 sm:py-6 rounded-[1.5rem] font-black text-[14px] uppercase tracking-widest shadow-2xl shadow-[#FF0000]/30 hover:bg-[#CC0000] transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4">
                     Confirmar Pagamento • R$ {pendingPrice.toFixed(2).replace('.', ',')}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-8 sm:space-y-10">
                  <div className="inline-block p-1 bg-white rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border-4 border-[#3F3F3F] overflow-hidden">
                    <div className="p-3 sm:p-5 bg-white rounded-[2rem] sm:rounded-[2.5rem]">
                       <img src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=cena1_pix_simulated_payload" alt="PIX QR" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl sm:rounded-3xl" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-[#AAAAAA] text-[10px] uppercase font-black tracking-widest">Valor total a transferir</p>
                    <h3 className="font-black text-4xl sm:text-5xl md:text-6xl text-[#F1F1F1] tracking-tighter leading-none">R$ {pendingPrice.toFixed(2).replace('.', ',')}</h3>
                  </div>

                  <div className="space-y-4 text-left">
                    <label className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Copia e Cola PIX</label>
                    <div className="flex bg-[#0F0F0F] border-2 border-[#3F3F3F] rounded-2xl overflow-hidden group transition-all focus-within:border-[#FF0000]">
                       <input 
                        type="text" 
                        readOnly 
                        value="00020126580014BR.GOV.BCB.PIX0136cena1-pix-key-simulated-2025" 
                        className="flex-1 bg-transparent p-4 sm:p-5 text-[10px] sm:text-[11px] font-black outline-none text-[#AAAAAA] truncate" 
                       />
                       <button 
                        onClick={() => { navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136cena1-pix-key-simulated-2025"); notify("PIX Copiado!"); }}
                        className="bg-[#FF0000] px-6 sm:px-8 text-white hover:bg-[#CC0000] transition-all flex items-center justify-center active:scale-95"
                       >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                       </button>
                    </div>
                  </div>

                  <button onClick={confirmPayment} className="w-full bg-emerald-600 text-white py-5 sm:py-6 rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 transition-all active:scale-[0.98]">
                    Confirmar Envio PIX
                  </button>
                  <p className="text-[#AAAAAA] text-[10px] font-bold uppercase tracking-widest">Ativação automática em segundos após confirmação.</p>
                </div>
              )}
           </div>
        </div>
      )}

      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-[#272727] border border-[#3F3F3F] w-full max-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl my-auto">
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-[#F1F1F1] tracking-tighter uppercase leading-none">Novo Cartão</h2>
                <button onClick={() => { setShowCardModal(false); resetCardForm(); }} className="text-[#AAAAAA] hover:text-[#FF0000] transition-all p-2 hover:bg-[#3F3F3F] rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
             </div>
             <form onSubmit={handleAddCard} className="space-y-4 sm:space-y-5">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Número do Cartão</label>
                   <input type="text" maxLength={16} value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))} placeholder="0000 0000 0000 0000" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold placeholder:font-normal" required />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Titular (Como no cartão)</label>
                   <input type="text" value={cardHolder} onChange={e => setCardHolder(e.target.value)} placeholder="NOME IMPRESSO" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none uppercase focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold placeholder:font-normal" required />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">Validade</label>
                    <input type="text" maxLength={5} value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/AA" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest ml-1">CVV</label>
                    <input type="password" maxLength={3} value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="***" className="w-full bg-[#0F0F0F] border border-[#3F3F3F] rounded-xl sm:rounded-2xl py-6 px-5 text-sm outline-none focus:ring-4 focus:ring-[#FF0000]/10 focus:border-[#FF0000] text-[#F1F1F1] transition-all font-bold" required />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#FF0000] text-white py-5 sm:py-6 rounded-2xl font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-[#FF0000]/20 hover:bg-[#CC0000] transition-all active:scale-[0.98] mt-6">
                  Salvar Cartão Seguro
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};
