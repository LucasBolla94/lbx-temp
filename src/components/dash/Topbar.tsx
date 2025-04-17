'use client';

import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

export default function Topbar() {
  const { publicKey } = useWallet();

  const shortWallet = useMemo(() => {
    if (!publicKey) return '';
    const key = publicKey.toBase58();
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  }, [publicKey]);

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-[var(--black-100)] border-b border-[var(--gray-800)]">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/shield.png" alt="LBX Logo" width={32} height={32} />
        <span className="text-base font-semibold text-[var(--gray-300)] hidden sm:inline">LBX</span>
      </div>

      {/* Wallet encurtada */}
      {publicKey && (
        <div className="bg-[var(--gray-900)] text-[var(--green-200)] px-3 py-1 rounded-md text-sm font-mono">
          {shortWallet}
        </div>
      )}
    </header>
  );
}
