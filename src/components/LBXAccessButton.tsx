'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import Link from 'next/link';

const LBX_MINT = new PublicKey('LBXzvWdEFJbHva1Qkq6BqAVey8wWzF8P3wywowguMei');
const RPC = 'https://mainnet.helius-rpc.com/?api-key=44a7b170-0809-4848-b621-0f854499407a';
const DECIMALS = 6;
const MIN_LBX = 1000;

const LBXAccessButton = () => {
  const { publicKey, connected } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !connected) return;

      try {
        const connection = new Connection(RPC);

        const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: LBX_MINT,
        });

        const accountInfo = response.value[0]?.account.data.parsed.info;
        const rawAmount = Number(accountInfo?.tokenAmount?.amount || 0);
        const balance = rawAmount / Math.pow(10, DECIMALS);

        console.log(`🔍 LBX balance encontrado: ${balance} tokens`);

        setHasAccess(balance >= MIN_LBX);
      } catch (err) {
        console.error('❌ Erro ao buscar LBX:', err);
        setHasAccess(false);
      }
    };

    fetchBalance();
  }, [publicKey, connected]);

  if (!hasAccess) return null;

  return (
    <Link
      href="/partner-dashboard"
      className="ml-4 px-4 py-2 border border-[var(--green-200)] text-[var(--green-200)] rounded-md hover:bg-[var(--green-200)] hover:text-black transition-colors"
    >
      Area Socio
    </Link>
  );
};

export default LBXAccessButton;
