import Image from 'next/image'
import WalletHeader from '@/components/dash/WalletHeader'
import SolanaPayPanel from '@/components/dash/SolanaPayPanel'
import NewsPanel from '@/components/dash/NewsPanel'
import VotePanel from '@/components/dash/VotePanel'
import DistributionPanel from '@/components/dash/DistributionPanel'

export default function DashboardPage() {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Background com imagem e opacidade */}
      <Image
        src="/BG.png"
        alt="Background"
        fill
        className="absolute z-0 object-cover opacity-80"
        priority
        sizes="100vw"
      />

      {/* Conteúdo principal com padding e separação */}
      <main className="relative z-10 flex flex-col min-h-screen px-4 py-6 space-y-6 overflow-auto">
        <WalletHeader />

        <section>
          <SolanaPayPanel />
        </section>

        <section>
          <VotePanel />
        </section>

        <section>
          <NewsPanel />
        </section>

        <section>
          <DistributionPanel />
        </section>

        <div className="mb-8" />
      </main>
    </div>
  )
}
