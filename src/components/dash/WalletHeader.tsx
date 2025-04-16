'use client'

import React, { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { ClipboardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import { PublicKey } from '@solana/web3.js'

// Mint do token LBX
const LBX_MINT = new PublicKey('LBXzvWdEFJbHva1Qkq6BqAVey8wWzF8P3wywowguMei')

export default function WalletHeader() {
  // Obtém os dados da carteira e da conexão
  const { publicKey, disconnect } = useWallet()
  const { connection } = useConnection()

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [lbxBalance, setLbxBalance] = useState<number>(0)

  // Marca que o componente foi montado (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Busca o saldo do token LBX para a carteira conectada usando getParsedTokenAccountsByOwner
  useEffect(() => {
    const loadLbxBalance = async () => {
      // Verifica se a carteira e a conexão estão definidas
      if (!publicKey || !connection) return

      try {
        const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: LBX_MINT,
        })

        if (response.value.length > 0) {
          // Se houver conta(s) encontrada(s), pega a primeira e extrai o saldo
          const tokenAccount = response.value[0]
          const balance = tokenAccount.account.data.parsed.info.tokenAmount.uiAmount || 0
          setLbxBalance(Number(balance))
        } else {
          // Se não houver ATA, o usuário ainda não possui o token LBX
          console.log("Conta associada ao token não encontrada. Saldo definido como 0.")
          setLbxBalance(0)
        }
      } catch (error) {
        console.error("Error fetching LBX balance:", error)
        setLbxBalance(0)
      }
    }
    loadLbxBalance()
  }, [publicKey, connection])

  // Evita problemas de hidratação no Next.js
  if (!mounted) return null

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58())
      alert('Address copied!')
      setDropdownOpen(false)
    }
  }

  const handleDisconnect = async () => {
    await disconnect()
    setDropdownOpen(false)
  }

  // Formata os valores em formato "pt-BR" (ex.: 1.234,56)
  const formattedLbxBalance = lbxBalance.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  // Caso deseje formatar o valor em dólares, também podemos usar:
  const usdValue = (lbxBalance * 0.01).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="w-full flex flex-col items-center text-center space-y-4">
      <h1 className="text-2xl font-bold tracking-wide">Welcome, Lucas</h1>

      <div className="text-lg text-zinc-300 tracking-wide">
        LBX Balance:{' '}
        <span className="font-semibold text-white">{formattedLbxBalance}</span> ≈ {usdValue}
      </div>

      {!publicKey ? (
        // Se não houver carteira conectada, exibe o WalletMultiButton
        <WalletMultiButton className="mt-2 bg-green-600 hover:bg-green-700 transition-all px-6 py-3 rounded-lg font-medium text-white tracking-wide" />
      ) : (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-zinc-700 hover:bg-zinc-600 transition-all px-4 py-3 rounded-lg text-lg tracking-wider font-mono"
          >
            {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-4)}
          </button>

          {dropdownOpen && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg w-56 z-50">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-zinc-700 text-left text-lg tracking-wide"
              >
                <ClipboardIcon className="w-5 h-5" />
                Copy Address
              </button>
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-zinc-700 text-left text-lg tracking-wide text-red-400"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
