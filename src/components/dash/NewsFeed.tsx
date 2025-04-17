'use client';

import { useState } from 'react';

type NewsItem = {
  id: number;
  title: string;
  content: string;
};

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'LBX atinge novo marco de US$10 mil em patrimônio',
    content:
      'Com o crescimento constante da comunidade, o projeto LBX alcançou a marca de US$10.000 em capital total sob controle. A valorização continua impulsionada pela entrada controlada e gestão transparente.',
  },
  {
    id: 2,
    title: 'Atualização no sistema de votos será lançada',
    content:
      'A equipe LBX irá liberar melhorias no painel de votações, tornando o processo mais rápido, seguro e acessível em dispositivos móveis.',
  },
];

export default function NewsFeed() {
  const [openNewsId, setOpenNewsId] = useState<number | null>(null);

  const toggleNews = (id: number) => {
    setOpenNewsId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[var(--gray-900)] rounded-xl shadow-md p-6 border border-[var(--gray-800)]">
      <h2 className="text-lg font-medium text-[var(--gray-300)] mb-4 text-center">Mural de Notícias</h2>

      <div className="space-y-4">
        {mockNews.map((news) => (
          <div key={news.id} className="bg-[var(--gray-800)] rounded-md">
            <button
              onClick={() => toggleNews(news.id)}
              className="w-full text-left px-4 py-3 font-semibold text-[var(--green-200)] hover:bg-[var(--gray-700)] transition-colors"
            >
              {news.title}
            </button>

            {openNewsId === news.id && (
              <div className="px-4 pb-4 text-sm text-[var(--gray-300)] animate-fadeIn">
                {news.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
