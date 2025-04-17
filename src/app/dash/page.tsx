'use client';

import Topbar from '@/components/dash/Topbar';
import TotalValuePanel from '@/components/dash/TotalValuePanel';
import PortfolioChart from '@/components/dash/PortfolioChart';
import NewsFeed from '@/components/dash/NewsFeed';
import VotingPanel from '@/components/dash/VotingPanel';

export default function DashPage() {
  return (
    <main className="min-h-screen bg-[var(--black-100)] text-[var(--gray-200)] px-4 py-6 space-y-6">
      {/* Topbar com logo e wallet */}
      <Topbar />

      {/* Painel com o valor total da carteira */}
      <TotalValuePanel />

      {/* Gráfico de colunas com evolução da carteira */}
      <PortfolioChart />

      {/* Mural de notícias com títulos expansíveis */}
      <NewsFeed />

      {/* Painel de votações estilo post */}
      <VotingPanel />
    </main>
  );
}
