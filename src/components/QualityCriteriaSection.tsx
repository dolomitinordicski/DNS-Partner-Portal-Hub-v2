import React, { useState } from 'react';
import { Language } from '../types';
import { QUALITY_CRITERIA, PARTNER_BENEFITS } from '../data/portalData';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Utensils, 
  Ticket, 
  Info, 
  Shirt, 
  Sparkles,
  Send,
  Globe,
  Download,
  Megaphone,
  Check,
  ChevronRight,
  Gift
} from 'lucide-react';

interface QualityCriteriaSectionProps {
  lang: Language;
  initialTab?: 'benefits' | 'criteria' | 'application';
}

export const QualityCriteriaSection: React.FC<QualityCriteriaSectionProps> = ({ 
  lang, 
  initialTab = 'benefits' 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'benefits' | 'criteria' | 'application'>(initialTab);
  const [checkedIds, setCheckedIds] = useState<string[]>(['qc-1', 'qc-2', 'qc-3', 'qc-4', 'qc-5']);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const toggleCriterion = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const getCriterionIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-5 h-5 text-[#AAD0D1]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#AAD0D1]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#AAD0D1]" />;
      case 'Ticket': return <Ticket className="w-5 h-5 text-[#AAD0D1]" />;
      case 'Info': return <Info className="w-5 h-5 text-[#AAD0D1]" />;
      default: return <Shirt className="w-5 h-5 text-[#AAD0D1]" />;
    }
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ticket': return <Ticket className="w-6 h-6 text-[#AAD0D1]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#AAD0D1]" />;
      case 'Download': return <Download className="w-6 h-6 text-[#AAD0D1]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#AAD0D1]" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6 text-[#AAD0D1]" />;
      case 'Award': return <Award className="w-6 h-6 text-[#AAD0D1]" />;
      default: return <Gift className="w-6 h-6 text-[#AAD0D1]" />;
    }
  };

  const mandatoryCount = QUALITY_CRITERIA.filter(c => c.isMandatory).length;
  const checkedMandatoryCount = QUALITY_CRITERIA.filter(c => c.isMandatory && checkedIds.includes(c.id)).length;
  const isEligible = checkedMandatoryCount === mandatoryCount;

  return (
    <div className="py-12 bg-[#052832] text-white min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#417483]/30 pb-6 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[#AAD0D1]" />
            <span>
              {lang === 'it' && 'Standard Ufficiali & Vantaggi Esclusivi per gli Alloggi Partner'}
              {lang === 'de' && 'Offizielle Qualitätskriterien & Partnervorteile 2026'}
              {lang === 'en' && 'Official Quality Standards & Exclusive Partner Benefits'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'it' && 'Vantaggi Partner & Criteri di Qualità'}
            {lang === 'de' && 'Partnervorteile & Qualitätskriterien'}
            {lang === 'en' && 'Partner Benefits & Quality Standards'}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === 'it' && 'Scopri tutti i vantaggi esclusivi riservati alle strutture convenzionate Dolomiti NordicSki e verifica la checklist dei criteri di qualità ufficiali per richiedere l\'accreditamento.'}
            {lang === 'de' && 'Entdecken Sie die exklusiven Vorteile für Partnerbetriebe und prüfen Sie die offizielle Qualitäts-Checkliste für die Zertifizierung.'}
            {lang === 'en' && 'Discover the exclusive benefits reserved for accredited partner hotels and check the official accreditation criteria.'}
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#083845] rounded-2xl border border-[#417483]/40 shadow-lg">
          <button
            onClick={() => setActiveSubTab('benefits')}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeSubTab === 'benefits'
                ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/50 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white hover:bg-[#052832]'
            }`}
          >
            <Gift className="w-4 h-4 text-[#AAD0D1]" />
            <span>
              {lang === 'de' && 'Partnervorteile (6 Säulen)'}
              {lang === 'it' && 'Vantaggi Partner (6 Pilastri)'}
              {lang === 'en' && 'Partner Benefits (6 Pillars)'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('criteria')}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeSubTab === 'criteria'
                ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/50 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white hover:bg-[#052832]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#AAD0D1]" />
            <span>
              {lang === 'de' && 'Qualitätskriterien Check'}
              {lang === 'it' && 'Checklist Criteri Qualità'}
              {lang === 'en' && 'Quality Criteria Checklist'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('application')}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeSubTab === 'application'
                ? 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/50 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white hover:bg-[#052832]'
            }`}
          >
            <Send className="w-4 h-4 text-[#AAD0D1]" />
            <span>
              {lang === 'de' && 'Zertifizierungsantrag'}
              {lang === 'it' && 'Richiesta Accreditamento'}
              {lang === 'en' && 'Accreditation Form'}
            </span>
          </button>
        </div>

        {/* TAB 1: PARTNERVORTEILE / BENEFITS */}
        {activeSubTab === 'benefits' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#083845] p-6 rounded-2xl border border-[#417483]/30 shadow-xl">
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#AAD0D1]" />
                  <span>
                    {lang === 'de' && 'Warum Partner von Dolomiti NordicSki werden?'}
                    {lang === 'it' && 'Perché Diventare Partner Dolomiti NordicSki?'}
                    {lang === 'en' && 'Why Become a Dolomiti NordicSki Partner?'}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  {lang === 'de' && 'Als zertifizierter Partnerbetrieb profitieren Sie von direkten Buchungen, Marketingpaketen und exklusiven B2B-Services für das weltweit größte Langlaufkarussell.'}
                  {lang === 'it' && 'Come struttura accreditata benefici di visibilità diretta sul target appassionato, strumenti di vendita skipass in reception e kit di comunicazione gratuito.'}
                  {lang === 'en' && 'As an accredited accommodation partner, you gain direct visibility, guest ticket issuance tools, and official marketing assets.'}
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('application')}
                className="px-5 py-3 rounded-xl bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border border-[#AAD0D1]/50 text-[#AAD0D1] font-bold text-xs shrink-0 flex items-center space-x-2 transition-all shadow-lg hover:scale-105"
              >
                <span>{lang === 'it' ? 'Diventa Partner Ora' : 'Become Partner Now'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Benefits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTNER_BENEFITS.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#083845] border border-[#417483]/30 hover:border-[#AAD0D1]/50 rounded-2xl p-6 space-y-4 shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-[#052832] border border-[#417483]/40 group-hover:scale-110 transition-transform">
                        {getBenefitIcon(b.icon)}
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#052832] text-[#AAD0D1] border border-[#417483]/40">
                        {b.badge[lang]}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-white group-hover:text-[#AAD0D1] transition-colors leading-snug">
                      {b.title[lang]}
                    </h4>

                    <p className="text-xs font-semibold text-[#AAD0D1]/90">
                      {b.subtitle[lang]}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {b.description[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#417483]/20 flex items-center justify-between text-[11px] font-bold text-[#AAD0D1]">
                    <span className="flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Incluso nella Partnership</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: QUALITÄTSKRITERIEN / CRITERIA */}
        {activeSubTab === 'criteria' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#417483]/30 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#AAD0D1]" />
                    <span>
                      {lang === 'de' && 'Selbstbewertung Qualitätscheck'}
                      {lang === 'it' && 'Checklist di Autovalutazione Struttura'}
                      {lang === 'en' && 'Self-Assessment Quality Checklist'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'de' && 'Wählen Sie die in Ihrem Betrieb vorhandenen Dienste zur Prüfung der Zertifizierung:'}
                    {lang === 'it' && 'Seleziona i servizi presenti nella tua struttura per verificare lo stato di idoneità:'}
                    {lang === 'en' && 'Select the services available at your property to check certification status:'}
                  </p>
                </div>

                <div className="px-5 py-3 rounded-xl bg-[#052832] border border-[#417483]/40 flex items-center space-x-4 shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">
                      {lang === 'de' && 'Pflichtkriterien'}
                      {lang === 'it' && 'Qualità Criteri Obbligatori'}
                      {lang === 'en' && 'Mandatory Criteria'}
                    </span>
                    <span className="text-xl font-black text-[#AAD0D1]">
                      {checkedMandatoryCount} / {mandatoryCount}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase ${
                    isEligible 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {isEligible 
                      ? (lang === 'de' ? 'Zertifizierbar' : lang === 'en' ? 'Eligible' : 'Struttura Idonea') 
                      : (lang === 'de' ? 'Anpassung nötig' : lang === 'en' ? 'Integration Required' : 'Integrazione Richiesta')}
                  </div>
                </div>
              </div>

              {/* Criteria Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUALITY_CRITERIA.map((criterion) => {
                  const isChecked = checkedIds.includes(criterion.id);
                  return (
                    <div
                      key={criterion.id}
                      onClick={() => toggleCriterion(criterion.id)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
                        isChecked
                          ? 'bg-[#052832] border-[#AAD0D1] shadow-md'
                          : 'bg-[#052832]/50 border-[#417483]/20 hover:border-[#417483]/60 opacity-80'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? 'bg-[#0D4D5E] border-[#AAD0D1] text-[#AAD0D1]'
                            : 'border-[#417483]/40 bg-[#083845] text-transparent'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white flex items-center space-x-2">
                            {getCriterionIcon(criterion.icon)}
                            <span>{criterion.title[lang]}</span>
                          </span>
                          {criterion.isMandatory ? (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#0D4D5E] text-[#AAD0D1] border border-[#417483]/50">
                              {lang === 'de' ? 'Pflicht' : lang === 'en' ? 'Mandatory' : 'Obbligatorio'}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#052832] text-slate-300 border border-[#417483]/30">
                              {lang === 'de' ? 'Optional' : lang === 'en' ? 'Optional' : 'Opzionale'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-light">
                          {criterion.description[lang]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call to action to submit */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveSubTab('application')}
                  className="px-6 py-3 rounded-xl bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border border-[#AAD0D1]/50 text-[#AAD0D1] font-bold text-xs flex items-center space-x-2 transition-all shadow-lg cursor-pointer"
                >
                  <span>{lang === 'it' ? 'Procedi con la Richiesta Accreditamento' : 'Proceed to Application'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANTRAG ZERTIFIZIERUNG / APPLICATION */}
        {activeSubTab === 'application' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
              <div className="border-b border-[#417483]/30 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Send className="w-5 h-5 text-[#AAD0D1]" />
                  <span>
                    {lang === 'de' && 'Antrag auf Partner-Zertifizierung 2026'}
                    {lang === 'it' && 'Richiesta Accreditamento Struttura Partner 2026'}
                    {lang === 'en' && 'Partner Accreditation Application 2026'}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {lang === 'de' && 'Füllen Sie das Formular aus, um die offizielle Zertifizierung zu beantragen.'}
                  {lang === 'it' && 'Compila il modulo per richiedere l\'accreditamento ufficiale e l\'inserimento sul portale Dolomiti NordicSki.'}
                  {lang === 'en' && 'Fill out the form to request official accreditation on the Dolomiti NordicSki portal.'}
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#052832] border border-[#AAD0D1]/50 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#AAD0D1] mx-auto animate-bounce" />
                  <h4 className="font-extrabold text-lg text-[#AAD0D1]">
                    {lang === 'de' && 'Anforderung erfolgreich gesendet!'}
                    {lang === 'it' && 'Richiesta Inviata con Successo!'}
                    {lang === 'en' && 'Application Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-200 max-w-md mx-auto leading-relaxed">
                    {lang === 'de' && 'Das Hauptbüro Dolomiti NordicSki wird Ihre Daten prüfen und sich innerhalb von 48 Stunden bei Ihnen melden.'}
                    {lang === 'it' && 'L\'Ufficio Centrale Dolomiti NordicSki verificherà i dati della tua struttura e ti contatterà entro 48 ore lavorative.'}
                    {lang === 'en' && 'The Dolomiti NordicSki central office will review your application and contact you within 48 working hours.'}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#0D4D5E] text-xs font-bold text-[#AAD0D1] border border-[#AAD0D1]/40"
                  >
                    {lang === 'it' ? 'Invia Un\'Altra Richiesta' : 'Send Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Name des Beherbergungsbetriebs'}
                        {lang === 'it' && 'Nome Struttura Ricettiva'}
                        {lang === 'en' && 'Property / Accommodation Name'}
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Hotel Alpine Resort"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-[#AAD0D1] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Ort & Langlaufregion'}
                        {lang === 'it' && 'Località & Area Fondo'}
                        {lang === 'en' && 'Location & Nordic Region'}
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Toblach / 3 Zinnen"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-[#AAD0D1] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Kontakt E-Mail'}
                        {lang === 'it' && 'Email di Contatto'}
                        {lang === 'en' && 'Contact Email'}
                      </label>
                      <input 
                        type="email" 
                        required 
                        placeholder="info@hotel-alpine.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-[#AAD0D1] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Telefon Rezeption'}
                        {lang === 'it' && 'Telefono Reception'}
                        {lang === 'en' && 'Reception Phone'}
                      </label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+39 0474 123456"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-[#AAD0D1] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">
                      {lang === 'de' && 'Anmerkungen oder besondere Anfragen'}
                      {lang === 'it' && 'Note o Richieste Particolari'}
                      {lang === 'en' && 'Notes or Special Requests'}
                    </label>
                    <textarea 
                      rows={3}
                      placeholder={lang === 'de' ? 'Beschreiben Sie Ihre Langlaufeinrichtungen...' : lang === 'it' ? 'Descrivi brevemente i servizi dedicati allo sci di fondo...' : 'Briefly describe your Nordic skiing facilities...'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-[#AAD0D1] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border border-[#AAD0D1]/40 text-[#AAD0D1] font-bold text-sm shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    {lang === 'de' && 'Zertifizierungsantrag absenden'}
                    {lang === 'it' && 'Invia Richiesta di Accreditamento'}
                    {lang === 'en' && 'Submit Accreditation Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
