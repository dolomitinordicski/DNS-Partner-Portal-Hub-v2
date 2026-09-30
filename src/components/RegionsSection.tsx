import React from 'react';
import { Language } from '../types';
import { NORDIC_REGIONS } from '../data/portalData';
import { AlpinePeakWireframe, SkiTrackWireframe, WireframeBadge } from './WireframeDecorations';
import { 
  MapPin, 
  Building2, 
  ExternalLink
} from 'lucide-react';

interface RegionsSectionProps {
  lang: Language;
}

export const RegionsSection: React.FC<RegionsSectionProps> = ({ lang }) => {
  return (
    <div className="py-12 bg-[#052832] text-white min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#417483]/30 pb-6 space-y-3 relative overflow-hidden">
          <AlpinePeakWireframe className="absolute top-0 right-4 w-28 h-28 opacity-15 pointer-events-none hidden sm:block" />
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#AAD0D1]" />
              <span>
                {lang === 'it' && 'Le 8 Zone del Carosello Dolomiti NordicSki'}
                {lang === 'de' && 'Die 8 Langlaufregionen im Verbund'}
                {lang === 'en' && 'The 8 Carousel Regions'}
              </span>
            </div>
            <WireframeBadge label="8 REGIONS VECTOR" className="text-[#AAD0D1] hidden sm:inline-flex" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'it' && 'Le 8 Aree Alpine & Rete dei Partner'}
            {lang === 'de' && 'Die 8 Regionen & Partnernetzwerk'}
            {lang === 'en' && 'The 8 Regions & Partner Network'}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === 'it' && 'Oltre 1.000 km di piste battute quotidianamente in 8 valli tra le Dolomiti patrimonio mondiale UNESCO e il Tirolo Orientale, tutte accessibili con l\'unico Skipass Dolomiti NordicSki.'}
            {lang === 'de' && 'Über 1.000 km täglich präparierte Loipen in 8 Tälern der Dolomiten und Osttirols.'}
            {lang === 'en' && 'Over 1,000 km of daily groomed cross-country tracks across 8 alpine valleys.'}
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NORDIC_REGIONS.map((region) => (
            <div
              key={region.id}
              className="bg-[#083845] border border-[#417483]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#AAD0D1]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="h-44 relative overflow-hidden">
                  <img 
                    src={region.image} 
                    alt={region.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#083845] via-[#083845]/40 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#052832]/80 backdrop-blur-md border border-[#417483]/40 text-[10px] font-bold text-[#AAD0D1]">
                    {region.kmTracks} KM PISTE
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-[#AAD0D1] transition-colors">
                      {region.name}
                    </h3>
                    <p className="text-[11px] text-slate-200 font-medium truncate">
                      {region.subtitle}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                    {region.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#417483]/30">
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">
                      Punti di Forza / Highlights:
                    </span>
                    <ul className="space-y-1">
                      {region.highlights.map((hl, idx) => (
                        <li key={idx} className="text-[11px] text-slate-200 flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#AAD0D1] shrink-0"></span>
                          <span className="truncate">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-[#052832] border-t border-[#417483]/30 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-slate-200 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#AAD0D1]" />
                  <span>{region.partnerCount} Hotel Partner</span>
                </div>

                <a
                  href={region.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#083845] hover:bg-[#0D4D5E] border border-[#417483]/30 text-slate-200 hover:text-[#AAD0D1] transition-colors"
                  title="Visita sito ufficiale area"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
