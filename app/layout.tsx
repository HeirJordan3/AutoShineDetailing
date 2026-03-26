import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AutoShine Detailing',
  description:
    'Professional car detailing. Transform your vehicle with premium interior and exterior services.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
