import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Providers from './dashboard/provider'

const dmSans = DM_Sans({ subsets: ['latin', 'latin-ext'], weight: ['400', '700'], variable: '--font-dmSans' })

export const metadata: Metadata = {
  title: 'DashBoard',
  description: 'DashBoard Application',
}

export default function RootLayout({  children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
