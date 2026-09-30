export type Language = 'it' | 'de' | 'en';

export type AccessLevel = 'public' | 'partner' | 'regional' | 'admin';

export type NavigationTab = 
  | 'home' 
  | 'vision' 
  | 'corporate-design' 
  | 'benefits' 
  | 'quality-criteria' 
  | 'widgets'
  | 'voucher-system' 
  | 'regional-tools'
  | 'regions' 
  | 'downloads' 
  | 'contacts';

export type ThemeMode = 'dark' | 'light';
export type FontSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  theme: ThemeMode;
  fontSize: FontSize;
  highContrast: boolean;
  readableFont: boolean;
  reducedMotion: boolean;
}

export interface LogoVariant {
  id: string;
  name: string | Record<Language, string>;
  useCase: string | Record<Language, string>;
  fileFormats: string[];
  bgType: 'light' | 'dark' | 'color' | 'transparent';
  previewBg: string;
  accentColor: string;
  downloadSize: string;
}

export interface ColorPaletteItem {
  name: string | Record<Language, string>;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone?: string;
  role: string | Record<Language, string>;
}

export interface BrandGuideline {
  title: string | Record<Language, string>;
  description: string | Record<Language, string>;
  dos: (string | Record<Language, string>)[];
  donts: (string | Record<Language, string>)[];
}

export interface QualityCriterion {
  id: string;
  category: string | Record<Language, string>;
  title: string | Record<Language, string>;
  description: string | Record<Language, string>;
  isMandatory: boolean;
  icon: string;
}

export interface SkipassVoucher {
  id: string;
  voucherCategory?: 'skipass' | 'package';
  voucherCode: string;
  guestName: string;
  guestCount: number;
  accommodationName: string;
  partnerCode: string;
  
  // Skipass fields
  skipassType?: 'day' | '3day' | 'weekly' | 'season' | 'taster';
  coverage?: 'dolomiti' | 'regional';
  selectedRegion?: string;
  totalPrice?: number;

  // Package Voucher fields
  packageName?: string;
  stayDates?: string;
  includedServices?: string;
  regionName?: string;

  validFrom: string;
  validTo: string;
  status: 'issued' | 'redeemed' | 'cancelled';
  createdAt: string;
  qrCodeUrl: string;
}

export interface DownloadItem {
  id: string;
  title: string | Record<Language, string>;
  category: 'logos' | 'brand-manual' | 'maps' | 'flyer' | 'press' | 'social' | string;
  fileType: 'PDF' | 'ZIP' | 'EPS' | 'PNG' | 'SVG' | 'JPG' | string;
  fileSize: string;
  updatedAt: string | Record<Language, string>;
  description: string | Record<Language, string>;
  downloadUrl: string;
  createdViaAdmin?: boolean;
}

export interface NordicRegion {
  id: string;
  name: string;
  subtitle: string;
  kmTracks: number;
  altitude: string;
  highlights: string[];
  description: string;
  image: string;
  partnerCount: number;
  website: string;
}

export interface UserPartner {
  id: string;
  name: string;
  accommodationType: 'hotel' | 'residence' | 'guesthouse' | 'tourist-office' | 'ski-school';
  partnerCode: string;
  region: string;
  email: string;
  isLoggedIn: boolean;
}
