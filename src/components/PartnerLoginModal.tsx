import React, { useState } from 'react';
import { Language } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { partnerSignIn, DEMO_MODE } from '../lib/firebase';
import { X, Key, Building2, CheckCircle2, ShieldCheck, Sparkles, Hotel, MapPin, AlertTriangle } from 'lucide-react';

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (partnerCode: string, partnerName: string, role: 'partner' | 'regional' | 'admin') => void;
}

export const PartnerLoginModal: React.FC<PartnerLoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess
}) => {
  const [loginType, setLoginType] = useState<'partner' | 'regional' | 'admin'>('partner');
  const [partnerCode, setPartnerCode] = useState<string>('3Z-HOTEL-042');
  const [partnerName, setPartnerName] = useState<string>('Sporthotel Drei Zinnen');
  const [password, setPassword] = useState<string>('partner2026');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const hotelPresets = [
    { code: '3Z-HOTEL-042', name: 'Sporthotel Drei Zinnen', region: '3 Zinnen Dolomiten' },
    { code: 'DOL-HOTEL-008', name: 'Hotel Dolomitenhof', region: 'Fischleintal / Sexten' },
    { code: 'CORTINA-RES-12', name: 'Grand Hotel Savoia', region: 'Cortina d\'Ampezzo' },
    { code: 'APART-TOBL-03', name: 'Aparthotel Toblach', region: 'Hochpustertal / Toblach' }
  ];

  const regionalPresets = [
    { code: 'REG-3ZINNEN-01', name: 'Associazione Turistica 3 Zinnen Dolomiten', region: 'Alta Pusteria / 3 Zinnen' },
    { code: 'REG-CORTINA-02', name: 'Consorzio Turistico Cortina d\'Ampezzo', region: 'Cortina d\'Ampezzo' },
    { code: 'REG-OSTTIROL-03', name: 'Tourismusverband Osttirol', region: 'Osttirol' },
    { code: 'REG-VALGSIES-04', name: 'Ufficio Turistico Val Gsies / Taisten', region: 'Val Gsies / Monguelfo' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Autenticazione reale: senza token valido non si entra.
    const result = await partnerSignIn(partnerCode, password);
    if (!result.ok) {
      setIsSubmitting(false);
      setError(
        lang === 'it' ? 'Credenziali non valide o accesso non riuscito.' :
        lang === 'de' ? 'Ungültige Zugangsdaten.' :
        'Invalid credentials or sign-in failed.'
      );
      return;
    }

    const finalRole: 'partner' | 'regional' | 'admin' = loginType;
    let finalName = partnerName;

    if (finalRole === 'admin') {
      finalName = 'Direzione Generale Dolomiti NordicSki';
    } else if (!finalName) {
      finalName = finalRole === 'regional' ? 'Partner Regionale' : 'Struttura Partner';
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onLoginSuccess(partnerCode, finalName, finalRole);
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const selectPreset = (preset: { code: string; name: string }) => {
    setPartnerCode(preset.code);
    setPartnerName(preset.name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#052832]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#083845] border border-[#417483]/40 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg bg-[#052832] border border-[#417483]/30 hover:bg-[#0D4D5E]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 p-2 rounded-xl bg-white border border-[#417483]/50 shadow-md">
            <img 
              src={DNS_LOGO_BASE64} 
              alt="Dolomiti NordicSki Official Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">
              {loginType === 'admin' 
                ? (lang === 'it' ? 'Backend Direzione Riservato' : 'Admin Director Backend')
                : loginType === 'regional'
                ? (lang === 'it' ? 'Accesso Riservato Partner Regionali' : 'Regional Partner Portal')
                : (lang === 'it' ? 'Accesso Riservato Strutture Partner' : 'Partner Hotel Login')}
            </h3>
            <p className="text-xs text-slate-200 mt-1">
              {loginType === 'admin'
                ? (lang === 'it' ? 'Accesso centrale di controllo per la Direzione Generale Dolomiti NordicSki.' : 'Central administration portal for all partner vouchers.')
                : loginType === 'regional'
                ? (lang === 'it' ? 'Accesso B2B per Uffici Turistici e Associazioni di Area (Toolbox, Statistiche, Drive e Risorse).' : 'Regional partners access to analytics tools, management drive, and official B2B assets.')
                : (lang === 'it' ? 'Inserisci le credenziali della tua struttura ricettiva per la gestione ed emissione dei voucher.' : 'Enter your hotel partner credentials to issue and track vouchers.')}
            </p>
          </div>
        </div>

        {/* Access Level Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#052832] p-1.5 rounded-xl border border-[#417483]/30">
          <button
            type="button"
            onClick={() => {
              setLoginType('partner');
              setPartnerCode('3Z-HOTEL-042');
              setPartnerName('Sporthotel Drei Zinnen');
            }}
            className={`py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 transition-all ${
              loginType === 'partner'
                ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/40 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Hotel className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Strutture</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginType('regional');
              setPartnerCode('REG-3ZINNEN-01');
              setPartnerName('Associazione Turistica 3 Zinnen Dolomiten');
              setPassword('regional2026');
            }}
            className={`py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 transition-all ${
              loginType === 'regional'
                ? 'bg-teal-600/30 text-teal-200 border border-teal-400/40 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0 text-teal-300" />
            <span className="truncate">Partner Regionali</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginType('admin');
              setPartnerCode('DNS-ADMIN-KEY');
              setPartnerName('Direzione Generale Dolomiti NordicSki');
              setPassword('admin2026');
            }}
            className={`py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 transition-all ${
              loginType === 'admin'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-300" />
            <span className="truncate">Backend Admin</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-xl bg-[#052832] border border-[#AAD0D1]/50 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#AAD0D1] mx-auto animate-bounce" />
            <span className="font-bold text-sm text-[#AAD0D1] block">
              {lang === 'it' ? 'Autenticazione Riuscita!' : lang === 'de' ? 'Login erfolgreich!' : 'Login Successful!'}
            </span>
            <span className="text-xs text-slate-300 block font-mono">
              Role: {loginType === 'admin' ? 'ADMIN BACKEND' : loginType === 'regional' ? `PARTNER REGIONALE (${partnerName})` : `PARTNER HOTEL (${partnerName})`}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {loginType !== 'admin' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">
                  {loginType === 'regional' ? 'Ente / Ufficio Turistico / Associazione' : (lang === 'it' ? 'Nome Struttura Ricettiva' : 'Hotel Name')}
                </label>
                <div className="relative">
                  {loginType === 'regional' ? (
                    <MapPin className="w-4 h-4 text-[#AAD0D1] absolute left-3.5 top-3" />
                  ) : (
                    <Hotel className="w-4 h-4 text-[#AAD0D1] absolute left-3.5 top-3" />
                  )}
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-bold text-white focus:border-[#AAD0D1] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 block">
                {loginType === 'admin' ? 'Codice Chiave Direzione' : loginType === 'regional' ? 'Codice Ente Regionale' : (lang === 'it' ? 'Codice Struttura Partner' : 'Partner Code')}
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#AAD0D1] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-mono font-bold text-white focus:border-[#AAD0D1] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 block">
                {lang === 'it' ? 'Password di Accesso' : lang === 'de' ? 'Passwort' : 'Password'}
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#AAD0D1] absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-[#AAD0D1] focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Demo Presets */}
            {loginType !== 'admin' && (
              <div className="pt-2 border-t border-[#417483]/30 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#AAD0D1] flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Seleziona Account Esempio (Demo):</span>
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(loginType === 'regional' ? regionalPresets : hotelPresets).map(preset => (
                    <button
                      key={preset.code}
                      type="button"
                      onClick={() => selectPreset(preset)}
                      className={`p-2 rounded-lg text-left text-[11px] border transition-all ${
                        partnerCode === preset.code
                          ? 'bg-[#0D4D5E] border-[#AAD0D1] text-[#AAD0D1] font-bold'
                          : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="font-bold truncate">{preset.name}</div>
                      <div className="text-[9px] font-mono opacity-80">{preset.code}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/15 border border-red-400/40 text-red-200 text-[11px] font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer border disabled:opacity-60 ${
                loginType === 'admin'
                  ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400'
                  : loginType === 'regional'
                  ? 'bg-teal-700 hover:bg-teal-600 text-white border-teal-400'
                  : 'bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border-[#417483]/40 text-[#AAD0D1]'
              }`}
            >
              {isSubmitting
                ? (lang === 'it' ? 'Verifica in corso...' : 'Signing in...')
                : loginType === 'admin' ? 'Accedi al Backend Direzione Admin' : loginType === 'regional' ? 'Accedi come Partner Regionale' : (lang === 'it' ? 'Accedi come Struttura Partner' : 'Log In as Partner')}
            </button>

            {DEMO_MODE && (
              <p className="text-[10px] text-amber-300/80 text-center leading-tight">
                Modalità DEMO attiva (accesso anonimo Firebase). In produzione impostare DEMO_MODE=false e credenziali reali.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

