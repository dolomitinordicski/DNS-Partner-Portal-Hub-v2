import React from 'react';
import { AccessibilitySettings, Language, ThemeMode, FontSize } from '../types';
import { 
  Eye, 
  Sun, 
  Moon, 
  Type, 
  Zap, 
  RotateCcw, 
  Check, 
  X, 
  Accessibility, 
  CheckCircle2, 
  Sparkles,
  Sliders
} from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  a11y: AccessibilitySettings;
  setA11y: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  lang: Language;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  a11y,
  setA11y,
  lang
}) => {
  if (!isOpen) return null;

  const isLight = a11y.theme === 'light';

  const handleReset = () => {
    setA11y({
      theme: 'dark',
      fontSize: 'normal',
      highContrast: false,
      readableFont: false,
      reducedMotion: false
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
    >
      <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border transition-all ${
        isLight 
          ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#083845]' 
          : 'bg-[#083845] border-[#417483]/50 text-white'
      }`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-4 border-current/20">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-2xl border ${
              isLight ? 'bg-[#E2EFF1] border-[#82B2BD] text-[#0D4D5E]' : 'bg-[#0D4D5E] border-[#AAD0D1]/30 text-[#AAD0D1]'
            }`}>
              <Accessibility className="w-6 h-6" />
            </div>
            <div>
              <h3 id="a11y-modal-title" className="font-extrabold text-lg sm:text-xl font-['Be_Vietnam_Pro']">
                {lang === 'it' && 'Accessibilità & Tema Visivo'}
                {lang === 'de' && 'Barrierefreiheit & Farbschema'}
                {lang === 'en' && 'Accessibility & Visual Theme'}
              </h3>
              <p className="text-xs opacity-80 font-light">
                {lang === 'it' && 'Personalizza il contrasto, le dimensioni dei testi ed il tema grafico'}
                {lang === 'de' && 'Passen Sie Kontrast, Schriftgröße und Farbschema an'}
                {lang === 'en' && 'Customize contrast, font size, and light/dark theme'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isLight ? 'bg-[#F0F5F6] hover:bg-[#E2EFF1] border-[#82B2BD]' : 'bg-[#052832] hover:bg-[#0D4D5E] border-[#417483]/40'
            }`}
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Accessibility Options */}
        <div className="space-y-5">
          
          {/* 1. Theme Switcher (Dark / Light) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider flex items-center space-x-2">
              <Sun className="w-4 h-4 text-[#AAD0D1]" />
              <span>
                {lang === 'it' && '1. Tema Grafico (Light / Dark Mode)'}
                {lang === 'de' && '1. Farbschema (Hell / Dunkel)'}
                {lang === 'en' && '1. Visual Theme (Light / Dark)'}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setA11y(prev => ({ ...prev, theme: 'dark' }))}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2.5 transition-all ${
                  a11y.theme === 'dark'
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-[#AAD0D1] shadow-lg ring-2 ring-[#AAD0D1]/40'
                    : isLight ? 'bg-[#F0F5F6] border-[#82B2BD] text-[#083845]' : 'bg-[#052832] border-[#417483]/40 text-slate-300'
                }`}
              >
                <Moon className="w-4 h-4 text-[#AAD0D1]" />
                <span>Alpine Dark</span>
                {a11y.theme === 'dark' && <Check className="w-3.5 h-3.5 ml-1 text-[#AAD0D1]" />}
              </button>

              <button
                onClick={() => setA11y(prev => ({ ...prev, theme: 'light' }))}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2.5 transition-all ${
                  a11y.theme === 'light'
                    ? 'bg-[#E2EFF1] border-[#0D4D5E] text-[#083845] shadow-lg ring-2 ring-[#0D4D5E]/40'
                    : isLight ? 'bg-[#F0F5F6] border-[#82B2BD] text-[#083845]' : 'bg-[#052832] border-[#417483]/40 text-slate-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Snow Light</span>
                {a11y.theme === 'light' && <Check className="w-3.5 h-3.5 ml-1 text-[#083845]" />}
              </button>
            </div>
          </div>

          {/* 2. Text Size Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider flex items-center space-x-2">
              <Type className="w-4 h-4 text-[#AAD0D1]" />
              <span>
                {lang === 'it' && '2. Dimensione del Testo'}
                {lang === 'de' && '2. Schriftgröße'}
                {lang === 'en' && '2. Font Size Scaling'}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: '100% Default', size: 'text-xs' },
                { id: 'large', label: '115% Grande', size: 'text-sm' },
                { id: 'xlarge', label: '130% Extra', size: 'text-base' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => setA11y(prev => ({ ...prev, fontSize: sz.id as FontSize }))}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    a11y.fontSize === sz.id
                      ? (isLight ? 'bg-[#0D4D5E] border-[#083845] text-white shadow-md' : 'bg-[#0D4D5E] border-[#AAD0D1] text-[#AAD0D1] shadow-md')
                      : (isLight ? 'bg-[#F0F5F6] border-[#82B2BD] text-[#083845]' : 'bg-[#052832] border-[#417483]/30 text-slate-300')
                  }`}
                >
                  <span className={sz.size}>{sz.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. High Contrast Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-current/20 bg-current/5">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold block flex items-center space-x-2">
                <Eye className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'it' && 'Alto Contrasto (High Contrast WCAG AAA)'}
                  {lang === 'de' && 'Hoher Kontrast (WCAG AAA)'}
                  {lang === 'en' && 'High Contrast Mode (WCAG AAA)'}
                </span>
              </span>
              <p className="text-[11px] opacity-75 font-light">
                {lang === 'it' && 'Aumenta la nitidezza e definisce nettamente i bordi dei componenti'}
                {lang === 'de' && 'Erhöht die Schärfe und Konturen für maximale Lesbarkeit'}
                {lang === 'en' && 'Enhances edge borders and text contrast for low vision'}
              </p>
            </div>

            <button
              onClick={() => setA11y(prev => ({ ...prev, highContrast: !prev.highContrast }))}
              className={`w-12 h-6 rounded-full transition-colors relative border ${
                a11y.highContrast
                  ? 'bg-emerald-500 border-emerald-400'
                  : 'bg-slate-500/40 border-slate-400/40'
              }`}
              aria-label="Toggle High Contrast"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-0.5 left-0.5 ${
                a11y.highContrast ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 4. Readable Dyslexia-Friendly Font Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-current/20 bg-current/5">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold block flex items-center space-x-2">
                <Type className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'it' && 'Font ad Alta Leggibilità (Dislessia)'}
                  {lang === 'de' && 'Gut lesbare Schriftart'}
                  {lang === 'en' && 'High Legibility Dyslexic Font'}
                </span>
              </span>
              <p className="text-[11px] opacity-75 font-light">
                {lang === 'it' && 'Applica la spaziatura aumentata ed il font ad alta leggibilità'}
                {lang === 'de' && 'Aktiviert erweiterte Abstände und gut lesbare Schriftarten'}
                {lang === 'en' && 'Applies expanded letter-spacing and clean readable font'}
              </p>
            </div>

            <button
              onClick={() => setA11y(prev => ({ ...prev, readableFont: !prev.readableFont }))}
              className={`w-12 h-6 rounded-full transition-colors relative border ${
                a11y.readableFont
                  ? 'bg-emerald-500 border-emerald-400'
                  : 'bg-slate-500/40 border-slate-400/40'
              }`}
              aria-label="Toggle Readable Font"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-0.5 left-0.5 ${
                a11y.readableFont ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 5. Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-current/20 bg-current/5">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold block flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'it' && 'Riduci Animazioni (Motion Reduction)'}
                  {lang === 'de' && 'Animationen reduzieren'}
                  {lang === 'en' && 'Reduce Motion & Animations'}
                </span>
              </span>
              <p className="text-[11px] opacity-75 font-light">
                {lang === 'it' && 'Disattiva gli effetti di transizione e dissolvenza dinamica'}
                {lang === 'de' && 'Deaktiviert dynamische Übergänge und Effekte'}
                {lang === 'en' && 'Disables smooth transitions and motion effects'}
              </p>
            </div>

            <button
              onClick={() => setA11y(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
              className={`w-12 h-6 rounded-full transition-colors relative border ${
                a11y.reducedMotion
                  ? 'bg-emerald-500 border-emerald-400'
                  : 'bg-slate-500/40 border-slate-400/40'
              }`}
              aria-label="Toggle Reduced Motion"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-0.5 left-0.5 ${
                a11y.reducedMotion ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="pt-4 border-t border-current/20 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-bold opacity-80 hover:opacity-100 flex items-center space-x-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>
              {lang === 'it' && 'Ripristina Default'}
              {lang === 'de' && 'Zurücksetzen'}
              {lang === 'en' && 'Reset to Default'}
            </span>
          </button>

          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-lg transition-all ${
              isLight
                ? 'bg-[#0D4D5E] hover:bg-[#083845] text-white'
                : 'bg-[#AAD0D1] hover:bg-white text-[#083845]'
            }`}
          >
            {lang === 'it' && 'Applica Impostazioni'}
            {lang === 'de' && 'Einstellungen übernehmen'}
            {lang === 'en' && 'Apply Settings'}
          </button>
        </div>

      </div>
    </div>
  );
};
