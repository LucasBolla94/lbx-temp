'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/client';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  getParsedTokenAccountsByOwner,
  getMint,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';

const LBX_MINT = new PublicKey('LBXzvWdEFJbHva1Qkq6BqAVey8wWzF8P3wywowguMei');
const RPC = 'https://mainnet.helius-rpc.com/?api-key=44a7b170-0809-4848-b621-0f854499407a';
const DECIMALS = 6;

type Pool = {
  id: string;
  title: string;
  description?: string;
  options: string[];
  startAt: Timestamp;
  endAt: Timestamp;
  status: boolean;
};

type VoteStatus = {
  option: string;
  weight: number;
  balanceLBX: number;
  wallet: string;
  votedAt: Timestamp;
};

export default function VotingPanel() {
  const { publicKey, connected } = useWallet();
  const [pools, setPools] = useState<Pool[]>([]);
  const [votes, setVotes] = useState<{ [key: string]: VoteStatus }>({});

  useEffect(() => {
    const fetchPools = async () => {
      const q = query(collection(db, 'pool-vote'), where('status', '==', true));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as Pool[];
      setPools(data);

      if (publicKey) {
        const wallet = publicKey.toBase58();
        for (const pool of data) {
          const voteRef = doc(db, `pool-vote/${pool.id}/votes/${wallet}`);
          const snap = await getDoc(voteRef);
          if (snap.exists()) {
            const vote = snap.data() as VoteStatus;
            setVotes((prev) => ({
              ...prev,
              [pool.id]: vote,
            }));
          }
        }
      }
    };

    fetchPools();
  }, [publicKey]);

  const handleVote = async (poolId: string, option: string) => {
    if (!publicKey || !connected) return;

    try {
      const connection = new Connection(RPC, 'confirmed');
      const wallet = publicKey;

      const response = await connection.getParsedTokenAccountsByOwner(wallet, {
        mint: LBX_MINT,
      });

      const info = response.value[0]?.account.data.parsed.info;
      const balanceLBX = Number(info?.tokenAmount?.uiAmount || 0);

      const mintInfo = await getMint(connection, LBX_MINT, 'confirmed', TOKEN_PROGRAM_ID);
      const supply = Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals);
      const weight = supply > 0 ? balanceLBX / supply : 0;

      const voteData: VoteStatus = {
        option,
        weight,
        balanceLBX,
        wallet: wallet.toBase58(),
        votedAt: Timestamp.now(),
      };

      const voteRef = doc(collection(db, `pool-vote/${poolId}/votes`), wallet.toBase58());
      await setDoc(voteRef, voteData);

      setVotes((prev) => ({ ...prev, [poolId]: voteData }));
    } catch (err) {
      console.error('❌ Erro ao votar:', err);
    }
  };

  const formatDate = (ts: Timestamp) => {
    const date = ts.toDate();
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatBalance = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 6,
    });
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--gray-100)] mb-6 text-center tracking-wide">
        📊 Votações da Comunidade
      </h2>

      <div className="space-y-6">
        {pools.map((pool) => {
          const voted = votes[pool.id];
          return (
            <div
              key={pool.id}
              className="bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg shadow-md p-5 space-y-4"
            >
              <div>
                <p className="text-[var(--gray-100)] text-lg font-semibold leading-snug tracking-wide">
                  {pool.title}
                </p>
                <p className="text-sm text-[var(--gray-400)]">📅 Votação termina em: {formatDate(pool.endAt)}</p>
                {pool.description && (
                  <p className="text-sm text-[var(--gray-400)] tracking-wide mt-1">
                    {pool.description}
                  </p>
                )}
              </div>

              {!voted ? (
                <div className="flex flex-wrap gap-3 mt-2">
                  {pool.options.map((option, idx) => (
                    <button
                      key={`${pool.id}-${idx}`}
                      onClick={() => handleVote(pool.id, option)}
                      style={{ backgroundColor: '#38c768' }}
                      className="px-5 py-2 rounded-md font-semibold text-sm text-black hover:brightness-110 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--gray-800)] p-4 rounded-md text-[var(--green-200)] text-sm tracking-wide space-y-2">
                  <p>✅ Seu voto foi computado.</p>
                  <p>
                    📊 Peso: <strong>{(voted.weight * 100).toFixed(2)}%</strong> com{' '}
                    <strong>{formatBalance(voted.balanceLBX)}</strong> LBX
                  </p>
                  <p>
                    🔐 Carteira: <code className="text-[var(--green-100)]">{voted.wallet}</code>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
