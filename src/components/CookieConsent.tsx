import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  lang: Language;
  onOpenPolicy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ lang, onOpenPolicy }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('dns_cookie_consent_v1');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('dns_cookie_consent_v1', JSON.stringify({ type, timestamp: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[120] bg-[#083845] border-2 border-[#82B2BD]/50 text-white rounded-2xl p-5 shadow-2xl space-y-4 animate-fadeIn">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-[#0D4D5E] border border-[#AAD0D1]/30 text-[#AAD0D1]">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">
              {lang === 'de' ? 'Datenschutz & Cookie-Einstellungen' : lang === 'it' ? 'Informativa Cookie & Privacy' : 'Cookie & Privacy Preference'}
            </h4>
            <span className="text-[10px] text-[#AAD0D1] font-mono">Dolomiti NordicSki GDPR Compliance</span>
          </div>
        </div>
        <button
          onClick={() => handleAccept('essential')}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed">
        {lang === 'de'
          ? 'Wir verwenden nur technisch notwendige Cookies zur Bereitstellung von Portal-Funktionen und Authentifizierung. Keine Tracking-Cookies von Drittanbietern.'
          : lang === 'it'
          ? 'Questo portale utilizza unicamente cookie tecnici essenziali necessari al funzionamento delle sessioni e dell’autenticazione. Non usiamo cookie di profilazione o tracciamento terzi.'
          : 'This portal uses only essential technical cookies necessary for user authentication and session security. No third-party tracking cookies are used.'}
      </p>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
        <button
          onClick={() => handleAccept('all')}
          className="w-full sm:w-auto flex-1 py-2 px-3 rounded-xl bg-[#0D4D5E] hover:bg-[#052832] border border-[#AAD0D1]/40 text-[#AAD0D1] font-bold text-xs transition-all shadow-md cursor-pointer text-center"
        >
          {lang === 'de' ? 'Alle Akzeptieren' : lang === 'it' ? 'Accetta Essenziali' : 'Accept Essential'}
        </button>
        <button
          onClick={onOpenPolicy}
          className="w-full sm:w-auto py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors text-center border border-slate-700/50"
        >
          {lang === 'de' ? 'Details / Police' : lang === 'it' ? 'Leggi Informativa' : 'Read Policy'}
        </button>
      </div>
    </div>
  );
};
