import React, { useState, useEffect } from 'react';
import { Language, SkipassVoucher } from '../types';
import { INITIAL_VOUCHERS, NORDIC_REGIONS, DNS_LOGO_BASE64 } from '../data/portalData';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { SecureQrCode } from './SecureQrCode';
import { VoucherPrintModal } from './VoucherPrintModal';
import { VoucherListPrintModal } from './VoucherListPrintModal';
import { 
  Ticket, 
  QrCode, 
  Printer, 
  CheckCircle2, 
  Search, 
  Plus, 
  Building2, 
  Calendar, 
  User, 
  Sparkles,
  Package,
  MapPin,
  FileText,
  Euro,
  Lock,
  LogIn,
  ShieldCheck,
  Hotel,
  Filter
} from 'lucide-react';

interface VoucherGeneratorProps {
  lang: Language;
  accessLevel: 'public' | 'partner' | 'admin';
  partnerCode: string;
  partnerName: string;
  onOpenLoginModal: () => void;
}

export const VoucherGenerator: React.FC<VoucherGeneratorProps> = ({
  lang,
  accessLevel,
  partnerCode,
  partnerName,
  onOpenLoginModal
}) => {
  // I voucher contengono dati personali e NON vengono piu salvati in localStorage.
  const [vouchers, setVouchers] = useState<SkipassVoucher[]>(INITIAL_VOUCHERS);

  // Firestore real-time sync
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'vouchers'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedVouchers: SkipassVoucher[] = [];
          snapshot.forEach((docSnap) => {
            loadedVouchers.push(docSnap.data() as SkipassVoucher);
          });
          // Sort descending by creation
          loadedVouchers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setVouchers(loadedVouchers);
        }
      },
      (error) => {
        console.warn('Firestore snapshot error, falling back to local state:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState<string>('all');
  
  // Modal states
  const [selectedModalVoucher, setSelectedModalVoucher] = useState<SkipassVoucher | null>(null);
  const [isListPrintOpen, setIsListPrintOpen] = useState<boolean>(false);

  // Category state
  const [voucherCategory, setVoucherCategory] = useState<'skipass' | 'package'>('skipass');

  // Common Form state - Pre-filled with logged-in partner if available
  const [guestName, setGuestName] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [accommodationNameState, setAccommodationNameState] = useState<string>(partnerName || 'Sporthotel Drei Zinnen');
  const [partnerCodeState, setPartnerCodeState] = useState<string>(partnerCode || '3Z-HOTEL-042');

  // Update form fields when partner props change
  useEffect(() => {
    if (partnerName) setAccommodationNameState(partnerName);
    if (partnerCode) setPartnerCodeState(partnerCode);
  }, [partnerName, partnerCode]);

  // Skipass Form state
  const [skipassType, setSkipassType] = useState<'day' | '3day' | 'weekly' | 'season' | 'taster'>('weekly');
  const [coverage, setCoverage] = useState<'dolomiti' | 'regional'>('dolomiti');
  const [selectedRegion, setSelectedRegion] = useState<string>('3zinnen');
  const [validFrom, setValidFrom] = useState<string>('2026-02-01');
  const [validTo, setValidTo] = useState<string>('2026-02-07');

  // Package Form state
  const [packageName, setPackageName] = useState<string>('Dolomiti Cross-Country Special Week');
  const [regionName, setRegionName] = useState<string>('Dolomiti Region 3 Zinnen');
  const [stayDates, setStayDates] = useState<string>('01.02.2026 - 08.02.2026');
  const [includedServices, setIncludedServices] = useState<string>('7 Pernottamenti B&B, Skipass Dolomiti NordicSki 7gg, Wax Service In-House, Transfer Piste.');
  const [packagePrice, setPackagePrice] = useState<number>(480);

  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [previewVoucher, setPreviewVoucher] = useState<SkipassVoucher | null>(null);

  // Price Calculation
  const calculateSkipassPrice = (): number => {
    let base = 35;
    if (skipassType === '3day') base = 90;
    if (skipassType === 'weekly') base = 140;
    if (skipassType === 'season') base = 260;
    if (skipassType === 'taster') base = 45;

    if (coverage === 'regional') base = Math.round(base * 0.75);
    return base * guestCount;
  };

  const handleGenerateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert(lang === 'it' ? 'Inserisci il nome del capogruppo/ospite!' : 'Bitte Gastnamen eingeben!');
      return;
    }

    const price = voucherCategory === 'package' ? packagePrice : calculateSkipassPrice();
    const newCode = voucherCategory === 'package' 
      ? `PAC-2026-${Math.floor(1000 + Math.random() * 9000)}` 
      : `DNS-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newVoucher: SkipassVoucher = {
      id: `v_${Date.now()}`,
      voucherCategory,
      voucherCode: newCode,
      guestName: guestName.trim(),
      guestCount,
      accommodationName: accommodationNameState,
      partnerCode: partnerCodeState,
      
      skipassType: voucherCategory === 'skipass' ? skipassType : undefined,
      coverage: voucherCategory === 'skipass' ? coverage : undefined,
      selectedRegion: voucherCategory === 'skipass' && coverage === 'regional' ? selectedRegion : undefined,
      
      packageName: voucherCategory === 'package' ? packageName : undefined,
      regionName: voucherCategory === 'package' ? regionName : undefined,
      stayDates: voucherCategory === 'package' ? stayDates : undefined,
      includedServices: voucherCategory === 'package' ? includedServices : undefined,

      validFrom: voucherCategory === 'skipass' ? validFrom : stayDates.split('-')[0]?.trim() || validFrom,
      validTo: voucherCategory === 'skipass' ? validTo : stayDates.split('-')[1]?.trim() || validTo,
      totalPrice: price,
      status: 'issued',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      qrCodeUrl: `https://www.dolomitinordicski.com/verify?code=${encodeURIComponent(newCode)}`,
    };

    const updated = [newVoucher, ...vouchers];
    setVouchers(updated);
    setPreviewVoucher(newVoucher);
    setIsSuccessMessage(true);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'vouchers', newVoucher.id), newVoucher);
    } catch (err) {
      console.warn('Could not save to Firestore, local state preserved:', err);
    }

    // Email notification dispatch
    fetch('/api/vouchers/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: 'info@dolomitinordicski.com',
        voucher: newVoucher
      })
    }).catch(err => {
      console.warn('Could not dispatch email endpoint:', err);
    });
  };

  // FILTERING LOGIC ACCORDING TO ACCESS LEVEL
  const displayedVouchers = vouchers.filter(v => {
    // Partner Level: ONLY show vouchers issued by THIS specific partner structure
    if (accessLevel === 'partner') {
      const matchCode = partnerCode && v.partnerCode?.toLowerCase() === partnerCode.toLowerCase();
      const matchName = partnerName && v.accommodationName?.toLowerCase() === partnerName.toLowerCase();
      if (!matchCode && !matchName) return false;
    }

    // Admin Level: Can filter by partner hotel dropdown
    if (accessLevel === 'admin' && selectedPartnerFilter !== 'all') {
      if (v.accommodationName !== selectedPartnerFilter && v.partnerCode !== selectedPartnerFilter) {
        return false;
      }
    }

    // Search query
    const q = searchQuery.toLowerCase();
    return (
      v.guestName.toLowerCase().includes(q) ||
      v.voucherCode.toLowerCase().includes(q) ||
      v.accommodationName.toLowerCase().includes(q) ||
      (v.packageName && v.packageName.toLowerCase().includes(q))
    );
  });

  // Calculate totals for active list
  const totalAmount = displayedVouchers.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
  const totalGuests = displayedVouchers.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

  // If level is public, render restricted view card
  if (accessLevel === 'public') {
    return (
      <div className="py-16 bg-slate-100 text-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-center">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#0D4D5E]/30 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0D4D5E] text-[#AAD0D1] flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase px-3.5 py-1 rounded-full bg-[#E2EFF1] text-[#0D4D5E] border border-[#82B2BD]">
                LIVELLO 1: ACCESSO PUBBLICO LIMITATO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#083845] font-['Be_Vietnam_Pro']">
                Emissione Voucher Riservata alle Strutture Partner
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
                La funzionalità di emissione voucher skipass e conferma pacchetti è riservata alle strutture ricettive accreditate Dolomiti NordicSki. Effettua il login con il tuo Codice Partner o credenziali Direzione per emettere voucher o consultare il tuo registro storico.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenLoginModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0D4D5E] hover:bg-[#083845] text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer"
              >
                <LogIn className="w-5 h-5 text-[#AAD0D1]" />
                <span>Accedi come Struttura Partner / Admin</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Hotel className="w-4 h-4 text-[#0D4D5E] mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Per gli Hotel Partner</span>
                <span>Emissione immediata alla reception per gli ospiti</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Ticket className="w-4 h-4 text-[#0D4D5E] mx-auto mb-1" />
                <span>Emissione con QR Code univoco e notifica automatica</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#0D4D5E] mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Stampa Elenchi</span>
                <span>Registro dedicato filtrato per la tua struttura</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E]/10 border border-[#0D4D5E]/30 text-[#0D4D5E] text-xs font-bold">
              <Ticket className="w-4 h-4" />
              <span>
                {accessLevel === 'admin' 
                  ? 'LIVELLO 3: PANNELLO DIREZIONE DOLOMITI NORDICSKI' 
                  : `LIVELLO 2: PORTALE PARTNER (${partnerName})`}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#083845] font-['Be_Vietnam_Pro']">
              {accessLevel === 'admin' ? 'Gestione Globale Registro Voucher' : `Gestione Voucher - ${partnerName}`}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl">
              {accessLevel === 'admin' 
                ? 'Vista completa di tutti i voucher emessi dalle strutture dell\'intero carosello. Filtra per hotel, stampa elenchi di controllo o esporta i report.'
                : 'Emetti all\'istante voucher skipass e conferme pacchetto per i tuoi ospiti. Consulta la lista esclusiva dei voucher della tua struttura e stampa l\'elenco ufficiale.'}
            </p>
          </div>

          {/* Action Header Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsListPrintOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#083845] hover:bg-[#0D4D5E] text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg transition-all cursor-pointer border border-[#82B2BD]/40"
            >
              <Printer className="w-4 h-4 text-[#AAD0D1]" />
              <span>
                {accessLevel === 'admin' ? 'Stampa Registro Generale Direzione' : 'Stampa Elenco Voucher Struttura'}
              </span>
            </button>

            {/* Sub-Tabs */}
            <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === 'create'
                    ? 'bg-[#0D4D5E] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Nuovo Voucher</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === 'history'
                    ? 'bg-[#0D4D5E] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>
                  Storico ({displayedVouchers.length})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <span className="font-bold block">
                  Voucher generato con successo! Anteprima e stampa pronte.
                </span>
                <span className="text-xs text-emerald-700 font-medium block">
                  Notifica inviata a info@dolomitinordicski.com.
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsSuccessMessage(false)}
              className="text-xs text-emerald-800 font-bold uppercase tracking-wider underline hover:text-emerald-950 ml-4 shrink-0"
            >
              Chiudi
            </button>
          </div>
        )}

        {/* CREATE TAB */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Container */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Category Switcher */}
              <div className="space-y-2 border-b border-slate-100 pb-5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#083845] block">
                  Seleziona Tipologia Emissione
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVoucherCategory('skipass')}
                    className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                      voucherCategory === 'skipass'
                        ? 'bg-[#0D4D5E] text-white border-[#0D4D5E] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Ticket className="w-5 h-5 text-[#AAD0D1]" />
                    <div>
                      <span className="font-bold text-sm block">Voucher Skipass</span>
                      <span className="text-[10px] opacity-80 block">Giornalieri, Settimanali, 1.000km</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVoucherCategory('package')}
                    className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                      voucherCategory === 'package'
                        ? 'bg-[#0D4D5E] text-white border-[#0D4D5E] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Package className="w-5 h-5 text-[#AAD0D1]" />
                    <div>
                      <span className="font-bold text-sm block">Conferma Pacchetto</span>
                      <span className="text-[10px] opacity-80 block">Pauschalen & Settimane Fondo</span>
                    </div>
                  </button>
                </div>
              </div>

              <form onSubmit={handleGenerateVoucher} className="space-y-5">
                
                {/* Accommodation Details */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#083845] flex items-center space-x-1.5">
                      <Building2 className="w-4 h-4 text-[#0D4D5E]" />
                      <span>Struttura Emittente</span>
                    </span>
                    <span className="text-[10px] font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">
                      COD: {partnerCodeState}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Nome Struttura</label>
                      <input
                        type="text"
                        value={accommodationNameState}
                        onChange={(e) => setAccommodationNameState(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold bg-white text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Codice Partner</label>
                      <input
                        type="text"
                        value={partnerCodeState}
                        onChange={(e) => setPartnerCodeState(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white text-slate-800"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Nome Ospite / Capogruppo</label>
                    <input
                      type="text"
                      placeholder="es. Mario Rossi / Fam. Schneider"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#0D4D5E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Numero Persone</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center focus:outline-none focus:border-[#0D4D5E]"
                    />
                  </div>
                </div>

                {/* DYNAMIC FIELDS PER CATEGORY */}
                {voucherCategory === 'skipass' ? (
                  /* SKIPASS FIELDS */
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Tipo Pass</label>
                        <select
                          value={skipassType}
                          onChange={(e) => setSkipassType(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-[#0D4D5E] bg-white"
                        >
                          <option value="day">Giornaliero (€35/pers)</option>
                          <option value="3day">3 Giorni (€90/pers)</option>
                          <option value="weekly">Settimanale 7gg (€140/pers)</option>
                          <option value="season">Stagionale (€260/pers)</option>
                          <option value="taster">Pomeridiano / Taster (€45/pers)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Copertura Territoriale</label>
                        <select
                          value={coverage}
                          onChange={(e) => setCoverage(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-[#0D4D5E] bg-white"
                        >
                          <option value="dolomiti">Dolomiti NordicSki (1.000 km Intero Carosello)</option>
                          <option value="regional">Regionale Singola Area (-25%)</option>
                        </select>
                      </div>
                    </div>

                    {coverage === 'regional' && (
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Seleziona Regione</label>
                        <select
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-[#0D4D5E] bg-white"
                        >
                          {NORDIC_REGIONS.map((r) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Valido Dal</label>
                        <input
                          type="date"
                          value={validFrom}
                          onChange={(e) => setValidFrom(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#0D4D5E]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Valido Al</label>
                        <input
                          type="date"
                          value={validTo}
                          onChange={(e) => setValidTo(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#0D4D5E]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* PACKAGE FIELDS */
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Nome Pacchetto / Pauschale</label>
                      <input
                        type="text"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-[#0D4D5E]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Area / Regione</label>
                        <input
                          type="text"
                          value={regionName}
                          onChange={(e) => setRegionName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#0D4D5E]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Date Soggiorno (Testo)</label>
                        <input
                          type="text"
                          value={stayDates}
                          onChange={(e) => setStayDates(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:border-[#0D4D5E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Servizi Inclusi nel Pacchetto</label>
                      <textarea
                        rows={2}
                        value={includedServices}
                        onChange={(e) => setIncludedServices(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#0D4D5E]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Prezzo Totale Pacchetto (€)</label>
                      <input
                        type="number"
                        value={packagePrice}
                        onChange={(e) => setPackagePrice(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-extrabold text-[#0D4D5E] focus:outline-none focus:border-[#0D4D5E]"
                      />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-xl cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#AAD0D1]" />
                  <span>
                    Emetti Voucher Ora (€{voucherCategory === 'package' ? packagePrice : calculateSkipassPrice()})
                  </span>
                </button>
              </form>
            </div>

            {/* Live Voucher Preview Card */}
            <div className="lg:col-span-5 bg-white border-2 border-[#0D4D5E] rounded-2xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="bg-[#083845] text-white p-4 -m-6 mb-4 flex items-center justify-between border-b border-[#417483]">
                <div className="flex items-center space-x-2">
                  <img src={DNS_LOGO_BASE64} alt="DNS Logo" className="h-7 w-auto object-contain bg-white p-0.5 rounded" />
                  <span className="font-extrabold text-xs tracking-tight">ANTEPRIMA VOUCHER LIVE</span>
                </div>
                <span className="text-[10px] font-mono font-extrabold bg-[#0D4D5E] text-[#AAD0D1] px-2 py-0.5 rounded border border-[#AAD0D1]/30">
                  {voucherCategory === 'package' ? 'PACCHETTO' : 'SKIPASS'}
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-start border-b pb-3 border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Struttura Partner</span>
                    <span className="font-extrabold text-sm text-slate-900 block">{accommodationNameState}</span>
                    <span className="text-[10px] font-mono text-slate-500">COD: {partnerCodeState}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Importo Totale</span>
                    <span className="font-black text-lg text-[#0D4D5E] block">
                      €{voucherCategory === 'package' ? packagePrice : calculateSkipassPrice()},00
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Capogruppo / Ospite</span>
                    <span className="font-extrabold text-slate-800 text-sm block">
                      {guestName || 'Nome Cognome Ospite'} ({guestCount} pers)
                    </span>
                  </div>

                  {voucherCategory === 'package' ? (
                    <div className="bg-[#0D4D5E]/5 p-3 rounded-xl border border-[#0D4D5E]/20 space-y-1">
                      <span className="text-[10px] text-[#083845] font-extrabold uppercase block">Pacchetto</span>
                      <span className="font-black text-xs text-[#0D4D5E] block">{packageName}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-700 block">{stayDates}</span>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Copertura & Date</span>
                      <span className="font-bold text-[#0D4D5E] block uppercase">
                        {coverage === 'dolomiti' ? 'Dolomiti 1.000km' : selectedRegion} ({skipassType})
                      </span>
                      <span className="font-mono text-[11px] text-slate-700 block">{validFrom} - {validTo}</span>
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Codice QR Unico</span>
                    <span className="font-mono font-black text-xs text-slate-900 block">
                      {previewVoucher ? previewVoucher.voucherCode : 'DNS-2026-LIVE'}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded border border-slate-200">
                    <SecureQrCode value={`https://www.dolomitinordicski.com/verify?code=${encodeURIComponent(previewVoucher?.voucherCode || 'DNS-2026-LIVE')}`} size={100} alt="QR Preview" className="w-full h-full object-contain" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (previewVoucher) setSelectedModalVoucher(previewVoucher);
                    else alert('Emetti prima un voucher per la stampa!');
                  }}
                  className="w-full py-3 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-colors shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#AAD0D1]" />
                  <span>Stampa Voucher Selezionato</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            
            {/* KPI Summary Cards for Admin or Partner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Voucher Emessi
                  </span>
                  <span className="text-2xl font-black text-[#0D4D5E]">
                    {displayedVouchers.length}
                  </span>
                </div>
                <Ticket className="w-8 h-8 text-[#0D4D5E]/20" />
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Ospiti Totali Serviti
                  </span>
                  <span className="text-2xl font-black text-emerald-600">
                    {totalGuests} pers
                  </span>
                </div>
                <User className="w-8 h-8 text-emerald-500/20" />
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Valore Totale Vouchers
                  </span>
                  <span className="text-2xl font-black text-[#083845]">
                    €{totalAmount},00
                  </span>
                </div>
                <Euro className="w-8 h-8 text-[#083845]/20" />
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cerca per nome ospite, voucher o codice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0D4D5E] text-slate-900"
                  />
                </div>

                {/* Admin Partner Filter */}
                {accessLevel === 'admin' && (
                  <div className="flex items-center space-x-1.5 border border-slate-200 rounded-lg p-1 bg-slate-50 text-xs">
                    <Filter className="w-3.5 h-3.5 text-[#0D4D5E] ml-1" />
                    <select
                      value={selectedPartnerFilter}
                      onChange={(e) => setSelectedPartnerFilter(e.target.value)}
                      className="bg-transparent font-bold text-slate-800 focus:outline-none text-xs"
                    >
                      <option value="all">Tutti gli Hotel Partner</option>
                      {Array.from(new Set(vouchers.map(v => v.accommodationName))).map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsListPrintOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4 text-[#AAD0D1]" />
                <span>Stampa Elenco ({displayedVouchers.length})</span>
              </button>
            </div>

            {/* Voucher Table */}
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#083845] text-white font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Codice</th>
                    <th className="py-3 px-4">Ospite / Struttura Emittente</th>
                    <th className="py-3 px-4">Pacchetto / Copertura</th>
                    <th className="py-3 px-4">Validità</th>
                    <th className="py-3 px-4">Prezzo</th>
                    <th className="py-3 px-4 text-center">Stato</th>
                    <th className="py-3 px-4 text-right">Azione</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {displayedVouchers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                        Nessun voucher trovato nel registro per i criteri selezionati.
                      </td>
                    </tr>
                  ) : (
                    displayedVouchers.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            v.voucherCategory === 'package'
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : 'bg-teal-100 text-teal-800 border border-teal-200'
                          }`}>
                            {v.voucherCategory === 'package' ? 'Pacchetto' : 'Skipass'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0D4D5E]">{v.voucherCode}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{v.guestName} ({v.guestCount}p)</span>
                          <span className="text-[10px] text-slate-500">{v.accommodationName} ({v.partnerCode})</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-800">
                          {v.voucherCategory === 'package' ? (
                            <div>
                              <span className="font-extrabold text-[#0D4D5E] block">{v.packageName}</span>
                              <span className="text-[10px] text-slate-500">{v.regionName}</span>
                            </div>
                          ) : (
                            <div>
                              <span className="font-bold uppercase">{v.coverage}</span> ({v.skipassType})
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                          {v.voucherCategory === 'package' ? v.stayDates : `${v.validFrom} - ${v.validTo}`}
                        </td>
                        <td className="py-3.5 px-4 font-black text-[#0D4D5E]">€{v.totalPrice},00</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            v.status === 'issued' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            v.status === 'redeemed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            'bg-slate-100 text-slate-600 border border-slate-300'
                          }`}>
                            {v.status === 'issued' ? 'Emesso' : v.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => setSelectedModalVoucher(v)}
                              className="px-2.5 py-1 rounded bg-[#0D4D5E] hover:bg-[#083845] text-white font-bold text-[10px] transition-colors shadow-sm flex items-center space-x-1 border border-[#0D4D5E]/50 cursor-pointer"
                            >
                              <Printer className="w-3 h-3 text-[#AAD0D1]" />
                              <span>Stampa Voucher</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* Official Voucher Print Modal */}
      {selectedModalVoucher && (
        <VoucherPrintModal
          voucher={selectedModalVoucher}
          lang={lang}
          onClose={() => setSelectedModalVoucher(null)}
        />
      )}

      {/* Official Voucher LIST / REGISTRY Print Modal */}
      {isListPrintOpen && (
        <VoucherListPrintModal
          vouchers={displayedVouchers}
          lang={lang}
          partnerName={partnerName}
          partnerCode={partnerCode}
          accessLevel={accessLevel}
          onClose={() => setIsListPrintOpen(false)}
        />
      )}

    </div>
  );
};
