import React, { useState } from 'react';
import { NavigationTab, Language, AccessibilitySettings, AccessLevel } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisionSection } from './components/VisionSection';
import { CorporateDesignSection } from './components/CorporateDesignSection';
import { QualityCriteriaSection } from './components/QualityCriteriaSection';
import { VoucherGenerator } from './components/VoucherGenerator';
import { DownloadsSection } from './components/DownloadsSection';
import { RegionsSection } from './components/RegionsSection';
import { ContactSection } from './components/ContactSection';
import { RegionalToolsSection } from './components/RegionalToolsSection';
import { WidgetCreator } from './components/WidgetCreator';
import { PartnerLoginModal } from './components/PartnerLoginModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalTab } from './components/LegalModal';
import { StickyToolboxBar } from './components/StickyToolboxBar';
import { DemoAccessSwitcher } from './components/DemoAccessSwitcher';
import { partnerSignIn } from './lib/firebase';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Footer } from './components/Footer';
import { 
  FileText, 
  Ticket, 
  Award, 
  Download, 
  ChevronRight, 
  Sparkles,
  Building2,
  FolderGit2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [lang, setLang] = useState<Language>('de');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('privacy');

  const handleOpenLegal = (tab: LegalTab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };
  
  // 4-Level Access State (public | partner | regional | admin)
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('public');
  const [partnerCode, setPartnerCode] = useState<string>('');
  const [partnerName, setPartnerName] = useState<string>('');

  // Accessibility State Management
  const [a11y, setA11y] = useState<AccessibilitySettings>({
    theme: 'light',
    fontSize: 'normal',
    highContrast: false,
    readableFont: false,
    reducedMotion: false,
  });

  const isLight = a11y.theme === 'light';

  const handleLoginSuccess = (code: string, name: string, role?: 'partner' | 'regional' | 'admin') => {
    if (role === 'admin') {
      setAccessLevel('admin');
      setPartnerName('Direzione Dolomiti NordicSki');
      setPartnerCode('ADMIN-DIR-001');
    } else if (role === 'regional') {
      setAccessLevel('regional');
      setPartnerName(name || 'TVB Dolomiti Paganella / Partner Regionale');
      setPartnerCode(code || 'TVB-REG-001');
      setActiveTab('regional-tools');
    } else {
      setAccessLevel('partner');
      setPartnerCode(code || '3Z-HOTEL-042');
      setPartnerName(name || 'Sporthotel Drei Zinnen');
      setActiveTab('voucher-system');
    }
  };

  const handleSelectDemoRole = async (role: AccessLevel) => {
    if (role === 'public') {
      handleLogout();
      return;
    }

    // Authenticate with Firebase Auth anonymously in DEMO_MODE so Firestore rules pass
    await partnerSignIn(
      role === 'admin' ? 'DNS-ADMIN-KEY' : role === 'regional' ? 'REG-3ZINNEN-01' : '3Z-HOTEL-042'
    );

    if (role === 'admin') {
      setAccessLevel('admin');
      setPartnerName('Direzione Generale Dolomiti NordicSki');
      setPartnerCode('ADMIN-DIR-001');
      if (activeTab === 'home' || activeTab === 'vision' || activeTab === 'contacts') {
        setActiveTab('voucher-system');
      }
    } else if (role === 'regional') {
      setAccessLevel('regional');
      setPartnerName('Associazione Turistica 3 Zinnen Dolomiten');
      setPartnerCode('REG-3ZINNEN-01');
      setActiveTab('regional-tools');
    } else {
      setAccessLevel('partner');
      setPartnerName('Sporthotel Drei Zinnen');
      setPartnerCode('3Z-HOTEL-042');
      setActiveTab('voucher-system');
    }
  };

  const handleLogout = () => {
    setAccessLevel('public');
    setPartnerCode('');
    setPartnerName('');
    if (activeTab === 'regional-tools' || activeTab === 'voucher-system') {
      setActiveTab('vision');
    }
  };

  const rootClasses = `min-h-screen font-sans antialiased selection:bg-[#AAD0D1] selection:text-[#083845] flex flex-col justify-between transition-colors duration-300 ${
    isLight ? 'bg-[#F4F8F9] text-[#083845]' : 'bg-[#052832] text-white'
  } ${
    a11y.fontSize === 'large' ? 'text-base' : a11y.fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
  } ${
    a11y.highContrast ? 'contrast-125' : ''
  } ${
    a11y.readableFont ? 'tracking-wide leading-relaxed font-sans' : ''
  } ${
    a11y.reducedMotion ? '[&_*]:!transition-none [&_*]:!animation-none' : ''
  }`;

  return (
    <div className={rootClasses}>
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        accessLevel={accessLevel}
        partnerName={partnerName}
        partnerCode={partnerCode}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        a11y={a11y}
        setA11y={setA11y}
        onOpenA11yModal={() => setIsA11yModalOpen(true)}
        onSelectDemoRole={handleSelectDemoRole}
      />

      {/* Interactive Demo Access Level Switcher */}
      <DemoAccessSwitcher
        accessLevel={accessLevel}
        partnerName={partnerName}
        partnerCode={partnerCode}
        onSelectRole={handleSelectDemoRole}
        lang={lang}
      />

      {/* Floating Sticky Quick Toolboxes Bar (AT, B2C, RT) */}
      <StickyToolboxBar setActiveTab={setActiveTab} lang={lang} />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* HOME DASHBOARD TAB */}
        {activeTab === 'home' && (
          <div>
            <Hero setActiveTab={setActiveTab} lang={lang} a11y={a11y} />

            {/* Quick Feature Shortcut Cards */}
            <section className={`py-12 border-b transition-colors ${
              isLight ? 'bg-[#FFFFFF] border-[#82B2BD]/30' : 'bg-[#083845] border-[#417483]/30'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center space-x-1.5 ${
                    isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'de' && 'EXKLUSIVES B2B PARTNERPORTAL'}
                      {lang === 'it' && 'PORTALE RISERVATO B2B'}
                      {lang === 'en' && 'EXCLUSIVE B2B PARTNER PORTAL'}
                    </span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Be_Vietnam_Pro']">
                    {lang === 'de' && 'Services und Module für Partnerbetriebe'}
                    {lang === 'it' && 'Servizi e Moduli per le Strutture Convenzionate'}
                    {lang === 'en' && 'Services and Modules for Accredited Partners'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Corporate Design */}
                  <div
                    onClick={() => setActiveTab('corporate-design')}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 group shadow-xl hover:-translate-y-1 ${
                      isLight
                        ? 'bg-[#F0F5F6] border-[#82B2BD] hover:border-[#0D4D5E]'
                        : 'bg-[#0D4D5E] border-[#417483]/40 hover:border-[#AAD0D1]'
                    }`}
                  >
                    <div className={`p-3 rounded-xl w-fit group-hover:scale-110 transition-transform border ${
                      isLight ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#0D4D5E]' : 'bg-[#083845] border-[#417483]/40 text-[#AAD0D1]'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg group-hover:text-[#0D4D5E] transition-colors font-['Be_Vietnam_Pro']">
                      {lang === 'de' && 'Corporate Design & Handbuch'}
                      {lang === 'it' && 'Corporate Design & Manuale'}
                      {lang === 'en' && 'Corporate Design & Manual'}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed font-light">
                      {lang === 'de' && 'Vektor-Logos EPS/SVG, offizielle Farbpalette, Typografie und Markenrichtlinien.'}
                      {lang === 'it' && 'Loghi vettoriali EPS/SVG, palette colori ufficiale, font e linee guida di marchio.'}
                      {lang === 'en' && 'Vector logos EPS/SVG, official colour palette, fonts, and brand guidelines.'}
                    </p>
                    <div className={`text-xs font-bold flex items-center space-x-1 pt-2 ${
                      isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                    }`}>
                      <span>
                        {lang === 'de' && 'Handbuch öffnen'}
                        {lang === 'it' && 'Apri Manuale'}
                        {lang === 'en' && 'Open Guidelines'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Prevendita Voucher */}
                  <div
                    onClick={() => setActiveTab('voucher-system')}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 group shadow-xl hover:-translate-y-1 ${
                      isLight
                        ? 'bg-[#F0F5F6] border-[#82B2BD] hover:border-[#0D4D5E]'
                        : 'bg-[#0D4D5E] border-[#417483]/40 hover:border-[#AAD0D1]'
                    }`}
                  >
                    <div className={`p-3 rounded-xl w-fit group-hover:scale-110 transition-transform border ${
                      isLight ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#0D4D5E]' : 'bg-[#083845] border-[#417483]/40 text-[#AAD0D1]'
                    }`}>
                      <Ticket className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg group-hover:text-[#0D4D5E] transition-colors font-['Be_Vietnam_Pro']">
                      {lang === 'de' && 'Gutscheine & Loipenpässe'}
                      {lang === 'it' && 'Emissione Voucher Skipass'}
                      {lang === 'en' && 'Skipass Voucher Issuance'}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed font-light">
                      {lang === 'de' && 'Erstellen Sie direkt an der Rezeption Loipenpass-Gutscheine mit QR-Code für Ihre Gäste.'}
                      {lang === 'it' && 'Emetti voucher skipass con QR Code direttamente per i tuoi ospiti alla reception.'}
                      {lang === 'en' && 'Issue QR code skipass vouchers directly for your hotel guests at reception.'}
                    </p>
                    <div className={`text-xs font-bold flex items-center space-x-1 pt-2 ${
                      isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                    }`}>
                      <span>
                        {lang === 'de' && 'Gutschein ausstellen'}
                        {lang === 'it' && 'Emetti Voucher'}
                        {lang === 'en' && 'Issue Voucher'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Criteri Qualità */}
                  <div
                    onClick={() => setActiveTab('quality-criteria')}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 group shadow-xl hover:-translate-y-1 ${
                      isLight
                        ? 'bg-[#F0F5F6] border-[#82B2BD] hover:border-[#0D4D5E]'
                        : 'bg-[#0D4D5E] border-[#417483]/40 hover:border-[#AAD0D1]'
                    }`}
                  >
                    <div className={`p-3 rounded-xl w-fit group-hover:scale-110 transition-transform border ${
                      isLight ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#0D4D5E]' : 'bg-[#083845] border-[#417483]/40 text-[#AAD0D1]'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg group-hover:text-[#0D4D5E] transition-colors font-['Be_Vietnam_Pro']">
                      {lang === 'de' && 'Qualitätskriterien Hotel'}
                      {lang === 'it' && 'Criteri di Qualità Hotel'}
                      {lang === 'en' && 'Hotel Quality Criteria'}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed font-light">
                      {lang === 'de' && 'Zertifizierte Checkliste: Beheizter Skiraum, Wachstisch, Sportlerfrühstück.'}
                      {lang === 'it' && 'Checklist ufficiale di accreditamento: deposito sci, sciolinatura, colazione sportiva.'}
                      {lang === 'en' && 'Official accreditation checklist: heated ski room, wax bench, athlete breakfast.'}
                    </p>
                    <div className={`text-xs font-bold flex items-center space-x-1 pt-2 ${
                      isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                    }`}>
                      <span>
                        {lang === 'de' && 'Kriterien prüfen'}
                        {lang === 'it' && 'Verifica Criteri'}
                        {lang === 'en' && 'Check Criteria'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Download Assets */}
                  <div
                    onClick={() => setActiveTab('downloads')}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 group shadow-xl hover:-translate-y-1 ${
                      isLight
                        ? 'bg-[#F0F5F6] border-[#82B2BD] hover:border-[#0D4D5E]'
                        : 'bg-[#0D4D5E] border-[#417483]/40 hover:border-[#AAD0D1]'
                    }`}
                  >
                    <div className={`p-3 rounded-xl w-fit group-hover:scale-110 transition-transform border ${
                      isLight ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#0D4D5E]' : 'bg-[#083845] border-[#417483]/40 text-[#AAD0D1]'
                    }`}>
                      <Download className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg group-hover:text-[#0D4D5E] transition-colors font-['Be_Vietnam_Pro']">
                      {lang === 'de' && 'Download Marketing Kit'}
                      {lang === 'it' && 'Download Kit Marketing'}
                      {lang === 'en' && 'Download Marketing Kit'}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed font-light">
                      {lang === 'de' && 'Loipenkarten 1.000 km, Infoflyer für Zimmer, Social Media Kits.'}
                      {lang === 'it' && 'Cartine tracciati 1.000 km, flyer informativi per le camere, social media kit.'}
                      {lang === 'en' && '1,000 km trail maps, guest room information flyers, social media kits.'}
                    </p>
                    <div className={`text-xs font-bold flex items-center space-x-1 pt-2 ${
                      isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                    }`}>
                      <span>
                        {lang === 'de' && 'Assets herunterladen'}
                        {lang === 'it' && 'Download Assets'}
                        {lang === 'en' && 'Download Assets'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Corporate Overview Section on Home */}
            <CorporateDesignSection lang={lang} a11y={a11y} accessLevel={accessLevel} />
          </div>
        )}

        {/* VISION TAB */}
        {activeTab === 'vision' && <VisionSection lang={lang} />}

        {/* CORPORATE DESIGN TAB */}
        {activeTab === 'corporate-design' && <CorporateDesignSection lang={lang} a11y={a11y} accessLevel={accessLevel} />}

        {/* BENEFITS & QUALITY CRITERIA TAB */}
        {(activeTab === 'benefits' || activeTab === 'quality-criteria') && (
          <QualityCriteriaSection 
            lang={lang} 
            initialTab={activeTab === 'benefits' ? 'benefits' : 'criteria'}
          />
        )}

        {/* WIDGET & EMBED GENERATOR TAB */}
        {activeTab === 'widgets' && (
          <div className="py-12 bg-[#052832] text-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
              <WidgetCreator lang={lang} accessLevel={accessLevel} />
            </div>
          </div>
        )}

        {/* VOUCHER SYSTEM TAB */}
        {activeTab === 'voucher-system' && (
          <VoucherGenerator 
            lang={lang} 
            accessLevel={accessLevel}
            partnerCode={partnerCode}
            partnerName={partnerName}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        )}

        {/* REGIONAL TOOLS TAB (B2B TOOLBOX & ANALYTICS) */}
        {activeTab === 'regional-tools' && (
          <RegionalToolsSection lang={lang} a11y={a11y} accessLevel={accessLevel} />
        )}

        {/* REGIONS TAB */}
        {activeTab === 'regions' && <RegionsSection lang={lang} />}

        {/* DOWNLOADS TAB */}
        {activeTab === 'downloads' && <DownloadsSection lang={lang} a11y={a11y} accessLevel={accessLevel} />}

        {/* CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <ContactSection 
            lang={lang} 
            accessLevel={accessLevel} 
            onOpenLogin={() => setIsLoginModalOpen(true)} 
          />
        )}

      </main>

      {/* Partner Login Modal Dialog */}
      <PartnerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Accessibility Control Modal */}
      <AccessibilityModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        a11y={a11y}
        setA11y={setA11y}
        lang={lang}
      />

      {/* GDPR Legal Modal (Privacy, Cookie Policy, Note Legali) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
        lang={lang}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent
        lang={lang}
        onOpenPolicy={() => handleOpenLegal('cookie')}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} lang={lang} onOpenLegal={handleOpenLegal} />

      {/* Floating Go To Top Button (Always visible across all devices) */}
      <ScrollToTopButton lang={lang} />

    </div>
  );
}
