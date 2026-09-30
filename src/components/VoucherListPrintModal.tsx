import React from 'react';
import { Language, SkipassVoucher } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { Printer, X, Building2, Calendar, FileText, ArrowLeft, Euro } from 'lucide-react';

interface VoucherListPrintModalProps {
  vouchers: SkipassVoucher[];
  lang: Language;
  title: string;
  subtitle: string;
  onClose: () => void;
}

export const VoucherListPrintModal: React.FC<VoucherListPrintModalProps> = ({
  vouchers,
  lang,
  title,
  subtitle,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const totalAmount = vouchers.reduce((acc, v) => acc + (v.totalPrice || 0), 0);
  const totalGuests = vouchers.reduce((acc, v) => acc + (v.guestCount || 1), 0);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden no-print-bg">
      <div className="bg-[#052832] border border-[#417483]/50 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-fadeIn">
        
        {/* Top Controls Bar */}
        <div className="no-print bg-[#083845] px-4 sm:px-6 py-3.5 border-b border-[#417483]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                {title}
              </h3>
              <p className="text-[11px] text-[#AAD0D1]">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] border border-[#AAD0D1]/40 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#AAD0D1]" />
              <span>
                {lang === 'de' ? 'Drucken / PDF' : lang === 'it' ? 'Stampa Registro (PDF)' : 'Print Registry (PDF)'}
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

        {/* Printable Voucher Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/90 flex flex-col items-center justify-start space-y-6">
          
          <div className="printable-voucher-card bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#0D4D5E] w-full relative space-y-6 shrink-0 my-2">
            
            {/* Header Banner */}
            <div className="flex items-start justify-between border-b-2 border-[#0D4D5E] pb-5">
              <div className="space-y-1">
                <span className="font-black text-[#0D4D5E] text-2xl tracking-tight block font-['Be_Vietnam_Pro']">
                  DOLOMITI NORDICSKI
                </span>
                <span className="text-xs font-extrabold tracking-widest text-[#083845] block font-mono uppercase">
                  {title}
                </span>
                <span className="text-[11px] text-slate-500 block font-medium">
                  {subtitle} • {lang === 'de' ? 'Erstellt am:' : 'Data stampa:'} {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-[#0D4D5E]/30 shadow-sm shrink-0 flex items-center justify-center">
                <img 
                  src={DNS_LOGO_BASE64} 
                  alt="Dolomiti NordicSki Official Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Summary KPI Bar */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Totale Voucher</span>
                <span className="text-xl font-black text-[#0D4D5E]">{vouchers.length}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Totale Ospiti</span>
                <span className="text-xl font-black text-[#0D4D5E]">{totalGuests}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">Valore Totale</span>
                <span className="text-xl font-black text-emerald-700">€{totalAmount},00</span>
              </div>
            </div>

            {/* Vouchers Table */}
            {vouchers.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm italic">
                Nessun voucher emesso presente in questo registro.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0D4D5E] text-white font-bold text-[11px] uppercase tracking-wider">
                      <th className="p-2.5 rounded-tl-lg">Codice QR</th>
                      <th className="p-2.5">Ospite / Intestatario</th>
                      <th className="p-2.5">Struttura / Codice</th>
                      <th className="p-2.5">Dettagli Pass / Pacchetto</th>
                      <th className="p-2.5">Validità</th>
                      <th className="p-2.5 text-right rounded-tr-lg">Importo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {vouchers.map((v, index) => {
                      const isPkg = v.voucherCategory === 'package';
                      return (
                        <tr key={v.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}>
                          <td className="p-2.5 font-mono font-bold text-[#0D4D5E] whitespace-nowrap">
                            {v.voucherCode}
                          </td>
                          <td className="p-2.5 font-semibold">
                            <div>{v.guestName}</div>
                            <div className="text-[10px] text-slate-500">{v.guestCount} pers.</div>
                          </td>
                          <td className="p-2.5 text-slate-700">
                            <div className="font-medium truncate max-w-[140px]">{v.accommodationName}</div>
                            <div className="text-[10px] font-mono text-slate-400">{v.partnerCode}</div>
                          </td>
                          <td className="p-2.5">
                            {isPkg ? (
                              <div>
                                <span className="font-bold text-[#0D4D5E] block">{v.packageName}</span>
                                <span className="text-[10px] text-slate-500">{v.regionName}</span>
                              </div>
                            ) : (
                              <div>
                                <span className="font-bold text-slate-900 uppercase">{v.skipassType}</span>
                                <span className="text-[10px] text-slate-500 block">
                                  {v.coverage === 'dolomiti' ? 'Dolomiti NordicSki' : v.selectedRegion}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="p-2.5 font-mono text-[11px]">
                            {v.validFrom} <br />
                            <span className="text-slate-500">fino a {v.validTo}</span>
                          </td>
                          <td className="p-2.5 text-right font-bold text-slate-900 whitespace-nowrap">
                            €{v.totalPrice},00
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-extrabold text-xs border-t-2 border-[#0D4D5E]">
                      <td colSpan={5} className="p-3 text-right uppercase">Totale Complessivo Registro:</td>
                      <td className="p-3 text-right text-emerald-800 text-sm">€{totalAmount},00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Stamp / Signature */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-dashed border-slate-300">
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Timbro e Firma Responsabile Struttura
                </span>
                <div className="border-b border-slate-400 w-full"></div>
              </div>
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Verifica Ufficio Centrale Dolomiti NordicSki
                </span>
                <div className="border-b border-slate-400 w-full"></div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-[9px] text-slate-400 text-center font-mono pt-2">
              Dolomiti NordicSki &bull; Registro ufficiale voucher B2B emessi &bull; Documento ad uso contabile interno
            </div>

          </div>

          <div className="no-print flex items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-lg border border-[#AAD0D1]/50 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#AAD0D1]" />
              <span>Stampa Ora / Salva come PDF</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
