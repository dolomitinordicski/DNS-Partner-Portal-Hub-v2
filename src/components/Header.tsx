import React from 'react';
import { NavigationTab, Language, AccessibilitySettings, AccessLevel } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { 
  Building2, 
  Download, 
  Sparkles, 
  FileText, 
  Ticket, 
  Award, 
  MapPin, 
  Mail, 
  Globe, 
  LogIn, 
  LogOut,
  CheckCircle,
  Menu,
  X,
  Sun,
  Moon,
  Accessibility,
  ShieldCheck,
  Hotel,
  FolderGit2,
  Code
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  accessLevel: AccessLevel;
  partnerName: string;
  partnerCode: string;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  a11y: AccessibilitySettings;
  setA11y: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  onOpenA11yModal: () => void;
  onSelectDemoRole?: (role: AccessLevel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  accessLevel,
  partnerName,
  partnerCode,
  onOpenLoginModal,
  onLogout,
  a11y,
  setA11y,
  onOpenA11yModal,
  onSelectDemoRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const isLight = a11y.theme === 'light';

  const toggleTheme = () => {
    setA11y(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const navItems: { id: NavigationTab; label: Record<Language, string>; icon: React.ReactNode }[] = [
    { id: 'vision', label: { it: 'Vision & Brand', de: 'Vision & Marke', en: 'Vision & Brand' }, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'corporate-design', label: { it: 'Corporate Design', de: 'Corporate Design', en: 'Corporate Design' }, icon: <FileText className="w-4 h-4" /> },
    { id: 'quality-criteria', label: { it: 'Criteri & Vantaggi', de: 'Qualitätskriterien & Vorteile', en: 'Quality & Benefits' }, icon: <Award className="w-4 h-4" /> },
    { id: 'widgets', label: { it: 'Widget & Badge', de: 'Widget & Badge', en: 'Widget & Badge' }, icon: <Code className="w-4 h-4" /> },
    { id: 'voucher-system', label: { it: 'Emissione Voucher', de: 'Gutschein-System', en: 'Voucher System' }, icon: <Ticket className="w-4 h-4" /> },
    { id: 'regional-tools', label: { it: 'Toolbox', de: 'Toolbox', en: 'Toolbox' }, icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'regions', label: { it: '8 Aree Piste', de: '8 Regionen', en: '8 Regions' }, icon: <MapPin className="w-4 h-4" /> },
    { id: 'downloads', label: { it: 'Download Center', de: 'Downloads', en: 'Downloads' }, icon: <Download className="w-4 h-4" /> },
    { id: 'contacts', label: { it: 'Contatti', de: 'Kontakt', en: 'Contacts' }, icon: <Mail className="w-4 h-4" /> },
  ];

  // Dynamic filter based on Access Level permissions
  const filteredNavItems = navItems.filter((item) => {
    // Toolbox is visible ONLY to Regional Partners (TVB) & Admin
    if (item.id === 'regional-tools') {
      return accessLevel === 'regional' || accessLevel === 'admin';
    }
    // Emissione Voucher is visible ONLY to Hotel Partners & Admin
    if (item.id === 'voucher-system') {
      return accessLevel === 'partner' || accessLevel === 'admin';
    }
    return true;
  });

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-transform duration-300 shadow-xl border-b ${
      (isVisible || mobileMenuOpen) ? 'translate-y-0' : '-translate-y-full'
    } ${
      isLight 
        ? 'bg-[#FFFFFF]/95 text-[#083845] border-[#82B2BD]/40' 
        : 'bg-[#083845]/95 text-white border-[#417483]/30'
    }`}>
      {/* Top Utility Bar */}
      <div className={`border-b text-[11px] sm:text-xs py-1 px-3 sm:px-8 transition-colors ${
        isLight ? 'bg-[#F0F5F6] border-[#82B2BD]/30 text-[#083845]' : 'bg-[#052832] border-[#417483]/20 text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className={`inline-flex items-center space-x-1.5 font-bold ${
              isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                accessLevel === 'admin' ? 'bg-amber-400' : accessLevel === 'regional' ? 'bg-teal-300' : accessLevel === 'partner' ? 'bg-emerald-400' : isLight ? 'bg-[#0D4D5E]' : 'bg-[#AAD0D1]'
              }`}></span>
              <span className="hidden md:inline">
                {accessLevel === 'admin' && 'Livello 3: Admin Direzione'}
                {accessLevel === 'regional' && `Livello 2B: TVB (${partnerName})`}
                {accessLevel === 'partner' && `Livello 2A: Hotel (${partnerName})`}
                {accessLevel === 'public' && 'Livello 1: Pubblico'}
              </span>
            </span>

            {/* Quick Level Switch Pills */}
            {onSelectDemoRole && (
              <div className="hidden lg:flex items-center space-x-1 pl-2 border-l border-slate-300/40">
                <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Demo:</span>
                <button
                  onClick={() => onSelectDemoRole('public')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    accessLevel === 'public'
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'bg-slate-200/60 text-slate-700 hover:bg-slate-300'
                  }`}
                  title="Livello 1: Pubblico"
                >
                  Pubblico
                </button>
                <button
                  onClick={() => onSelectDemoRole('partner')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    accessLevel === 'partner'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                  title="Livello 2A: Struttura Partner Hotel"
                >
                  Hotel
                </button>
                <button
                  onClick={() => onSelectDemoRole('regional')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    accessLevel === 'regional'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                  }`}
                  title="Livello 2B: Partner Regionale TVB"
                >
                  TVB Regionale
                </button>
                <button
                  onClick={() => onSelectDemoRole('admin')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    accessLevel === 'admin'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                  title="Livello 3: Direzione Admin"
                >
                  Admin Direzione
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            
            {/* Quick Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg border font-bold text-xs flex items-center space-x-1.5 transition-all ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#82B2BD] text-[#083845] hover:bg-[#E2EFF1]' 
                  : 'bg-[#083845] border-[#417483]/50 text-[#AAD0D1] hover:bg-[#0D4D5E]'
              }`}
              title={isLight ? 'Passa ad Alpine Dark' : 'Passa a Snow Light'}
              aria-label="Toggle theme mode"
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0D4D5E]" />
                  <span className="hidden sm:inline text-[11px]">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">Snow Light</span>
                </>
              )}
            </button>

            {/* Accessibility Settings Button */}
            <button
              onClick={onOpenA11yModal}
              className={`p-1.5 rounded-lg border font-bold text-xs flex items-center space-x-1.5 transition-all ${
                a11y.highContrast || a11y.readableFont || a11y.fontSize !== 'normal'
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                  : isLight
                    ? 'bg-[#E2EFF1] border-[#82B2BD] text-[#083845] hover:bg-[#D5E7EA]'
                    : 'bg-[#083845] border-[#417483]/50 text-[#AAD0D1] hover:bg-[#0D4D5E]'
              }`}
              title="Apri pannello Accessibilità (WCAG)"
              aria-label="Accessibility settings"
            >
              <Accessibility className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Accessibilità</span>
            </button>

            {/* Language Switcher */}
            <div className={`flex items-center space-x-1 border rounded-lg p-0.5 ${
              isLight ? 'bg-[#FFFFFF] border-[#82B2BD]' : 'bg-[#083845] border-[#417483]/40'
            }`}>
              <Globe className={`w-3.5 h-3.5 ml-1 ${isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'}`} />
              {(['it', 'de', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded text-[11px] font-black uppercase transition-colors ${
                    lang === l
                      ? isLight ? 'bg-[#0D4D5E] text-white shadow-sm' : 'bg-[#AAD0D1] text-[#083845] shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Login / Logout Button */}
            {accessLevel === 'public' ? (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg font-extrabold text-xs transition-all bg-[#0D4D5E] text-white hover:bg-[#083845] shadow-md border border-[#82B2BD]/40 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#AAD0D1]" />
                <span>
                  {lang === 'it' ? 'Accedi (Partner / Admin)' : 'Login'}
                </span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <span className={`hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  accessLevel === 'admin'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                }`}>
                  {accessLevel === 'admin' ? <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> : <Hotel className="w-3.5 h-3.5 text-emerald-300" />}
                  <span className="truncate max-w-[160px]">{partnerName}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg font-bold text-xs transition-all bg-rose-600/80 hover:bg-rose-700 text-white border border-rose-400/40 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Esci</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2 sm:py-3 flex items-center justify-between">
        {/* Dolomiti NordicSki Official Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center space-x-2.5 sm:space-x-3 group"
        >
          <div className="group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <img 
              src={DNS_LOGO_BASE64} 
              alt="Dolomiti NordicSki Logo" 
              className="h-10 sm:h-13 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`font-black text-lg sm:text-xl tracking-tight transition-colors font-['Be_Vietnam_Pro'] ${
                isLight ? 'text-[#083845] group-hover:text-[#0D4D5E]' : 'text-white group-hover:text-[#AAD0D1]'
              }`}>
                DOLOMITI NORDICSKI
              </span>
              
              {/* Dynamic Active Partner / Admin Label */}
              {accessLevel === 'partner' ? (
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-white shadow-sm border border-emerald-400 flex items-center space-x-1">
                  <Hotel className="w-3 h-3" />
                  <span className="truncate max-w-[130px]">{partnerName}</span>
                </span>
              ) : accessLevel === 'admin' ? (
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950 shadow-sm border border-amber-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-slate-950" />
                  <span>DIREZIONE BACKEND</span>
                </span>
              ) : (
                <span className={`text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded border ${
                  isLight 
                    ? 'bg-[#E2EFF1] text-[#0D4D5E] border-[#82B2BD]' 
                    : 'bg-[#AAD0D1]/20 text-[#AAD0D1] border-[#AAD0D1]/30'
                }`}>
                  PORTALE B2B
                </span>
              )}
            </div>
            <p className={`text-xs font-medium hidden sm:block ${
              isLight ? 'text-[#417483]' : 'text-[#AAD0D1]/80'
            }`}>
              {accessLevel === 'partner' && `Account Struttura: ${partnerName} (${partnerCode})`}
              {accessLevel === 'admin' && 'Pannello di Controllo Generale Direzione Dolomiti NordicSki'}
              {accessLevel === 'public' && (lang === 'it' ? 'Portale Ufficiale Informazioni & Servizi Partner' : 'Official B2B Partner Portal')}
            </p>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg border ${
            isLight ? 'bg-[#E2EFF1] text-[#083845] border-[#82B2BD]' : 'bg-[#0D4D5E] text-slate-300 border-[#417483]/40'
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {filteredNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? isLight
                      ? 'bg-[#0D4D5E] text-white font-extrabold shadow-md'
                      : 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/40 shadow-md font-bold'
                    : isLight
                      ? 'text-[#083845] hover:bg-[#E2EFF1] font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-[#0D4D5E]/60 font-semibold'
                }`}
              >
                {item.icon}
                <span>{item.label[lang]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 py-4 space-y-2 max-h-[75vh] overflow-y-auto ${
          isLight ? 'bg-[#F0F5F6] border-[#82B2BD]' : 'bg-[#083845] border-[#417483]/40'
        }`}>
          {filteredNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? isLight
                      ? 'bg-[#0D4D5E] text-white font-bold'
                      : 'bg-[#0D4D5E] text-[#AAD0D1] border border-[#AAD0D1]/40 font-bold'
                    : isLight
                      ? 'text-[#083845] hover:bg-[#E2EFF1]'
                      : 'text-slate-200 hover:bg-[#0D4D5E]/60'
                }`}
              >
                {item.icon}
                <span>{item.label[lang]}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

