import React from 'react';
import { NavigationTab, Language } from '../types';

interface StickyToolboxBarProps {
  setActiveTab: (tab: NavigationTab) => void;
  lang: Language;
}

export const StickyToolboxBar: React.FC<StickyToolboxBarProps> = ({ setActiveTab, lang }) => {
  return (
    <div className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-[45] flex-col items-end gap-2.5 shadow-2xl">
      
      {/* 1. Widget Generator (WG) */}
      <button
        onClick={() => setActiveTab('widgets')}
        className="group bg-[#0D4D5E] hover:bg-[#083845] text-white border-l-2 border-y border-b border-[#AAD0D1] rounded-l-2xl p-2.5 sm:p-3 flex items-center space-x-2 transition-all hover:pl-5 shadow-xl cursor-pointer"
        title={
          lang === 'de' ? 'Widget-Generator (Websites & Embed)' :
          lang === 'it' ? 'Widget Generator (Siti Hotel & Embed)' :
          'Widget Generator (Hotel Websites & Embed)'
        }
      >
        <div className="w-7 h-7 rounded-lg bg-[#052832] text-[#AAD0D1] flex items-center justify-center font-mono font-black text-xs border border-[#417483]/50 shrink-0">
          WG
        </div>
        <div className="hidden sm:group-hover:block text-left pr-2 animate-fadeIn">
          <span className="text-xs font-bold block text-white leading-tight">
            Widget
          </span>
          <span className="text-[10px] text-[#AAD0D1] font-mono block">
            Generator ⚡
          </span>
        </div>
      </button>

      {/* 2. Voucher System (VS) */}
      <button
        onClick={() => setActiveTab('voucher-system')}
        className="group bg-[#083845] hover:bg-[#0D4D5E] text-white border-l-2 border-y border-b border-[#AAD0D1] rounded-l-2xl p-2.5 sm:p-3 flex items-center space-x-2 transition-all hover:pl-5 shadow-xl cursor-pointer"
        title={
          lang === 'de' ? 'Gutschein-System (Rezeption & Skipass)' :
          lang === 'it' ? 'Emissione Voucher (Reception & Skipass)' :
          'Voucher System (Reception & Skipass)'
        }
      >
        <div className="w-7 h-7 rounded-lg bg-[#052832] text-amber-300 flex items-center justify-center font-mono font-black text-xs border border-amber-400/40 shrink-0">
          VS
        </div>
        <div className="hidden sm:group-hover:block text-left pr-2 animate-fadeIn">
          <span className="text-xs font-bold block text-white leading-tight">
            {lang === 'de' ? 'Gutschein' : lang === 'it' ? 'Emissione' : 'Voucher'}
          </span>
          <span className="text-[10px] text-amber-300 font-mono block">
            {lang === 'de' ? 'System 🎟️' : lang === 'it' ? 'Voucher 🎟️' : 'System 🎟️'}
          </span>
        </div>
      </button>

    </div>
  );
};

