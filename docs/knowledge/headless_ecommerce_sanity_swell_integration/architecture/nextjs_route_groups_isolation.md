# Next.js Route Groups for Library Isolation (e.g. Sanity Studio)

## Problem: Context Providers and the Root Layout

In Next.js projects using high-level React Context Providers (like a `CartProvider` for an e-commerce cart), wrapping the entire application in the root `src/app/layout.tsx` is common. However, this causes issues when third-party libraries (like Sanity Studio) are also mounted within the same Next.js App Router.

- **The Issue:** When you navigate to `/studio`, Sanity's internal React logic is loaded *inside* your `CartProvider`. If your provider uses client-side hooks like `useEffect` or `useCart`, it may throw errors (e.g., `useCart must be used within a CartProvider`) or cause the Studio to crash because the provider is missing or conflicting with Sanity's environment.
- **The Symptom:** React errors in the Sanity Studio dashboard that don't occur when browsing the storefront.

## Solution: Route Groups and Split Layouts

Separate your "Storefront" logic from your "Management" logic using Route Groups. These folders are denoted by parentheses `()` and do not affect the URL path.

### 1. The Raw Root Layout
Create a basic root layout in `src/app/layout.tsx` that only provides a basic HTML shell. It should contain no providers, no fonts, and no styling classes.

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 2. The (store) Route Group
Move all your main storefront routes (e.g., `page.tsx`, `shop/`, `products/`) into a folder like `src/app/(store)/`. Create a new `layout.tsx` inside this folder to house all your branding, fonts, and React Context Providers.

```tsx
// src/app/(store)/layout.tsx
import { CartProvider } from "@/context/CartContext";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans antialiased text-espresso bg-cream">
      <CartProvider>
        {/* Header, AnnouncementBar, etc. */}
        <main>{children}</main>
        {/* Footer, CartDrawer, etc. */}
      </CartProvider>
    </div>
  )
}
```

### 3. The Isolated Studio Route
Since `/studio` is *not* inside the `(store)` group, it inherits only the basic root layout and completely bypasses the `CartProvider`. This ensures the Sanity Studio remains an isolated, stable environment regardless of changes made to the e-commerce frontend.

## Benefits
- **Stability:** Prevents "ghost" storefront code from crashing the CMS editor.
- **Performance:** Routes in different groups don't share unnecessary React Context and logic, resulting in cleaner and faster rendering.
- **Organization:** Clearly separates frontend user experience from administrative tools.
