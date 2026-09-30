import { 
  LogoVariant, 
  ColorPaletteItem, 
  BrandGuideline, 
  QualityCriterion, 
  DownloadItem, 
  NordicRegion,
  SkipassVoucher
} from '../types';

export const DNS_LOGO_URL = "https://raw.githubusercontent.com/dolomitinordicski/partnerportal/main/img/dolomiti%20nordicski%20logo%20FARBE%202025.png";
export const DNS_LOGO_BASE64 = DNS_LOGO_URL;

export const BRAND_COLORS: ColorPaletteItem[] = [
  {
    name: {
      de: 'DNS Alpine Primary (Haupt-Ottanio)',
      it: 'DNS Alpine Primary (Ottanio Primario)',
      en: 'DNS Alpine Primary (Primary Teal)'
    },
    hex: '#0D4D5E',
    rgb: 'RGB 13, 77, 94',
    cmyk: 'CMYK 86, 18, 0, 63',
    pantone: 'Pantone 7715 C',
    role: {
      de: 'Offizielle Markenfarbe, alpine Eleganz und primäre visuelle Identität.',
      it: 'Colore di marca ufficiale, eleganza alpina e identità visiva principale.',
      en: 'Official brand colour, alpine elegance, and main visual identity.'
    }
  },
  {
    name: {
      de: 'DNS Deep (Dunkles Petrolblau)',
      it: 'DNS Deep (Blu Petrolio Scuro)',
      en: 'DNS Deep (Dark Petrol Blue)'
    },
    hex: '#083845',
    rgb: 'RGB 8, 56, 69',
    cmyk: 'CMYK 88, 19, 0, 73',
    pantone: 'Pantone 5473 C',
    role: {
      de: 'Dunkler Corporate-Hintergrund, Tiefe der Berge und Premium-Kontrast.',
      it: 'Sfondo corporate scuro, profondità delle montagne e contrasto premium.',
      en: 'Dark corporate background, mountain depth, and premium contrast.'
    }
  },
  {
    name: {
      de: 'DNS Muted Teal (Mittleres Ottanio)',
      it: 'DNS Muted Teal (Ottanio Medio)',
      en: 'DNS Muted Teal (Medium Teal)'
    },
    hex: '#417483',
    rgb: 'RGB 65, 116, 131',
    cmyk: 'CMYK 50, 11, 0, 49',
    pantone: 'Pantone 7544 C',
    role: {
      de: 'Ränder, sekundäre Akzente und Navigationsdetails.',
      it: 'Bordi, accenti secondari e dettagli di navigazione.',
      en: 'Borders, secondary accents, and navigation details.'
    }
  },
  {
    name: {
      de: 'DNS Soft Ice (Eisblau)',
      it: 'DNS Soft Ice (Azzurro Ghiaccio)',
      en: 'DNS Soft Ice (Ice Blue)'
    },
    hex: '#AAD0D1',
    rgb: 'RGB 170, 208, 209',
    cmyk: 'CMYK 19, 0, 0, 18',
    pantone: 'Pantone 552 C',
    role: {
      de: 'Hauptlichtakzent, hervorgehobene Schaltflächen und aktive Badges.',
      it: 'Accento di luce principale, pulsanti in risalto e badge attivi.',
      en: 'Primary light accent, highlighted buttons, and active badges.'
    }
  },
  {
    name: {
      de: 'DNS Snow White (Alpines Schneeweiß)',
      it: 'DNS Snow White (Bianco Neve Alpina)',
      en: 'DNS Snow White (Alpine Snow White)'
    },
    hex: '#F4F9F9',
    rgb: 'RGB 244, 249, 249',
    cmyk: 'CMYK 2, 0, 0, 2',
    role: {
      de: 'Helle Hintergründe, Kontrastkarten und höchste Lesbarkeit.',
      it: 'Sfondi chiari, schede di contrasto e massima leggibilità.',
      en: 'Light backgrounds, contrast cards, and maximum legibility.'
    }
  }
];

