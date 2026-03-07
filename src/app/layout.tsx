export const metadata = {
  title: 'Custom Wedding Co.',
  description: 'Celebrate Love with a Personal Touch',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
