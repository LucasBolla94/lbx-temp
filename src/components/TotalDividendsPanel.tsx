'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/client'
import { collection, getDocs } from 'firebase/firestore'

export default function TotalDividendsPanel() {
  const [totalYield, setTotalYield] = useState<number | null>(null)

  useEffect(() => {
    async function fetchTotalYield() {
      try {
        const snapshot = await getDocs(collection(db, 'dividends-total'))
        let total = 0.0

        snapshot.forEach(doc => {
          const data = doc.data()
          total += data.value || 0
        })

        setTotalYield(parseFloat(total.toFixed(6)))
      } catch (error) {
        console.error('Failed to fetch dividends:', error)
        setTotalYield(null)
      }
    }

    fetchTotalYield()
  }, [])

  return (
    <section className="bg-[var(--gray-900)] rounded-xl shadow-lg p-8 md:p-12 text-center border border-[var(--gray-800)]">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--green-200)] mb-4">
        Total de Dividendos Acumulados
      </h2>

      <p className="text-md md:text-lg text-[var(--gray-300)] max-w-xl mx-auto mb-6">
        Valor total de rendimentos gerados sobre o capital até o momento.
        Atualizado automaticamente a cada novo ciclo de distribuição.
      </p>

      <div className="inline-block bg-[var(--gray-800)] px-6 py-4 rounded-lg">
        <span className="text-[var(--green-300)] text-4xl md:text-5xl font-mono font-semibold tracking-tight">
          {totalYield !== null
            ? `$${totalYield.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}`
            : 'Loading...'}
        </span>
      </div>

      <p className="text-xs mt-4 text-[var(--gray-400)]">
        * Real-time data based on recorded dividend transactions.
      </p>
    </section>
  )
}