export const LOGO_VARIANTS: LogoVariant[] = [
  {
    id: 'logo-main-color',
    name: {
      de: 'Offizielles Logo Dolomiti NordicSki 2026',
      it: 'Logo Ufficiale Dolomiti NordicSki 2026',
      en: 'Official Dolomiti NordicSki Logo 2026'
    },
    useCase: {
      de: 'Offizielle Anwendung auf allen Kommunikationsmaterialien, digitalen Portalen und Beschilderungen.',
      it: 'Applicazione ufficiale su tutti i materiali di comunicazione, portali digitali e cartellonistica.',
      en: 'Official application on all communication materials, digital portals, and signage.'
    },
    fileFormats: ['PNG (HD)', 'SVG', 'EPS', 'PDF'],
    bgType: 'dark',
    previewBg: 'bg-[#0D4D5E]',
    accentColor: '#AAD0D1',
    downloadSize: '5.4 MB'
  },
  {
    id: 'logo-negative-dark',
    name: {
      de: 'Negativ-Logo für dunkle Hintergründe',
      it: 'Logo Negativo per Sfondi Scuri',
      en: 'Negative Logo for Dark Backgrounds'
    },
    useCase: {
      de: 'Verwendung auf dunklem Petrolblau, verschneiten Landschaftsfotos oder Bergmotiven.',
      it: 'Utilizzo su sfondi blu petrolio scuro, foto di paesaggi innevati o sfondi di montagna.',
      en: 'Use on dark petrol blue backgrounds, snowy landscape photos, or mountain backgrounds.'
    },
    fileFormats: ['EPS', 'SVG', 'PNG (HD)', 'PDF'],
    bgType: 'dark',
    previewBg: 'bg-[#083845]',
    accentColor: '#AAD0D1',
    downloadSize: '3.8 MB'
  },
  {
    id: 'logo-mono-black',
    name: {
      de: 'Monochromes Logo für Druck',
      it: 'Logo Monocromatico per Stampa',
      en: 'Monochrome Logo for Print'
    },
    useCase: {
      de: 'Schwarz-Weiß-Druck, Stempel, Rechnungen und administrative Dokumente ohne Vierfarbdruck.',
      it: 'Stampa in bianco e nero, timbri, fatture e documenti amministrativi senza quadricromia.',
      en: 'Black and white printing, stamps, invoices, and administrative documents without full colour.'
    },
    fileFormats: ['EPS', 'SVG', 'PNG'],
    bgType: 'light',
    previewBg: 'bg-white',
    accentColor: '#0D4D5E',
    downloadSize: '2.1 MB'
  },
  {
    id: 'logo-co-branding',
    name: {
      de: 'Masterbrand + Partnerregion Logo',
      it: 'Masterbrand + Logo Regione Partner',
      en: 'Masterbrand + Partner Region Logo'
    },
    useCase: {
      de: 'Integration der Marke Dolomiti NordicSki mit den Logos der 8 Regionen oder dem Partnerbetrieb-Logo.',
      it: 'Integrazione del marchio Dolomiti NordicSki con i marchi delle 8 aree o con il logo dell\'alloggio partner.',
      en: 'Integration of the Dolomiti NordicSki brand with the 8 regional brands or partner accommodation logo.'
    },
    fileFormats: ['EPS', 'SVG', 'ZIP Pack'],
    bgType: 'transparent',
    previewBg: 'bg-[#0D4D5E]/20',
    accentColor: '#AAD0D1',
    downloadSize: '12.5 MB'
  }
];


export const BRAND_GUIDELINES: BrandGuideline[] = [
  {
    title: {
      de: 'Schutzzone und Proportionalität',
      it: 'Area di Rispetto e Proporzioni',
      en: 'Clear Space and Proportions'
    },
    description: {
      de: 'Die Marke muss stets eine freie Schutzzone um sich herum einhalten, die der Höhe des Großbuchstabens "D" entspricht, um maximale Sichtbarkeit zu gewährleisten.',
      it: 'Il marchio deve sempre conservare uno spazio libero attorno a sé pari all\'altezza della maiuscola "D" per garantire massima visibilità e rispetto del brand.',
      en: 'The brand must always maintain a free clear space around itself equal to the height of the capital letter "D" to ensure maximum visibility.'
    },
    dos: [
      {
        de: 'Halten Sie stets die Mindestschutzzone um das Logo ein.',
        it: 'Mantenere sempre l\'area di rispetto minima attorno al logo.',
        en: 'Always maintain the minimum clear space around the logo.'
      },
      {
        de: 'Verwenden Sie nach Möglichkeit die Farbversion.',
        it: 'Utilizzare la versione a colori quando possibile.',
        en: 'Use the colour version whenever possible.'
      },
      {
        de: 'Behalten Sie das Proportionalverhältnis zwischen Piktogramm und Wortmarke unverändert bei.',
        it: 'Mantenere invariato il rapporto di proporzione tra il pittogramma del fondista e il logotipo.',
        en: 'Keep the proportional ratio between the skier pictogram and logotype unchanged.'
      }
    ],
    donts: [
      {
        de: 'Logo niemals drehen, neigen oder verzerren.',
        it: 'Non ruotare, inclinare o distorcere mai il logo.',
        en: 'Never rotate, skew, or distort the logo.'
      },
      {
        de: 'Offizielle Markenfarben niemals verändern.',
        it: 'Non cambiare i colori ufficiali del marchio.',
        en: 'Never alter official brand colours.'
      },
      {
        de: 'Logo nicht auf komplexen Fotohintergründen ohne ausreichenden Kontrast platzieren.',
        it: 'Non posizionare il logo su sfondi fotografici complessi privi di sufficiente contrasto.',
        en: 'Do not place the logo on complex photo backgrounds lacking sufficient contrast.'
      }
    ]
  },
  {
    title: {
      de: 'Co-Branding mit Beherbergungsbetrieben',
      it: 'Co-Branding con Strutture Ricettive',
      en: 'Co-Branding with Accommodation Partners'
    },
    description: {
      de: 'Alle zertifizierten Partnerbetriebe haben das Recht und die Pflicht, den Schriftzug und das Logo "Offizieller Partnerbetrieb Dolomiti NordicSki" auf ihren Kanälen einzubinden.',
      it: 'Tutti gli alloggi partner accreditati hanno il diritto e l\'obbligo di inserire la dicitura e il logo "Partner Ufficiale Dolomiti NordicSki" nei propri canali.',
      en: 'All accredited partner hotels have the right and obligation to display the "Official Dolomiti NordicSki Partner" wording and logo across their media.'
    },
    dos: [
      {
        de: 'Fügen Sie das Banner "Offizieller Partnerbetrieb" im Angebots- oder Langlauf-Bereich Ihrer Website ein.',
        it: 'Affiancare il banner "Partner Ufficiale" nella sezione offerte o pacchetti sci di fondo del proprio sito.',
        en: 'Display the "Official Partner" banner in the cross-country packages section of your website.'
      },
      {
        de: 'Verwenden Sie die Bezeichnung "Qualifizierter Dolomiti NordicSki Partnerbetrieb".',
        it: 'Utilizzare la dicitura "Alloggio Qualificato Dolomiti NordicSki".',
        en: 'Use the designation "Qualified Dolomiti NordicSki Accommodation".'
      },
      {
        de: 'Setzen Sie einen direkten Link zum Loipenpass-Vorverkauf und Loipenbericht.',
        it: 'Inserire il link diretto al sistema di prevendita skipass e bollettino piste.',
        en: 'Include a direct link to the ski pass presale system and trail report.'
      }
    ],
    donts: [
      {
        de: 'Text des offiziellen Partner-Badges niemals ändern.',
        it: 'Non modificare il testo del badge partner ufficiale.',
        en: 'Do not alter the text of the official partner badge.'
      },
      {
        de: 'Keine unautorisierten abgeleiteten Marken erstellen.',
        it: 'Non creare marchi derivati non autorizzati dall\'ufficio centrale.',
        en: 'Do not create unauthorized derivative logos.'
      },
      {
        de: 'Logo nicht für kommerzielle Zwecke außerhalb des Langlaufs nutzen.',
        it: 'Non utilizzare il logo per attività commerciali estranee allo sci di fondo.',
        en: 'Do not use the logo for commercial activities unrelated to cross-country skiing.'
      }
    ]
  }
];

