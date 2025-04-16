// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Importa o componente client-only para o WalletProvider
import ClientWalletProvider from "@/components/dash/ClientWalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'LBX Finance – Real-Yield DeFi Fund',
  description:
    'LBX is a real-yield crypto investment fund built on Solana. Reinvesting profits to reward holders and grow the ecosystem.',
  keywords: [
    'LBX',
    'LBX Finance',
    'Solana',
    'DeFi',
    'crypto fund',
    'real yield',
    'blockchain',
    'web3',
  ],
  authors: [{ name: 'LBX Team', url: 'https://lbxgroup.online' }],
  creator: 'LBX Finance',
  metadataBase: new URL('https://lbxgroup.online'),
  openGraph: {
    title: 'LBX Finance – Real-Yield DeFi Fund',
    description:
      'LBX is a crypto investment fund focused on delivering real returns using decentralized liquidity pools.',
    url: 'https://lbxgroup.online',
    siteName: 'LBX Finance',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Envolve a aplicação com o ClientWalletProvider (client-only) */}
        <ClientWalletProvider>
          {children}
        </ClientWalletProvider>
      </body>
    </html>
  );
}
