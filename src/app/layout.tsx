import './globals.scss'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight:['300', '400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Card Memory Game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
