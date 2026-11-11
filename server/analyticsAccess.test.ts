import assert from 'node:assert/strict';
import test from 'node:test';
import { authorizeHubAnalyticsAccess } from './analyticsAccess';

const nowMs=Date.parse('2026-11-11T12:00:00Z');
const verifyIdentity=async (token:string)=>
  token==='signed-token' ? {uid:'uid-A',tokenExpiresAtMs:nowMs+60_000}:null;
const lookupActiveEstablishments=async (uid:string)=>
  uid==='uid-A' ? [{establishmentId:'hotel-A',active:true},{establishmentId:'hotel-B',active:false}]:[];

test('allows only verified active member of requested establishment',async()=>{
  const result=await authorizeHubAnalyticsAccess({
    idToken:'signed-token',requestedEstablishmentId:'hotel-A',nowMs,
    verifyIdentity,lookupActiveEstablishments,
  });
  assert.deepEqual(result,{allowed:true,uid:'uid-A',establishmentId:'hotel-A',validUntilMs:nowMs+60_000});
});

test('denies spoofed, inactive, invalid, expired and unverified sessions',async()=>{
  for(const [idToken,requestedEstablishmentId] of [
    ['unsigned','hotel-A'],['signed-token','hotel-B'],
    ['signed-token','hotel-C'],['signed-token',''],['','hotel-A'],
  ]){
    const result=await authorizeHubAnalyticsAccess({
      idToken,requestedEstablishmentId,nowMs,verifyIdentity,lookupActiveEstablishments,
    });
    assert.equal(result.allowed,false);
  }
  const expired=await authorizeHubAnalyticsAccess({
    idToken:'signed-token',requestedEstablishmentId:'hotel-A',nowMs,
    verifyIdentity:async()=>({uid:'uid-A',tokenExpiresAtMs:nowMs-1}),
    lookupActiveEstablishments,
  });
  assert.equal(expired.allowed,false);
});

test('denies on verifier and membership backend errors',async()=>{
  for(const failing of ['verifier','membership']){
    const result=await authorizeHubAnalyticsAccess({
      idToken:'signed-token',requestedEstablishmentId:'hotel-A',nowMs,
      verifyIdentity:failing==='verifier'?async()=>{throw Error('unavailable')}:verifyIdentity,
      lookupActiveEstablishments:failing==='membership'?async()=>{throw Error('unavailable')}:lookupActiveEstablishments,
    });
    assert.equal(result.allowed,false);
  }
});
