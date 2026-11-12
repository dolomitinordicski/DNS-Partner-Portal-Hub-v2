import React, { useEffect, useState } from 'react';
import { DNS_DEFAULT_UI_LANGUAGE, DNS_UI_LANGUAGE_STORAGE_KEY, resolveDNSLanguagePreference } from '@dolomitinordicski/dns-shared-data/localization';
import { NavigationTab, Language, AccessibilitySettings, AccessLevel } from './types';
import { Header } from './components/Header';
import { FoundationScrollProgress } from './components/FoundationScrollProgress';
import { VisionSection } from './components/VisionSection';
import { CorporateDesignSection } from './components/CorporateDesignSection';
import { QualityCriteriaSection } from './components/QualityCriteriaSection';
import { DownloadsSection } from './components/DownloadsSection';
import { RegionsSection } from './components/RegionsSection';
import { ContactSection } from './components/ContactSection';
import { WidgetCreator } from './components/WidgetCreator';
import { PortalNavigation } from './components/PortalNavigation';
import { PortalHome } from './components/PortalHome';
import { PartnerLoginModal } from './components/PartnerLoginModal';
import { subscribeDNSPartnerIdentity, loadVerifiedPartnerSession } from './services/partnerIdentity';
import { partnerSignOut } from './lib/firebase';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalTab } from './components/LegalModal';

import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(DNS_UI_LANGUAGE_STORAGE_KEY);
      if (saved === 'en') return 'en'; // Partner Hub supports English in addition to Foundation DE/IT.
      return resolveDNSLanguagePreference({ stored: saved }) as Language;
    } catch {
      return DNS_DEFAULT_UI_LANGUAGE;
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage.setItem(DNS_UI_LANGUAGE_STORAGE_KEY, lang); } catch { /* storage optional */ }
  }, [lang]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
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

  // No role comes from browser input. Verify signed identity against the
  // trusted server each time Firebase Auth changes; deny on all failures.
  const handleLoginSuccess = (_code: string, _name: string, _role?: 'partner' | 'regional' | 'admin') => {
    // Legacy callback intentionally cannot elevate permissions.
  };

  useEffect(() => {
    if (import.meta.env.VITE_DNS_PARTNER_LOGIN_ENABLED !== 'true') return;
    let generation = 0;
    let controller: AbortController | null = null;
    const unsubscribe = subscribeDNSPartnerIdentity(user => {
      const current = ++generation;
      controller?.abort();
      controller = new AbortController();
      setAccessLevel('public');
      setPartnerCode('');
      setPartnerName('');
      if (!user || user.isAnonymous) return;
      void loadVerifiedPartnerSession(user,controller.signal).then(session => {
        if (current !== generation || !session || !session.establishments.length) return;
        // This is a presentation role only. Every protected API must still
        // verify identity, establishment membership and Analytics grant.
        setAccessLevel('partner');
        setPartnerCode(session.establishments[0].id);
        setPartnerName(session.establishments[0].name);
        setIsLoginModalOpen(false);
      }).catch(() => { /* Fail closed. */ });
    });
    return () => { generation++;controller?.abort();unsubscribe(); };
  }, []);

  const handleSelectDemoRole = (_role: AccessLevel) => {
    // A browser action must never assign a privileged DNS role.
  };

  const handleLogout = () => {
    void partnerSignOut();
    setAccessLevel('public');
    setPartnerCode('');
    setPartnerName('');
    if (activeTab === 'regional-tools' || activeTab === 'voucher-system') {
      setActiveTab('vision');
    }
  };

  // Foundation tokens own the shell appearance; its accessibility runtime owns
  // contrast, scaling and motion instead of a second React/CSS implementation.
  const rootClasses = 'min-h-screen flex flex-col justify-between bg-[var(--color-dns-bg)] text-[var(--color-dns-primary-dark)] font-[var(--font-body)] antialiased selection:bg-[var(--color-dns-light)] selection:text-[var(--color-dns-primary-dark)]';

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
        onOpenA11yModal={() => { /* Foundation controls its own panel */ }}
        onSelectDemoRole={handleSelectDemoRole}
      />
      <FoundationScrollProgress />

{/* Main Content Area */}
      <div data-dns-portal-layout className="flex-1 min-h-0">
        <PortalNavigation activeTab={activeTab} lang={lang} onNavigate={(tab) => {setActiveTab(tab);window.dispatchEvent(new Event('dns:portal-navigate'));window.scrollTo({top:0,behavior:'smooth'});}} />
        <main data-dns-shell-main className="flex-1 min-w-0">

        
        {activeTab === 'home' && <PortalHome lang={lang} onNavigate={setActiveTab} />}

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

        {/* Legacy modules isolated until DNS Core authorization is ready. */}
        {(activeTab === 'voucher-system' || activeTab === 'regional-tools') && (
          <section className="max-w-3xl mx-auto px-4 sm:px-8 py-16" role="status">
            <div className="rounded-2xl border border-[#82B2BD]/40 bg-white p-8 text-[#083845] shadow-sm space-y-4">
              <h1 className="text-2xl font-bold">
                {lang === 'de' ? 'Modul in Vorbereitung' : lang === 'it' ? 'Modulo in preparazione' : 'Module in preparation'}
              </h1>
              <p>
                {lang === 'de' ? 'Dieses Modul wird erst nach der sicheren Anbindung an DNS Core freigeschaltet.' : lang === 'it' ? 'Questo modulo sarà disponibile dopo il collegamento sicuro a DNS Core.' : 'This module will become available after secure integration with DNS Core.'}
              </p>
              <button type="button" onClick={() => setActiveTab('home')} className="rounded-lg bg-[#0D4D5E] px-5 py-3 text-white font-semibold">
                {lang === 'de' ? 'Zur Startseite' : lang === 'it' ? 'Torna alla home' : 'Back to home'}
              </button>
            </div>
          </section>
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
      </div>

      {/* Partner Login Modal Dialog */}
      <PartnerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
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
      <div data-dns-tool-footer><Footer lang={lang} onOpenLegal={handleOpenLegal} /></div>

      {/* Floating Go To Top Button (Always visible across all devices) */}

    </div>
  );
}
