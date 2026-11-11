import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data';
import React, { useState } from 'react';
import { Language, AccessLevel } from '../types';
import { getWidgetAreaName } from './widget-creator/reportingAreas';
import { OFFICIAL_PALETTES, createWidgetEmbed, type WidgetThemePreset } from './widget-creator/embedModel';
import { WidgetControls } from './widget-creator/WidgetControls';
import { Code } from 'lucide-react';
import { SEASONS } from '@dolomitinordicski/dns-shared-data';
import { usePublicWidgetSnapshot } from './widget-creator/usePublicWidgetSnapshot';
import { PublishedWidgetData } from './widget-creator/PublishedWidgetData';

interface WidgetCreatorProps {
  lang: Language;
  accessLevel?: AccessLevel;
}

export const WidgetCreator: React.FC<WidgetCreatorProps> = ({ lang, accessLevel = 'public' }) => {
  // No official certified seal until server-authorized widget entitlement exists.
  const isPartner = false;

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [widgetLang, setWidgetLang] = useState<Language>(lang);
  const [themePreset, setThemePreset] = useState<WidgetThemePreset>('dns-primary');
  const [layout, setLayout] = useState<'standard' | 'compact'>('standard');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Content toggles state
  const [includeTrails, setIncludeTrails] = useState<boolean>(true);
  const [includeWeather, setIncludeWeather] = useState<boolean>(true);
  const [includePrices, setIncludePrices] = useState<boolean>(isPartner ? true : false);

  const includeBadge = false; // Fail-closed: role selected in the client is not certification.

  const regionName = getWidgetAreaName(selectedRegion, widgetLang);
  const currentSeason = SEASONS.find(season => season.status === 'active')?.id;
  const publicData = usePublicWidgetSnapshot(currentSeason ?? '', selectedRegion);

  const activePalette = OFFICIAL_PALETTES.find(p => p.id === themePreset) || OFFICIAL_PALETTES[0];
  const currentBgColor = activePalette.color;
  const isLight = !!activePalette.isLight;

  const { embedCode } = createWidgetEmbed({
    selectedRegion, widgetLang, themePreset, layout, backgroundColor: currentBgColor,
    includeTrails, includeWeather, includePrices, includeBadge
  });

  const handleCopy = async () => {
    if (!embedCode) return;
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      setCopiedCode(false);
    }
  };

  return (
    <div className="py-10 space-y-8" style={{ background: DNS_DESIGN_SYSTEM.colors.background, color: DNS_DESIGN_SYSTEM.colors.darkText, fontFamily: DNS_DESIGN_SYSTEM.typography.primaryFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-current pb-6 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none  border border-current text-inherit text-xs font-bold uppercase tracking-wider">
            <Code className="w-3.5 h-3.5 text-inherit" />
            <span>
              {isPartner
                ? (lang === 'de' ? 'Offizielles Partner-Widget für Hotel-Websites' : lang === 'it' ? 'Widget Ufficiale Struttura Partner Hotel' : 'Official Partner Hotel Widget')
                : (lang === 'de' ? 'Kostenloses Website-Widget' : lang === 'it' ? 'Widget Unificato per il tuo Sito Web' : 'Unified Website Widget')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-inherit tracking-tight">
            {isPartner
              ? (lang === 'de' ? 'Partner Hotel-Widget Generator' : lang === 'it' ? 'Generatore Widget Partner Hotel' : 'Partner Hotel Widget Builder')
              : (lang === 'de' ? 'Dolomiti NordicSki Widget Generator' : lang === 'it' ? 'Generatore Widget Unificato' : 'Unified Widget Builder')}
          </h2>
          <p className="text-inherit text-sm sm:text-base leading-relaxed max-w-3xl font-light">
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
                ? 'Crea un widget con i tre colori corporate Dolomiti NordicSki. Seleziona la lingua (ITA, DE, EN) e configura i moduli da mostrare.'
                : 'Build a unified widget in the three official Dolomiti NordicSki colors. Choose the widget language (ITA, DE, EN) and active content modules.'
            )}
          </p>
        </div>

        <p role="status" className="text-sm text-inherit">
          {publicData.status === 'available' ?
            (lang === 'de' ? 'Veröffentlichte Daten verfügbar' : lang === 'it' ? 'Dati pubblicati disponibili' : 'Published data available') :
            (lang === 'de' ? 'Veröffentlichte Widget-Daten derzeit nicht verfügbar.' : lang === 'it' ? 'Dati pubblicati del widget non ancora disponibili.' : 'Published widget data not yet available.') + (publicData.reason ? ' [' + publicData.reason + ']' : '')}
        </p>

        {/* Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <WidgetControls
            lang={lang} widgetLang={widgetLang} setWidgetLang={setWidgetLang}
            themePreset={themePreset} setThemePreset={setThemePreset}
            layout={layout} setLayout={setLayout}
            selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}
            includeTrails={includeTrails} setIncludeTrails={setIncludeTrails}
            includeWeather={includeWeather} setIncludeWeather={setIncludeWeather}
            includePrices={includePrices} setIncludePrices={setIncludePrices}
            isPartner={isPartner} handleCopy={handleCopy} copiedCode={copiedCode} embedCode={embedCode}
          />

          <div className="lg:col-span-7">
            <PublishedWidgetData lang={widgetLang} snapshot={publicData.snapshot}
              regionName={regionName} includeTrails={includeTrails} includeWeather={includeWeather}
              includePrices={includePrices} paletteColor={currentBgColor} isLight={isLight} areaId={selectedRegion} layout={layout} />
          </div>
        </div>

      </div>
    </div>
  );
};
