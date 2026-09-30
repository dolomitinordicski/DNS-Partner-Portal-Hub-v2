import React from 'react';
import { Language, SkipassVoucher } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { SecureQrCode } from './SecureQrCode';
import { Printer, X, CheckCircle2, Building2, Calendar, User, MapPin, ArrowLeft, Home } from 'lucide-react';

interface VoucherPrintModalProps {
  voucher: SkipassVoucher;
  lang: Language;
  onClose: () => void;
}

export const VoucherPrintModal: React.FC<VoucherPrintModalProps> = ({ voucher, lang, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const isPackage = voucher.voucherCategory === 'package';
  const qrValidationUrl = `https://www.dolomitinordicski.com/verify?code=${encodeURIComponent(voucher.voucherCode)}`;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden no-print-bg">
      <div className="bg-[#052832] border border-[#417483]/50 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-fadeIn">
        
        {/* Modal Header Controls Bar (Fixed at top, hidden during printing) */}
        <div className="no-print bg-[#083845] px-4 sm:px-6 py-3.5 border-b border-[#417483]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center group"
              title={lang === 'de' ? 'Zurück zum Portal' : 'Torna al Portale'}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                {lang === 'de' && 'Gutschein Drucken & PDF Export'}
                {lang === 'it' && 'Stampa Voucher & Export PDF'}
                {lang === 'en' && 'Print Voucher & PDF Export'}
              </h3>
              <p className="text-[11px] text-[#AAD0D1]">
                {lang === 'de' ? 'Offizielles Dolomiti NordicSki Layout' : 'Template Ufficiale Dolomiti NordicSki'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] border border-[#AAD0D1]/40 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#AAD0D1]" />
              <span className="hidden sm:inline">
                {lang === 'de' ? 'Drucken / PDF' : lang === 'it' ? 'Stampa / PDF' : 'Print / PDF'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'de' ? 'Schließen' : lang === 'it' ? 'Chiudi' : 'Close'}
              </span>
            </button>
          </div>
        </div>

        {/* PRINTABLE VOUCHER TEMPLATE SCROLLABLE CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/80 flex flex-col items-center justify-start space-y-6">
          
          <div className="printable-voucher-card bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#0D4D5E] w-full max-w-2xl relative space-y-6 shrink-0 my-2">
            
            {/* 1. OFFICIAL HEADER BANNER */}
            <div className="flex items-start justify-between border-b-2 border-[#0D4D5E] pb-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-black text-[#0D4D5E] text-2xl sm:text-3xl tracking-tight block font-['Be_Vietnam_Pro']">
                    DOLOMITI NORDICSKI
                  </span>
                </div>
                <span className="text-[11px] font-extrabold tracking-widest text-[#083845] block font-mono">
                  {isPackage ? 'OFFICIAL HOTEL PACKAGE VOUCHER' : 'OFFICIAL SKIPASS & LOIPENPASS VOUCHER'}
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {lang === 'de' ? 'Europas größtes Langlaufkarussell • 1.000 km Loipen' : 'Il carosello sci di fondo #1 in Europa • 1.000 km di piste'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-[#0D4D5E]/30 shadow-sm shrink-0 flex items-center justify-center">
                <img 
                  src={DNS_LOGO_BASE64} 
                  alt="Dolomiti NordicSki Official Logo" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* 2. VOUCHER CODE & VERIFICATION BADGE */}
            <div className="bg-[#0D4D5E]/5 p-4 rounded-xl border border-[#0D4D5E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">
                  {lang === 'de' ? 'GUTSCHEIN CODE' : 'CODICE VOUCHER DI VERIFICA'}
                </span>
                <span className="font-mono font-black text-xl text-[#0D4D5E] block tracking-wider">
                  {voucher.voucherCode}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {lang === 'de' ? 'Erstellt am:' : 'Emesso il:'} {new Date(voucher.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-800">
                  {lang === 'de' ? 'OFFIZIELL VERIFIZIERT' : 'SISTEMA UFFICIALE VERIFICATO'}
                </span>
              </div>
            </div>

            {/* 3. MAIN DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Guest Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center space-x-1.5 text-[#0D4D5E] font-bold">
                  <User className="w-4 h-4" />
                  <span className="uppercase text-[10px]">{lang === 'de' ? 'GAST / INHABER' : 'INTESTA OSPITE'}</span>
                </div>
                <span className="font-extrabold text-base text-slate-900 block">{voucher.guestName}</span>
                <span className="text-slate-600 font-medium">
                  {voucher.guestCount} {lang === 'de' ? 'Personen' : 'ospite/i'}
                </span>
              </div>

              {/* Partner Hotel Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center space-x-1.5 text-[#0D4D5E] font-bold">
                  <Building2 className="w-4 h-4" />
                  <span className="uppercase text-[10px]">{lang === 'de' ? 'PARTNERBETRIEB' : 'STRUTTURA RICETTIVA'}</span>
                </div>
                <span className="font-bold text-slate-900 text-sm block">{voucher.accommodationName}</span>
                <span className="text-[10px] font-mono text-slate-500 block">Codice Partner: {voucher.partnerCode}</span>
              </div>

            </div>

            {/* 4. SPECIFIC VOUCHER CONTENT */}
            {isPackage ? (
              <div className="bg-[#083845]/5 p-4 rounded-xl border border-[#083845]/20 space-y-3">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    {lang === 'de' ? 'PAUSCHALANGEBOT' : 'NOME PACCHETTO SOGGIORNO'}
                  </span>
                  <span className="font-black text-base text-[#0D4D5E] block">{voucher.packageName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      {lang === 'de' ? 'Urlaubsregion' : 'Area di Soggiorno'}
                    </span>
                    <span className="font-bold text-slate-800 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#0D4D5E]" />
                      <span>{voucher.regionName || 'Dolomiti NordicSki'}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      {lang === 'de' ? 'Gültigkeitszeitraum' : 'Date di Soggiorno'}
                    </span>
                    <span className="font-mono font-bold text-slate-900 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[#0D4D5E]" />
                      <span>{voucher.stayDates}</span>
                    </span>
                  </div>
                </div>

                {voucher.includedServices && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      {lang === 'de' ? 'Inbegriffene Leistungen & Skipass' : 'Servizi Inclusi nel Pacchetto'}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal mt-0.5">
                      {voucher.includedServices}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#083845]/5 p-4 rounded-xl border border-[#083845]/20 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      {lang === 'de' ? 'LOIPENPASS TYP' : 'TIPO SKIPASS & DURATA'}
                    </span>
                    <span className="font-black text-sm text-[#0D4D5E] uppercase block">
                      {voucher.skipassType}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      {lang === 'de' ? 'GEBIETSDECKUNG' : 'COPERTURA TERRITORIALE'}
                    </span>
                    <span className="font-bold text-slate-800 uppercase block">
                      {voucher.coverage === 'dolomiti' ? 'Dolomiti NordicSki 1.000 km' : voucher.selectedRegion}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Gültig von / Valid from</span>
                    <span className="font-mono font-bold text-slate-900">{voucher.validFrom}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Gültig bis / Valid to</span>
                    <span className="font-mono font-bold text-slate-900">{voucher.validTo}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. PRICE & QR CODE ROW */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                  {lang === 'de' ? 'GESAMTWERT' : 'VALORE TOTALE VOUCHER'}
                </span>
                <span className="font-black text-2xl text-[#0D4D5E] block">
                  €{voucher.totalPrice},00
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  {lang === 'de' ? 'Inkl. MwSt. e Abgaben' : 'Iva e servizi inclusi'}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Digital Scan</span>
                  <span className="text-[10px] font-bold text-[#0D4D5E] block">Digital Validation QR</span>
                </div>
                <div className="w-20 h-20 bg-white p-1 rounded-xl border-2 border-[#0D4D5E] shrink-0 shadow-sm">
                  <SecureQrCode value={qrValidationUrl} size={200} alt="Voucher Validation QR" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            {/* 6. SIGNATURE & STAMP FIELDS */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-dashed border-slate-300">
              <div className="space-y-8">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  {lang === 'de' ? 'Unterschrift / Stempel Hotel' : 'Firma e Timbro Hotel Partner'}
                </span>
                <div className="border-b border-slate-400 w-full"></div>
              </div>

              <div className="space-y-8">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  {lang === 'de' ? 'Unterschrift Gast' : 'Firma per Accettazione Ospite'}
                </span>
                <div className="border-b border-slate-400 w-full"></div>
              </div>
            </div>

            {/* 7. FOOTER LEGAL NOTICE */}
            <div className="pt-3 text-[9px] text-slate-400 text-center leading-tight space-y-1 font-mono">
              <p>
                Dolomiti NordicSki - Ufficio Centrale & Partner Network • www.dolomitinordicski.com
              </p>
              <p>
                {lang === 'de' 
                  ? 'Dieser Gutschein ist beim offiziellen Ticketoffice vorzuweisen. Nicht übertragbar.' 
                  : 'Il presente voucher è un documento ufficiale B2B da presentare presso le casse autorizzate Dolomiti NordicSki. Non cedibile.'}
              </p>
            </div>

          </div>

          {/* Bottom Action Footer inside Scroll View */}
          <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl py-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#083845] hover:bg-[#0D4D5E] text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg border border-[#417483]/50 cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#AAD0D1]" />
              <span>
                {lang === 'de' 
                  ? 'Schließen und zurück zum Portal' 
                  : lang === 'en'
                  ? 'Close & Return to Portal'
                  : 'Chiudi e Torna al Portale'}
              </span>
            </button>
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg border border-[#AAD0D1]/50 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#AAD0D1]" />
              <span>
                {lang === 'de' ? 'Gutschein Drucken (PDF)' : 'Stampa Documento Voucher (PDF)'}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

