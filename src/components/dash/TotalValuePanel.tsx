'use client';

import { useState, useEffect } from 'react';

export default function TotalValuePanel() {
  const [total, setTotal] = useState<number | null>(null);

  // Simula o valor da carteira vindo do backend
  useEffect(() => {
    // Você pode substituir isso por uma chamada real do Firebase ou API
    const simulatedValue = 11530.88;
    setTotal(simulatedValue);
  }, []);

  return (
    <section className="w-full bg-[var(--gray-900)] rounded-xl shadow-md p-6 text-center border border-[var(--gray-800)]">
      <h2 className="text-lg text-[var(--gray-300)] font-medium mb-2">
        Valor Total da Carteira
      </h2>

      <div className="text-4xl font-bold text-[var(--green-300)] font-mono">
        {total !== null ? `$${total.toLocaleString('en-US', {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })}` : 'Carregando...'}
      </div>
    </section>
  );
}
