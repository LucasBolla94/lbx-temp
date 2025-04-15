'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'

export default function Counter() {
  const [capital, setCapital] = useState<number | null>(null)

  useEffect(() => {
    const walletRef = doc(db, 'wallet', 'counter')

    const unsubscribe = onSnapshot(walletRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setCapital(data.value)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <section className="px-4 md:px-12 py-12 text-center">
      <h4 className="text-xl md:text-2xl font-semibold text-[var(--gray-200)] mb-2">
        Total Capital
      </h4>
      <p className="text-4xl md:text-5xl font-bold text-[var(--green-200)] tracking-tight">
        {capital !== null
        ? `$${capital.toLocaleString('en-US', {
            minimumFractionDigits: 6,
            maximumFractionDigits: 6,
          })}`
        : 'Loading...'}
       </p>
    </section>
  )
}
