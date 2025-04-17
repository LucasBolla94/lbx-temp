'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

const WalletButtonClient = dynamic(() => import('./WalletButtonClient'), { ssr: false });
const LBXAccessButton = dynamic(() => import('./LBXAccessButton'), { ssr: false });

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-[var(--black-100)] text-[var(--gray-200)] shadow-md">
      {/* Logo e título (esconde o texto no mobile) */}
      <div className="flex items-center space-x-3">
        <Image src="/shield.png" alt="LBX Logo" width={36} height={36} />
        <span className="text-lg font-bold tracking-wide hidden sm:inline">LBX Finance</span>
      </div>

      {/* Botões sempre lado a lado */}
      <div className="flex items-center gap-2 text-black">
        <LBXAccessButton />
        <WalletButtonClient />
      </div>
    </header>
  );
}
