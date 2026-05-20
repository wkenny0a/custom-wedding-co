'use client';

import Script from 'next/script';

/**
 * AnalyticsScripts
 * ────────────────
 * Loads all tracking pixels via Next.js <Script> with afterInteractive strategy.
 * Drop this component once inside your root <body> (in layout.tsx).
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  SETUP: Replace the placeholder IDs below with your real pixel IDs.    │
 * │                                                                         │
 * │  META_PIXEL_ID        → Meta Business Suite → Events Manager            │
 * │  GA_MEASUREMENT_ID    → Google Analytics → Admin → Data Streams         │
 * │  TIKTOK_PIXEL_ID      → TikTok Ads Manager → Assets → Events           │
 * │  PINTEREST_TAG_ID     → Pinterest Ads → Conversions → Tag              │
 * │  CLARITY_PROJECT_ID   → clarity.microsoft.com → Settings → Setup       │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

// ── Replace these with your real IDs ────────────────────────────────────────
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1015898647784042';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-ELHESWVYET';
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'D83CTS3C77U1Q23ABHH0';
const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID || 'YOUR_PINTEREST_TAG_ID';
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'wrdli04tz0';

export function AnalyticsScripts() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          1. META PIXEL (Facebook / Instagram)
          ═══════════════════════════════════════════════════════════════════ */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* ═══════════════════════════════════════════════════════════════════
          2. GOOGLE ANALYTICS 4 (GA4)
          ═══════════════════════════════════════════════════════════════════ */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
          window.gtag = gtag;
        `}
      </Script>

      {/* ═══════════════════════════════════════════════════════════════════
          3. TIKTOK PIXEL
          ═══════════════════════════════════════════════════════════════════ */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var i=document.createElement("script")
            ;i.type="text/javascript",i.async=!0,i.src=r+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a)};
            ttq.load('${TIKTOK_PIXEL_ID}');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>

      {/* ═══════════════════════════════════════════════════════════════════
          4. PINTEREST TAG
          ═══════════════════════════════════════════════════════════════════ */}
      <Script id="pinterest-tag" strategy="afterInteractive">
        {`
          !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '${PINTEREST_TAG_ID}');
          pintrk('page');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://ct.pinterest.com/v3/?event=init&tid=${PINTEREST_TAG_ID}&noscript=1`}
        />
      </noscript>

      {/* ═══════════════════════════════════════════════════════════════════
          5. MICROSOFT CLARITY (Session Recordings + Heatmaps)
          ═══════════════════════════════════════════════════════════════════ */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
    </>
  );
}
