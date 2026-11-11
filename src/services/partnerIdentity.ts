import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export type VerifiedPartnerSession={uid:string;establishments:readonly {id:string;name:string}[]};

/** Identity alone is never a Partner Hub permission. Requires server verification. */
export function subscribeDNSPartnerIdentity(callback:(user:User|null)=>void) {
  return onAuthStateChanged(auth,callback);
}
export async function signInDNSPartnerGoogle():Promise<void> {
  const provider=new GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  await signInWithPopup(auth,provider);
}
export async function loadVerifiedPartnerSession(user:User,signal?:AbortSignal):Promise<VerifiedPartnerSession|null> {
  if(user.isAnonymous)return null;
  const token=await user.getIdToken();
  const response=await fetch('/api/partner/session',{
    method:'POST',
    headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},
    body:'{}',
    cache:'no-store',
    signal,
  });
  if(!response.ok)return null;
  const session:unknown=await response.json();
  if(!session||typeof session!=='object')return null;
  const value=session as Record<string,unknown>;
  if(value.verified!==true||value.uid!==user.uid||!Array.isArray(value.establishments))return null;
  const establishments=value.establishments;
  if(!establishments.length||establishments.some(x=>!x||typeof x!=='object'
    ||typeof x.id!=='string'||typeof x.name!=='string'
    ||!x.id||!x.name))return null;
  return {uid:user.uid,establishments:establishments.map(x=>({id:x.id,name:x.name}))};
}
