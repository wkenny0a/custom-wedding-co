# Custom Wedding Co. - Branding & Design System

## Typography
- **Sans-serif (Body):** Inter (`font-sans`)
- **Serif (Headings/Accents):** Cormorant Garamond (`font-serif`)
- **Display (Hero Headings):** Playfair Display (`font-display`)

## Color Palette

### Primary Colors
- **Espresso (`bg-espresso`, `text-espresso`):** `#4A2C2A` - Used for main text, primary buttons, and dark backgrounds.
- **Espresso Light (`bg-espresso-light`):** `#6B3F3C` - Used for hovers or secondary dark elements.
- **Cream (`bg-cream`, `text-cream`):** `#F7EFE3` - The default page background and light text on dark backgrounds.
- **Cream Dark (`bg-cream-dark`):** `#EDE5D5` - Used for subtle contrasting backgrounds (e.g., secondary sections).

### Accent Colors
- **Gold (`text-gold`, `bg-gold`):** `#B89A52` - Used for primary accents, borders, and highlights.
- **Gold Light (`text-gold-light`):** `#D4B96A`
- **Gold Pale (`bg-gold-pale`, `text-gold-pale`):** `#EFE3C2` - Used for subtle accent backgrounds or text.
- **Blush (`bg-blush`):** `#F2D9D9` - Soft background accent.
- **Blush Dark (`bg-blush-dark`):** `#E8C4C4`
- **Orange:** `#D4700A`

### Neutrals (Grays)
- **Gray 100:** `#F5F5F0`
- **Gray 200:** `#E8E6E0`
- **Gray 400:** `#9E9890` (Text)
- **Gray 600:** `#6B6560` (Text)

## Styling Rules
1. **Never use default Tailwind colors** (like `bg-blue-500` or `text-red-500`). Always use the branded colors defined in `tailwind.config.js`.
2. **Text:** Default text is `text-espresso` on a `bg-cream` background.
3. **Images:** When using overlay text on images, ensure readability by adding a dark overlay (e.g., `bg-black/20` or a dark gradient). Do not use solid color tinting filters that alter the original image colors.
4. **Animations:** Use subtle, slow CSS transitions (e.g., `transition-all duration-500 ease-in-out hover:scale-105`) to create a premium, romantic feel.