export const PARTNER_BENEFITS = [
  {
    id: 'ben-1',
    icon: 'Ticket',
    title: {
      de: 'Direkte Loipenpass-Ausstellung an der Rezeption',
      it: 'Emissione Diretta Skipass in Reception',
      en: 'Direct Ski Pass Issuance at Reception'
    },
    subtitle: {
      de: 'Keine Wartezeiten für Ihre Gäste an den Kassen',
      it: 'Zero code alle casse per i tuoi ospiti',
      en: 'Zero queuing for your hotel guests'
    },
    description: {
      de: 'Nutzen Sie das Partnerportal zur raschen Erstellung von digitalen Gutscheinen und Mehrtageskarten. Bieten Sie Ihren Gästen höchsten Komfort direkt bei der Anreise.',
      it: 'Utilizza il Portale Partner per emettere istantaneamente voucher e pass pluvi-giornalieri con QR Code. Offri un servizio 5 stelle prima ancora che l\'ospite scenda in pista.',
      en: 'Issue instant QR-code vouchers directly at reception for seamless guest arrival and premium service.'
    },
    badge: {
      de: 'Exklusiv für Partner',
      it: 'Esclusivo Partner',
      en: 'Partner Exclusive'
    }
  },
  {
    id: 'ben-2',
    icon: 'Globe',
    title: {
      de: 'Präsenz im offiziellen Portal Dolomiti NordicSki',
      it: 'Inserimento nel Portale Ufficiale & Mappe',
      en: 'Listing on Official Portal & Maps'
    },
    subtitle: {
      de: 'Über 500.000 aktive Langläufer pro Saison erreichen',
      it: 'Visibilità diretta a oltre 500.000 fondisti a stagione',
      en: 'Reach over 500,000 active cross-country skiers per season'
    },
    description: {
      de: 'Eigene Profilseite mit Fotos, Ausstattungsmerkmalen, Direktlink zur Hotel-Website und Verortung auf den interaktiven Loipenkarten aller 8 Regionen.',
      it: 'Scheda personalizzata con foto, servizi offerti, link diretto al booking dell\'hotel e posizionamento sulla mappa interattiva dei tracciati.',
      en: 'Dedicated property page with photos, amenities, direct booking link, and interactive trail map placement.'
    },
    badge: {
      de: 'Hohe Reichweite',
      it: 'Alta Visibilità',
      en: 'High Reach'
    }
  },
  {
    id: 'ben-3',
    icon: 'Download',
    title: {
      de: 'Kostenloses Marketing-Kit & Offizielles Partner-Schild',
      it: 'Kit Marketing Gratuito & Targa Ufficiale',
      en: 'Free Marketing Kit & Official Badge Plaque'
    },
    subtitle: {
      de: 'Erstklassige Druck- und Digitalmaterialien',
      it: 'Materiale promozionale e targa in legno/metallo',
      en: 'Premium print and digital promotional materials'
    },
    description: {
      de: 'Erhalten Sie das physische Willkommenspaket mit offizieller Partnerplakette für den Eingangsbereich, gedruckten Loipenkarten (1.000 km) sowie hochauflösenden Web-Bannern.',
      it: 'Ricevi la targa ufficiale da esterno "Partner Qualificato", le cartine tascabili 1.000 km per le camere e i banner digitali per il tuo sito web.',
      en: 'Receive the physical entrance badge plaque, printed 1,000 km trail maps for guest rooms, and web banners.'
    },
    badge: {
      de: 'Gratis Material',
      it: 'Kit Gratuito',
      en: 'Free Kit'
    }
  },
  {
    id: 'ben-4',
    icon: 'Sparkles',
    title: {
      de: 'B2B-Toolbox, Vorlagen & Widgets für Hotelwebsites',
      it: 'B2B Toolbox & Widget Sci per Sito Web',
      en: 'B2B Toolbox & Hotel Website Widgets'
    },
    subtitle: {
      de: 'Live-Wetter, Loipenberichte & Gütesiegel per Embed-Code',
      it: 'Bollettino piste live e badge embeddabile sul tuo sito',
      en: 'Live trail reports and embeddable badges'
    },
    description: {
      de: 'Integrieren Sie mit wenigen Klicks aktuelle Schneeberichte, Pistenstatus und das Gütesiegel "Qualifizierter Langlauf-Partnerbetrieb" direkt in Ihre eigene Website.',
      it: 'Inserisci sul sito dell\'hotel il widget dinamico con lo stato aggiornato delle piste di zona e il bollino di qualità ufficiale.',
      en: 'Embed live snow conditions, open track statuses, and the official quality seal directly on your hotel website.'
    },
    badge: {
      de: 'Digital Tool',
      it: 'Strumento Digitale',
      en: 'Digital Tool'
    }
  },
  {
    id: 'ben-5',
    icon: 'Megaphone',
    title: {
      de: 'Gezieltes Social Media & Newsletter Marketing',
      it: 'Promozione Social & Newsletter Dedicata',
      en: 'Targeted Social Media & Newsletter Features'
    },
    subtitle: {
      de: 'Bewerbung Ihrer Langlauf-Pauschalen und Angebote',
      it: 'Inclusione dei tuoi pacchetti vacanza nei canali ufficiali',
      en: 'Promotion of your Nordic package offers'
    },
    description: {
      de: 'Ihre speziellen Langlauf-Angebote werden in den offiziellen Dolomiti NordicSki Newslettern und Social-Media-Kanälen gezielt an Sportbegeisterte beworben.',
      it: 'Inclusione periodica dei pacchetti speciali dell\'hotel nelle newsletter ufficiali inviate a decine di migliaia di appassionati profilati.',
      en: 'Feature your special winter package deals in official newsletters sent to tens of thousands of cross-country enthusiasts.'
    },
    badge: {
      de: 'Promotion',
      it: 'Promozione',
      en: 'Promotion'
    }
  },
  {
    id: 'ben-6',
    icon: 'Award',
    title: {
      de: 'Schulungen & Skiman-Schulungen für Mitarbeiter',
      it: 'Formazione Staff & Workshop Sciolinatura',
      en: 'Staff Training & Waxing Workshops'
    },
    subtitle: {
      de: 'Know-how-Vorsprung für Ihr Rezeptions- und Serviceteam',
      it: 'Corsi gratuiti di aggiornamento tecnico per lo staff',
      en: 'Free technical training workshops for staff'
    },
    description: {
      de: 'Kostenlose Teilnahme an Schulungen über Loipennetze, Materialkunde und Wachspräparierung, um Ihren Gästen kompetente Beratung vor Ort zu bieten.',
      it: 'Partecipazione gratuita ai corsi di formazione su tracciati, tecniche di sciolinatura e materiali per garantire consigli impeccabili agli ospiti.',
      en: 'Free access to staff workshops covering track networks, waxing techniques, and equipment care.'
    },
    badge: {
      de: 'Weiterbildung',
      it: 'Formazione',
      en: 'Training'
    }
  }
];

