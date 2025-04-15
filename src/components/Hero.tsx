'use client'

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 px-4 md:px-12 py-16">
      {/* Botão à esquerda */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <a
          href="/discover"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[var(--green-200)] text-black text-lg font-semibold rounded-md shadow-md hover:bg-[var(--green-400)] transition-colors"
        >
          Discover LBX
        </a>
      </div>

      {/* Texto à direita */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-200)] mb-4">
          Real-Yield DeFi Investment Fund
        </h2>
        <p className="text-[var(--gray-500)] text-lg leading-relaxed max-w-xl">
          LBX is a closed-end crypto investment fund built on the Solana blockchain. 
          We generate real returns from liquidity pools and reinvest the profits 
          to grow our ecosystem and reward our token holders.
        </p>
      </div>
    </section>
  )
}
