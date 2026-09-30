import React from 'react';
import { NavigationTab, Language, AccessibilitySettings } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { AlpinePeakWireframe, SkiTrackWireframe, CompassWireframe, WireframeBadge } from './WireframeDecorations';
import { 
  FileText, 
  Ticket, 
  Download, 
  Award, 
  ChevronRight, 
  ShieldCheck, 
  Mountain,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: NavigationTab) => void;
  lang: Language;
  a11y?: AccessibilitySettings;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, lang, a11y }) => {
  const isLight = a11y?.theme === 'light';

  return (
    <div className={`relative overflow-hidden py-16 sm:py-24 border-b transition-colors ${
      isLight 
        ? 'bg-[#EBF3F5] text-[#083845] border-[#82B2BD]/40' 
        : 'bg-[#083845] text-white border-[#417483]/30'
    }`}>
      {/* Background Graphic Patterns & Glows */}
      <div className={`absolute inset-0 z-0 opacity-15 ${
        isLight 
          ? 'bg-[radial-gradient(#0D4D5E_1px,transparent_1px)] [background-size:24px_24px]' 
          : 'bg-[radial-gradient(#AAD0D1_1px,transparent_1px)] [background-size:24px_24px]'
      }`}></div>
      <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] rounded-full pointer-events-none ${
        isLight ? 'bg-[#AAD0D1]/40' : 'bg-[#0D4D5E]'
      }`}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-md border ${
              isLight 
                ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#0D4D5E]' 
                : 'bg-[#0D4D5E] border-[#AAD0D1]/30 text-[#AAD0D1]'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#0D4D5E]" />
              <span>
                {lang === 'it' && 'Portale Partner Ufficiale & Manuale Corporate 2025/2026'}
                {lang === 'de' && 'Offizielles Partner-Portal & Corporate Design Manual'}
                {lang === 'en' && 'Official Partner Portal & Corporate Guidelines'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-['Be_Vietnam_Pro'] ${
              isLight ? 'text-[#083845]' : 'text-white'
            }`}>
              {lang === 'it' && (
                <>
                  Dolomiti NordicSki <br />
                  <span className={isLight ? 'text-[#0D4D5E]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#AAD0D1] via-white to-[#AAD0D1]'}>
                    Partner Portal & Corporate Identity
                  </span>
                </>
              )}
              {lang === 'de' && (
                <>
                  Dolomiti NordicSki <br />
                  <span className={isLight ? 'text-[#0D4D5E]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#AAD0D1] via-white to-[#AAD0D1]'}>
                    Partner Portal & Markenführung
                  </span>
                </>
              )}
              {lang === 'en' && (
                <>
                  Dolomiti NordicSki <br />
                  <span className={isLight ? 'text-[#0D4D5E]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#AAD0D1] via-white to-[#AAD0D1]'}>
                    Partner Portal & Brand Resources
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-light ${
              isLight ? 'text-[#1B4B58]' : 'text-slate-200'
            }`}>
              {lang === 'it' && 'Il punto di riferimento per strutture ricettive, associazioni turistiche e media partner. Scarica i marchi ufficiali, consulta le linee guida di Corporate Design ed emetti i voucher Skipass direttamente per i tuoi ospiti.'}
              {lang === 'de' && 'Die zentrale Anlaufstelle für Beherbergungsbetriebe, Tourismusvereine und Medienpartner. Laden Sie offizielle Logos herunter, nutzen Sie die Corporate Design Richtlinien und stellen Sie Loipenpass-Gutscheine direkt aus.'}
              {lang === 'en' && 'The central platform for hospitality partners, tourist boards, and press. Access official master logos, explore corporate design guidelines, and issue instant ski pass vouchers for your hotel guests.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('corporate-design')}
                className={`px-5 py-3 rounded-xl font-black text-sm flex items-center space-x-2 transition-all shadow-lg hover:scale-[1.02] ${
                  isLight 
                    ? 'bg-[#0D4D5E] hover:bg-[#083845] text-white' 
                    : 'bg-[#AAD0D1] hover:bg-white text-[#083845]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>
                  {lang === 'it' && 'Corporate Design & Logo'}
                  {lang === 'de' && 'Corporate Design & Logo'}
                  {lang === 'en' && 'Corporate Design & Logo'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('voucher-system')}
                className={`px-5 py-3 rounded-xl font-bold text-sm border flex items-center space-x-2 transition-all hover:scale-[1.02] ${
                  isLight 
                    ? 'bg-[#FFFFFF] hover:bg-[#E2EFF1] text-[#083845] border-[#82B2BD]' 
                    : 'bg-[#0D4D5E] hover:bg-[#052832] text-white border-[#417483]/60'
                }`}
              >
                <Ticket className={`w-4 h-4 ${isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'}`} />
                <span>
                  {lang === 'it' && 'Emissione Voucher Skipass'}
                  {lang === 'de' && 'Loipenpass-Gutscheine'}
                  {lang === 'en' && 'Issue Skipass Voucher'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('downloads')}
                className={`px-5 py-3 rounded-xl font-semibold text-sm border flex items-center space-x-2 transition-all ${
                  isLight 
                    ? 'bg-[#E2EFF1] hover:bg-[#D5E7EA] text-[#083845] border-[#82B2BD]/60' 
                    : 'bg-[#083845]/90 hover:bg-[#0D4D5E] text-slate-200 border-[#417483]/40'
                }`}
              >
                <Download className={`w-4 h-4 ${isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'}`} />
                <span>
                  {lang === 'it' && 'Download Kit Assets'}
                  {lang === 'de' && 'Downloads & Medien'}
                  {lang === 'en' && 'Download Media Assets'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Logo Highlight Box */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            {/* Wireframe background accent */}
            <CompassWireframe className="absolute -top-6 -right-6 w-32 h-32 opacity-20 pointer-events-none hidden sm:block" />
            <SkiTrackWireframe className="absolute -bottom-8 -left-8 w-40 h-20 opacity-30 pointer-events-none hidden sm:block" />

            <div className={`relative border-2 rounded-3xl p-8 shadow-2xl space-y-4 max-w-sm text-center transform hover:rotate-1 transition-all overflow-hidden ${
              isLight 
                ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#083845]' 
                : 'bg-[#0D4D5E] border-[#AAD0D1]/30 text-white'
            }`}>
              {/* Background Wireframe Peak Watermark */}
              <AlpinePeakWireframe className="absolute -bottom-4 -right-4 w-28 h-28 opacity-10 pointer-events-none" />

              <div className="bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center border border-slate-200 relative z-10">
                <img 
                  src={DNS_LOGO_BASE64} 
                  alt="Dolomiti NordicSki Official Logo" 
                  className="w-full h-auto max-h-24 object-contain"
                />
              </div>
              <div className="space-y-1.5 text-left relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`text-[11px] font-mono font-bold uppercase ${
                    isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                  }`}>
                    Official Brand Assets 2026
                  </div>
                  <WireframeBadge label="WIREFRAME" className={isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'} />
                </div>
                <h3 className="font-extrabold text-base">
                  Dolomiti NordicSki Masterbrand
                </h3>
                <p className="text-xs opacity-80 leading-relaxed font-light">
                  Marchio depositato ed asset vettoriali approvati per la comunicazione B2B e B2C.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Grid Bar */}
        <div className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl border backdrop-blur-md shadow-2xl transition-colors ${
          isLight 
            ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#083845]' 
            : 'bg-[#0D4D5E]/80 border-[#417483]/50 text-white'
        }`}>
          <div className="space-y-1">
            <div className={`flex items-center space-x-2 font-bold text-2xl sm:text-3xl font-['Be_Vietnam_Pro'] ${
              isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
            }`}>
              <Mountain className="w-6 h-6" />
              <span>1.000+ km</span>
            </div>
            <p className="text-xs font-medium opacity-90">
              {lang === 'it' && 'Piste da fondo battute quotidianamente'}
              {lang === 'de' && 'Täglich präparierte Loipen'}
              {lang === 'en' && 'Daily groomed cross-country tracks'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 font-bold text-2xl sm:text-3xl font-['Be_Vietnam_Pro']">
              <span>8</span>
            </div>
            <p className="text-xs font-medium opacity-90">
              {lang === 'it' && 'Aree Alpine tra Alto Adige, Trentino, Veneto e Osttirol'}
              {lang === 'de' && 'Alpine Regionen im Verbund'}
              {lang === 'en' && 'Interconnected Alpine Regions'}
            </p>
          </div>

          <div className="space-y-1">
            <div className={`flex items-center space-x-2 font-bold text-2xl sm:text-3xl font-['Be_Vietnam_Pro'] ${
              isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
            }`}>
              <ShieldCheck className="w-6 h-6" />
              <span>450+</span>
            </div>
            <p className="text-xs font-medium opacity-90">
              {lang === 'it' && 'Alloggi e strutture ricettive accreditate'}
              {lang === 'de' && 'Qualifizierte Beherbergungsbetriebe'}
              {lang === 'en' && 'Accredited Partner Accommodations'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-amber-500 font-bold text-2xl sm:text-3xl font-['Be_Vietnam_Pro']">
              <Award className="w-6 h-6 text-amber-500" />
              <span>1 Skipass</span>
            </div>
            <p className="text-xs font-medium opacity-90">
              {lang === 'it' && 'Valido in tutte e 8 le zone della rete'}
              {lang === 'de' && 'Gültig in allen 8 Regionen'}
              {lang === 'en' && 'Valid across all 8 regions'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