export const QUALITY_CRITERIA: QualityCriterion[] = [
  {
    id: 'qc-1',
    category: {
      de: 'Infrastruktur & Zugang',
      it: 'Infrastrutture & Accesso',
      en: 'Infrastructure & Access'
    },
    title: {
      de: 'Direkter Loipenzugang oder Shuttleservice',
      it: 'Accesso Diretto o Navetta Piste',
      en: 'Direct Trail Access or Shuttle'
    },
    description: {
      de: 'Der Betrieb liegt direkt an der Langlaufloipe (max. 300 m) oder bietet einen kostenlosen, bequemen Shuttleservice zum Einstiegspunkt.',
      it: 'La struttura si trova direttamente sulla pista di fondo (max 300m) oppure garantisce un servizio navetta gratuito o comodo per il punto d\'accesso.',
      en: 'Property located directly on the cross-country track (max 300m) or provides a free convenient shuttle service.'
    },
    isMandatory: true,
    icon: 'MapPin'
  },
  {
    id: 'qc-2',
    category: {
      de: 'Ausstattungs- & Skiraum',
      it: 'Deposito Equipaggiamento',
      en: 'Equipment Storage'
    },
    title: {
      de: 'Beheizter Skiraum mit Wachstisch',
      it: 'Deposito Sci Riscaldato con Sciolinatore',
      en: 'Heated Waxing Room & Ski Storage'
    },
    description: {
      de: 'Abschließbarer Skiraum mit Skiständern, belüftetem Skischuhtrockner und komplettem Wachstisch inkl. Stromanschlüssen und Skihalterung.',
      it: 'Locale chiuso e sicuro per gli sci, dotato di rastrelliere, asciuga-scarponi ventilato e tavolo da sciolinatura completo di prese elettriche e supporto per sci.',
      en: 'Secure ski room with ski racks, boot dryers, and waxing table equipped with power outlets and profile vise.'
    },
    isMandatory: true,
    icon: 'ShieldCheck'
  },
  {
    id: 'qc-3',
    category: {
      de: 'Sportler-Verpflegung',
      it: 'Alimentazione per Sportivi',
      en: 'Athlete Nutrition'
    },
    title: {
      de: 'Langläufer-Frühstück & Sporternährung',
      it: 'Colazione del Fondista & Nutrizione',
      en: 'Cross-Country Athlete Breakfast'
    },
    description: {
      de: 'Kohlenhydratreiches Frühstück mit Müsli, getrockneten/frischen Früchten. Auf Wunsch Lunchpaket ("Sportler-Snack").',
      it: 'Colazione ricca di carboidrati, muesli, cereali, frutta fresca e secca. Possibilità di pranzo al sacco ("Sportler-Snack") su richiesta.',
      en: 'Carbohydrate-rich breakfast with muesli, cereals, and fresh/dried fruits. Packed lunch available upon request.'
    },
    isMandatory: true,
    icon: 'Utensils'
  },
  {
    id: 'qc-4',
    category: {
      de: 'Loipenpass-Service im Hotel',
      it: 'Servizio Skipass in Struttura',
      en: 'In-House Ski Pass Issuance'
    },
    title: {
      de: 'Voucher-Ausstellung & Loipenpass-Vorverkauf',
      it: 'Emissione Voucher & Prevendita Skipass',
      en: 'Direct Voucher Issuance at Reception'
    },
    description: {
      de: 'Möglichkeit für Gäste, den Loipenpass-Voucher direkt an der Rezeption über das Partnerportal zu beziehen – ohne Wartezeit an der Kasse.',
      it: 'Possibilità per l\'ospite di acquistare o richiedere il voucher skipass direttamente alla reception tramite il Portale Partner senza fare file alla cassa.',
      en: 'Guests can request or purchase their ski pass voucher directly at reception without queuing.'
    },
    isMandatory: true,
    icon: 'Ticket'
  },
  {
    id: 'qc-5',
    category: {
      de: 'Information & Wetter',
      it: 'Informazioni & Meteo',
      en: 'Info & Trail Conditions'
    },
    title: {
      de: 'Langlauf-Infopoint & Loipenbericht',
      it: 'Info Point Sci di Fondo & Bollettino Piste',
      en: 'Cross-Country Info Corner & Trail Report'
    },
    description: {
      de: 'Ausgedruckte Loipenkarten, täglich aktualisierter Schnee- und Loipenbericht sowie Bus- und Zugfahrpläne stets verfügbar.',
      it: 'Mappe cartacee delle piste sempre disponibili, bollettino neve aggiornato quotidianamente e orari trasporti pubblici / sci-bus.',
      en: 'Printed trail maps, daily updated snow/trail reports, and public transport timetables readily available.'
    },
    isMandatory: true,
    icon: 'Info'
  },
  {
    id: 'qc-6',
    category: {
      de: 'Wäscheservice',
      it: 'Servizio Lavanderia',
      en: 'Laundry Service'
    },
    title: {
      de: 'Waschservice für Funktionsbekleidung',
      it: 'Lavaggio Abbigliamento Tecnico',
      en: 'Technical Laundry Service'
    },
    description: {
      de: 'Schneller Wäscheservice für Langlaufbekleidung und Funktionsunterwäsche oder Nutzung von Waschmaschine/Trockner für Gäste.',
      it: 'Servizio lavanderia rapida per tute e intimo termico o disponibilità di lavatrice/asciugatrice per gli ospiti.',
      en: 'Express laundry service for thermal wear or guest washer/dryer access.'
    },
    isMandatory: false,
    icon: 'Shirt'
  }
];

