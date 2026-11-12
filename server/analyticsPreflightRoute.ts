/**
 * Optional internal-only preflight endpoint.
 * Returns no Analytics data and no credentials. The feature flag is OFF
 * unless explicitly enabled by a separately authorized release.
 */
import type { Express, Request, Response } from 'express';
import { authorizeHubAnalyticsAccess } from './analyticsAccess';
import { verifyDNSCoreIdToken, readVerifiedHubEstablishments } from './dnsIdentityProvider';

export function mountAnalyticsPreflight(app:Express, enabled:boolean):void {
  app.post('/api/partner/analytics-session-preflight',async(req:Request,res:Response)=>{
    res.setHeader('Cache-Control','no-store, private');
    res.setHeader('Pragma','no-cache');
    if(!enabled) {
      res.status(404).json({error:'NOT_ENABLED'});
      return;
    }
    const authorization=req.get('authorization')??'';
    const match=/^Bearer ([A-Za-z0-9._~-]+)$/.exec(authorization);
    const establishmentId=req.body?.establishmentId;
    if(!match||typeof establishmentId!=='string') {
      res.status(401).json({error:'UNAUTHORIZED'});
      return;
    }
    const result=await authorizeHubAnalyticsAccess({
      idToken:match[1],
      requestedEstablishmentId:establishmentId,
      nowMs:Date.now(),
      verifyIdentity:verifyDNSCoreIdToken,
      lookupActiveEstablishments:readVerifiedHubEstablishments,
    });
    if(!result.allowed) {
      res.status(403).json({error:'FORBIDDEN'});
      return;
    }
    // No data projections or reusable tokens until Analytics backend and
    // per-establishment grant storage are explicitly implemented.
    res.status(200).json({verified:true,establishmentId:result.establishmentId});
  });
}
