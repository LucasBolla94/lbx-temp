'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/client'
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Connection } from '@solana/web3.js'
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'

// Define types for better type checking
type Poll = {
  id: string
  question: string
  options: string[]
}

type Vote = {
  weight: number
  choice: string
}

type ResultItem = {
  label: string
  percent: number
}

export default function VotePanel() {
  const { publicKey } = useWallet()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState<boolean>(false)
  const [voteWeight, setVoteWeight] = useState<number>(0)
  const [result, setResult] = useState<ResultItem[] | null>(null)

  // 1. Load the current poll
  useEffect(() => {
    const loadPoll = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'polls'))
        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("No polls found")
          return
        }
        const latestDoc = snapshot.docs[0]
        const latestData = latestDoc.data()
        // Assume the document has fields "question" and "options"
        setPoll({ id: latestDoc.id, ...latestData } as Poll)
      } catch {
        console.error("Error loading poll")
      }
    }
    loadPoll()
  }, [])

  // 2. Check if the user has already voted and load vote weight
  useEffect(() => {
    const checkStatus = async () => {
      if (!publicKey || !poll) return

      const voteRef = doc(db, `polls/${poll.id}/votes`, publicKey.toBase58())
      const voteSnap = await getDoc(voteRef)
      setHasVoted(voteSnap.exists())

      try {
        const ata = await getAssociatedTokenAddress(
          new PublicKey('LBXzvWdEFJbHva1Qkq6BqAVey8wWzF8P3wywowguMei'),
          publicKey
        )
        // Instead of relying on a global declaration, cast window.solana locally.
        const solanaObj = window.solana as any
        const connectionFromSolana = solanaObj?.connection as Connection | undefined
        if (connectionFromSolana) {
          const accInfo = await getAccount(connectionFromSolana, ata)
          const balance = Number(accInfo.amount) / 10 ** 9
          setVoteWeight(balance)
        } else {
          setVoteWeight(0)
        }
      } catch {
        setVoteWeight(0)
      }
    }

    checkStatus()
  }, [publicKey, poll])

  // 3. Submit the vote
  const handleVote = async () => {
    if (!poll || !publicKey || !selected || voteWeight < 1000) return

    const voteRef = doc(db, `polls/${poll.id}/votes`, publicKey.toBase58())
    await setDoc(voteRef, {
      wallet: publicKey.toBase58(),
      timestamp: new Date(),
      choice: selected,
      weight: voteWeight,
    })

    setHasVoted(true)
  }

  // 4. Load voting results
  useEffect(() => {
    const loadResults = async () => {
      if (!poll || !hasVoted) return

      const snapshot = await getDocs(collection(db, `polls/${poll.id}/votes`))
      const votes: Vote[] = snapshot.docs.map(doc => doc.data() as Vote)

      const totalWeight = votes.reduce((sum, v) => sum + v.weight, 0)
      const grouped: ResultItem[] = poll.options.map((opt: string) => {
        const total = votes
          .filter((v: Vote) => v.choice === opt)
          .reduce((sum: number, v: Vote) => sum + v.weight, 0)
        const percent = totalWeight > 0 ? (total / totalWeight) * 100 : 0
        return { label: opt, percent }
      })

      setResult(grouped)
    }

    loadResults()
  }, [hasVoted, poll])

  // Conditional rendering
  if (!publicKey)
    return (
      <div className="text-center text-sm text-zinc-400">
        Connect wallet to vote.
      </div>
    )
  if (!poll)
    return (
      <div className="text-center text-sm text-zinc-400">
        Loading poll...
      </div>
    )
  if (voteWeight < 1000)
    return (
      <div className="text-center text-sm text-zinc-400">
        You need at least 1000 LBX to vote.
      </div>
    )

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl text-white w-full max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-semibold text-center">{poll.question}</h3>

      {!hasVoted ? (
        <>
          <div className="space-y-2">
            {poll.options.map((opt: string) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="vote"
                  value={opt}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
          <button
            disabled={!selected}
            onClick={handleVote}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-all py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            Vote
          </button>
        </>
      ) : (
        <>
          <div className="text-green-400 text-center">
            ✅ Vote successfully submitted!
          </div>
          <div className="space-y-3 pt-4">
            {result?.map((res: ResultItem) => (
              <div key={res.label}>
                <div className="text-sm mb-1">
                  {res.label} — {res.percent.toFixed(1)}%
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${res.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
