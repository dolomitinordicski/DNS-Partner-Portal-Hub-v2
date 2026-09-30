import React from 'react';
import { NavigationTab, Language } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  lang: Language;
  onOpenLegal?: (tab: 'privacy' | 'cookie' | 'note') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, lang, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#052832] text-slate-300 border-t border-[#417483]/30 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#417483]/30">
          
          {/* Logo & Info */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl shadow-md border border-[#AAD0D1]/40 flex items-center justify-center">
              <img 
                src={DNS_LOGO_BASE64} 
                alt="Dolomiti NordicSki Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <span className="font-black text-sm text-white block font-['Be_Vietnam_Pro']">DOLOMITI NORDICSKI</span>
              <span className="text-[11px] text-slate-300 font-light">
                {lang === 'it' && 'Il più grande carosello dello sci di fondo d\'Europa - 1.000 km di piste'}
                {lang === 'de' && 'Europas größtes Langlauf-Karussell - 1.000 km Loipen'}
                {lang === 'en' && 'Europe\'s largest cross-country skiing carousel - 1,000 km of tracks'}
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-200">
            <button onClick={() => setActiveTab('vision')} className="hover:text-[#AAD0D1] transition-colors">Vision</button>
            <button onClick={() => setActiveTab('corporate-design')} className="hover:text-[#AAD0D1] transition-colors">Corporate Design</button>
            <button onClick={() => setActiveTab('quality-criteria')} className="hover:text-[#AAD0D1] transition-colors">
              {lang === 'de' ? 'Qualitätskriterien' : lang === 'en' ? 'Quality Criteria' : 'Criteri Qualità'}
            </button>
            <button onClick={() => setActiveTab('voucher-system')} className="hover:text-[#AAD0D1] transition-colors">
              {lang === 'de' ? 'Gutschein-System' : lang === 'en' ? 'Voucher System' : 'Gestione Voucher'}
            </button>
            <button onClick={() => setActiveTab('downloads')} className="hover:text-[#AAD0D1] transition-colors">Downloads</button>
            <button onClick={() => setActiveTab('contacts')} className="hover:text-[#AAD0D1] transition-colors">
              {lang === 'de' ? 'Kontakt' : lang === 'en' ? 'Contacts' : 'Contatti'}
            </button>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#083845] hover:bg-[#0D4D5E] text-[#AAD0D1] border border-[#417483]/40 transition-colors shadow-md"
            title="Torna su"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-300 font-light">
          <div>
            © {new Date().getFullYear()} Consorzio Dolomiti NordicSki. All rights reserved. Cod. Fisc. / P.IVA 02384910218.
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => onOpenLegal && onOpenLegal('privacy')} className="hover:text-[#AAD0D1] cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onOpenLegal && onOpenLegal('cookie')} className="hover:text-[#AAD0D1] cursor-pointer">Cookie Policy</button>
            <span>•</span>
            <button onClick={() => onOpenLegal && onOpenLegal('note')} className="hover:text-[#AAD0D1] cursor-pointer">Note Legali</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

