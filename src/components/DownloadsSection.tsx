import React, { useState, useEffect } from 'react';
import { Language, DownloadItem, AccessibilitySettings, AccessLevel } from '../types';
import { DOWNLOAD_ITEMS, DNS_LOGO_BASE64 } from '../data/portalData';
import { db } from '../lib/firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { 
  Download, 
  Search, 
  CheckCircle2, 
  Calendar,
  Eye,
  X,
  FileText,
  File,
  Sparkles,
  ExternalLink,
  Printer,
  PlusCircle,
  FolderPlus,
  Trash2,
  ShieldCheck,
  Link2
} from 'lucide-react';

interface DownloadsSectionProps {
  lang: Language;
  a11y?: AccessibilitySettings;
  accessLevel?: AccessLevel;
}

const getLoc = (val: string | Record<Language, string> | undefined, currentLang: Language, fallback: string = ''): string => {
  if (!val) return fallback;
  if (typeof val === 'string') return val;
  return val[currentLang] || val.de || val.it || val.en || fallback;
};

export const DownloadsSection: React.FC<DownloadsSectionProps> = ({ lang, a11y, accessLevel = 'public' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<DownloadItem | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  
  // Firestore State for Custom Material Boxes created by Admin
  const [customDownloads, setCustomDownloads] = useState<DownloadItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // New Material Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('logos');
  const [newFileType, setNewFileType] = useState<string>('PDF');
  const [newFileSize, setNewFileSize] = useState<string>('4.5 MB');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDownloadUrl, setNewDownloadUrl] = useState<string>('');

  const isLight = a11y ? a11y.theme === 'light' : true;
  const isAdmin = accessLevel === 'admin';

  // Load custom materials from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'downloads'), (snapshot) => {
      const docsData: DownloadItem[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        docsData.push({
          id: docSnap.id,
          title: d.title || 'Nuovo Materiale',
          category: d.category || 'logos',
          fileType: d.fileType || 'PDF',
          fileSize: d.fileSize || '1.0 MB',
          updatedAt: d.updatedAt || new Date().toISOString().slice(0, 10),
          description: d.description || '',
          downloadUrl: d.downloadUrl || '',
          createdViaAdmin: true
        });
      });
      setCustomDownloads(docsData);
    }, (err) => {
      console.warn('Firestore downloads snapshot error:', err);
    });

    return () => unsub();
  }, []);

  const handleCreateMaterialBox = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'downloads'), {
        title: newTitle.trim(),
        category: newCategory,
        fileType: newFileType,
        fileSize: newFileSize || '2.5 MB',
        updatedAt: new Date().toISOString().slice(0, 10),
        description: newDescription || 'Materiale ufficiale caricato dalla Direzione Generale.',
        downloadUrl: newDownloadUrl || 'https://www.dolomitinordicski.com',
        createdAt: new Date().toISOString(),
        createdViaAdmin: true
      });

      // Reset form
      setNewTitle('');
      setNewDescription('');
      setNewDownloadUrl('');
      setIsAddModalOpen(false);
      setDownloadNotification(lang === 'it' ? 'Nuovo box materiale aggiunto al database!' : 'New material box added!');
      setTimeout(() => setDownloadNotification(null), 3500);
    } catch (err) {
      console.error('Error adding custom download box:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCustomMaterial = async (docId: string) => {
    if (!window.confirm(lang === 'it' ? 'Eliminare questo materiale dal database?' : 'Delete material from database?')) return;
    try {
      await deleteDoc(doc(db, 'downloads', docId));
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const handleTriggerDownload = (item: DownloadItem) => {
    const title = getLoc(item.title, lang);
    setDownloadNotification(`${title} (${item.fileType})`);
    
    // Create an actual dummy blob file to trigger browser download
    const dummyContent = `%PDF-1.5 %Dolomiti NordicSki Official Document
Document: ${title}
Format: ${item.fileType}
Size: ${item.fileSize}
Category: ${item.category}
Generated: ${new Date().toISOString()}
Dolomiti NordicSki - 1.000 km Cross-Country Carousel`;
    
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_dolomiti_nordicski.${item.fileType.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadNotification(null), 3500);
  };

  const categories = [
    { id: 'all', label: { it: 'Tutti i File', de: 'Alle Dateien', en: 'All Files' } },
    { id: 'logos', label: { it: 'Loghi Vettoriali', de: 'Vektor-Logos', en: 'Vector Logos' } },
    { id: 'brand-manual', label: { it: 'Manuale Corporate', de: 'Handbuch', en: 'Brand Manual' } },
    { id: 'maps', label: { it: 'Cartine Piste 1.000 km', de: 'Loipenkarten', en: 'Trail Maps' } },
    { id: 'flyer', label: { it: 'Flyer & Info Camere', de: 'Flyer & Info', en: 'Guest Flyers' } },
    { id: 'social', label: { it: 'Kit Social Media', de: 'Social Kit', en: 'Social Media Kit' } }
  ];

  const allItems = [...customDownloads, ...DOWNLOAD_ITEMS];

  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const titleText = getLoc(item.title, lang);
    const descText = getLoc(item.description, lang);
    const matchesQuery = titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         descText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className={`py-12 min-h-screen space-y-10 transition-colors ${
      isLight ? 'bg-[#F4F8F9] text-[#083845]' : 'bg-[#052832] text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className={`border-b pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
          isLight ? 'border-[#82B2BD]/30' : 'border-[#417483]/30'
        }`}>
          <div className="space-y-3">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${
              isLight ? 'bg-[#E2EFF1] text-[#0D4D5E] border-[#82B2BD]' : 'bg-[#0D4D5E] text-[#AAD0D1] border-[#417483]/50'
            }`}>
              <Download className="w-3.5 h-3.5" />
              <span>
                {lang === 'it' && 'Download Center & Risorse Ufficiali'}
                {lang === 'de' && 'Download Center & Offizielle Medien'}
                {lang === 'en' && 'Download Center & Official Assets'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Be_Vietnam_Pro']">
              {lang === 'it' && 'Download Center & Materiale Marketing'}
              {lang === 'de' && 'Download Center & Marketing-Material'}
              {lang === 'en' && 'Download Center & Marketing Assets'}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed max-w-3xl ${
              isLight ? 'text-[#417483]' : 'text-slate-200'
            }`}>
              {lang === 'it' && 'Scarica i pacchetti vettoriali dei loghi ufficiali 2026, la mappa completa in alta risoluzione delle 8 aree (1.000 km di piste), i prospetti informativi trilingui per le camere degli ospiti ed il kit social media.'}
              {lang === 'de' && 'Laden Sie hochauflösende Vektorlogos, komplette Loipenkarten der 8 Regionen (1.000 km) sowie Informationsflyer für Hotelzimmer herunter.'}
              {lang === 'en' && 'Download 2026 vector logos, high-resolution 1,000 km trail maps, guest room information flyers, and social media kits.'}
            </p>
          </div>

          {/* Admin Create Box Button */}
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-[#052832] font-black text-xs transition-all shadow-lg flex items-center space-x-2 shrink-0 cursor-pointer border border-amber-300"
            >
              <FolderPlus className="w-4 h-4" />
              <span>{lang === 'it' ? 'Crea Box Materiale (Database Admin)' : 'Create Material Box (Admin DB)'}</span>
            </button>
          )}
        </div>

        {/* Download Success Banner */}
        {downloadNotification && (
          <div className="p-4 rounded-2xl bg-[#0D4D5E] border border-[#AAD0D1] text-[#AAD0D1] flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#AAD0D1] shrink-0" />
              <span className="text-sm font-bold text-white">
                {lang === 'it' && `Operazione completata: ${downloadNotification}`}
                {lang === 'de' && `Abgeschlossen: ${downloadNotification}`}
                {lang === 'en' && `Complete: ${downloadNotification}`}
              </span>
            </div>
            <span className="text-xs text-[#AAD0D1] font-mono font-bold uppercase tracking-wider bg-[#083845] px-2.5 py-1 rounded-lg border border-[#AAD0D1]/30">
              OK
            </span>
          </div>
        )}

        {/* Filters & Search Bar */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border shadow-lg ${
          isLight ? 'bg-white border-[#82B2BD]/40' : 'bg-[#083845] border-[#417483]/30'
        }`}>
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0D4D5E] border border-[#82B2BD] text-[#AAD0D1] shadow-md'
                    : isLight
                      ? 'text-[#083845] hover:bg-[#F0F5F6]'
                      : 'text-slate-300 hover:text-white hover:bg-[#052832]'
                }`}
              >
                {cat.label[lang] || cat.label.it}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${
              isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
            }`} />
            <input
              type="text"
              placeholder={lang === 'it' ? 'Cerca documenti, mappe, loghi...' : 'Dateien suchen...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#AAD0D1] ${
                isLight 
                  ? 'bg-[#F4F8F9] border-[#82B2BD] text-[#083845] placeholder-[#417483]' 
                  : 'bg-[#052832] border-[#417483]/40 text-white placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Download Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-4 border transition-all shadow-xl hover:-translate-y-1 relative ${
                item.createdViaAdmin
                  ? 'border-amber-400/60 bg-[#083845]/90'
                  : isLight 
                    ? 'bg-white border-[#82B2BD]/50 hover:border-[#0D4D5E]' 
                    : 'bg-[#083845] border-[#417483]/30 hover:border-[#AAD0D1]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                    item.createdViaAdmin
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : isLight 
                        ? 'bg-[#F0F5F6] text-[#0D4D5E] border-[#82B2BD]' 
                        : 'bg-[#052832] text-[#AAD0D1] border-[#417483]/30'
                  }`}>
                    {item.fileType} • {item.fileSize}
                    {item.createdViaAdmin && ' • DB ADMIN'}
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-medium flex items-center space-x-1 ${
                      isLight ? 'text-[#417483]' : 'text-slate-300'
                    }`}>
                      <Calendar className="w-3 h-3" />
                      <span>{getLoc(item.updatedAt, lang)}</span>
                    </span>

                    {isAdmin && item.createdViaAdmin && (
                      <button
                        onClick={() => handleDeleteCustomMaterial(item.id)}
                        className="p-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/40 border border-red-400/30 transition-all cursor-pointer"
                        title="Elimina dal Database"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className={`font-extrabold text-base leading-snug font-['Be_Vietnam_Pro'] ${
                  isLight ? 'text-[#083845]' : 'text-white'
                }`}>
                  {getLoc(item.title, lang)}
                </h3>

                <p className={`text-xs leading-relaxed ${
                  isLight ? 'text-[#417483]' : 'text-slate-200'
                }`}>
                  {getLoc(item.description, lang)}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between ${
                isLight ? 'border-[#82B2BD]/20' : 'border-[#417483]/30'
              }`}>
                <button
                  onClick={() => setPreviewItem(item)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    isLight
                      ? 'bg-[#F0F5F6] border-[#82B2BD] text-[#083845] hover:bg-[#E2EFF1]'
                      : 'bg-[#052832] border-[#417483]/40 text-slate-200 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#0D4D5E]" />
                  <span>Anteprima</span>
                </button>

                <button
                  onClick={() => handleTriggerDownload(item)}
                  className="px-4 py-2 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] border border-[#82B2BD]/40 text-[#AAD0D1] font-extrabold text-xs flex items-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#AAD0D1]" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ADMIN ADD NEW MATERIAL BOX MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#083845] border border-amber-400/50 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg bg-[#052832] border border-[#417483]/30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                <FolderPlus className="w-4 h-4" />
                <span>Backend Admin - Nuovo Box Materiali</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Aggiungi Risorsa al Database
              </h3>
              <p className="text-xs text-slate-200">
                I materiali aggiunti verranno salvati in Firestore e resi visibili immediatamente nel Download Center per tutti gli utenti e partner.
              </p>
            </div>

            <form onSubmit={handleCreateMaterialBox} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">Titolo del Materiale *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Es. Kit Grafico Evento Dobbiaco-Cortina 2026"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 block">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="logos">Loghi Vettoriali</option>
                    <option value="brand-manual">Manuale Corporate</option>
                    <option value="maps">Cartine Piste</option>
                    <option value="flyer">Flyer & Info Camere</option>
                    <option value="social">Kit Social Media</option>
                    <option value="press">Comunicati Stampa</option>
                    <option value="regional">Documenti Regionali</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 block">Formato File</label>
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="PDF">PDF</option>
                    <option value="ZIP">ZIP Pacchetto</option>
                    <option value="EPS">EPS Vettoriale</option>
                    <option value="PNG">PNG Trasparente</option>
                    <option value="SVG">SVG Vettoriale</option>
                    <option value="DOCX">Word DOCX</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">Dimensione Stimata File</label>
                <input
                  type="text"
                  value={newFileSize}
                  onChange={(e) => setNewFileSize(e.target.value)}
                  placeholder="Es. 8.4 MB"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">Descrizione Breve</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Descrivi brevemente l'utilizzo e i contenuti del pacchetto..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">URL o Link Download (Opzionale Google Drive)</label>
                <input
                  type="url"
                  value={newDownloadUrl}
                  onChange={(e) => setNewDownloadUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-xs font-medium text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#052832] font-black text-xs transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <FolderPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Salvataggio in Corso...' : 'Salva Box Materiale nel Database'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#083845] border border-[#417483]/50 rounded-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg bg-[#052832] border border-[#417483]/30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-2xl bg-white border border-[#AAD0D1] shrink-0">
                <img 
                  src={DNS_LOGO_BASE64} 
                  alt="Dolomiti NordicSki Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-[#052832] border border-[#417483]/40 text-[#AAD0D1]">
                  DOCUMENTO UFFICIALE B2B • {previewItem.fileType} ({previewItem.fileSize})
                </span>
                <h3 className="text-xl font-extrabold text-white leading-tight">
                  {getLoc(previewItem.title, lang)}
                </h3>
              </div>
            </div>

            {/* Simulated Document Preview Canvas */}
            <div className="p-6 rounded-xl bg-white text-slate-900 border-2 border-[#0D4D5E] space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                <span className="font-black text-[#0D4D5E] text-lg">DOLOMITI NORDICSKI</span>
                <span className="text-xs font-mono font-bold bg-[#0D4D5E] text-white px-2 py-0.5 rounded">
                  {previewItem.fileType} PREVIEW
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-medium text-slate-800 leading-relaxed">
                  {getLoc(previewItem.description, lang)}
                </p>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                  <span className="font-bold text-[#0D4D5E] block">Specifiche e Risoluzione:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    <li>Formato file: {previewItem.fileType} alta risoluzione vettoriale / PDF</li>
                    <li>Dimensione pacchetto: {previewItem.fileSize}</li>
                    <li>Ultimo aggiornamento: {getLoc(previewItem.updatedAt, lang)}</li>
                    <li>Uso consentito: Strutture ricettive e partner accreditati Dolomiti NordicSki</li>
                  </ul>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 text-center pt-2">
                Dolomiti NordicSki &bull; 1.000 km Cross-Country Carousel &bull; Offizielles Dokument
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2.5 rounded-xl bg-[#052832] border border-[#417483]/40 text-slate-300 font-bold text-xs hover:text-white"
              >
                Chiudi Anteprima
              </button>
              <button
                onClick={() => {
                  handleTriggerDownload(previewItem);
                  setPreviewItem(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#0D4D5E] hover:bg-[#083845] border border-[#AAD0D1]/50 text-[#AAD0D1] font-extrabold text-xs flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Scarica Documento Ora ({previewItem.fileType})</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
