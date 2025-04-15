'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-[var(--black-100)] text-[var(--gray-200)] shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/shield.png" alt="LBX Logo" width={36} height={36} />
        <span className="text-lg font-bold tracking-wide">LBX Finance</span>
      </div>

      {/* Botão de Login */}
      <Link
        href="/login"
        className="px-4 py-2 border border-[var(--green-200)] text-[var(--green-200)] rounded-md hover:bg-[var(--green-200)] hover:text-black transition-colors"
      >
        Login / Register
      </Link>
    </header>
  )
}
