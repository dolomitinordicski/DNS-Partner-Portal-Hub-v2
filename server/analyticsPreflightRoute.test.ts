import assert from 'node:assert/strict';
import test from 'node:test';
import express from 'express';
import { mountAnalyticsPreflight } from './analyticsPreflightRoute';

test('preflight route is unavailable by default and never returns Analytics data',async()=>{
  const app=express();
  app.use(express.json());
  mountAnalyticsPreflight(app,false);
  const server=app.listen(0,'127.0.0.1');
  try {
    const addr=server.address();
    assert.ok(addr && typeof addr!=='string');
    const response=await fetch('http://127.0.0.1:'+addr.port+'/api/partner/analytics-session-preflight',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({establishmentId:'hotel-A'}),
    });
    assert.equal(response.status,404);
    assert.equal(response.headers.get('cache-control'),'no-store, private');
    assert.deepEqual(await response.json(),{error:'NOT_ENABLED'});
  } finally {await new Promise<void>((resolve,reject)=>server.close(err=>err?reject(err):resolve()));}
});
