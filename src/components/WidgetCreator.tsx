import React, { useState } from 'react';
import { Language, AccessLevel } from '../types';
import { NORDIC_REGIONS, DNS_LOGO_BASE64 } from '../data/portalData';
import { 
  Code, 
  Copy, 
  Check, 
  Sparkles, 
  CloudSnow, 
  Ticket, 
  Sliders,
  Sun,
  ShieldCheck,
  Lock,
  Layers,
  Palette,
  Globe,
  Award,
  ChevronRight,
  Flame
} from 'lucide-react';

interface WidgetCreatorProps {
  lang: Language;
  accessLevel?: AccessLevel;
}

export type WidgetThemePreset = 'dns-primary' | 'dns-deep' | 'dns-muted-teal' | 'frosted-ice';

const OFFICIAL_PALETTES: { id: WidgetThemePreset; label: string; color: string; isLight?: boolean; desc: string }[] = [
  { 
    id: 'dns-primary', 
    label: 'DNS Alpine Primary', 
    color: '#0D4D5E', 
    desc: 'Ottanio Primario (#0D4D5E)' 
  },
  { 
    id: 'dns-deep', 
    label: 'DNS Deep', 
    color: '#083845', 
    desc: 'Blu Petrolio Scuro (#083845)' 
  },
  { 
    id: 'dns-muted-teal', 
    label: 'DNS Muted Teal', 
    color: '#417483', 
    desc: 'Ottanio Medio (#417483)' 
  },
  { 
    id: 'frosted-ice', 
    label: 'Frosted Ice', 
    color: '#E8F4F6', 
    isLight: true, 
    desc: 'Ghiaccio Chiaro (#E8F4F6)' 
  },
];

