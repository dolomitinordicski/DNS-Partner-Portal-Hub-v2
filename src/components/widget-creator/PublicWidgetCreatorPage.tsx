import { WidgetCreator } from '../WidgetCreator';
import type { Language } from '../../types';

/** Public, chrome-free Creator view for embedding in the DNS Portal.
 * The same WidgetCreator component is also used by the Partner Hub tab.
 * All Firebase configuration and published-data reads remain in Partner Hub.
 */
export function PublicWidgetCreatorPage() {
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  const lang: Language = requestedLanguage === 'it' || requestedLanguage === 'de' || requestedLanguage === 'en'
    ? requestedLanguage : 'it';
  return <>
    {/* Hide only the standalone iframe scrollbar, not the Partner Hub app scrollbar.
        Wheel, touch and keyboard scrolling remain enabled. */}
    <style>{`
      html:has([data-dns-standalone-creator]) { scrollbar-width: none; -ms-overflow-style: none; }
      html:has([data-dns-standalone-creator])::-webkit-scrollbar { display: none; }
    `}</style>
    <main data-dns-standalone-creator="" lang={lang} className="min-h-screen" style={{ background: 'var(--color-dns-bg)' }}>
      <WidgetCreator lang={lang} accessLevel="public" />
    </main>
  </>;
}
