'use client'

export default function DiscoverHowItWorks() {
  return (
    <section className="py-16 px-4 md:px-12 max-w-5xl mx-auto text-left">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[var(--green-200)]">
        How It Works
      </h2>

      <ul className="space-y-8 text-[var(--gray-500)] text-lg leading-relaxed">
        <li>
          <span className="font-semibold text-[var(--gray-200)]">1. Register on the Dashboard:</span> 
          Sign up on our panel to access token purchases, wallet updates, and community governance tools.
        </li>

        <li>
          <span className="font-semibold text-[var(--gray-200)]">2. Buy LBX Token:</span> 
          Purchase LBX directly through the dashboard for a guaranteed price, or on the open market via Orca or Raydium (note: open market prices may vary).
        </li>

        <li>
          <span className="font-semibold text-[var(--gray-200)]">3. Participate and Profit:</span> 
          Stake your tokens, vote on proposals, or simply hold and watch your position appreciate based on real weekly fund performance.
        </li>

        <li>
          <span className="font-semibold text-[var(--gray-200)]">4. Controlled Liquidity Actions:</span> 
          The fund may buy/sell tokens strategically to maintain price stability and attract new capital.
        </li>
      </ul>
    </section>
  )
}
