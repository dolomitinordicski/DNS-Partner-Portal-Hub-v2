import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data';
import type { DNSWidgetContext } from './widgetContracts';
import type { Language } from '../../types';

export type WidgetThemePreset = 'dns-primary' | 'dns-mid' | 'dns-light';

export const OFFICIAL_PALETTES: {
  id: WidgetThemePreset; label: string; color: string; isLight?: boolean; desc: string;
}[] = [
  { id: 'dns-primary', label: DNS_DESIGN_SYSTEM.corporateColors.frostedIceBlue.name, color: DNS_DESIGN_SYSTEM.colors.deep, desc: DNS_DESIGN_SYSTEM.corporateColors.frostedIceBlue.name },
  { id: 'dns-mid', label: DNS_DESIGN_SYSTEM.corporateColors.nordicSkyBlue.name, color: DNS_DESIGN_SYSTEM.colors.mid, desc: DNS_DESIGN_SYSTEM.corporateColors.nordicSkyBlue.name },
  { id: 'dns-light', label: DNS_DESIGN_SYSTEM.corporateColors.deepGlacierBlue.name, color: DNS_DESIGN_SYSTEM.colors.light, isLight: true, desc: DNS_DESIGN_SYSTEM.corporateColors.deepGlacierBlue.name },
];

export interface WidgetEmbedOptions {
  readonly context?: DNSWidgetContext;
  selectedRegion: string;
  widgetLang: Language;
  themePreset: WidgetThemePreset;
  layout: 'standard' | 'compact';
  backgroundColor: string;
  includeTrails: boolean;
  includeWeather: boolean;
  includePrices: boolean;
  includeBadge: boolean;
}

export function createWidgetEmbed(options: WidgetEmbedOptions) {
  // The partner embed must be issued and validated by DNS Core, never composed client-side.
  // Public embeds retain their existing URL and configuration unchanged.
  if (options.context?.product === 'partner') {
    throw new Error('Partner widgets require a DNS Core-issued embed token and endpoint.');
  }
  const { selectedRegion, widgetLang, themePreset, layout, backgroundColor, includeTrails, includeWeather, includePrices, includeBadge } = options;
  const queryParams = new URLSearchParams({
    dnsWidget: '1',
    area: selectedRegion,
    badge: includeBadge ? '1' : '0',
    trails: includeTrails ? '1' : '0',
    weather: includeWeather ? '1' : '0',
    prices: includePrices ? '1' : '0',
    theme: themePreset,
    layout,
    bg: backgroundColor,
    lang: widgetLang
  }).toString();
  const iframeSrc = `https://dolomitinordicski.github.io/dns-partner-hub/?${queryParams}`;
  const iframeHeight = layout === 'compact' ? 660 : 920; // generous, responsive embed height; no clipped prices
  const embedCode = `<iframe src="${iframeSrc}" width="100%" height="${iframeHeight}" frameborder="0" style="border:none; border-radius:0px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25);" title="Dolomiti NordicSki Live Widget (${widgetLang.toUpperCase()})"></iframe>`;
  return { iframeSrc, iframeHeight, embedCode };
}
