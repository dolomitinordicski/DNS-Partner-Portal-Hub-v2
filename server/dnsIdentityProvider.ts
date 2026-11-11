/**
 * Trusted Firebase Admin identity/membership adapter for Partner Hub.
 * Server-side ONLY. No browser import, no Express route mounted yet.
 *
 * Requires GOOGLE_APPLICATION_CREDENTIALS / workload identity in the future
 * runtime. The expected Firebase project is pinned to DNS Core.
 * Partner membership records do not yet exist in production: fail closed.
 */
import { applicationDefault, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import type { ActiveHubEstablishment, VerifiedHubIdentity } from './analyticsAccess';

const EXPECTED_FIREBASE_PROJECT='dns-core';
const MEMBERSHIPS_COLLECTION='partnerHubMemberships';

function getTrustedApp():App {
  const existing=getApps().find(app=>app.name==='dns-partner-hub-server');
  return existing??initializeApp({
    credential:applicationDefault(),
    projectId:EXPECTED_FIREBASE_PROJECT,
  },'dns-partner-hub-server');
}

export async function verifyDNSCoreIdToken(idToken:string):Promise<VerifiedHubIdentity|null> {
  if(!idToken||idToken.length>8192)return null;
  try {
    const decoded=await getAuth(getTrustedApp()).verifyIdToken(idToken,true);
    if(decoded.aud!==EXPECTED_FIREBASE_PROJECT||decoded.iss!==
      'https://securetoken.google.com/'+EXPECTED_FIREBASE_PROJECT)return null;
    if(!decoded.uid||typeof decoded.exp!=='number')return null;
    return {uid:decoded.uid,tokenExpiresAtMs:decoded.exp*1000};
  }catch{return null;}
}

export async function readVerifiedHubEstablishments(uid:string):Promise<readonly ActiveHubEstablishment[]> {
  if(!uid||uid.length>128)return [];
  try {
    const db=getFirestore(getTrustedApp());
    // This is a dedicated *future* Admin-provisioned collection. Never infer
    // partner identity from free-text profile attributes or partner codes.
    const result=await db.collection(MEMBERSHIPS_COLLECTION).where('uid','==',uid).get();
    return result.docs.filter(doc=>{
      const value=doc.data();
      return value.uid===uid && value.active===true
        && typeof value.establishmentId==='string'
        && value.establishmentId.length>0
        && value.status==='verified';
    }).map(doc=>({
      establishmentId:String(doc.data().establishmentId),active:true,
    }));
  }catch{return [];}
}