export const NORDIC_REGIONS: NordicRegion[] = [
  {
    id: 'cortina',
    name: "Cortina d'Ampezzo",
    subtitle: "Dolomiti d'Ampezzo & Passo Tre Croci",
    kmTracks: 138,
    altitude: '1.211m - 1.800m',
    highlights: ['Pista Fiames-Cimabanche', 'Passo Tre Croci', 'Percorsi panoramici UNESCO'],
    description: 'Tra le vette più iconiche delle Dolomiti, offre piste battute sia per lo stile classico sia per lo skating, con punti tappa rinomati e paesaggi da cartolina.',
    image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 42,
    website: 'https://www.dolomitinordicski.com/cortina'
  },
  {
    id: 'antholz',
    name: 'Valle Anterselva / Antholzertal',
    subtitle: 'Centro Biathlon & Lago di Anterselva',
    kmTracks: 60,
    altitude: '1.100m - 1.640m',
    highlights: ['Südtirol Arena Alto Adige', 'Anello del Lago di Anterselva', 'Tappa Coppa del Mondo Biathlon'],
    description: 'Capitale dello sci di fondo e del biathlon, sede delle gare olimpiche Milano-Cortina 2026. Neve garantita fino a primavera inoltrata.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 38,
    website: 'https://www.dolomitinordicski.com/anterselva'
  },
  {
    id: '3zinnen',
    name: '3 Zinnen Dolomites',
    subtitle: 'San Candido, Dobbiaco, Sesto, Braies, Villabassa',
    kmTracks: 200,
    altitude: '1.130m - 2.000m',
    highlights: ['Nordic Arena Dobbiaco', 'Val Fiscalina', 'Tour Dobbiaco-Cortina'],
    description: 'Il cuore pulsante del carosello con oltre 200 km di piste collegate e lo stadio della Nordic Arena di Dobbiaco per gli eventi internazionali.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 75,
    website: 'https://www.dolomitinordicski.com/3zinnen'
  },
  {
    id: 'gsieser',
    name: 'Val Casies / Monguelfo / Tesido',
    subtitle: 'Gsiesertal & Valle di Casies',
    kmTracks: 42,
    altitude: '1.080m - 1.400m',
    highlights: ['Gran Fondo Val Casies (Gsieser Tal Lauf)', 'Piste idilliache tra i masi', 'Ristori gastronomici alpini'],
    description: 'Valle incantata e soleggiata celebre per la sua atmosfera autentica e per la famosissima Gran Fondo che attira migliaia di appassionati da tutto il mondo.',
    image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 31,
    website: 'https://www.dolomitinordicski.com/valcasies'
  },
  {
    id: 'osttirol',
    name: 'Osttirol (Tirolo Orientale)',
    subtitle: 'Lienz, Hochpustertal & Obertilliach',
    kmTracks: 400,
    altitude: '673m - 1.450m',
    highlights: ['Centro Biathlon Obertilliach', 'Dolomitenlauf Lienz', 'Piste lungo il fiume Drava'],
    description: 'La parte austriaca del carosello offre sconfinati altipiani e neve garantita in un ambiente naturale incontaminato e rilassante.',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 64,
    website: 'https://www.dolomitinordicski.com/osttirol'
  },
  {
    id: 'comelico',
    name: 'Val Comelico',
    subtitle: 'Padola, Santo Stefano, Danta & San Nicolò',
    kmTracks: 52,
    altitude: '900m - 1.500m',
    highlights: ['Piste tra gli abeti secolari', 'Anello di Padola', 'Panorami silenziosi sul Popera'],
    description: "Un'oasi di pace nel Cadore con tracciati immersi nei boschi e una tradizione di ospitalità autentica per gli amanti della natura inalterata.",
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 22,
    website: 'https://www.dolomitinordicski.com/comelico'
  },
  {
    id: 'ahrntal',
    name: 'Ahrntal / Valle Aurina',
    subtitle: 'Kasern / Casere, Rein in Taufers / Riva di Tures, Weißenbach',
    kmTracks: 50,
    altitude: '860m - 1.600m',
    highlights: ['Centro Fondo Casere / Kasern', 'Pista Sole Riva di Tures', '80 Cime oltre i 3.000m'],
    description: 'La Valle Aurina offre piane innevate spettacolari e piste incantevoli a Casere e Riva di Tures, incastonate tra ottanta vette che superano i 3.000 metri.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 35,
    website: 'https://www.dolomitinordicski.com/ahrntal'
  },
  {
    id: 'seiseralm',
    name: 'Seiser Alm Dolomites Val Gardena',
    subtitle: 'Alpe di Siusi, Ortisei, Santa Cristina, Selva Val Gardena',
    kmTracks: 133,
    altitude: '1.800m - 2.200m',
    highlights: ['Altopiano Alpe di Siusi a 2.000m', 'Gran Fondo Moonlight Classic', 'Piste panoramiche Vallunga (Monte Pana)'],
    description: "L'altopiano più grande d'Europa offre piste soleggiate in quota sull'Alpe di Siusi e tracciati suggestivi in Vallunga a Selva di Val Gardena.",
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    partnerCount: 65,
    website: 'https://www.dolomitinordicski.com/seiseralm'
  }
];

