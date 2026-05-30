import fs from 'node:fs'
import path from 'node:path'

const footerPath = path.join(process.cwd(), 'src/components/layout/Footer.tsx')
const footerSource = fs.readFileSync(footerPath, 'utf8')

const forbiddenFooterContent = [
  {
    value: 'Etsy Shop',
    reason: 'The footer should not show a visible Etsy Shop link.',
  },
  {
    value: 'etsy.com',
    reason: 'The footer should keep shoppers on Custom Wedding Co., not Etsy.',
  },
  {
    value: 'Real Weddings',
    reason: 'Real Weddings should not appear in the footer.',
  },
  {
    value: '/real-weddings',
    reason: 'Real Weddings should not be linked from the footer.',
  },
  {
    value: '/shop/welcome-signs-signage',
    reason: 'This old category slug renders as an empty shop page.',
  },
  {
    value: '/shop/stationery-paper-goods',
    reason: 'This old category slug renders as an empty shop page.',
  },
  {
    value: 'href="#"',
    reason: 'The footer should not contain placeholder links.',
  },
]

const requiredFooterContent = [
  '/shop/signage-displays',
  '/shop/ceremony-reception',
  '/shop/favors-party-extras',
  '/shop/barware-drinkware',
  '/shop/bridal-party-gifts',
  '/shop/groomsmen-gifts',
  '/shop/wedding-keepsakes',
  '/about',
  '/reviews',
  '/blog',
]

const failures = []

for (const item of forbiddenFooterContent) {
  if (footerSource.includes(item.value)) {
    failures.push(`Remove "${item.value}" from Footer.tsx. ${item.reason}`)
  }
}

for (const value of requiredFooterContent) {
  if (!footerSource.includes(value)) {
    failures.push(`Footer.tsx is missing required link "${value}".`)
  }
}

if (failures.length > 0) {
  console.error('Footer navigation verification failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Footer navigation verification passed.')
