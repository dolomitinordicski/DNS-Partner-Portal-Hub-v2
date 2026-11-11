import React, { useState } from 'react';
import type { Language } from '../types';
import { signInDNSPartnerGoogle } from '../services/partnerIdentity';

interface PartnerLoginModalProps {
  isOpen:boolean;
  onClose:()=>void;
  lang:Language;
  onLoginSuccess:(partnerCode:string,partnerName:string,role:'partner'|'regional'|'admin')=>void;
}
const enabled=import.meta.env.VITE_DNS_PARTNER_LOGIN_ENABLED==='true';

export const PartnerLoginModal:React.FC<PartnerLoginModalProps>=({isOpen,onClose,lang})=>{
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState(false);
  if(!isOpen)return null;
  const text={
    it:{title:'Accesso DNS Partner Hub',body:'Accedi con il tuo account Google autorizzato. I permessi vengono verificati da DNS Core.',disabled:'Il collegamento sicuro a DNS Identity non è ancora attivo.',login:'Accedi con Google',error:'Autenticazione non riuscita o non disponibile.',close:'Chiudi'},
    de:{title:'DNS Partner Hub Anmeldung',body:'Meldet euch mit eurem autorisierten Google-Konto an. DNS Core prüft die Zugriffsrechte.',disabled:'Die sichere DNS Identity-Anbindung ist noch nicht aktiviert.',login:'Mit Google anmelden',error:'Anmeldung fehlgeschlagen oder nicht verfügbar.',close:'Schließen'},
    en:{title:'DNS Partner Hub login',body:'Sign in using an authorized Google account. DNS Core verifies access rights.',disabled:'Secure DNS Identity integration is not enabled yet.',login:'Sign in with Google',error:'Sign-in failed or unavailable.',close:'Close'},
  }[lang];
  return <div role="presentation" className="fixed inset-0 z-50 bg-[#052832]/85 flex items-center justify-center p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="partner-login-title" className="w-full max-w-md rounded-2xl bg-white text-[#083845] p-7 shadow-2xl space-y-5">
      <h2 id="partner-login-title" className="text-xl font-extrabold">{text.title}</h2>
      <p className="text-sm leading-relaxed">{enabled?text.body:text.disabled}</p>
      {enabled&&<button type="button" disabled={busy} onClick={()=>{
        setBusy(true);setError(false);
        void signInDNSPartnerGoogle().catch(()=>setError(true)).finally(()=>setBusy(false));
      }} className="rounded-lg bg-[#0D4D5E] px-5 py-3 font-semibold text-white">{busy?'…':text.login}</button>}
      {error&&<p role="alert">{text.error}</p>}
      <button type="button" autoFocus onClick={onClose} className="rounded-lg border px-5 py-3 font-semibold">{text.close}</button>
    </section>
  </div>;
};