export const INITIAL_VOUCHERS: SkipassVoucher[] = [
  {
    id: 'vch-8821',
    voucherCategory: 'skipass',
    voucherCode: 'DNS-2026-882194',
    guestName: 'Familie Müller',
    guestCount: 2,
    accommodationName: 'Sporthotel Drei Zinnen',
    partnerCode: '3Z-HOTEL-042',
    skipassType: 'weekly',
    coverage: 'dolomiti',
    validFrom: '2026-02-01',
    validTo: '2026-02-07',
    totalPrice: 220,
    status: 'issued',
    createdAt: '2026-01-28 14:32',
    qrCodeUrl: 'https://www.dolomitinordicski.com/verify?code=DNS-2026-882194'
  },
  {
    id: 'vch-8822',
    voucherCategory: 'skipass',
    voucherCode: 'DNS-2026-882210',
    guestName: 'Marco Rossi',
    guestCount: 1,
    accommodationName: 'Alpenresidence Anterselva',
    partnerCode: 'ANT-RES-018',
    skipassType: 'day',
    coverage: 'regional',
    selectedRegion: 'antholz',
    validFrom: '2026-01-31',
    validTo: '2026-01-31',
    totalPrice: 14,
    status: 'redeemed',
    createdAt: '2026-01-29 09:15',
    qrCodeUrl: 'https://www.dolomitinordicski.com/verify?code=DNS-2026-882210'
  },
  {
    id: 'vch-8825',
    voucherCategory: 'package',
    voucherCode: 'PAC-2026-991042',
    guestName: 'Familie Schneider',
    guestCount: 2,
    accommodationName: 'Hotel Dolomiti Peak',
    partnerCode: 'DOL-PEAK-012',
    packageName: 'Dolomiti Cross-Country Special Week',
    regionName: 'Dolomiti Region 3 Zinnen',
    stayDates: '14.02.2026 - 21.02.2026',
    includedServices: '7 Übernachtungen Halbpension, 7-Tage Loipenpass Dolomiti NordicSki, Wachskurs, Sportlerfrühstück',
    validFrom: '2026-02-14',
    validTo: '2026-02-21',
    totalPrice: 1450,
    status: 'issued',
    createdAt: '2026-01-30 16:20',
    qrCodeUrl: 'https://www.dolomitinordicski.com/verify?code=PAC-2026-991042'
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 'dl-cd-manual',
    title: {
      de: 'Offizielles Corporate Design Handbuch 2025/2026',
      it: 'Manuale Ufficiale Corporate Design 2025/2026',
      en: 'Official Corporate Design Manual 2025/2026'
    },
    category: 'brand-manual',
    fileType: 'PDF',
    fileSize: '14.8 MB',
    updatedAt: {
      de: 'Oktober 2025',
      it: 'Ottobre 2025',
      en: 'October 2025'
    },
    description: {
      de: 'Vollständige offizielle Richtlinien zu Corporate Identity, Logonutzungsregeln, Schriften, Farben und Co-Branding für Beherbergungsbetriebe.',
      it: 'Linee guida ufficiali complete su Corporate Identity, regole d\'uso del marchio, font tipografici, colori e co-branding per strutture ricettive.',
      en: 'Complete guidelines on Corporate Identity, brand rules, typography, colours, and partner co-branding.'
    },
    downloadUrl: '#'
  },
  {
    id: 'dl-logo-pack-vector',
    title: {
      de: 'Vektor Master-Logopaket (EPS / SVG / PDF)',
      it: 'Vector Master Logo Pack (EPS / SVG / PDF)',
      en: 'Vector Master Logo Pack (EPS / SVG / PDF)'
    },
    category: 'logos',
    fileType: 'ZIP',
    fileSize: '18.2 MB',
    updatedAt: {
      de: 'November 2025',
      it: 'Novembre 2025',
      en: 'November 2025'
    },
    description: {
      de: 'Vollständiges Paket hochauflösender Vektorlogos für professionellen Druck, Druckereien und Beschilderung.',
      it: 'Pacchetto completo loghi vettoriali ad alta definizione per stampa professionale, tipografie e cartellonistica.',
      en: 'Full vector logo package in high resolution for professional print and sign making.'
    },
    downloadUrl: '#'
  },
  {
    id: 'dl-logo-web-png',
    title: {
      de: 'Logopaket für Websites & Digital (PNG Transparent / WebP)',
      it: 'Logo Pack per Siti Web e Digital (PNG Trasparente / WebP)',
      en: 'Logo Pack for Websites & Digital (Transparent PNG / WebP)'
    },
    category: 'logos',
    fileType: 'ZIP',
    fileSize: '8.4 MB',
    updatedAt: {
      de: 'November 2025',
      it: 'Novembre 2025',
      en: 'November 2025'
    },
    description: {
      de: 'Optimierte Logoversionen in verschiedenen Webformaten und HD-Auflösungen für Hotelwebsites, Banner und Social Media.',
      it: 'Versioni ottimizzate del logo in vari formati web e risoluzioni HD per siti hotel, banner e social media.',
      en: 'Optimized logo formats for hotel websites, digital banners, and social media.'
    },
    downloadUrl: '#'
  },
  {
    id: 'dl-map-1000km',
    title: {
      de: 'Gesamte Loipenkarte 1.000 km (Hohe Auflösung)',
      it: 'Cartina Generale Tracciati 1.000 km (Alta Risoluzione)',
      en: 'Overall 1,000 km Trail Map (High Resolution)'
    },
    category: 'maps',
    fileType: 'PDF',
    fileSize: '32.1 MB',
    updatedAt: {
      de: 'Dezember 2025',
      it: 'Dicembre 2025',
      en: 'December 2025'
    },
    description: {
      de: 'Druckfähige offizielle Übersichtskarte mit allen 8 Regionen, Einstiegspunkten und Loipenverbindungen.',
      it: 'Mappa panoramica ufficiale stampabile con il dettaglio delle 8 aree, ingressi piste e collegamenti del carosello.',
      en: 'Printable official map showing all 8 regions, track entry points, and connections.'
    },
    downloadUrl: '#'
  },
  {
    id: 'dl-partner-flyer',
    title: {
      de: 'Gäste-Info-Flyer für Hotels (A4 / A5)',
      it: 'Flyer Informativo per gli Ospiti dell\'Hotel (A4 / A5)',
      en: 'Hotel Guest Info Flyer (A4 / A5)'
    },
    category: 'flyer',
    fileType: 'PDF',
    fileSize: '6.5 MB',
    updatedAt: {
      de: 'Dezember 2025',
      it: 'Dicembre 2025',
      en: 'December 2025'
    },
    description: {
      de: 'Dreisprachiger Infoflyer (DE/IT/EN) druckfertig für die Zimmermappe oder die Rezeption.',
      it: 'Prospetto informativo trilingue (IT/DE/EN) pronto per la stampa o da inserire nella cartella d\'informazione in camera.',
      en: 'Trilingual informational flyer (IT/DE/EN) ready for printing or room info folders.'
    },
    downloadUrl: '#'
  },
  {
    id: 'dl-social-kit',
    title: {
      de: 'Social Media Kit & Web-Banner 2026',
      it: 'Kit Social Media & Banner Web 2026',
      en: 'Social Media Kit & Web Banners 2026'
    },
    category: 'social',
    fileType: 'ZIP',
    fileSize: '45.0 MB',
    updatedAt: {
      de: 'Januar 2026',
      it: 'Gennaio 2026',
      en: 'January 2026'
    },
    description: {
      de: 'Grafiken für Instagram, Facebook und Webbanner mit der Aufschrift "Offizieller Partnerbetrieb Dolomiti NordicSki".',
      it: 'Visual per Instagram, Facebook e banner web animati con dicitura "Partner Ufficiale Dolomiti NordicSki".',
      en: 'Visual assets for Instagram, Facebook, and web banners with "Official Dolomiti NordicSki Partner" badge.'
    },
    downloadUrl: '#'
  }
];

