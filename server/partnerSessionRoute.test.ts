import assert from 'node:assert/strict';
import test from 'node:test';
import express from 'express';
import { mountPartnerSession } from './partnerSessionRoute';

test('partner session exchange is disabled unless explicitly enabled',async()=>{
  const app=express();
  app.use(express.json());
  mountPartnerSession(app,false);
  const server=app.listen(0,'127.0.0.1');
  await new Promise<void>((resolve,reject)=>{
    if(server.listening){resolve();return;}
    server.once('listening',resolve);server.once('error',reject);
  });
  try{
    const address=server.address();
    assert.ok(address && typeof address!=='string');
    const res=await fetch('http://127.0.0.1:'+address.port+'/api/partner/session',{
      method:'POST',headers:{'Content-Type':'application/json'},body:'{}',
    });
    assert.equal(res.status,404);
    assert.equal(res.headers.get('cache-control'),'private, no-store');
    assert.deepEqual(await res.json(),{error:'NOT_ENABLED'});
  } finally {await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));}
});
