import type { Express, Request, Response } from 'express';
import { verifyDNSCoreIdToken, readVerifiedHubEstablishments } from './dnsIdentityProvider';

/**
 * DNS Partner Hub login exchange. No user-supplied role or establishment ID is
 * trusted. Session verification is read-only and OFF by default.
 * Each protected endpoint must revalidate token + membership + Analytics grant.
 */
export function mountPartnerSession(app:Express,enabled:boolean):void {
  app.post('/api/partner/session',async(req:Request,res:Response)=>{
    res.setHeader('Cache-Control','private, no-store');
    res.setHeader('Pragma','no-cache');
    if(!enabled){res.status(404).json({error:'NOT_ENABLED'});return;}
    const match=/^Bearer ([A-Za-z0-9._~-]+)$/.exec(req.get('authorization')??'');
    if(!match){res.status(401).json({error:'UNAUTHORIZED'});return;}
    try {
      const identity=await verifyDNSCoreIdToken(match[1]);
      if(!identity||identity.tokenExpiresAtMs<=Date.now()){
        res.status(401).json({error:'UNAUTHORIZED'});return;
      }
      const allowed=await readVerifiedHubEstablishments(identity.uid);
      const establishments=[...new Set(allowed.filter(m=>m.active).map(m=>m.establishmentId))]
        .sort().map(id=>({id,name:id}));
      if(!establishments.length){res.status(403).json({error:'NOT_A_VERIFIED_PARTNER'});return;}
      res.status(200).json({verified:true,uid:identity.uid,establishments});
    }catch{res.status(503).json({error:'VERIFICATION_UNAVAILABLE'});}
  });
}
