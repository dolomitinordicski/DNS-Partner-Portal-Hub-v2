import React from 'react';
import { ChevronUp } from 'lucide-react';
import { Language } from '../types';

interface ScrollToTopButtonProps {
  lang: Language;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const labels: Record<Language, string> = {
    it: 'TORNA IN ALTO',
    de: 'NACH OBEN',
    en: 'SCROLL TO TOP',
  };

  const titles: Record<Language, string> = {
    it: 'Torna all\'inizio della pagina',
    de: 'Zurück zum Seitenanfang',
    en: 'Back to top of page',
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={titles[lang] || titles.de}
      title={titles[lang] || titles.de}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#0D4D5E] hover:bg-[#083845] text-white border-2 border-[#AAD0D1]/80 shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer no-print group"
    >
      <ChevronUp className="w-5 h-5 text-[#AAD0D1] group-hover:-translate-y-1 transition-transform" />
      <span className="text-[10px] sm:text-[11px] font-black font-mono uppercase tracking-wider text-[#AAD0D1]">
        {labels[lang] || labels.de}
      </span>
    </button>
  );
};
