'use client'

import { useState, useMemo } from 'react'
import { PublicKey, Keypair } from '@solana/web3.js'
import { encodeURL } from '@solana/pay'
import QRCode from 'react-qr-code'
import BigNumber from 'bignumber.js'

const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
const RECEIVER_WALLET = new PublicKey('5ArPQSA9vM7sukJzsFdkEnUzG5NALCDDcEm6Li5VoZRS')
const PRICE_PER_LBX = 0.01 // USDC

export default function SolanaPayPanel() {
  const [usdcAmount, setUsdcAmount] = useState<string>('')

  const parsedAmount = parseFloat(usdcAmount)
  const isValid = !isNaN(parsedAmount) && parsedAmount > 0

  const lbxAmount = useMemo(() => {
    if (!isValid) return '0.000000000'
    const result = parsedAmount / PRICE_PER_LBX
    return result.toFixed(9)
  }, [parsedAmount, isValid])

  const paymentURL = useMemo(() => {
    if (!isValid) return ''

    // Em vez de usar uuidv4, gera uma chave aleatória para a referência
    const reference = Keypair.generate().publicKey

    const urlParams = {
      recipient: RECEIVER_WALLET,
      amount: new BigNumber(parsedAmount),
      splToken: USDC_MINT,
      reference,
      label: 'LBX Finance',
      message: `Compra de ${lbxAmount} LBX`,
    }

    return encodeURL(urlParams).toString()
  }, [parsedAmount, lbxAmount, isValid])

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl text-white w-full max-w-md mx-auto text-center space-y-4">
      <h2 className="text-lg font-semibold">Buy LBX via Solana Pay</h2>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Enter amount in USDC"
          value={usdcAmount}
          onChange={(e) => setUsdcAmount(e.target.value)}
          step="0.000001"
          className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <div className="text-sm text-zinc-300">
          You’ll receive: <span className="font-medium text-green-400">{lbxAmount}</span> LBX
        </div>
      </div>

      {isValid && (
        <>
          <div className="flex justify-center pt-2">
            <QRCode value={paymentURL} size={160} bgColor="#000000" fgColor="#ffffff" />
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(paymentURL)
              alert('Payment link copied!')
            }}
            className="w-full mt-4 text-green-400 underline text-sm hover:text-green-300"
          >
            Copy Payment Link
          </button>
        </>
      )}
    </div>
  )
}
