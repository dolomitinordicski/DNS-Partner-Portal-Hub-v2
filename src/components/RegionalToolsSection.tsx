import React, { useState } from 'react';
import { Language, AccessLevel } from '../types';
import { 
  FolderGit2, 
  BarChart3, 
  FileText, 
  ExternalLink, 
  Lock, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  MapPin, 
  FolderArchive, 
  PieChart, 
  ArrowUpRight,
  Code,
  Building2,
  Landmark,
  Calculator,
  GitBranch
} from 'lucide-react';

interface RegionalToolsSectionProps {
  lang: Language;
  accessLevel: AccessLevel;
  partnerName?: string;
  partnerCode?: string;
  onOpenLoginModal: () => void;
  onNavigateToTab?: (tab: any) => void;
}

export const RegionalToolsSection: React.FC<RegionalToolsSectionProps> = ({
  lang,
  accessLevel,
  partnerName,
  partnerCode,
  onOpenLoginModal,
  onNavigateToTab
}) => {
  const [showAnalyticsEmbed, setShowAnalyticsEmbed] = useState<boolean>(false);

  const googleDriveUrl = "https://drive.google.com/drive/folders/1P3eZ4a6SCRucX90uBrRaW9-m1fPE0cdp?usp=drive_link";
  const analyticsUrl = "https://dolomitinordicski.github.io/analytics/";
  const fairModelUrl = "https://github.com/dolomitinordicski/fair-model";

  const isRegionalOrAdmin = accessLevel === 'regional' || accessLevel === 'admin';

  return (
    <div className="py-10 bg-[#052832] min-h-screen text-white space-y-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Banner / Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#083845] via-[#0D4D5E] to-[#052832] p-6 sm:p-10 border border-[#417483]/40 shadow-2xl space-y-4">
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
            <BarChart3 className="w-80 h-80 text-[#AAD0D1]" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#417483]/30 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#052832] border border-[#AAD0D1]/40 text-[#AAD0D1] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                <span>
                  {lang === 'it' && 'Area Riservata Partner Regionali & TVB'}
                  {lang === 'de' && 'B2B Portal für Tourismusverbände'}
                  {lang === 'en' && 'Regional Partners & Tourist Board Portal'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {lang === 'it' && 'Toolbox Gestionale & Statistiche B2B'}
                {lang === 'de' && 'Management Toolbox & Regionalstatistik'}
                {lang === 'en' && 'Management Toolbox & Analytics'}
              </h1>
            </div>

            {isRegionalOrAdmin ? (
              <div className="flex items-center space-x-3 bg-[#052832]/80 border border-teal-400/40 px-4 py-2.5 rounded-2xl shadow-inner">
                <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-300 block">
                    {lang === 'it' ? 'Account Connesso' : 'Active Partner'}
                  </span>
                  <span className="text-xs font-extrabold text-white">
                    {partnerName || 'Ente Regionale Partner'}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#052832] font-extrabold text-xs transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{lang === 'it' ? 'Accedi come Partner Regionale' : 'Log in as Regional Partner'}</span>
              </button>
            )}
          </div>

          <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            {lang === 'it' && 'Piattaforma operativa B2B riservata agli uffici turistici, consorzi di area ed enti regionali Dolomiti NordicSki per la gestione documentale condivisa e l\'analisi dei flussi turistici e vendite skipass.'}
            {lang === 'de' && 'Operative B2B-Plattform für Tourismusverbände und regionale Partner der Dolomiti NordicSki Regionen.'}
            {lang === 'en' && 'B2B hub for tourist boards and regional management partners to access official cloud drives, analytics, and regional press kits.'}
          </p>
        </div>

        {/* Access Restriction Notice if Public or Partner */}
        {!isRegionalOrAdmin && (
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-white text-base">
                  {lang === 'it' ? 'Strumenti Riservati ai Partner Regionali' : 'Restricted Regional Partner Area'}
                </h3>
                <p className="text-xs text-amber-200/80">
                  {lang === 'it' 
                    ? 'Stai visualizzando l\'anteprima pubblica. Per accedere ai collegamenti diretti del Google Drive gestionale e dello strumento di statistica avanzato, effettua l\'accesso con le tue credenziali di Ente / TVB.'
                    : 'To open direct cloud drives and analytics tools, please authenticate with your regional partner credentials.'}
                </p>
              </div>
            </div>
            <button
              onClick={onOpenLoginModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#052832] font-extrabold text-xs transition-all whitespace-nowrap cursor-pointer"
            >
              {lang === 'it' ? 'Sblocca Accesso Regionale' : 'Unlock Access'}
            </button>
          </div>
        )}

        {/* Grid of Main Regional Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* TOOL 1: GOOGLE DRIVE MANAGERIAL TOOLBOX */}
          <div className="bg-[#083845] border border-[#417483]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative flex flex-col justify-between group hover:border-[#AAD0D1]/60 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300">
                  <FolderGit2 className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#052832] border border-[#417483]/40 text-[11px] font-mono font-bold text-[#AAD0D1]">
                  Google Drive B2B
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white group-hover:text-[#AAD0D1] transition-colors">
                  {lang === 'de' && 'Verwaltung Toolbox Cloud'}
                  {lang === 'it' && 'Toolbox Gestionale Cloud'}
                  {lang === 'en' && 'Cloud Management Toolbox'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {lang === 'de' && 'Direkter Zugriff auf das offizielle Google Drive Repository für Verwaltung, Grafik, Vektorlogos und Protokolle.'}
                  {lang === 'it' && 'Accesso diretto al repositorio Google Drive ufficiale condiviso per la gestione delle aree Dolomiti NordicSki. Contiene loghi ad alta risoluzione, modulistica per eventi e comunicati stampa.'}
                  {lang === 'en' && 'Direct access to the official Google Drive repository for regional management, graphics, vector logos, and official protocols.'}
                </p>
              </div>

              {/* Resource List Highlights */}
              <div className="bg-[#052832] p-4 rounded-2xl border border-[#417483]/30 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-[#AAD0D1] flex items-center space-x-1.5">
                  <FolderArchive className="w-4 h-4 text-teal-400" />
                  <span>
                    {lang === 'de' && 'Gemeinsame Ordnerinhalte:'}
                    {lang === 'it' && 'Contenuti Cartelle Condivise:'}
                    {lang === 'en' && 'Shared Folder Contents:'}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>{lang === 'de' ? 'Vektorlogos & Master Assets' : lang === 'it' ? 'Loghi Vettoriali e Master Brand Assets (.EPS, .SVG)' : 'Vector Logos and Brand Assets'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>{lang === 'de' ? 'Qualitätskriterien & Handbücher' : lang === 'it' ? 'Modulistica Ufficiale & Manuali Criteri Qualità' : 'Official Guidelines and Quality Manuals'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>{lang === 'de' ? 'Panoramakarten HD & Vektorkarten' : lang === 'it' ? 'Cartine Panoramiche HD & Mappe Vettoriali Piste' : 'HD Panoramic Maps & Vector Trail Maps'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>{lang === 'de' ? 'B2B Press Kit & Pressefotos' : lang === 'it' ? 'Press Kit B2B & Foto Ufficiali Stampa High-Res' : 'B2B Press Kit & High-Res Photography'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#417483]/30">
              <a
                href={googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer group-hover:scale-[1.01]"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'Google Drive öffnen'}
                  {lang === 'it' && 'Apri Google Drive Gestionale'}
                  {lang === 'en' && 'Open Google Drive Toolbox'}
                </span>
                <ArrowUpRight className="w-4 h-4 text-teal-200" />
              </a>
            </div>
          </div>

          {/* TOOL 2: STATISTIC TOOL & ANALYTICS */}
          <div className="bg-[#083845] border border-[#417483]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative flex flex-col justify-between group hover:border-[#AAD0D1]/60 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#052832] border border-[#417483]/40 text-[11px] font-mono font-bold text-amber-300">
                  Analytics Web App
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white group-hover:text-amber-200 transition-colors">
                  {lang === 'de' && 'Statistik & Reporting'}
                  {lang === 'it' && 'Statistic Tool & Reporting'}
                  {lang === 'en' && 'Regional Analytics Tool'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {lang === 'de' && 'Erweiterte Analyseplattform für Drehkreuz-Passagen, Ticketverkäufe, Gästeherkunft und den historischen Vergleich der 8 Regionen.'}
                  {lang === 'it' && 'Piattaforma analitica avanzata per il monitoraggio dei passaggi sui tornelli, la vendita degli skipass stagionali e giornalieri e la comparazione storica tra le 8 aree.'}
                  {lang === 'en' && 'Advanced analytics platform tracking turnstile passes, daily/seasonal ski pass sales, and regional historical traffic comparison.'}
                </p>
              </div>

              {/* Analytics Capabilities */}
              <div className="bg-[#052832] p-4 rounded-2xl border border-[#417483]/30 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-amber-300 flex items-center space-x-1.5">
                  <PieChart className="w-4 h-4 text-amber-300" />
                  <span>
                    {lang === 'de' && 'Statistik-Funktionen:'}
                    {lang === 'it' && 'Funzionalità del Portale Statistico:'}
                    {lang === 'en' && 'Analytics Dashboard Features:'}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{lang === 'de' ? 'Live-Passagen & Drehkreuz-Frequenz' : lang === 'it' ? 'Passaggi In tempo reale e affluenza sui tornelli' : 'Live Turnstile Passes & Trail Traffic'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{lang === 'de' ? 'Ticketverkaufs-Berichte (Dolomiti vs. Regionen)' : lang === 'it' ? 'Report vendite Skipass (Dolomiti vs. Aree Singole)' : 'Ski Pass Sales Breakdown'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{lang === 'de' ? 'Herkunftsland & Herkunft der Skifahrer' : lang === 'it' ? 'Provenienza sciatori e nazionalità degli ospiti' : 'Skier Demographics & Origin Tracking'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{lang === 'de' ? 'Datenexport im CSV- & Excel-Format' : lang === 'it' ? 'Esportazione dati in formato CSV ed Excel per report TVB' : 'Data export in CSV & Excel format'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#417483]/30 flex flex-col sm:flex-row gap-3">
              <a
                href={analyticsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-[#052832] font-extrabold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'Analytics öffnen'}
                  {lang === 'it' && 'Apri Analytics'}
                  {lang === 'en' && 'Open Analytics'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setShowAnalyticsEmbed(!showAnalyticsEmbed)}
                className="py-3.5 px-4 rounded-2xl bg-[#052832] hover:bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{showAnalyticsEmbed ? (lang === 'de' ? 'Schließen' : 'Nascondi') : (lang === 'de' ? 'Vorschau' : 'Anteprima')}</span>
              </button>
            </div>
          </div>

          {/* TOOL 3: FINANCE & MODELLO FAIR (GITHUB REPOSITORY) */}
          <div className="bg-[#083845] border border-[#AAD0D1]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative flex flex-col justify-between group hover:border-[#AAD0D1]/80 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  <Landmark className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#052832] border border-[#417483]/40 text-[11px] font-mono font-bold text-emerald-300 flex items-center space-x-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub Repo</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white group-hover:text-emerald-200 transition-colors">
                  {lang === 'de' && 'Finanzen & FAIR-Modell'}
                  {lang === 'it' && 'Finance & Modello FAIR'}
                  {lang === 'en' && 'Finance & FAIR Model'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {lang === 'de' && 'Finanz- und Ausgleichsmodell FAIR für die Verteilung der Loipenpass-Erlöse auf die 8 Regionen und die interregionale Budgetplanung. Verwaltet auf GitHub.'}
                  {lang === 'it' && 'Modello finanziario e contabile FAIR per il calcolo della perequazione, la ripartizione dei proventi skipass tra le 8 aree e la pianificazione del budget interregionale.'}
                  {lang === 'en' && 'FAIR financial & revenue distribution model across the 8 regions with budget planning algorithms. Managed via GitHub repository.'}
                </p>
              </div>

              {/* Finance Capabilities */}
              <div className="bg-[#052832] p-4 rounded-2xl border border-[#417483]/30 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-emerald-300 flex items-center space-x-1.5">
                  <Calculator className="w-4 h-4 text-emerald-300" />
                  <span>
                    {lang === 'de' && 'FAIR-Modell Funktionen:'}
                    {lang === 'it' && 'Funzionalità Modello FAIR:'}
                    {lang === 'en' && 'FAIR Model Core Features:'}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>
                      {lang === 'de' && 'Algorithmus zur Einnahmenverteilung nach Kilometern & Scans'}
                      {lang === 'it' && 'Algoritmo di ripartizione incassi per km piste e passaggi'}
                      {lang === 'en' && 'Revenue distribution algorithm based on km & scans'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>
                      {lang === 'de' && 'Quellcode & Formeln auf GitHub Repository'}
                      {lang === 'it' && 'Codice sorgente e formule su Repository GitHub'}
                      {lang === 'en' && 'Source code & formulas on GitHub Repository'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>
                      {lang === 'de' && 'Finanzberichte & Ausgleichsberechnung B2B'}
                      {lang === 'it' && 'Report finanziari e calcolo perequativo B2B'}
                      {lang === 'en' && 'Financial reporting & equalization calculation'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>
                      {lang === 'de' && 'Simulations-Tools für die Saisonbudgetierung'}
                      {lang === 'it' && 'Strumenti di simulazione budget stagionale'}
                      {lang === 'en' && 'Seasonal budget simulation tools'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#417483]/30">
              <a
                href={fairModelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer group-hover:scale-[1.01]"
              >
                <GitBranch className="w-4 h-4 text-emerald-200" />
                <span>
                  {lang === 'de' && 'FAIR Repository auf GitHub öffnen'}
                  {lang === 'it' && 'Apri Repository GitHub Modello FAIR'}
                  {lang === 'en' && 'Open FAIR GitHub Repository'}
                </span>
                <ArrowUpRight className="w-4 h-4 text-emerald-200" />
              </a>
            </div>
          </div>

        </div>

        {/* Embedded Web App Preview if toggled */}
        {showAnalyticsEmbed && (
          <div className="bg-[#083845] border border-[#417483]/50 rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#417483]/30 pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-amber-300" />
                <h4 className="font-extrabold text-white text-sm">
                  {lang === 'it' ? 'Anteprima In Tempo Reale - Statistic Tool Dolomiti NordicSki' : 'Live Interactive Analytics Preview'}
                </h4>
              </div>
              <a
                href={analyticsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#AAD0D1] hover:underline flex items-center space-x-1"
              >
                <span>Apri in nuova scheda</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-white border border-[#417483]/30 relative">
              <iframe 
                src={analyticsUrl}
                title="Dolomiti NordicSki Analytics Tool"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}

        {/* SECTION 3: DOCUMENTI UFFICIALI & DOWNLOADS QUICK HUB */}
        <div className="bg-[#083845] border border-[#417483]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#417483]/30 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {lang === 'it' ? 'Documenti Ufficiali B2B & Download Materiali' : 'Official B2B Downloads & Protocols'}
                </h3>
                <p className="text-xs text-slate-200">
                  {lang === 'it' ? 'Risorse istituzionali per la gestione del circuito e promozione territoriale.' : 'Institutional documentation for circuit management and local promotion.'}
                </p>
              </div>
            </div>

            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('downloads')}
                className="px-4 py-2 rounded-xl bg-[#052832] hover:bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'it' ? 'Vai alla Sezione Download Completa' : 'Full Downloads Page'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#052832] border border-[#417483]/30 space-y-2">
              <div className="text-teal-300 font-bold text-xs flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'Qualitätskriterien 2026'}
                  {lang === 'it' && 'Criteri di Qualità 2026'}
                  {lang === 'en' && 'Quality Criteria 2026'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'de' && 'Offizielles Protokoll für Loipenhomologierung und Mindeststandards.'}
                {lang === 'it' && 'Protocollo ufficiale di omologazione piste e servizi minimi garantiti per le 8 aree.'}
                {lang === 'en' && 'Official trail homologation protocol and guaranteed minimum standards.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#052832] border border-[#417483]/30 space-y-2">
              <div className="text-teal-300 font-bold text-xs flex items-center space-x-1.5">
                <Building2 className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'B2B Preislisten'}
                  {lang === 'it' && 'Listini Skipass B2B'}
                  {lang === 'en' && 'B2B Price Lists'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'de' && 'Saisonale Tarifübersicht, Mehrtageskarten und Hotelvereinbarungen.'}
                {lang === 'it' && 'Tabella tariffe ufficiali stagionali, tessere plurigiornaliere e convenzioni alberghiere.'}
                {lang === 'en' && 'Official seasonal tariffs, multi-day passes, and hotel agreements.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#052832] border border-[#417483]/30 space-y-2">
              <div className="text-emerald-300 font-bold text-xs flex items-center space-x-1.5">
                <Landmark className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'FAIR Finanzmodell'}
                  {lang === 'it' && 'Modello FAIR Finance'}
                  {lang === 'en' && 'FAIR Financial Model'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'de' && 'GitHub-Code & Formeln für die interregionale Einnahmenverteilung.'}
                {lang === 'it' && 'Codice GitHub e formule per la ripartizione perequativa dei ricavi tra le 8 zone.'}
                {lang === 'en' && 'GitHub code & formulas for interregional revenue distribution.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#052832] border border-[#417483]/30 space-y-2">
              <div className="text-teal-300 font-bold text-xs flex items-center space-x-1.5">
                <Code className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'Regionales Widget-Kit'}
                  {lang === 'it' && 'Kit Widget Regionale'}
                  {lang === 'en' && 'Regional Widget Kit'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'de' && 'Embeds und APIs zur Einbindung des Loipenberichts auf TVB-Websites.'}
                {lang === 'it' && 'Iframe ed API per integrare il bollettino piste in tempo reale sui siti dei TVB.'}
                {lang === 'en' && 'Embeds and APIs to integrate real-time track reports on tourist board sites.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
