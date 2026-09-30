import React, { useState } from 'react';
import { Language, AccessLevel } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Building2,
  Loader2,
  Lock,
  MessageSquare,
  ShieldCheck,
  MapPin
} from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
  accessLevel?: AccessLevel;
  onOpenLogin?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, accessLevel = 'public', onOpenLogin }) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const isAuthenticated = accessLevel !== 'public';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name,
        email,
        message,
        createdAt: new Date().toISOString()
      });
      setFormSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'contactMessages');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: { it: 'Come posso diventare una struttura ricettiva partner Dolomiti NordicSki?', de: 'Wie werde ich ein zertifizierter Partnerbetrieb?' },
      a: { it: 'Per accreditare la tua struttura è necessario verificare il rispetto dei Criteri di Qualità ufficali (deposito sci riscaldato, sciolinatore, colazione per sportivi, ticket service). Compila il modulo di richiesta nella sezione Criteri Qualità o contattaci direttamente.', de: 'Ihr Betrieb muss die offiziellen Qualitätskriterien erfüllen. Füllen Sie das Antragsformular aus.' }
    },
    {
      q: { it: 'Come funziona la rendicontazione dei voucher Skipass emessi in reception?', de: 'Wie funktioniert die Abrechnung der ausgedruckten Loipenpass-Gutscheine?' },
      a: { it: 'I voucher emessi dal portale vengono registrati automaticamente nel tuo account partner. A fine mese o a fine stagione invernale, l\'ufficio centrale invierà un unico riepilogo contabile con fatturazione e provvigioni concordate.', de: 'Alle ausgestellten Gutscheine werden in Ihrem Konto erfasst. Am Ende des Monats erhalten Sie eine Gesamtübersicht.' }
    },
    {
      q: { it: 'Dove posso ordinare il materiale pubblicitario cartaceo (espositori, cartine piste)?', de: 'Wo kann ich gedrucktes Werbematerial (Loipenkarten, Aufsteller) bestellen?' },
      a: { it: 'Il materiale promozionale cartaceo è disponibile gratuitamente per tutti gli alloggi convenzionati presso l\'associazione turistica locale della tua area o inviando una richiesta via email all\'ufficio centrale.', de: 'Gedrucktes Material erhalten Sie kostenlos beim örtlichen Tourismusverein oder direkt über unser Büro.' }
    },
    {
      q: { it: 'Quali formati del logo devo utilizzare sul sito web del mio hotel?', de: 'Welche Logo-Formate soll ich auf unserer Hotel-Website verwenden?' },
      a: { it: 'Per i siti web e banner digitali consigliamo l\'uso del formato PNG con sfondo trasparente o SVG vettoriale presente nella sezione Corporate Design.', de: 'Nutzen Sie die PNG- und SVG-Formate aus unserem Corporate Design Bereich.' }
    }
  ];

  return (
    <div className="py-12 bg-[#052832] text-white min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-[#417483]/30 pb-6 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-[#AAD0D1]" />
            <span>
              {lang === 'it' && 'Assistenza Partner & Referenti Territoriali'}
              {lang === 'de' && 'Partner-Support & Ansprechpartner'}
              {lang === 'en' && 'Partner Assistance & Contacts'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'it' && 'Contatti & Supporto Tecnico'}
            {lang === 'de' && 'Kontakt & Technischer Support'}
            {lang === 'en' && 'Contact & Technical Support'}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === 'it' && 'L\'Ufficio Centrale Dolomiti NordicSki e i referenti locali delle 8 zone sono a disposizione per informazioni su accreditamento hotel, supporto tecnico voucher e materiale promozionale.'}
            {lang === 'de' && 'Das Hauptbüro Dolomiti NordicSki steht Ihnen für Fragen zur Verfügung.'}
            {lang === 'en' && 'Dolomiti NordicSki central office and regional representatives are at your disposal.'}
          </p>
        </div>

        {/* Contact Info Grid */}
        {!isAuthenticated ? (
          /* PUBLIC CONTACT VIEW */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 shadow-xl">
              <div className="p-3 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] w-fit">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">
                {lang === 'de' && 'Sitz & Hauptbüro'}
                {lang === 'it' && 'Sede & Ufficio Centrale'}
                {lang === 'en' && 'Headquarters & Main Office'}
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                <strong className="text-white font-semibold">
                  {lang === 'de' ? 'Konsortium Dolomiti NordicSki' : 'Consorzio Dolomiti NordicSki'}
                </strong> <br />
                {lang === 'de' ? 'Dolomitenstraße 29' : 'Via Dolomiti 29'}, 39034 Toblach / Dobbiaco (BZ) <br />
                {lang === 'de' ? 'Südtirol - Italien' : lang === 'it' ? 'Alto Adige - Italia' : 'South Tyrol - Italy'}
              </p>
            </div>

            <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 shadow-xl">
              <div className="p-3 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] w-fit">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">
                {lang === 'de' && 'Offizielle E-Mail'}
                {lang === 'it' && 'Email Ufficiale'}
                {lang === 'en' && 'Official Email'}
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <a 
                  href="mailto:info@dolomitinordicski.com" 
                  className="text-[#AAD0D1] hover:underline font-bold text-sm block mt-1"
                >
                  info@dolomitinordicski.com
                </a>
                <span className="text-[11px] text-slate-300 block mt-2 font-light">
                  {lang === 'de' && 'Für allgemeine Anfragen und Informationen zum Langlaufkarussell.'}
                  {lang === 'it' && 'Per informazioni generali e comunicazioni ufficiali sul carosello.'}
                  {lang === 'en' && 'For general inquiries and information regarding the ski carousel.'}
                </span>
              </p>
            </div>

            <div className="bg-[#083845] border border-[#AAD0D1]/30 rounded-2xl p-6 space-y-3 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-[#AAD0D1] w-fit">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#0D4D5E] text-[#AAD0D1] border border-[#417483]/40">
                    B2B & Partner
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">
                  {lang === 'de' && 'Direkter Support & B2B Kontakte'}
                  {lang === 'it' && 'Supporto Diretto & Contatti B2B'}
                  {lang === 'en' && 'Direct Support & B2B Contacts'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {lang === 'de' && 'WhatsApp Business, operative E-Mail und das operative Büro in Welsberg sind nur für akkreditierte Partner sichtbar.'}
                  {lang === 'it' && 'I recapiti telefonici diretti, WhatsApp Business, l\'email gestionale e l\'Ufficio Operativo di Monguelfo sono riservati ai partner registrati.'}
                  {lang === 'en' && 'WhatsApp Business, operational emails, and the Monguelfo office are reserved for logged-in partners.'}
                </p>
              </div>

              {onOpenLogin && (
                <button
                  onClick={onOpenLogin}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-[#0D4D5E] hover:bg-[#052832] border border-[#AAD0D1]/40 text-[#AAD0D1] font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'de' && 'Anmelden für geschützte B2B-Kontakte'}
                    {lang === 'it' && 'Accedi per Contatti Riservati B2B'}
                    {lang === 'en' && 'Login for Protected B2B Contacts'}
                  </span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* AUTHENTICATED PARTNER / REGIONAL VIEW */
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 rounded-xl bg-[#0D4D5E]/60 border border-[#AAD0D1]/40 flex items-center justify-between text-xs text-[#AAD0D1]">
              <span className="flex items-center space-x-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'de' && 'Akkreditierter Partner-Bereich: Vollständige B2B-Kontaktdaten & operatives Büro freigeschaltet'}
                  {lang === 'it' && 'Area Riservata Partner & Regioni: Recapiti diretti e Ufficio Operativo visibili'}
                  {lang === 'en' && 'Authenticated Partner Area: Full B2B contacts and operational office unlocked'}
                </span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#052832] border border-[#417483]/40 font-bold">
                Level: {accessLevel.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Central HQ */}
              <div className="bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 space-y-3 shadow-xl">
                <div className="p-3 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] w-fit">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">
                  {lang === 'de' && 'Sitz & Hauptbüro'}
                  {lang === 'it' && 'Sede & Ufficio Centrale'}
                  {lang === 'en' && 'Headquarters & Central Office'}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed font-light">
                  <strong className="text-white font-semibold block">
                    {lang === 'de' ? 'Konsortium Dolomiti NordicSki' : 'Consorzio Dolomiti NordicSki'}
                  </strong>
                  {lang === 'de' ? 'Dolomitenstraße 29' : 'Via Dolomiti 29'}, 39034 Toblach / Dobbiaco (BZ) <br />
                  <span className="text-slate-300">E-Mail / Email: </span>
                  <a href="mailto:info@dolomitinordicski.com" className="text-[#AAD0D1] hover:underline font-semibold">
                    info@dolomitinordicski.com
                  </a>
                </p>
              </div>

              {/* Operational Office Monguelfo / Welsberg */}
              <div className="bg-[#083845] border border-[#AAD0D1]/40 rounded-2xl p-6 space-y-3 shadow-xl relative">
                <div className="p-3 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] w-fit">
                  <MapPin className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-bold text-lg text-white">
                  {lang === 'de' && 'Operatives Büro Welsberg'}
                  {lang === 'it' && 'Ufficio Operativo Monguelfo'}
                  {lang === 'en' && 'Monguelfo Operational Office'}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed font-light">
                  <strong className="text-white font-semibold block">Dolomiti NordicSki Service Desk</strong>
                  {lang === 'de' ? 'Bahnhofstraße 29' : 'Via Stazione 29'}, 39035 {lang === 'de' ? 'Welsberg - Monguelfo' : 'Monguelfo - Welsberg'} (BZ) <br />
                  <span className="text-slate-300">
                    {lang === 'de' ? 'Operative E-Mail:' : lang === 'it' ? 'Email Operativa:' : 'Operational Email:'}{' '}
                  </span>
                  <a href="mailto:management@dolomitinordicski.com" className="text-[#AAD0D1] hover:underline font-bold">
                    management@dolomitinordicski.com
                  </a>
                </p>
              </div>

              {/* Direct Phone & WhatsApp Business */}
              <div className="bg-[#083845] border border-[#AAD0D1]/40 rounded-2xl p-6 space-y-3 shadow-xl">
                <div className="p-3 rounded-xl bg-[#0D4D5E] border border-[#417483]/40 text-[#AAD0D1] w-fit">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg text-white">
                  {lang === 'de' && 'WhatsApp Business & Direktnummer'}
                  {lang === 'it' && 'WhatsApp Business & Tel. Diretto'}
                  {lang === 'en' && 'WhatsApp Business & Direct Phone'}
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                      WhatsApp
                    </span>
                    <a 
                      href="https://wa.me/393801910754" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-extrabold text-[#AAD0D1] hover:underline text-sm"
                    >
                      +39 380 1910754
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-300 font-light">
                    {lang === 'de' && 'WhatsApp-Support für Partnerhotels & Regionen-Beauftragte'}
                    {lang === 'it' && 'Linea diretta WhatsApp per hotel partner e referenti di zona'}
                    {lang === 'en' && 'Direct WhatsApp line for partner hotels & regional desk'}
                  </p>
                  <p className="text-[11px] text-slate-300 font-light pt-1 border-t border-[#417483]/20">
                    <span className="font-semibold text-white">
                      {lang === 'de' ? 'E-Mail Management:' : 'Email Management:'}{' '}
                    </span>
                    <a href="mailto:management@dolomitinordicski.com" className="text-[#AAD0D1] hover:underline">
                      management@dolomitinordicski.com
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Contact Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#AAD0D1]" />
              <span>
                {lang === 'de' && 'Häufig gestellte Fragen (FAQ)'}
                {lang === 'it' && 'Domande Frequenti Partner (FAQ)'}
                {lang === 'en' && 'Frequently Asked Questions (FAQ)'}
              </span>
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-[#417483]/30 rounded-xl overflow-hidden bg-[#052832]">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between font-bold text-xs sm:text-sm text-white hover:text-[#AAD0D1] transition-colors"
                    >
                      <span>{faq.q[lang] || faq.q.de || faq.q.it}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#AAD0D1]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-slate-200 border-t border-[#417483]/20 leading-relaxed">
                        {faq.a[lang] || faq.a.de || faq.a.it}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-[#083845] border border-[#417483]/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Send className="w-5 h-5 text-[#AAD0D1]" />
              <span>
                {lang === 'de' && 'Schreiben Sie uns eine Nachricht'}
                {lang === 'it' && 'Scrivici un Messaggio'}
                {lang === 'en' && 'Send Us a Message'}
              </span>
            </h3>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-[#052832] border border-[#AAD0D1]/50 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#AAD0D1] mx-auto" />
                <span className="font-bold text-xs text-[#AAD0D1] block">
                  {lang === 'de' && 'Nachricht erfolgreich gesendet!'}
                  {lang === 'it' && 'Messaggio inviato con successo!'}
                  {lang === 'en' && 'Message sent successfully!'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">
                    {lang === 'de' && 'Vor- und Nachname / Betrieb'}
                    {lang === 'it' && 'Nome e Cognome / Struttura'}
                    {lang === 'en' && 'Full Name / Property Name'}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sporthotel Drei Zinnen"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs text-white focus:border-[#AAD0D1] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">E-Mail</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@sporthotel.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs text-white focus:border-[#AAD0D1] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">
                    {lang === 'de' && 'Nachricht'}
                    {lang === 'it' && 'Messaggio'}
                    {lang === 'en' && 'Message'}
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'de' ? 'Geben Sie Ihre Anfrage ein...' : lang === 'it' ? 'Inserisci la tua richiesta...' : 'Type your request here...'}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs text-white focus:border-[#AAD0D1] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border border-[#417483]/40 text-[#AAD0D1] font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#AAD0D1]" />
                  ) : (
                    <span>
                      {lang === 'de' && 'Nachricht senden'}
                      {lang === 'it' && 'Invia Messaggio'}
                      {lang === 'en' && 'Send Message'}
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