export const WidgetCreator: React.FC<WidgetCreatorProps> = ({ lang, accessLevel = 'public' }) => {
  const isPartner = accessLevel !== 'public';

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [widgetLang, setWidgetLang] = useState<Language>(lang);
  const [themePreset, setThemePreset] = useState<WidgetThemePreset>('dns-primary');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Content toggles state
  const [includeTrails, setIncludeTrails] = useState<boolean>(true);
  const [includeWeather, setIncludeWeather] = useState<boolean>(true);
  const [includePrices, setIncludePrices] = useState<boolean>(isPartner ? true : false);

  const includeBadge = isPartner; // Always true for logged in partners, false for public

  const regionName = selectedRegion === 'all' 
    ? (widgetLang === 'it' ? 'Tutte le 8 Aree Dolomiti NordicSki' : widgetLang === 'de' ? 'Alle 8 Regionen' : 'All 8 Regions')
    : NORDIC_REGIONS.find(r => r.id === selectedRegion)?.name || 'Dolomiti NordicSki';

  const activePalette = OFFICIAL_PALETTES.find(p => p.id === themePreset) || OFFICIAL_PALETTES[0];
  const currentBgColor = activePalette.color;
  const isLight = !!activePalette.isLight;

  // Compute query parameters for iframe
  const queryParams = new URLSearchParams({
    area: selectedRegion,
    badge: includeBadge ? '1' : '0',
    trails: includeTrails ? '1' : '0',
    weather: includeWeather ? '1' : '0',
    prices: includePrices ? '1' : '0',
    theme: themePreset,
    bg: encodeURIComponent(currentBgColor),
    lang: widgetLang
  }).toString();

  const iframeSrc = `https://www.dolomitinordicski.com/widget?${queryParams}`;
  const iframeHeight = (includeBadge ? 120 : 0) + (includeTrails ? 160 : 0) + (includeWeather ? 100 : 0) + (includePrices ? 140 : 0) + 120;
  
  // Sharp edges embed code (border-radius: 0) as requested by user
  const embedCode = `<iframe src="${iframeSrc}" width="100%" height="${iframeHeight}" frameborder="0" style="border:none; border-radius:0px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25);" title="Dolomiti NordicSki Live Widget (${widgetLang.toUpperCase()})"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="py-10 bg-[#052832] text-white space-y-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#417483]/30 pb-6 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-bold uppercase tracking-wider">
            <Code className="w-3.5 h-3.5 text-[#AAD0D1]" />
            <span>
              {isPartner
                ? (lang === 'de' ? 'Offizielles Partner-Widget für Hotel-Websites' : lang === 'it' ? 'Widget Ufficiale Struttura Partner Hotel' : 'Official Partner Hotel Widget')
                : (lang === 'de' ? 'Kostenloses Website-Widget' : lang === 'it' ? 'Widget Unificato per il tuo Sito Web' : 'Unified Website Widget')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isPartner
              ? (lang === 'de' ? 'Partner Hotel-Widget Generator' : lang === 'it' ? 'Generatore Widget Partner Hotel' : 'Partner Hotel Widget Builder')
              : (lang === 'de' ? 'Dolomiti NordicSki Widget Generator' : lang === 'it' ? 'Generatore Widget Unificato' : 'Unified Widget Builder')}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
            {isPartner ? (
              lang === 'de' 
                ? 'Erstellen Sie Ihr maßgeschneidertes Hotel-Widget mit kantigem Alpin-Design. Enthält das exklusive Partner-Siegel 2026, den Live-Loipenstatus, Wetter und Tarife.'
                : lang === 'it'
                ? 'Crea il tuo widget personalizzato per la tua struttura con un elegante design alpino a bordi netti. Include il bollino d\'eccellenza partner 2026, lo stato piste, il meteo ed i prezzi.'
                : 'Build your customized hotel widget with crisp sharp alpine aesthetics. Features the 2026 partner excellence badge, live trail report, weather, and tariffs.'
            ) : (
              lang === 'de'
                ? 'Erstellen Sie ein modulares Website-Widget in den offiziellen Dolomiti NordicSki Farben. Wählen Sie die Sprache (ITA, DE, EN) und die gewünschten Module.'
                : lang === 'it'
                ? 'Crea un widget unico nelle quattro palette ufficiali Dolomiti NordicSki. Seleziona la lingua (ITA, DE, EN) e configura i moduli da mostrare.'
                : 'Build a unified widget in the official Dolomiti NordicSki palettes. Choose the widget language (ITA, DE, EN) and active content modules.'
            )}
          </p>
        </div>

        {/* Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-[#083845] border border-[#417483]/40 rounded-none p-6 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-2 border-b border-[#417483]/30 pb-4">
              <Sliders className="w-5 h-5 text-[#AAD0D1]" />
              <h3 className="font-extrabold text-lg text-white uppercase tracking-wider">
                {lang === 'de' && 'Widget konfigurieren'}
                {lang === 'it' && 'Configura Widget'}
                {lang === 'en' && 'Configure Widget'}
              </h3>
            </div>

            {/* 1. Language Switcher (ITA, DE, EN) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center space-x-1.5 uppercase tracking-wider text-[#AAD0D1]">
                  <Globe className="w-4 h-4" />
                  <span>
                    {lang === 'de' && 'Widget-Sprache:'}
                    {lang === 'it' && 'Lingua del Widget:'}
                    {lang === 'en' && 'Widget Language:'}
                  </span>
                </span>
                <span className="text-[10px] text-[#AAD0D1] font-mono font-bold uppercase">
                  {widgetLang.toUpperCase()}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'it', label: 'ITA', name: 'Italiano' },
                  { code: 'de', label: 'DEU', name: 'Deutsch' },
                  { code: 'en', label: 'ENG', name: 'English' }
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setWidgetLang(l.code as Language)}
                    className={`py-2 px-3 rounded-none text-xs font-bold border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                      widgetLang === l.code
                        ? 'border-[#AAD0D1] bg-[#0D4D5E] text-[#AAD0D1] shadow-md ring-1 ring-[#AAD0D1]'
                        : 'border-[#417483]/40 bg-[#052832] text-slate-300 hover:border-[#417483]'
                    }`}
                  >
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Official 4 Colors Palette Selector */}
            <div className="space-y-3 pt-3 border-t border-[#417483]/30">
              <label className="text-xs font-bold text-[#AAD0D1] flex items-center space-x-1.5 uppercase tracking-wider">
                <Palette className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'de' && 'Stile / Offizielle Farben (4):'}
                  {lang === 'it' && 'Stile / Colori Ufficiali DNS (4):'}
                  {lang === 'en' && 'Style / Official DNS Colors (4):'}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {OFFICIAL_PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setThemePreset(p.id)}
                    className={`p-3 rounded-none text-left border transition-all cursor-pointer space-y-1 ${
                      themePreset === p.id
                        ? 'border-[#AAD0D1] bg-[#0D4D5E] text-white ring-1 ring-[#AAD0D1]'
                        : 'border-[#417483]/40 bg-[#052832] text-slate-300 hover:border-[#417483]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span 
                        className="w-4 h-4 rounded-none border border-white/50 shrink-0 shadow-sm" 
                        style={{ backgroundColor: p.color }}
                      ></span>
                      <span className="font-bold text-xs truncate">{p.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-300 block font-light leading-tight">
                      {p.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Region Selection */}
            <div className="space-y-1.5 pt-3 border-t border-[#417483]/30">
              <label className="text-xs font-bold text-slate-200 block uppercase tracking-wider">
                {lang === 'de' && 'Gebiet / Region:'}
                {lang === 'it' && 'Seleziona Area / Region:'}
                {lang === 'en' && 'Select Region:'}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-[#052832] border border-[#417483]/50 text-xs font-bold text-white focus:border-[#AAD0D1] focus:outline-none cursor-pointer"
              >
                <option value="all">
                  {widgetLang === 'de' && 'Alle 8 Regionen (1.000 km)'}
                  {widgetLang === 'it' && 'Tutte le 8 Aree (Carosello Completo 1.000 km)'}
                  {widgetLang === 'en' && 'All 8 Regions (Full 1,000 km Carousel)'}
                </option>
                {NORDIC_REGIONS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.kmTracks} km)
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Content Modules Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#417483]/30">
              <label className="text-xs font-bold text-[#AAD0D1] block flex items-center space-x-1.5 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'de' && 'Inhalte auswählen:'}
                  {lang === 'it' && 'Moduli Contenuto Widget:'}
                  {lang === 'en' && 'Select Content Modules:'}
                </span>
              </label>

              <div className="space-y-2">
                
                {/* Badge Toggle */}
                {isPartner ? (
                  <div className="p-3 rounded-none bg-[#0D4D5E] border border-[#AAD0D1]/60 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <Award className="w-5 h-5 text-[#AAD0D1] shrink-0" />
                      <div>
                        <span className="font-bold text-white block uppercase tracking-wider text-[11px]">
                          {lang === 'de' && 'Exklusives Partner-Siegel 2026'}
                          {lang === 'it' && 'Bollino Partner d\'Eccellenza 2026'}
                          {lang === 'en' && 'Exclusive Partner Badge 2026'}
                        </span>
                        <span className="text-[10px] text-[#AAD0D1]/80 block font-light">
                          {lang === 'de' && 'Inklusive für verifizierte Partner-Hotels'}
                          {lang === 'it' && 'Incluso di default per le strutture accreditate'}
                          {lang === 'en' && 'Included for accredited partner hotels'}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-none bg-[#AAD0D1]/20 text-[#AAD0D1] font-mono text-[10px] font-bold border border-[#AAD0D1]/40 uppercase">
                      ACTIVE
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-none bg-[#052832]/60 border border-[#417483]/20 flex items-center justify-between text-xs opacity-60">
                    <div className="flex items-center space-x-2.5">
                      <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-300 block text-[11px]">
                          {lang === 'de' && 'Partner-Siegel 2026'}
                          {lang === 'it' && 'Bollino Partner Ufficiale'}
                          {lang === 'en' && 'Partner Excellence Badge'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'de' && 'Nur nach Partner-Login verfügbar'}
                          {lang === 'it' && 'Riservato alle strutture partner accreditate'}
                          {lang === 'en' && 'Reserved for accredited partner hotels'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loipen / Piste Toggle */}
                <label className={`p-3 rounded-none border flex items-center justify-between text-xs transition-all ${
                  isPartner 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1]/50 text-white' 
                    : includeTrails 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-white shadow-md' 
                    : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:border-[#417483]/60 cursor-pointer'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <CloudSnow className="w-4 h-4 text-[#AAD0D1] shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'de' && 'Loipenstatus & Präparierung'}
                        {lang === 'it' && 'Stato Piste & Battitura (Loipen)'}
                        {lang === 'en' && 'Trail Status & Grooming'}
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        {lang === 'de' && 'Offene KM, Schneequalität, Uhrzeit'}
                        {lang === 'it' && 'Km aperti, qualità neve e orario battitura'}
                        {lang === 'en' && 'Open track km, snow condition, grooming time'}
                      </span>
                    </div>
                  </div>
                  {isPartner ? (
                    <span className="px-2 py-0.5 rounded-none bg-teal-400/20 text-[#AAD0D1] font-mono text-[10px] font-bold border border-[#AAD0D1]/30">
                      FIXED
                    </span>
                  ) : (
                    <input 
                      type="checkbox"
                      checked={includeTrails}
                      onChange={(e) => {
                        if (!e.target.checked && !includeWeather && !includePrices) return;
                        setIncludeTrails(e.target.checked);
                      }}
                      className="w-4 h-4 accent-teal-400 cursor-pointer"
                    />
                  )}
                </label>

                {/* Wetter / Meteo Toggle */}
                <label className={`p-3 rounded-none border flex items-center justify-between text-xs cursor-pointer transition-all ${
                  includeWeather 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-white shadow-md' 
                    : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:border-[#417483]/60'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <Sun className="w-4 h-4 text-amber-300 shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'de' && 'Wetter & Schnee (Wetter)'}
                        {lang === 'it' && 'Meteo & Condizioni Neve'}
                        {lang === 'en' && 'Weather & Snow Conditions'}
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        {lang === 'de' && 'Temperatur, Wetterlage und Schneehöhe'}
                        {lang === 'it' && 'Temperatura, previsione e altezza neve'}
                        {lang === 'en' && 'Temperature, forecast, and snow depth'}
                      </span>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={includeWeather}
                    onChange={(e) => {
                      if (!e.target.checked && !includeTrails && !includePrices) return;
                      setIncludeWeather(e.target.checked);
                    }}
                    className="w-4 h-4 accent-teal-400 cursor-pointer"
                  />
                </label>

                {/* Prezzi / Tariffe Toggle */}
                <label className={`p-3 rounded-none border flex items-center justify-between text-xs cursor-pointer transition-all ${
                  includePrices 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-white shadow-md' 
                    : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:border-[#417483]/60'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <Ticket className="w-4 h-4 text-emerald-300 shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'de' && 'Preise & Skipass-Tarife'}
                        {lang === 'it' && 'Prezzi & Tariffe Skipass'}
                        {lang === 'en' && 'Pass Prices & Tariffs'}
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        {lang === 'de' && 'Tageskarten, 7-Tagespass und Saisonpreise'}
                        {lang === 'it' && 'Giornalieri, settimanali e stagionale Dolomiti'}
                        {lang === 'en' && 'Day pass, 7-day pass, and seasonal tariffs'}
                      </span>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={includePrices}
                    onChange={(e) => {
                      if (!e.target.checked && !includeTrails && !includeWeather) return;
                      setIncludePrices(e.target.checked);
                    }}
                    className="w-4 h-4 accent-teal-400 cursor-pointer"
                  />
                </label>

              </div>
            </div>

            {/* Embed Code Copy */}
            <div className="pt-3 border-t border-[#417483]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#AAD0D1] flex items-center space-x-1 uppercase tracking-wider">
                  <Code className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'de' && 'HTML Embed-Code:'}
                    {lang === 'it' && 'Codice HTML Embed:'}
                    {lang === 'en' && 'HTML Embed Code:'}
                  </span>
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-none bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border border-[#AAD0D1]/60 text-[#AAD0D1] font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-[#AAD0D1]" />
                      <span>
                        {lang === 'de' && 'Kopiert!'}
                        {lang === 'it' && 'Copiato!'}
                        {lang === 'en' && 'Copied!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#AAD0D1]" />
                      <span>
                        {lang === 'de' && 'Code kopieren'}
                        {lang === 'it' && 'Copia Codice'}
                        {lang === 'en' && 'Copy Code'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                rows={3}
                value={embedCode}
                className="w-full p-3 rounded-none bg-[#052832] border border-[#417483]/50 font-mono text-[11px] text-slate-200 select-all focus:outline-none"
              ></textarea>
            </div>

          </div>

          {/* Live Preview Stage (SHARP EDGES / NO ROUNDED CORNERS AS REQUESTED) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'de' && `Live-Vorschau Widget (${widgetLang.toUpperCase()})`}
                  {lang === 'it' && `Anteprima Live Widget (${widgetLang.toUpperCase()})`}
                  {lang === 'en' && `Unified Live Widget Preview (${widgetLang.toUpperCase()})`}
                </span>
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-none bg-[#0D4D5E] text-[#AAD0D1] border border-[#417483]/50 uppercase font-bold">
                {activePalette.label} • {widgetLang.toUpperCase()}
              </span>
            </div>

            {/* SIMULATED WIDGET BOX WITH ZERO ROUNDED CORNERS (rounded-none) */}
            <div 
              className={`rounded-none p-6 sm:p-7 border-2 transition-all shadow-2xl space-y-5 ${
                isLight 
                  ? 'border-slate-400 text-slate-900 shadow-slate-900/15' 
                  : 'border-[#417483]/60 text-white shadow-black/50'
              }`}
              style={{ backgroundColor: currentBgColor }}
            >
              
              {/* Widget Header with NO BORDER ON LOGO */}
              <div className={`flex items-center justify-between border-b pb-4 ${
                isLight ? 'border-slate-300' : 'border-white/20'
              }`}>
                <div className="flex items-center space-x-3.5">
                  {/* LOGO: BORDERLESS & ENLARGED BY 20% */}
                  <div className="flex items-center justify-center shrink-0">
                    <img 
                      src={DNS_LOGO_BASE64} 
                      alt="Dolomiti NordicSki Logo" 
                      className="h-10 sm:h-11 w-auto object-contain rounded-none"
                    />
                  </div>
                  <div>
                    <h4 className={`font-black text-base sm:text-lg leading-snug tracking-tight ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}>
                      Dolomiti NordicSki • {regionName}
                    </h4>
                    <span className={`text-[10px] uppercase tracking-widest font-mono block ${
                      isLight ? 'text-slate-700 font-bold' : 'text-slate-300 opacity-90'
                    }`}>
                      {widgetLang === 'de' && 'Offizieller Live-Loipenservice'}
                      {widgetLang === 'it' && 'Bollettino Ufficiale Piste & Servizi'}
                      {widgetLang === 'en' && 'Official Live Trail Service'}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-none text-[10px] font-black uppercase tracking-wider shrink-0 border ${
                  isLight
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                }`}>
                  LIVE OK
                </span>
              </div>

              {/* SECTION 1: EYE-CATCHING PARTNER BADGE (Official Dolomiti NordicSki Cyan/Teal Palette) */}
              {includeBadge && (
                <div className={`p-4 rounded-none border-2 transition-all shadow-md relative overflow-hidden ${
                  isLight
                    ? 'bg-gradient-to-r from-[#E8F4F6] via-[#F4FAFB] to-[#E8F4F6] border-[#0D4D5E] text-[#052832]'
                    : 'bg-gradient-to-r from-[#0D4D5E] via-[#083845] to-[#0D4D5E] border-[#AAD0D1] text-white'
                }`}>
                  {/* Decorative Corner Accent */}
                  <div className={`absolute top-0 right-0 text-[9px] font-black px-2.5 py-0.5 uppercase tracking-widest rounded-none shadow-sm flex items-center space-x-1 border-b border-l ${
                    isLight 
                      ? 'bg-[#0D4D5E] text-white border-[#052832]' 
                      : 'bg-[#AAD0D1] text-[#052832] border-[#417483]'
                  }`}>
                    <Award className="w-3 h-3" />
                    <span>CERTIFIED 2026</span>
                  </div>

                  <div className="flex items-start space-x-3.5 pt-1">
                    <div className={`p-2.5 rounded-none border shadow-md shrink-0 ${
                      isLight ? 'bg-[#0D4D5E] border-[#052832] text-[#AAD0D1]' : 'bg-[#0D4D5E] border-[#AAD0D1] text-[#AAD0D1]'
                    }`}>
                      <Award className="w-7 h-7 font-extrabold" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                        }`}>
                          {widgetLang === 'de' && 'OFFIZIELLER PARTNERBETRIEB'}
                          {widgetLang === 'it' && 'STRUTTURA PARTNER UFFICIALE'}
                          {widgetLang === 'en' && 'OFFICIAL PARTNER PROPERTY'}
                        </span>
                      </div>

                      <h5 className={`font-black text-sm sm:text-base leading-tight tracking-tight ${
                        isLight ? 'text-[#052832]' : 'text-white'
                      }`}>
                        {widgetLang === 'de' && 'Zertifiziertes Dolomiti NordicSki Partner Hotel'}
                        {widgetLang === 'it' && 'Struttura Ricettiva Certificata Dolomiti NordicSki'}
                        {widgetLang === 'en' && 'Certified Dolomiti NordicSki Partner Property'}
                      </h5>

                      <p className={`text-[11px] leading-relaxed ${
                        isLight ? 'text-[#083845] font-medium' : 'text-[#E8F4F6] font-light'
                      }`}>
                        {widgetLang === 'de' && 'Kostenloser Loipenpass-Service, beheizter Skiraum mit Wachstisch & direkte Anbindung an das Loipennetz.'}
                        {widgetLang === 'it' && 'Servizio vendita voucher skipass in struttura, deposito sci riscaldato con banco sciolina e accesso diretto ai tracciati.'}
                        {widgetLang === 'en' && 'Direct pass issuing service, heated ski depot with professional waxing bench, and direct trail access.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: PISTE / LOIPEN STATUS (If active) */}
              {includeTrails && (
                <div className="space-y-3">
                  <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-[#052832]' : 'text-[#AAD0D1]'
                  }`}>
                    <CloudSnow className={`w-4 h-4 ${
                      isLight ? 'text-[#0D4D5E]' : 'text-teal-300'
                    }`} />
                    <span>
                      {widgetLang === 'de' && 'Loipenstatus & Präparierung'}
                      {widgetLang === 'it' && 'Stato Piste & Battitura'}
                      {widgetLang === 'en' && 'Trail Status & Grooming'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] uppercase block font-extrabold tracking-wider ${
                        isLight ? 'text-slate-700' : 'text-slate-300 opacity-90'
                      }`}>
                        {widgetLang === 'de' ? 'Offene Loipen' : widgetLang === 'it' ? 'Piste Aperte' : 'Open Trails'}
                      </span>
                      <span className={`text-base sm:text-lg font-black ${
                        isLight ? 'text-[#052832]' : 'text-[#AAD0D1]'
                      }`}>
                        100% (82/82)
                      </span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] uppercase block font-extrabold tracking-wider ${
                        isLight ? 'text-slate-700' : 'text-slate-300 opacity-90'
                      }`}>
                        {widgetLang === 'de' ? 'Präparierte KM' : widgetLang === 'it' ? 'Km Tracciati' : 'Groomed KM'}
                      </span>
                      <span className={`text-base sm:text-lg font-black ${
                        isLight ? 'text-[#052832]' : 'text-[#AAD0D1]'
                      }`}>
                        1.000 KM
                      </span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] uppercase block font-extrabold tracking-wider ${
                        isLight ? 'text-slate-700' : 'text-slate-300 opacity-90'
                      }`}>
                        {widgetLang === 'de' ? 'Schnee-Qualität' : widgetLang === 'it' ? 'Qualità Neve' : 'Snow Quality'}
                      </span>
                      <span className={`text-base sm:text-lg font-black ${
                        isLight ? 'text-emerald-800' : 'text-emerald-400'
                      }`}>
                        {widgetLang === 'de' ? 'Kompakt' : 'Powder'}
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-none border text-xs flex items-center justify-between ${
                    isLight ? 'bg-slate-200/60 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                  }`}>
                    <span className="font-bold">
                      {widgetLang === 'de' && 'Letzte Präparierung:'}
                      {widgetLang === 'it' && 'Ultima Battitura:'}
                      {widgetLang === 'en' && 'Last Groomed:'}
                    </span>
                    <span className={`font-black ${
                      isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                    }`}>
                      {widgetLang === 'de' && 'Heute 06:00 Uhr (Klassisch & Skating)'}
                      {widgetLang === 'it' && 'Oggi ore 06:00 (Binario & Skating)'}
                      {widgetLang === 'en' && 'Today 06:00 AM (Classic & Skating)'}
                    </span>
                  </div>
                </div>
              )}

              {/* SECTION 3: WETTER / METEO (If active) */}
              {includeWeather && (
                <div className={`space-y-2.5 pt-3 border-t ${
                  isLight ? 'border-slate-300' : 'border-white/20'
                }`}>
                  <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-amber-300'
                  }`}>
                    <Sun className={`w-4 h-4 ${
                      isLight ? 'text-amber-700' : 'text-amber-300'
                    }`} />
                    <span>
                      {widgetLang === 'de' && 'Wetter & Schneebericht'}
                      {widgetLang === 'it' && 'Meteo & Bollettino Neve'}
                      {widgetLang === 'en' && 'Weather & Snow Conditions'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-amber-100/70 border-amber-300 text-amber-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-amber-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Temperatur' : 'Temperatura'}
                      </span>
                      <span className={`font-black text-sm ${
                        isLight ? 'text-amber-950' : 'text-amber-200'
                      }`}>-2°C / +3°C</span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-amber-100/70 border-amber-300 text-amber-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-amber-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Wetterlage' : 'Cielo'}
                      </span>
                      <span className={`font-black text-sm ${
                        isLight ? 'text-amber-950' : 'text-amber-200'
                      }`}>
                        {widgetLang === 'de' ? 'Sonnig' : widgetLang === 'it' ? 'Soleggiato' : 'Sunny'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-amber-100/70 border-amber-300 text-amber-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-amber-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Schneehöhe' : 'Altezza Neve'}
                      </span>
                      <span className={`font-black text-sm ${
                        isLight ? 'text-amber-950' : 'text-amber-200'
                      }`}>45 - 80 cm</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: PREZZI / TARIFFS (If active) */}
              {includePrices && (
                <div className={`space-y-2.5 pt-3 border-t ${
                  isLight ? 'border-slate-300' : 'border-white/20'
                }`}>
                  <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-emerald-950' : 'text-emerald-300'
                  }`}>
                    <Ticket className={`w-4 h-4 ${
                      isLight ? 'text-emerald-700' : 'text-emerald-300'
                    }`} />
                    <span>
                      {widgetLang === 'de' && 'Loipenpass Tarife 2026'}
                      {widgetLang === 'it' && 'Prezzi & Tariffe Skipass 2026'}
                      {widgetLang === 'en' && 'Pass Prices & Tariffs 2026'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className={`p-3 rounded-none border text-center ${
                      isLight ? 'bg-emerald-100/70 border-emerald-300' : 'bg-black/30 border-white/15'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-emerald-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Tageskarte' : widgetLang === 'it' ? 'Giornaliero' : 'Day Pass'}
                      </span>
                      <span className={`font-black text-base ${
                        isLight ? 'text-emerald-950' : 'text-emerald-300'
                      }`}>€ 13,00</span>
                    </div>

                    <div className={`p-3 rounded-none border text-center ${
                      isLight ? 'bg-emerald-100/70 border-emerald-300' : 'bg-black/30 border-white/15'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-emerald-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? '7 Tage Pass' : widgetLang === 'it' ? '7 Giorni' : '7-Day Pass'}
                      </span>
                      <span className={`font-black text-base ${
                        isLight ? 'text-emerald-950' : 'text-emerald-300'
                      }`}>€ 45,00</span>
                    </div>

                    <div className={`p-3 rounded-none border text-center ${
                      isLight ? 'bg-emerald-100/70 border-emerald-300' : 'bg-black/30 border-white/15'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-emerald-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Saisonkarte' : widgetLang === 'it' ? 'Stagionale' : 'Season Pass'}
                      </span>
                      <span className={`font-black text-base ${
                        isLight ? 'text-emerald-950' : 'text-emerald-300'
                      }`}>€ 120,00</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Link */}
              <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                isLight ? 'border-slate-300 text-slate-800' : 'border-white/20 text-slate-200'
              }`}>
                <span className="font-bold">Powered by Dolomiti NordicSki</span>
                <span className={`font-black uppercase tracking-wider underline flex items-center space-x-1 cursor-pointer ${
                  isLight ? 'text-[#0D4D5E] hover:text-[#052832]' : 'text-teal-200 hover:text-white'
                }`}>
                  <span>
                    {widgetLang === 'de' && 'Offiziellen Bericht prüfen'}
                    {widgetLang === 'it' && 'Verifica Bollettino Ufficiale'}
                    {widgetLang === 'en' && 'Check Official Report'}
                  </span>
                  <ChevronRight className="w-3 h-3 inline" />
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
