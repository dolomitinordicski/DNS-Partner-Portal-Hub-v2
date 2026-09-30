import React, { useState } from 'react';
import { AccessLevel, Language } from '../types';
import { 
  Globe, 
  Hotel, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp,
  Ticket,
  FolderGit2,
  Lock
} from 'lucide-react';

interface DemoAccessSwitcherProps {
  accessLevel: AccessLevel;
  partnerName: string;
  partnerCode: string;
  onSelectRole: (role: AccessLevel) => void;
  lang: Language;
}

export const DemoAccessSwitcher: React.FC<DemoAccessSwitcherProps> = ({
  accessLevel,
  partnerName,
  partnerCode,
  onSelectRole,
  lang
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const roles = [
    {
      id: 'public' as AccessLevel,
      levelNum: 'Livello 1',
      title: lang === 'it' ? 'Pubblico / Visitatore' : 'Public Visitor',
      badgeClass: 'bg-slate-700 text-slate-200 border-slate-600',
      activeClass: 'bg-slate-100 text-[#083845] border-white font-extrabold shadow-lg scale-[1.02]',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      description: lang === 'it' ? 'Portale pubblico: Visione, Brand, Criteri di Qualità, Mappe 8 Regioni, Downloads.' : 'Public portal access.'
    },
    {
      id: 'partner' as AccessLevel,
      levelNum: 'Livello 2A',
      title: lang === 'it' ? 'Struttura Partner (Hotel)' : 'Hotel Partner',
      badgeClass: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40',
      activeClass: 'bg-emerald-500 text-[#052832] border-emerald-300 font-extrabold shadow-lg scale-[1.02]',
      icon: <Hotel className="w-4 h-4 text-emerald-300" />,
      description: lang === 'it' ? 'Modulo "Emissione Voucher": Creazione, stampa e storico voucher skipass della reception.' : 'Hotel voucher generation.'
    },
    {
      id: 'regional' as AccessLevel,
      levelNum: 'Livello 2B',
      title: lang === 'it' ? 'Partner Regionale (TVB)' : 'Regional Board (TVB)',
      badgeClass: 'bg-teal-950/80 text-teal-200 border-teal-500/40',
      activeClass: 'bg-teal-400 text-[#052832] border-teal-200 font-extrabold shadow-lg scale-[1.02]',
      icon: <MapPin className="w-4 h-4 text-teal-300" />,
      description: lang === 'it' ? 'Modulo "Toolbox": Drive B2B, Statistiche di area, risorse stampa e materiale promozione.' : 'Regional B2B toolbox.'
    },
    {
      id: 'admin' as AccessLevel,
      levelNum: 'Livello 3',
      title: lang === 'it' ? 'Direzione Admin' : 'Admin Director',
      badgeClass: 'bg-amber-950/80 text-amber-200 border-amber-500/40',
      activeClass: 'bg-amber-400 text-[#052832] border-amber-200 font-extrabold shadow-lg scale-[1.02]',
      icon: <ShieldCheck className="w-4 h-4 text-amber-300" />,
      description: lang === 'it' ? 'Accesso Completo: Registro Voucher Globale, Toolbox, Upload/Delete Downloads e Badge Widget.' : 'Full admin privileges.'
    }
  ];

  return (
    <div className="bg-[#052832] border-b border-[#417483]/40 text-white transition-all shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5">
        
        {/* Header Toggle Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-1 rounded-md bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/30">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase text-[#AAD0D1] tracking-wider">
                {lang === 'it' ? 'Simulatore Demo Livelli Accesso:' : 'Demo Access Level Switcher:'}
              </span>
              <span className="text-[11px] text-slate-300 font-mono hidden sm:inline">
                ({accessLevel === 'admin' ? 'Admin Direzione' : accessLevel === 'regional' ? 'Partner Regionale' : accessLevel === 'partner' ? 'Struttura Partner' : 'Pubblico'})
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-[11px] font-bold text-[#AAD0D1] hover:text-white bg-[#0D4D5E] hover:bg-[#083845] px-2.5 py-1 rounded-lg border border-[#417483]/40 transition-colors"
          >
            <span>{isExpanded ? (lang === 'it' ? 'Riduci Panel' : 'Hide Switcher') : (lang === 'it' ? 'Cambia Livello' : 'Switch Role')}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded 4-Level Selector Cards */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-[#417483]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-fadeIn">
            {roles.map((r) => {
              const isActive = accessLevel === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => onSelectRole(r.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                    isActive
                      ? r.activeClass
                      : `${r.badgeClass} hover:border-[#AAD0D1] hover:bg-[#083845]/90`
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <span className={`p-1 rounded-lg ${isActive ? 'bg-[#052832] text-white' : 'bg-black/30'}`}>
                        {r.icon}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">
                        {r.levelNum}
                      </span>
                    </div>
                    {isActive && (
                      <span className="flex items-center space-x-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#083845] text-emerald-300 border border-emerald-400/40">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>ATTIVO</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h5 className="font-extrabold text-xs leading-snug">{r.title}</h5>
                    <p className={`text-[10px] mt-0.5 line-clamp-2 ${isActive ? 'text-slate-800' : 'text-slate-300'}`}>
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-1.5 border-t border-current/10 flex items-center justify-between text-[10px] font-mono opacity-90">
                    <span>
                      {r.id === 'partner' ? 'Emissione Voucher' : r.id === 'regional' ? 'Toolbox TVB' : r.id === 'admin' ? 'Tutte le funzioni' : 'Sola lettura'}
                    </span>
                    <span className="font-bold underline">{isActive ? 'In uso' : 'Seleziona →'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
