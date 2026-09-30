import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { X, ShieldCheck, FileText, Cookie, Scale } from 'lucide-react';

export type LegalTab = 'privacy' | 'cookie' | 'note';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
  lang: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#083845] border border-[#417483]/50 rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-white animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#052832] px-6 py-4 border-b border-[#417483]/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-[#AAD0D1]" />
            <h3 className="font-extrabold text-base text-white">
              {lang === 'de' ? 'Rechtliche Hinweise & Datenschutz' : lang === 'it' ? 'Documenti Legali & Privacy GDPR' : 'Legal & Privacy Information'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#083845] hover:bg-[#0D4D5E] border border-[#417483]/30 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 bg-[#083845] border-b border-[#417483]/30 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-2.5 px-3 rounded-t-xl text-xs font-bold flex items-center justify-center space-x-2 border-t border-x transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#052832] border-[#AAD0D1]/50 text-[#AAD0D1]'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-[#052832]/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'de' ? 'Datenschutz (Privacy)' : lang === 'it' ? 'Privacy Policy' : 'Privacy Policy'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cookie')}
            className={`py-2.5 px-3 rounded-t-xl text-xs font-bold flex items-center justify-center space-x-2 border-t border-x transition-all ${
              activeTab === 'cookie'
                ? 'bg-[#052832] border-[#AAD0D1]/50 text-[#AAD0D1]'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-[#052832]/50'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>{lang === 'de' ? 'Cookie Richtlinie' : lang === 'it' ? 'Cookie Policy' : 'Cookie Policy'}</span>
          </button>

          <button
            onClick={() => setActiveTab('note')}
            className={`py-2.5 px-3 rounded-t-xl text-xs font-bold flex items-center justify-center space-x-2 border-t border-x transition-all ${
              activeTab === 'note'
                ? 'bg-[#052832] border-[#AAD0D1]/50 text-[#AAD0D1]'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-[#052832]/50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{lang === 'de' ? 'Impressum & Rechtliches' : lang === 'it' ? 'Note Legali' : 'Legal Notes'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-200 leading-relaxed bg-[#052832] flex-1">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-base font-extrabold text-[#AAD0D1]">
                Informativa sul Trattamento dei Dati Personali (Art. 13-14 Regolamento UE 2016/679 - GDPR)
              </h4>
              <p>
                <strong>Titolare del Trattamento:</strong> Consorzio Dolomiti NordicSki, Via dei Campi 1, 39039 Villabassa (BZ), Italia. Email: info@dolomitinordicski.com.
              </p>
              <p>
                <strong>Tipologia di dati trattati:</strong> Il Portale Partner raccoglie e tratta esclusivamente dati identificativi indispensabili per l’emissione dei voucher di accesso (nome dell’ospite, data e numero ospiti, struttura emittente) e dati di autenticazione delle strutture ricettive e partner regionali.
              </p>
              <p>
                <strong>Finalità e base giuridica:</strong> Esecuzione del servizio di gestione e verifica dei titoli di viaggio / voucher richiesti dall'ospite o dal partner (art. 6 par. 1 lett. b GDPR) e adempimento di obblighi legali e amministrativi (art. 6 par. 1 lett. c GDPR).
              </p>
              <p>
                <strong>Conservazione e Diritti dell'interessato:</strong> I dati personali non vengono conservati in modo permanente nel browser della reception (no localStorage) e sono protetti da rigide regole di accesso Firestore. Gli interessati hanno diritto di accedere, rettificare, cancellare (diritto all'oblio ex art. 17 GDPR) o limitare il trattamento dei propri dati contattando il Titolare.
              </p>
            </div>
          )}

          {activeTab === 'cookie' && (
            <div className="space-y-4">
              <h4 className="text-base font-extrabold text-[#AAD0D1]">
                Informativa estesa sull'uso dei Cookie (Cookie Policy)
              </h4>
              <p>
                Questo portale web applica il principio della minimizzazione dei dati e non utilizza cookie di profilazione o tracciamento commerciale né strumenti di analisi di terze parti con trasferimento dati all'esterno dell'Unione Europea.
              </p>
              <p>
                <strong>Cookie Tecnici Essenziali utilizzati:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>dns_cookie_consent_v1</code>: Mantiene memoria della preferenza espressa sul banner cookie.</li>
                <li>Sessioni Firebase Authentication: Mantiene lo stato dell'autenticazione sicura dell'utente accreditato durante la sessione di lavoro.</li>
              </ul>
              <p>
                Non è richiesto il consenso preventivo per l'uso dei soli cookie tecnici necessari alla sicurezza del servizio.
              </p>
            </div>
          )}

          {activeTab === 'note' && (
            <div className="space-y-4">
              <h4 className="text-base font-extrabold text-[#AAD0D1]">
                Note Legali e Dati Societari (Impressum)
              </h4>
              <p>
                <strong>Dolomiti NordicSki Service Hub & B2B Partner Portal</strong>
              </p>
              <p>
                Consorzio Dolomiti NordicSki - Ufficio Centrale<br />
                Sede legale: Alto Adige / Italia<br />
                P.IVA / Cod. Fiscale: IT02488190214<br />
                PEC: dolomitinordicski@legalmail.it
              </p>
              <p>
                Tutti i marchi registrati, i codici identificativi, le mappe delle piste e il materiale grafico e fotografico presenti su questo portale sono di proprietà esclusiva di Dolomiti NordicSki e delle 8 regioni partner affiliate. Ogni utilizzo non autorizzato al di fuori delle linee guida B2B ufficiali è severamente vietato.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#083845] px-6 py-4 border-t border-[#417483]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0D4D5E] hover:bg-[#052832] text-[#AAD0D1] border border-[#AAD0D1]/30 font-bold text-xs transition-colors"
          >
            {lang === 'de' ? 'Schließen' : lang === 'it' ? 'Chiudi' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
