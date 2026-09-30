import React, { useState } from 'react';
import { Language } from '../types';
import { VISION_CONTENT } from '../data/portalData';
import { 
  Sparkles, 
  Award, 
  Globe2, 
  TreePine, 
  Mountain, 
  ShieldCheck,
  Globe,
  Flame,
  CheckCircle,
  Compass,
  HeartPulse,
  Leaf,
  Lightbulb
} from 'lucide-react';

interface VisionSectionProps {
  lang: Language;
}

export const VisionSection: React.FC<VisionSectionProps> = ({ lang }) => {
  const content = VISION_CONTENT[lang] || VISION_CONTENT.it;
  const [sloganLang, setSloganLang] = useState<'de' | 'it' | 'en'>(lang);

  return (
    <div className="py-12 bg-[#052832] text-white min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl bg-[#083845] p-8 sm:p-12 border border-[#417483]/40 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0D4D5E]/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#AAD0D1]" />
              <span>
                {lang === 'it' && 'Visione Strategica & Leadership Alpina'}
                {lang === 'de' && 'Strategische Vision & Alpine Marktführerschaft'}
                {lang === 'en' && 'Strategic Vision & Alpine Leadership'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              {content.heroTitle}
            </h2>
            <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed">
              {content.heroSubtitle}
            </p>
          </div>

          {/* Stats counter row */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#417483]/30">
            {content.stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#AAD0D1]">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OFFIZIELLER SLOGAN / OFFICIAL BRAND SLOGAN */}
        <div className="bg-[#083845] border border-[#417483]/40 rounded-3xl p-8 sm:p-10 space-y-6 text-center shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#AAD0D1]" />
            <span>
              {sloganLang === 'de' && 'OFFIZIELLER SLOGAN'}
              {sloganLang === 'it' && 'SLOGAN UFFICIALE'}
              {sloganLang === 'en' && 'OFFICIAL SLOGAN'}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black font-['Be_Vietnam_Pro'] tracking-wide text-[#AAD0D1]">
            BEYOND SKIING • 0% FOOTPRINT, 100% IMPACT
          </h3>

          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setSloganLang('de')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sloganLang === 'de' ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/50' : 'bg-[#052832] text-slate-300 hover:text-white'
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setSloganLang('it')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sloganLang === 'it' ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/50' : 'bg-[#052832] text-slate-300 hover:text-white'
              }`}
            >
              IT
            </button>
            <button
              onClick={() => setSloganLang('en')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sloganLang === 'en' ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/50' : 'bg-[#052832] text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <p className="text-sm sm:text-base italic max-w-3xl mx-auto leading-relaxed font-light text-slate-200">
            {sloganLang === 'de' && 'Dolomiti NordicSki ist mehr als nur ein Langlaufkarussell. Es ist ein gemeinsames Ökosystem, ein grenzüberschreitendes Netzwerk und eine Gemeinschaft von Menschen, die durch gemeinsame Werte verbunden sind.'}
            {sloganLang === 'it' && 'Dolomiti NordicSki non è solo un carosello per lo sci di fondo. È un ecosistema condiviso, un network transfrontaliero ed una comunità di persone unite da valori comuni.'}
            {sloganLang === 'en' && 'Dolomiti NordicSki is more than just a skiing destination. It is a shared ecosystem, a cross-border network, and a community united by common values.'}
          </p>
        </div>

        {/* KERNWERTE DES LANGLAUFKARUSSELLS / CORE VALUES */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AAD0D1]">
              CREDO & CORE VALUES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Be_Vietnam_Pro'] text-white">
              {lang === 'de' && 'Kernwerte des Langlaufkarussells'}
              {lang === 'it' && 'Valori Fondamentali del Carosello'}
              {lang === 'en' && 'Carousel Core Values'}
            </h3>
            <p className="text-xs text-slate-300">
              {lang === 'de' && 'Die 6 Grundwerte, die unsere tägliche Arbeit, Qualität und Kommunikation leiten:'}
              {lang === 'it' && 'I 6 valori guida che definiscono la nostra identità, qualità e comunicazione:'}
              {lang === 'en' && 'The 6 core values defining our identity, quality standards, and communication:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-xl">
              <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'de' && 'PASSION & HINGABE'}
                {lang === 'it' && 'PASSIONE & DEDIZIONE'}
                {lang === 'en' && 'PASSION & DEDICATION'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'de' && 'Das tiefe Engagement und die Liebe zum Langlaufsport in allen seinen Facetten.'}
                {lang === 'it' && 'Il profondo impegno e l\'amore per lo sci di fondo in tutte le sue sfumature agonistiche ed amatoriali.'}
                {lang === 'en' && 'Deep commitment and love for cross-country skiing across all competitive and leisure facets.'}
              </p>
            </div>

            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-xl">
              <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'de' && 'AUTHENTIZITÄT'}
                {lang === 'it' && 'AUTENTICITÀ'}
                {lang === 'en' && 'AUTHENTICITY'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'de' && 'Verbundenheit mit den alpinen Wurzeln, herzliche Gastfreundschaft und Respekt für die Traditionen der Dolomitentäler.'}
                {lang === 'it' && 'Fedeltà alle radici alpine, accoglienza calorosa e rispetto delle tradizioni delle valli dolomitiche.'}
                {lang === 'en' && 'Faithfulness to alpine roots, warm hospitality, and respect for Dolomite valley traditions.'}
              </p>
            </div>

            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-xl">
              <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'de' && 'FREIHEIT & OFFENHEIT'}
                {lang === 'it' && 'LIBERTÀ & APERTURA'}
                {lang === 'en' && 'FREEDOM & OPENNESS'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'de' && 'Grenzenloser Abenteuergeist zwischen Italien und Österreich, Zugänglichkeit und Naturverbundenheit.'}
                {lang === 'it' && 'Lo spirito d\'avventura senza confini tra Italia ed Austria, accessibilità e legame con la natura.'}
                {lang === 'en' && 'Boundless adventurous spirit across Italy and Austria, accessibility, and connection to nature.'}
              </p>
            </div>

            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-xl">
              <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'de' && 'GESUNDHEIT & WOHLBEFINDEN'}
                {lang === 'it' && 'SALUTE & BENESSERE'}
                {lang === 'en' && 'HEALTH & WELL-BEING'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'de' && 'Förderung eines aktiven Lebensstils, herzstärkend und wohltuend für Geist und Regeneration.'}
                {lang === 'it' && 'Promozione di uno stile di vita attivo, benefico per il cuore e la rigenerazione mentale.'}
                {lang === 'en' && 'Promoting an active lifestyle, heart-healthy, and beneficial for mental regeneration.'}
              </p>
            </div>

            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-xl">
              <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'de' && 'NACHHALTIGKEIT & RESPEKT'}
                {lang === 'it' && 'SOSTENIBILITÀ & RISPETTO'}
                {lang === 'en' && 'SUSTAINABILITY & RESPECT'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'de' && 'Schutz der UNESCO-Weltnaturerbe-Bergwelt für einen sanften und bewussten Wintertourismus.'}
                {lang === 'it' && 'Protezione dell\'ambiente montano patrimonio UNESCO per un turismo invernale dolce e consapevole.'}
                {lang === 'en' && 'Protection of the UNESCO World Heritage mountain environment for mindful winter tourism.'}
              </p>
            </div>

            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-xl">
              <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {lang === 'de' && 'INNOVATION & RESILIENZ'}
                {lang === 'it' && 'INNOVAZIONE & RESILIENZA'}
                {lang === 'en' && 'INNOVATION & RESILIENCE'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {lang === 'de' && 'Kontinuierliche Verbesserung der Präparierungstechnik, digitales Ticketing und Gästeservices.'}
                {lang === 'it' && 'Miglioramento continuo delle tecnologie di battitura, biglietteria digitale e servizi per gli ospiti.'}
                {lang === 'en' && 'Continuous enhancement of trail grooming technology, digital ticketing, and guest services.'}
              </p>
            </div>

          </div>
        </div>

        {/* Mission & Network Value */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Award className="w-6 h-6 text-[#AAD0D1]" />
                <span>{content.missionTitle}</span>
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {content.missionParagraph1}
              </p>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {content.missionParagraph2}
              </p>
            </div>

            <div className="pt-6 border-t border-[#417483]/30 flex items-center space-x-4 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-[#AAD0D1] shrink-0" />
              <span>
                {lang === 'it' && 'Standard ufficiali certificati dal Consiglio di Gestione Dolomiti NordicSki.'}
                {lang === 'de' && 'Zertifizierte Qualitätsstandards des Vorstands Dolomiti NordicSki.'}
                {lang === 'en' && 'Certified quality standards managed by Dolomiti NordicSki Board.'}
              </span>
            </div>
          </div>

          {/* Regional Network Box */}
          <div className="lg:col-span-5 bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 w-fit text-[#AAD0D1]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-white">
                {lang === 'it' && 'Network Interregionale Senza Confini'}
                {lang === 'de' && 'Grenzenloses Interregionales Netzwerk'}
                {lang === 'en' && 'Borderless Interregional Network'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'it' && 'Collegando 8 valli tra Alto Adige, Trentino, Cadore/Veneto e Osttirol (Austria), Dolomiti NordicSki rappresenta il carosello transfrontaliero pioniere in Europa per lo sci di fondo.'}
                {lang === 'de' && 'Verbindung von 8 Tälerübergreifenden Langlaufregionen in Südtirol, Osttirol, Trentino und Venetien.'}
                {lang === 'en' && 'Connecting 8 pristine valleys across Italy and Austria under a single unified ski pass.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#417483]/30">
              <div className="flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center space-x-1.5">
                  <TreePine className="w-4 h-4 text-[#AAD0D1]" />
                  <span>Dolomiti UNESCO Heritage</span>
                </span>
                <span className="font-bold text-[#AAD0D1]">100% Protected</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center space-x-1.5">
                  <Mountain className="w-4 h-4 text-[#AAD0D1]" />
                  <span>Snow Guarantee</span>
                </span>
                <span className="font-bold text-[#AAD0D1]">December - April</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="space-y-6">
          <h3 className="text-2xl font-extrabold text-center text-white">
            {lang === 'it' && 'I Tre Pilastri Fondamentali del Brand'}
            {lang === 'de' && 'Die drei Grundpfeiler der Marke'}
            {lang === 'en' && 'The Three Core Pillars of the Brand'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 hover:border-[#AAD0D1]/50 transition-colors shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 flex items-center justify-center text-[#AAD0D1] font-extrabold text-lg">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-lg text-white">{val.title}</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