export const VISION_CONTENT = {
  it: {
    heroTitle: 'Il Carosello dello Sci di Fondo più Grande d\'Europa',
    heroSubtitle: 'Oltre 1.000 km di piste battute con un unico Skipass tra Alto Adige, Trentino, Veneto e Tirolo Orientale.',
    missionTitle: 'La Nostra Vision & Mission',
    missionParagraph1: 'Dolomiti NordicSki rappresenta il benchmark europeo nell\'offerta dello sci di fondo alpino. Uniamo 8 eccellenze territoriali under un unico marchio forte, con standard di qualità garantiti, prevendita unificata e manutenzione quotidiana d\'eccellenza delle piste.',
    missionParagraph2: 'I nostri partner ricettivi e turistici costituiscono il pilastro fondamentale di questo successo: accolgono gli appassionati offrendo servizi dedicati, supporto tecnico e prevendita diretta dei titoli d\'ingresso.',
    stats: [
      { label: 'Km di Piste Unificate', value: '1.000+' },
      { label: 'Aree Alpine Collegate', value: '8' },
      { label: 'Strutture Partner Accreditate', value: '450+' },
      { label: 'Unico Skipass Valido Ovunque', value: '1' }
    ],
    values: [
      {
        title: 'Qualità Garantita',
        desc: 'Preparazione giornaliera dei tracciati con i gatti delle nevi più moderni e battitura costante per classico e skating.'
      },
      {
        title: 'Integrazione e Sostenibilità',
        desc: 'Mobilità integrata, sci-bus gratuiti e rispetto rigoroso dell\'ecosistema alpino delle Dolomiti patrimonio UNESCO.'
      },
      {
        title: 'Network Partner d\'Eccellenza',
        desc: 'Servizio personalizzato negli alloggi convenzionati: depositi riscaldati, sciolinatura, alimentazione sportiva e ticket in reception.'
      }
    ]
  },
  de: {
    heroTitle: 'Europas größtes Langlauf-Karussell',
    heroSubtitle: 'Über 1.000 km präparierte Loipen mit nur einem einzigen Skipass in Südtirol, Osttirol, Trentino und Venetien.',
    missionTitle: 'Unsere Vision & Philosophie',
    missionParagraph1: 'Dolomiti NordicSki steht für höchste Qualität und grenzenlose Freiheit auf zwei Brettern. 8 erstklassige Langlaufregionen vereinen sich unter einer starken Dachmarke.',
    missionParagraph2: 'Unsere Partnerbetriebe sind das Herzstück unseres Netzwerks und bieten den Gästen erstklassige Infrastruktur und besten Service direkt im Hotel.',
    stats: [
      { label: 'Km Präparierte Loipen', value: '1.000+' },
      { label: 'Verbundene Regionen', value: '8' },
      { label: 'Qualifizierte Partnerbetriebe', value: '450+' },
      { label: 'Einheitlicher Loipenpass', value: '1' }
    ],
    values: [
      {
        title: 'Garantierte Loipenqualität',
        desc: 'Tägliche Präparierung mit modernsten Pistenfahrzeugen für klassischen Stil und Skating.'
      },
      {
        title: 'Nachhaltige Mobilität',
        desc: 'Umweltfreundliche Busanbindungen und direkte Anbindung der Hotels an das Loipennetz.'
      },
      {
        title: 'Erstklassiges Partnernetzwerk',
        desc: 'Perfekter Service im Hotel: beheizte Skiräume, Wachstische, Sportler-Frühstück und Loipenpass direkt an der Rezeption.'
      }
    ]
  },
  en: {
    heroTitle: 'Europe\'s Largest Cross-Country Skiing Carousel',
    heroSubtitle: 'Over 1,300 km of groomed tracks with a single ski pass across South Tyrol, East Tyrol, Trentino, and Veneto.',
    missionTitle: 'Our Vision & Mission',
    missionParagraph1: 'Dolomiti NordicSki sets the European benchmark for cross-country skiing excellence. 8 premier alpine regions united under one prestigious brand with guaranteed daily track maintenance.',
    missionParagraph2: 'Our accommodation partners are the backbone of this network, providing tailored athletic hospitality, equipment facilities, and direct ticket issuance.',
    stats: [
      { label: 'Km of Unified Tracks', value: '1,300+' },
      { label: 'Connected Alpine Regions', value: '8' },
      { label: 'Accredited Partner Hotels', value: '450+' },
      { label: 'Unified Ski Pass', value: '1' }
    ],
    values: [
      {
        title: 'Guaranteed Quality',
        desc: 'Daily track grooming with state-of-the-art machinery for classic and skating styles.'
      },
      {
        title: 'Seamless Sustainability',
        desc: 'Eco-friendly public transit, ski buses, and deep respect for the UNESCO World Heritage Dolomites environment.'
      },
      {
        title: 'Excellence in Hospitality',
        desc: 'Specialised facilities in partner hotels: wax rooms, boot dryers, athlete nutrition, and direct ski pass vouchers.'
      }
    ]
  }
};
