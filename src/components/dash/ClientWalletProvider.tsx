'use client'

import React, { useMemo, ReactNode } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import '@solana/wallet-adapter-react-ui/styles.css'

interface Props {
  children: ReactNode
}

const ClientWalletProvider = ({ children }: Props) => {
  // Utiliza o endpoint customizado do Helius para mainnet
  const endpoint = useMemo(() => "https://mainnet.helius-rpc.com/?api-key=44a7b170-0809-4848-b621-0f854499407a", [])
  
  // Configura as wallets; aqui usamos o PhantomWalletAdapter como exemplo.
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default ClientWalletProvider
