'use client'

import { useState } from 'react'
import { ClipboardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function WalletHeader() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState('8X9o...hGTc')
  const [lbxBalance, setLbxBalance] = useState(12500) // exemplo mockado

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    alert('Address copied!')
    setDropdownOpen(false)
  }

  const handleDisconnect = () => {
    setWalletConnected(false)
    setDropdownOpen(false)
    setWalletAddress('')
    setLbxBalance(0)
  }

  const connectWallet = () => {
    // lógica real entra aqui depois
    setWalletConnected(true)
    setWalletAddress('8X9o...hGTc') // mock
    setLbxBalance(12500) // mock
  }

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3">
      <h1 className="text-xl font-semibold">Welcome, Lucas</h1>

      <div className="text-sm text-zinc-300">
        LBX Balance: <span className="font-semibold text-white">{lbxBalance}</span> ≈ ${lbxBalance * 0.01}
      </div>

      {!walletConnected ? (
        <button
          onClick={connectWallet}
          className="mt-2 bg-green-600 hover:bg-green-700 transition-all px-5 py-2 rounded-lg font-medium text-white"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-zinc-700 hover:bg-zinc-600 transition-all px-4 py-2 rounded-lg text-sm"
          >
            {walletAddress}
          </button>

          {dropdownOpen && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg w-48 z-50">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-zinc-700 text-left text-sm"
              >
                <ClipboardIcon className="w-4 h-4" />
                Copy Address
              </button>
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-zinc-700 text-left text-sm text-red-400"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
