# Branding & Design System Guidelines

This document outlines the visual identity and styling rules for the "Custom Wedding Co." project.

## Typography
- **Body Text:** Inter (`font-sans`)
- **Headings & Accents:** Cormorant Garamond (`font-serif`)
- **Hero/Display Headings:** Playfair Display (`font-display`)

## Color Palette

### Primary Colors
- **Espresso (#4A2C2A):** Main text, primary buttons, dark backgrounds.
- **Espresso Light (#6B3F3C):** Hovers or secondary dark elements.
- **Cream (#F7EFE3):** Default page background and light text on dark backgrounds.
- **Cream Dark (#EDE5D5):** Subtle contrasting backgrounds for sections.

### Accent Colors
- **Gold (#B89A52):** Primary accents, borders, and highlights.
- **Gold Light (#D4B96A)**
- **Gold Pale (#EFE3C2):** Subtle accent backgrounds or text.
- **Blush (#F2D9D9):** Soft background accent.
- **Orange (#D4700A)**

## Styling Rules
1. **No Default Tailwind Colors:** Always use the branded colors defined in `tailwind.config.js`. Avoid `bg-blue-500`, etc.
2. **Standard Background:** Default text is `text-espresso` on a `bg-cream` background.
3. **Image Readability & Overlays:** When placing text over images, use neutral dark overlays (e.g., `bg-black/20`) rather than solid color-tinting filters (like `mix-blend-overlay` with brand colors). Tinting filters can degrade image visual quality and reduce contrast for text.
4. **Section Management:** Maintain the homepage's elegance by removing redundant or cluttered sections. For example, if both a category grid and a specific product spotlight are present, evaluate if both are necessary for the user flow. In this project, the `FeaturedProductSpotlights` section was removed after the `CategoryGrid` to streamline the layout.
5. **Animations:** Use slow, subtle transitions (e.g., `duration-500` or `duration-700`) to maintain a premium, romantic feel.
6. **Whitespace:** Use ample padding (e.g., `py-20`, `py-28`) for an elegant and airy layout.
