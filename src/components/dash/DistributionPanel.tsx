'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'

type Distribution = {
  amount: number
  reference?: string
  comment?: string
  date: any
}

export default function DistributionPanel() {
  const [distributions, setDistributions] = useState<Distribution[]>([])

  useEffect(() => {
    const fetchDistributions = async () => {
      const q = query(collection(db, 'distributions'), orderBy('date', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        date: doc.data().date?.toDate(),
      })) as Distribution[]

      setDistributions(data.slice(0, 3))
    }

    fetchDistributions()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto space-y-4 text-white">
      <h2 className="text-lg font-semibold text-center mb-2">Recent Distributions</h2>

      {distributions.length === 0 && (
        <div className="text-sm text-zinc-400 text-center">No distributions found.</div>
      )}

      {distributions.map((dist, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-sm space-y-2"
        >
          <div className="text-green-400 font-bold text-lg">
            {dist.amount.toLocaleString(undefined, {
              minimumFractionDigits: dist.amount % 1 !== 0 ? 2 : 0,
              maximumFractionDigits: 9,
            })}{' '}
            LBX
          </div>

          {dist.reference && (
            <div className="text-sm text-zinc-300">
              <span className="font-semibold">Reference:</span> {dist.reference}
            </div>
          )}

          {dist.comment && (
            <div className="text-sm text-zinc-400 italic">"{dist.comment}"</div>
          )}

          <div className="text-xs text-zinc-500 text-right">
            {dist.date?.toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}
