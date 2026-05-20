'use client';

import { useEffect, useState, useRef } from 'react';
import swell from '@/lib/swell';

export default function StripeDebugPage() {
  const [log, setLog] = useState<string[]>([]);
  const [status, setStatus] = useState('starting...');
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const addLog = (msg: string) => {
      console.log(`[Debug] ${msg}`);
      setLog(prev => [...prev, msg]);
    };

    const run = async () => {
      try {
        addLog(`swell: ${typeof swell}`);
        addLog(`swell.payment: ${typeof (swell as any).payment}`);
        addLog(`createElements: ${typeof (swell as any).payment?.createElements}`);

        // Get payment settings
        addLog('Fetching settings.payments()...');
        const ps = await (swell as any).settings.payments();
        addLog(`Settings: ${JSON.stringify(ps?.card || 'NO CARD KEY')}`);

        // Get cart
        addLog('Fetching cart...');
        const cart = await swell.cart.get();
        addLog(`Cart: ${(cart as any)?.id}, items: ${(cart as any)?.items?.length || 0}`);

        // If empty cart, add an item
        if (!(cart as any)?.items?.length) {
          addLog('Cart empty, adding item...');
          await swell.cart.addItem({ product_id: '6831c0eae027b40012cfbfef', quantity: 1 } as any);
          const c2 = await swell.cart.get();
          addLog(`Cart now: ${(c2 as any)?.items?.length} items`);
        }

        // Check container
        const el = document.getElementById('stripe-card');
        addLog(`Container #stripe-card exists: ${!!el}`);

        // Create elements
        addLog('Calling createElements...');
        await (swell as any).payment.createElements({
          card: {
            elementId: '#stripe-card',
            options: { hidePostalCode: true },
            onReady: () => { addLog('✅ onReady!'); setStatus('SUCCESS'); },
            onError: (e: any) => { addLog(`❌ onError: ${e?.message || JSON.stringify(e)}`); setStatus('ERROR'); },
          },
        });
        addLog('createElements resolved');

      } catch (e: any) {
        addLog(`❌ EXCEPTION: ${e?.message}`);
        addLog(`Stack: ${e?.stack?.substring(0, 300)}`);
        setStatus('ERROR');
      }
    };

    // Delay to ensure DOM is ready
    setTimeout(run, 1000);
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'monospace', maxWidth: 700, margin: '0 auto' }}>
      <h1>Stripe Debug — Status: {status}</h1>
      <div id="stripe-card" style={{ border: '2px dashed red', padding: 16, minHeight: 50, margin: '20px 0' }}>
        (Stripe element renders here)
      </div>
      <pre style={{ background: '#111', color: '#0f0', padding: 16, fontSize: 11, maxHeight: 400, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
        {log.join('\n')}
      </pre>
    </div>
  );
}
