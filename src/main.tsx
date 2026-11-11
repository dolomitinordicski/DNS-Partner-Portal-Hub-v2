import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { WidgetEmbedPage } from './components/widget-creator/WidgetEmbedPage';
import { PublicWidgetCreatorPage } from './components/widget-creator/PublicWidgetCreatorPage';
import './tailwind.css';
// Local bundled font files: no request to third-party font CDNs at runtime.
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { applyDNSDesignVariables } from '@dolomitinordicski/dns-shared-data/foundation';
import { initDNSUIPrimitives } from '@dolomitinordicski/dns-shared-data/ui/primitives';
import { initDNSShellRuntime } from '@dolomitinordicski/dns-shared-data/ui/shell';
import { initDNSFooterRuntime } from '@dolomitinordicski/dns-shared-data/ui/footer';
import { initDNSNavigationStyles } from '@dolomitinordicski/dns-shared-data/ui/navigation';

// Apply Foundation's canonical design variables, not local design-token aliases.
applyDNSDesignVariables();

// Foundation owns the UI primitives, shell, footer and header/navigation behavior.
initDNSUIPrimitives();
initDNSShellRuntime('portal');
// Foundation owns the header/progress styling and shared footer decoration.
initDNSFooterRuntime();
initDNSNavigationStyles();

const params = new URLSearchParams(window.location.search);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {params.get('dnsWidget') === '1' ? <WidgetEmbedPage /> :
      params.get('dnsCreator') === '1' ? <PublicWidgetCreatorPage /> : <App />}
  </StrictMode>,
);
