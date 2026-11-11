import { DNS_DESIGN_SYSTEM, DNS_FOOTER_GRAPHIC } from '@dolomitinordicski/dns-shared-data';
import React from 'react';
import { DNS_SHARED_WEB_LOGO_URL } from '../../services/foundationBrand';
import { resolveDNSRegionAccent } from '@dolomitinordicski/dns-shared-data';
import type { Language } from '../../types';
import { useRegionLogos } from './useRegionLogos';
import type { PublicWidgetSnapshot } from './usePublicWidgetSnapshot';

interface Props { lang: Language; snapshot: PublicWidgetSnapshot | null; regionName: string; includeTrails: boolean; includeWeather: boolean; includePrices: boolean; paletteColor: string; isLight: boolean; areaId: string; layout: 'standard' | 'compact' }

export function PublishedWidgetData({ lang, snapshot, regionName, includeTrails, includeWeather, includePrices, paletteColor, isLight, areaId, layout }: Props) {
  const label = lang === 'de' ? 'Veröffentlichte Daten' : lang === 'it' ? 'Dati pubblicati' : 'Published data';
  const productLabel: Record<string, [string, string, string]> = {
    day: ['Tageskarte', 'Giornaliero', 'Day pass'],
    'wk-area': ['Wochenkarte Gebiet', 'Settimanale area', 'Area weekly pass'],
    'wk-dns': ['Wochenkarte DNS', 'Settimanale DNS', 'DNS weekly pass'],
    'sk-area': ['Saisonkarte Gebiet', 'Stagionale area', 'Area season pass'],
    'sk-dns': ['Saisonkarte DNS', 'Stagionale DNS', 'DNS season pass'],
    'sk-instructor': ['Saisonkarte Skilehrer', 'Stagionale maestro', 'Instructor season pass'],
  };
  const priceItems = snapshot?.pricing.status === 'available'
    ? snapshot.pricing.items.filter(p => p.currency === 'EUR' && Number.isFinite(p.amount) && p.amount >= 0)
    : [];
  const trailObservedAt = snapshot?.trails.observedAt ? Date.parse(snapshot.trails.observedAt) : NaN;
  const trailsFresh = Number.isFinite(trailObservedAt) && trailObservedAt <= Date.now() + 60000 && Date.now() - trailObservedAt <= 24 * 60 * 60 * 1000;
  const trails = snapshot?.trails.status === 'available' && trailsFresh ? snapshot.trails : null;
  const weather = snapshot?.weather.status === 'available' ? snapshot.weather : null;
  const regionLogos = useRegionLogos(areaId);
  const c = DNS_DESIGN_SYSTEM.colors;
  const accent = areaId === 'all' ? null : resolveDNSRegionAccent(areaId);
  const tr = (de: string, it: string, en: string) => lang === 'de' ? de : lang === 'it' ? it : en;
  const valueColor = isLight ? c.deep : c.surface;
  const compact = layout === 'compact';
  const observationLabel = (value: string | null | undefined) => {
    if (!value || !Number.isFinite(Date.parse(value))) return null;
    return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : lang === 'it' ? 'it-IT' : 'en-GB', {
      dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Rome'
    }).format(new Date(value));
  };
  return (
    <section aria-label={label} className="overflow-hidden rounded-2xl border relative isolate" style={{ borderColor: c.border, background: c.surface, color: c.darkText, boxShadow: "0 18px 60px rgba(13,77,94,.14)", fontFamily: DNS_DESIGN_SYSTEM.typography.primaryFamily }}>
      {accent && <div aria-hidden="true" className="h-1.5 w-full" style={{ background: accent }} />}
      <header className={compact ? "relative overflow-hidden px-5 py-4 space-y-2" : "relative overflow-hidden p-6 sm:p-9 space-y-6"} style={{ background: `linear-gradient(125deg, ${paletteColor} 0%, ${c.mid} 65%, ${c.deep} 100%)`, color: isLight ? c.deep : c.surface, minHeight: compact ? 96 : 220 }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 88% 12%, rgba(255,255,255,.32), transparent 52%), linear-gradient(155deg, rgba(255,255,255,.18), transparent 65%)" }} />
        <img src={DNS_FOOTER_GRAPHIC.url} alt="" aria-hidden="true" className="absolute bottom-0 right-0 w-4/5 max-w-xl pointer-events-none opacity-25" />
        <p className={compact ? "relative text-[10px] font-bold uppercase tracking-wider opacity-90" : "relative text-xs font-bold uppercase tracking-wider opacity-90"}>{tr('Dolomiti NordicSki · Widget-Vorschau', 'Dolomiti NordicSki · Anteprima widget', 'Dolomiti NordicSki · Widget preview')}</p>
        <div className={compact ? "relative flex flex-wrap items-center gap-3" : "relative flex flex-wrap items-center gap-4"}>
          {areaId === "all" && <img src={DNS_SHARED_WEB_LOGO_URL} alt="Dolomiti NordicSki" className="max-h-16 max-w-36 object-contain" />}
          {regionLogos.logos.length > 0 && (
            <div aria-label={tr('Gebietslogos', 'Loghi area', 'Area logos')}
              className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 overflow-hidden rounded-xl border px-3 py-2 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,.94)', borderColor: accent ?? c.border, boxShadow: DNS_DESIGN_SYSTEM.shadow.card }}>
              {regionLogos.logos.map((logo, index) => (
                <React.Fragment key={logo.id}>
                  {index > 0 && <span aria-hidden="true" className="h-7 w-px shrink-0" style={{ background: c.border }} />}
                  <img src={logo.url} alt={logo.label} loading="lazy"
                    className={compact ? "block h-8 max-w-24 shrink-0 object-contain" : "block h-11 sm:h-12 max-w-32 shrink-0 object-contain"}
                    style={{ width: 'auto' }} />
                </React.Fragment>
              ))}
            </div>
          )}
          {regionLogos.status === 'ready' && regionLogos.logos.length === 0 && snapshot?.logo?.url?.startsWith('https://') && snapshot.logo.url !== DNS_SHARED_WEB_LOGO_URL && <img src={snapshot.logo.url} alt={snapshot.logo.alt[lang]} className="max-h-16 max-w-36 object-contain" />}
          <div className="min-w-0 flex-1">
            <h3 className={compact ? "text-lg sm:text-xl font-extrabold leading-tight tracking-tight" : "text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight"}>{regionName}</h3>
            <p className="text-xs mt-1 opacity-80">{snapshot ? tr('Aktueller Loipenstatus', 'Stato piste aggiornato', 'Current trail status') : tr('Noch keine Live-Daten verfügbar', 'Dati live non ancora disponibili', 'Live data not yet available')}</p>
          </div>
        </div>
      </header>
      <div className={compact ? "px-5 py-4 flex flex-wrap gap-4 items-start" : "p-6 sm:p-8 space-y-6"}>
        {!snapshot && <p role="status" className="text-sm" style={{ color: c.mid }}>{tr('Die Gestaltung ist sichtbar; offizielle Daten sind noch nicht veröffentlicht.', 'Il layout è visibile; i dati ufficiali non sono ancora pubblicati.', 'Layout preview is available; official data has not been published yet.')}</p>}
        {includeTrails && <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.mid }}>{tr('Loipenstatus', 'Stato piste', 'Trail status')}</h4>
          <p className={compact ? "text-lg font-extrabold" : "text-2xl font-extrabold"} style={{ color: c.deep }}>{tr('Offene Kilometer', 'Chilometri aperti', 'Open kilometers')} · {trails?.openKm ?? '—'} <span className="text-sm">/ {trails?.totalKm ?? '—'} km</span></p>{trails?.observedAt && <p className="text-xs" style={{ color: c.mid }}>{tr('DNS-Website geprüft', 'Sito DNS verificato', 'DNS website checked')}: {observationLabel(trails.observedAt)}</p>}
        </div>}
        {includeWeather && <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.mid }}>{tr('Wetter & Schnee', 'Meteo e neve', 'Weather & snow')}</h4>
          <div className={compact ? "flex flex-wrap gap-2" : "grid grid-cols-2 gap-3"}>
            <div className="rounded-xl border p-4 backdrop-blur-md" style={{ background: "linear-gradient(145deg, rgba(170,208,209,.26), rgba(255,255,255,.72))", borderColor: c.border }}><p className="text-xs">{tr('Temperatur', 'Temperatura', 'Temperature')}</p><p className="text-xl font-bold" style={{ color: c.deep }}>{weather?.temperatureC == null ? '—' : weather.temperatureC + ' °C'}</p></div>
            <div className="rounded-md p-4" style={{ background: c.background }}><p className="text-xs">{tr('Schnee', 'Neve', 'Snow')}</p><p className="text-xl font-bold" style={{ color: c.deep }}>{weather?.snowDepthCm == null ? '—' : weather.snowDepthCm + ' cm'}</p></div>
          </div>{weather?.observedAt && <p className="text-xs" style={{ color: c.mid }}>{tr('Stand', 'Rilevazione', 'Observed')}: {observationLabel(weather.observedAt)}</p>}
        </div>}
        {includePrices && <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.mid }}>{tr('Loipenpass-Tarife', 'Tariffe sci di fondo', 'Cross-country pass prices')}</h4>
          {priceItems.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{priceItems.map(p => <div key={p.productCode} className="rounded-md p-4" style={{ background: c.background }}><p className="text-xs">{productLabel[p.productCode]?.[lang === 'de' ? 0 : lang === 'it' ? 1 : 2] ?? p.productCode}</p><p className="text-lg font-bold" style={{ color: c.deep }}>{new Intl.NumberFormat(lang, { style: 'currency', currency: p.currency }).format(p.amount)}</p></div>)}</div> : <p className="text-sm">{tr('Preise nicht verfügbar', 'Prezzi non disponibili', 'Prices unavailable')}</p>}
        </div>}
      </div>
      <footer className={compact ? "px-5 py-2 flex flex-wrap items-center justify-between gap-3 text-[10px] font-semibold" : "px-5 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold"} style={{ borderTop: '1px solid ' + c.border, color: c.mid }}><span>Powered by Dolomiti NordicSki</span>{areaId !== "all" && <img src={DNS_SHARED_WEB_LOGO_URL} alt="Dolomiti NordicSki" className="ml-auto max-h-12 max-w-32 object-contain" />}</footer>
    </section>
  );
}
