/**
 * Server-only, fail-closed preflight for a Partner Hub -> DNS Analytics
 * session exchange. No HTTP route is mounted at this stage.
 *
 * IMPORTANT: verifyIdentity MUST validate the Firebase ID token cryptographically
 * with a trusted backend SDK, including project, issuer, expiration and signature.
 * lookupActiveEstablishments MUST use server-side membership records.
 * Do not trust establishmentId, roles or account names supplied by the browser.
 */
export type VerifiedHubIdentity = {
  uid:string;
  tokenExpiresAtMs:number;
};
export type ActiveHubEstablishment = {
  establishmentId:string;
  active:boolean;
};
export type HubIdentityVerifier = (idToken:string)=>Promise<VerifiedHubIdentity|null>;
export type HubMembershipLookup = (uid:string)=>Promise<readonly ActiveHubEstablishment[]>;

export type HubAnalyticsAccess =
  | {allowed:false;reason:'invalid-session'|'inactive-partner'|'invalid-request'}
  | {allowed:true;uid:string;establishmentId:string;validUntilMs:number};

function isValidEstablishmentId(value:string):boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,127}$/.test(value);
}
export async function authorizeHubAnalyticsAccess(input:{
  idToken:string;
  requestedEstablishmentId:string;
  nowMs:number;
  verifyIdentity:HubIdentityVerifier;
  lookupActiveEstablishments:HubMembershipLookup;
}):Promise<HubAnalyticsAccess> {
  const {idToken,requestedEstablishmentId,nowMs,verifyIdentity,lookupActiveEstablishments}=input;
  if(!idToken||!isValidEstablishmentId(requestedEstablishmentId)
    ||!Number.isFinite(nowMs))return {allowed:false,reason:'invalid-request'};
  try {
    const identity=await verifyIdentity(idToken);
    if(!identity||!identity.uid||!Number.isFinite(identity.tokenExpiresAtMs)
      ||identity.tokenExpiresAtMs<=nowMs)return {allowed:false,reason:'invalid-session'};
    const memberships=await lookupActiveEstablishments(identity.uid);
    if(!memberships.some(item=>item.active===true
      &&item.establishmentId===requestedEstablishmentId))
      return {allowed:false,reason:'inactive-partner'};
    // This is a validation result ONLY, not a bearer credential or data grant.
    // The future Analytics backend must independently authorize every query.
    return {allowed:true,uid:identity.uid,establishmentId:requestedEstablishmentId,
      validUntilMs:Math.min(identity.tokenExpiresAtMs,nowMs+5*60*1000)};
  }catch {
    return {allowed:false,reason:'invalid-session'};
  }
}
