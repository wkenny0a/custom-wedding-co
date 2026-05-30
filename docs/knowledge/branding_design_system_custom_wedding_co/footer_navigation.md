# Footer Navigation Policy

The production footer lives in `src/components/layout/Footer.tsx`.

Keep the footer focused on Custom Wedding Co. owned shopping and trust paths:

- Shop links must point only to populated category pages.
- Keep `Signage & Displays` on `/shop/signage-displays`.
- Keep `Ceremony & Reception` on `/shop/ceremony-reception`.
- Keep `Wedding Favors` on `/shop/favors-party-extras`.
- Keep `Customer Reviews` on `/reviews`.
- Do not add `Etsy Shop`, `etsy.com`, `Real Weddings`, `/real-weddings`, placeholder `href="#"`, `/shop/welcome-signs-signage`, or `/shop/stationery-paper-goods` back to the footer.

`npm run verify:footer` enforces these rules, and `npm run build` runs the same check before building.
